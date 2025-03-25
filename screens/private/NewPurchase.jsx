import { COUNTRIES } from '../../constants/locales'
import CustomText from '../../components/CustomText'
import { formatCurrency } from '../../utils/purchase'
import { Fontisto, AntDesign } from '@expo/vector-icons'
import { View, ScrollView, StyleSheet } from 'react-native'
import background from '../../assets/principal-background.jpg'
import { TouchableOpacity, TextInput, Platform } from 'react-native'
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { setCartElements, getCartElements } from '../../services/purchase'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import ScreenContainer from '../../components/ScreenContainer'
import { getTotal, convertItem } from '../../utils/purchase'
import { setElementsList } from '../../services/purchase'
import { removeDiacritics } from '../../utils/purchase'
import useActionModal from '../../hooks/useActionModal'
import ActionModal from '../../components/ActionModal'
import { SCREEN_KEYS } from '../../constants/screens'
import { LIMIT_VALUES } from '../../constants/datas'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Spacer from '../../components/Spacer'
import { Formik, FieldArray } from 'formik'
import * as Yup from 'yup'

const NewPurchase = ({ navigation, route: { params = {} } }) => {
  const { elementsList = [] } = params
  const [translate] = useTranslation(SCREEN_KEYS.NEW_PURCHASE)
  const { actionModal, setActionModal, resetActionModal } = useActionModal()
  const [focusedItemIndex, setFocusedItemIndex] = useState(null)
  const [filteredOptions, setFilteredOptions] = useState([])
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
        unit: Yup.number().required(translate('form.required.unit')),
        quantity: Yup.number().required(translate('form.required.quantity'))
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
      const response = await setElementsList(items)

      if (response) {
        resetActionModal()
        handleSaveItems([])
        navigation.replace(SCREEN_KEYS.VIEW_PURCHASES)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveItems = async (values) => {
    try {
      const data = await setCartElements(values)
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoadItems = async () => {
    try {
      let data = []

      if (elementsList.length === 0) {
        data = await getCartElements()
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
    const list = translate('data.products', { returnObjects: true })
    setOptions(list)
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
          const item = { name: '', unit: 0, quantity: '1', total: 0 }
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

          if (key === 'unit' && value <= LIMIT_VALUES.UNIT) {
            item[key] = value
            item.total = item.quantity * item.unit
          }

          if (key === 'quantity' && value <= LIMIT_VALUES.QUANTITY) {
            item[key] = value
            item.total = item.quantity * item.unit
          }

          setFieldValue(`items[${index}]`, convertItem(item))
          handleSaveItems(values.items)
        }

        const handleDeleteItem = (index, removeItem) => {
          removeItem(index)
        }

        const handleIncreaseQuantity = (index) => {
          const item = values.items[index]

          if (item.quantity < LIMIT_VALUES.QUANTITY) {
            item.quantity++
            item.total = item.quantity * item.unit

            setFieldValue(`items[${index}]`, convertItem(item))
            handleSaveItems(values.items)
          }
        }

        const handleDecreaseQuantity = (index) => {
          const item = values.items[index]

          if (item.quantity > 1) {
            item.quantity--
            item.total = item.quantity * item.unit

            setFieldValue(`items[${index}]`, convertItem(item))
            handleSaveItems(values.items)
          }
        }

        const handleOnFocusName = (index) => {
          setFocusedItemIndex(index)
          setFilteredOptions([])
        }

        const handleOptionPress = (index, value) => {
          const item = values.items[index]

          item['name'] = value

          setFieldValue(`items[${index}]`, convertItem(item))
          handleSaveItems(values.items)
          setFilteredOptions([])
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
                                            text={`${translate('fields.unit')}:`}
                                            color={colors.text}
                                            align="left"
                                          />

                                          <TextInput
                                            style={styles.text}
                                            onChangeText={(value) =>
                                              handleUpdateItem('unit', index, value)
                                            }
                                            placeholder={translate('placeholders.unit')}
                                            placeholderTextColor={colors.placeholder}
                                            keyboardType="numeric"
                                            value={item.unit}
                                          />
                                        </View>

                                        <View style={styles.data}>
                                          <CustomText
                                            text={`${translate('fields.quantity')}:`}
                                            color={colors.text}
                                            align="left"
                                          />

                                          <TextInput
                                            style={styles.text}
                                            onChangeText={(value) =>
                                              handleUpdateItem('quantity', index, value)
                                            }
                                            placeholder={translate('placeholders.quantity')}
                                            placeholderTextColor={colors.placeholder}
                                            keyboardType="numeric"
                                            value={item.quantity}
                                          />
                                        </View>

                                        <View style={styles.data}>
                                          <CustomText
                                            text={`${translate('fields.total')}:`}
                                            color={colors.text}
                                            align="left"
                                          />

                                          <CustomText
                                            text={formatCurrency({
                                              value: item.total,
                                              country: COUNTRIES.CL.code
                                            })}
                                            color={colors.text}
                                          />
                                        </View>
                                      </View>

                                      <View style={styles.actions}>
                                        <CustomHighlightButton
                                          backgroundColor={colors.senary}
                                          handlePress={() => handleDecreaseQuantity(index)}
                                          customStyle={{ flex: 1 }}
                                        >
                                          <AntDesign
                                            name="minus"
                                            size={24}
                                            color={colors.secondary}
                                          />
                                        </CustomHighlightButton>

                                        <CustomHighlightButton
                                          backgroundColor={colors.quinary}
                                          handlePress={() => handleIncreaseQuantity(index)}
                                          customStyle={{ flex: 1 }}
                                        >
                                          <AntDesign
                                            name="plus"
                                            size={24}
                                            color={colors.secondary}
                                          />
                                        </CustomHighlightButton>
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
                      text={formatCurrency({
                        value: getTotal(values.items),
                        country: COUNTRIES.CL.code
                      })}
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
    values: {
      alignItems: 'flex-start',
      gap: 10
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8
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

export default NewPurchase
