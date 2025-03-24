import { formatToCLP } from '../../utils/purchase'
import CustomText from '../../components/CustomText'
import { getTotal, getStatus } from '../../utils/bill'
import { Fontisto, AntDesign } from '@expo/vector-icons'
import { View, ScrollView, StyleSheet } from 'react-native'
import background from '../../assets/principal-background.jpg'
import { TouchableOpacity, TextInput, Platform } from 'react-native'
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { setBillElements, getBillElements } from '../../services/bill'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue, withTiming } from 'react-native-reanimated'
// import { VIEW_BILLS_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import useSelectionModal from '../../hooks/useSelectionModal'
import SelectionModal from '../../components/SelectionModal'
import { removeDiacritics } from '../../utils/purchase'
import useActionModal from '../../hooks/useActionModal'
import ActionModal from '../../components/ActionModal'
import { SCREEN_KEYS } from '../../constants/screens'
import { LIMIT_VALUES } from '../../constants/datas'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { setBillsList } from '../../services/bill'
import { useTranslation } from 'react-i18next'
import Spacer from '../../components/Spacer'
import { Formik, FieldArray } from 'formik'
import * as Yup from 'yup'

const NewBill = ({ navigation, route: { params = {} } }) => {
  const { elementsList = [] } = params
  const [translate] = useTranslation(SCREEN_KEYS.NEW_BILL)
  const { selectionModal, setSelectionModal, resetSelectionModal } = useSelectionModal()
  const { actionModal, setActionModal, resetActionModal } = useActionModal()
  const [focusedItemIndex, setFocusedItemIndex] = useState(null)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [statusList, setStatusList] = useState([])
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState([])
  const [items, setItems] = useState([])
  const scrollViewRef = useRef(null)
  const { colors } = useTheme()

  const expandHeight = useSharedValue(166)

  const animatedStyle = useAnimatedStyle(() => ({
    height: expandHeight.value
  }))

  const styles = allStyles({ colors })

  const validationSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(translate('form.required.name')),
        amount: Yup.number().required(translate('form.required.amount')),
        status: Yup.number().required(translate('form.required.status'))
      })
    )
  })

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }

  const showError = () => {
    setActionModal({
      visible: true,
      title: translate('modals.verifyForm.title'),
      message: translate('modals.verifyForm.message'),
      action: resetActionModal,
      confirm: translate('modals.verifyForm.buttons.confirm')
    })
  }

  const handleSaveList = async ({ items }) => {
    try {
      const response = await setBillsList(items)

      if (response) {
        resetActionModal()
        handleSaveItems([])
        // navigation.replace(VIEW_BILLS_SCREEN_KEY)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveItems = async (values) => {
    try {
      const data = await setBillElements(values)
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoadItems = async () => {
    try {
      let data = []

      if (elementsList.length === 0) {
        data = await getBillElements()
      } else {
        data = elementsList
      }

      setItems(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoadOptions = () => {
    const list = translate('data.bills', { returnObjects: true })
    setOptions(list)
  }

  const handleLoadStatus = () => {
    const list = translate('data.states', { returnObjects: true })
    setStatusList(list)
  }

  const handleOnLayout = ({ nativeEvent: { layout } }) => {
    const { height } = layout

    if (height !== expandHeight.value) {
      expandHeight.value = withTiming(height, {
        duration: 150
      })
    }
  }

  useEffect(() => {
    handleLoadItems()
    handleLoadOptions()
    handleLoadStatus()
  }, [])

  const initialValues = { items }

  return (
    <Formik
      onSubmit={handleSaveList}
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values, errors, isSubmitting }) => {
        useEffect(() => {
          if (!loading) {
            handleSaveItems(values.items)
          }
        }, [values])

        useEffect(() => {
          if (errors.items !== undefined) {
            showError()
          }
        }, [isSubmitting])

        const handleNewItem = (insertItem) => {
          const item = { name: null, amount: null, status: null }
          insertItem(values.items.length + 1, item)

          setTimeout(() => {
            scrollToEnd()
          }, 500)
        }

        const handleUpdateItem = (key, index, value) => {
          const item = values.items[index]

          if (key === 'name') {
            item[key] = value

            if (value.length > 0) {
              const filtered = options.filter((option) => {
                const { name } = option

                const newName = removeDiacritics(name.toLowerCase())
                const newValue = removeDiacritics(value.toLowerCase())

                if (newName.startsWith(newValue)) return option
              })

              if (filtered.length > 5) filtered.splice(5)

              setFilteredOptions(filtered)
            } else {
              setFilteredOptions([])
            }
          }

          if (key === 'amount' && value <= LIMIT_VALUES.UNIT) {
            item[key] = value
          }

          setFieldValue(`items[${index}]`, item)
          handleSaveItems(values.items)
        }

        const handleDeleteItem = (index, removeItem) => {
          removeItem(index)
        }

        const handleSelectOption = (index, value) => {
          const item = values.items[index]

          item['status'] = value

          setFieldValue(`items[${index}]`, item)
          handleSaveItems(values.items)
          resetSelectionModal()
        }

        const handleOnFocusName = (index) => {
          setFocusedItemIndex(index)
          setFilteredOptions([])
        }

        const handleOptionPress = (index, value) => {
          const item = values.items[index]

          item['name'] = value

          setFieldValue(`items[${index}]`, item)
          handleSaveItems(values.items)
          setFilteredOptions([])
        }

        const handleSelectionModal = (index) => {
          const options = statusList.map(({ id, name }) => ({
            name,
            action: () => handleSelectOption(index, id)
          }))

          setSelectionModal({
            visible: true,
            title: translate('modals.selectStatus.title'),
            cancel: translate('modals.selectStatus.buttons.cancel'),
            options
          })
        }

        const handleActionModal = () => {
          if (focusedItemIndex !== null) setFocusedItemIndex(null)
          if (filteredOptions.length > 0) setFilteredOptions([])

          setActionModal({
            visible: true,
            title: translate('modals.saveList.title'),
            message: translate('modals.saveList.message'),
            action: handleSubmit,
            confirm: translate('modals.saveList.buttons.confirm'),
            cancel: translate('modals.saveList.buttons.cancel')
          })
        }

        return (
          <ScreenContainer background={background} colorSafeArea={colors.tertiary}>
            <ActionModal {...{ actionModal, resetActionModal }} />
            <SelectionModal {...{ selectionModal, resetSelectionModal }} />

            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <KeyboardAvoidingView
                  style={styles.container}
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 98 : 0}
                  behavior="padding"
                >
                  <ScrollView style={styles.container} ref={scrollViewRef}>
                    <FieldArray
                      name="items"
                      render={({ insert, remove }) => (
                        <View style={styles.itemsContainer}>
                          {values.items.length > 0 ? (
                            values.items.map((item, index) => {
                              const isFiltered = filteredOptions.length > 0
                              const isFocused = focusedItemIndex === index
                              const showOptions = isFocused && isFiltered

                              return (
                                <View key={index} style={styles.content}>
                                  <View style={styles.header}>
                                    <TextInput
                                      style={styles.text}
                                      onChangeText={(value) =>
                                        handleUpdateItem('name', index, value)
                                      }
                                      placeholder={translate('placeholders.name')}
                                      onFocus={() => handleOnFocusName(index)}
                                      placeholderTextColor={colors.placeholder}
                                      value={item.name}
                                    />

                                    <TouchableOpacity
                                      style={styles.headerButton}
                                      onPress={() => handleDeleteItem(index, remove)}
                                    >
                                      <Fontisto name="close-a" color={colors.septenary} size={18} />
                                    </TouchableOpacity>
                                  </View>

                                  <Spacer />

                                  {showOptions ? (
                                    <Reanimated.View style={[animatedStyle]}>
                                      <View
                                        style={styles.optionsContainer}
                                        onLayout={isFocused && handleOnLayout}
                                      >
                                        {filteredOptions.map(({ name }, filteredIndex) => (
                                          <TouchableOpacity
                                            onPress={() => handleOptionPress(index, name)}
                                            style={styles.option}
                                            key={filteredIndex}
                                          >
                                            <CustomText
                                              text={name}
                                              color={colors.text}
                                              align="left"
                                            />
                                          </TouchableOpacity>
                                        ))}
                                      </View>
                                    </Reanimated.View>
                                  ) : (
                                    <View style={styles.bodyContainer}>
                                      <View style={styles.body}>
                                        <View style={styles.data}>
                                          <CustomText
                                            text={`${translate('fields.amount')}:`}
                                            color={colors.text}
                                            align="left"
                                          />

                                          <TextInput
                                            style={styles.text}
                                            onChangeText={(value) =>
                                              handleUpdateItem('amount', index, value)
                                            }
                                            placeholder={translate('placeholders.amount')}
                                            placeholderTextColor={colors.placeholder}
                                            keyboardType="numeric"
                                            value={item.amount}
                                          />
                                        </View>

                                        <View style={styles.data}>
                                          <CustomText
                                            text={`${translate('fields.status')}:`}
                                            color={colors.text}
                                            align="left"
                                          />

                                          <TouchableOpacity
                                            onPress={() => handleSelectionModal(index)}
                                          >
                                            {item.status === null ? (
                                              <CustomText
                                                text={translate('placeholders.status')}
                                                color={colors.placeholder}
                                                align="left"
                                              />
                                            ) : (
                                              <CustomText
                                                text={getStatus(item.status, statusList)}
                                                color={colors.text}
                                                align="left"
                                              />
                                            )}
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              )
                            })
                          ) : (
                            <View style={styles.messageContent}>
                              <CustomText
                                text={translate('indicators.noData')}
                                color={colors.text}
                              />
                            </View>
                          )}

                          <CustomHighlightButton
                            handlePress={() => handleNewItem(insert)}
                            customStyle={styles.button}
                          >
                            <AntDesign name="plus" size={24} color={colors.secondary} />
                          </CustomHighlightButton>
                        </View>
                      )}
                    />
                  </ScrollView>
                </KeyboardAvoidingView>

                <View style={styles.footer}>
                  <View style={styles.footerLeft}>
                    <CustomText
                      text={`${translate('indicators.total')}:`}
                      color={colors.secondary}
                      align="left"
                      size={32}
                    />

                    <CustomText
                      text={formatToCLP(getTotal(values.items))}
                      color={colors.secondary}
                      align="left"
                      size={32}
                    />
                  </View>

                  <CustomHighlightButton
                    backgroundColor={colors.quinary}
                    handlePress={handleActionModal}
                    customStyle={styles.footerButtom}
                    disabled={items.length === 0}
                  >
                    <AntDesign name="save" size={24} color={colors.secondary} />
                  </CustomHighlightButton>
                </View>
              </>
            )}
          </ScreenContainer>
        )
      }}
    </Formik>
  )
}

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    itemsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
      marginVertical: 10,
      gap: 10
    },
    content: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 3,
      width: '100%'
    },
    header: {
      gap: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerButton: {
      backgroundColor: colors.primary,
      padding: 5
    },
    optionsContainer: {
      padding: 5,
      gap: 5
    },
    option: {
      borderRadius: 3,
      backgroundColor: colors.secondary,
      padding: 8
    },
    bodyContainer: {
      padding: 10,
      gap: 10
    },
    body: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10
    },
    footer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.tertiary,
      alignItems: 'center',
      padding: 12
    },
    footerLeft: {
      flexDirection: 'row',
      gap: 10
    },
    footerButtom: {
      width: 100,
      height: 45
    },
    data: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
    },
    text: {
      fontSize: 20,
      color: colors.text,
      fontFamily: 'RSC-Regular',
      textAlign: 'left',
      flex: 1
    },
    button: {
      width: '100%',
      height: 50
    },
    messageContent: {
      width: '100%',
      backgroundColor: colors.background,
      borderRadius: 3,
      padding: 20
    }
  })

  return styles
}

export default NewBill
