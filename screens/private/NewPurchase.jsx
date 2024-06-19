import { formatToCLP } from '../../utils/purchase'
import { Fontisto, AntDesign } from '@expo/vector-icons'
import { TouchableOpacity, TextInput } from 'react-native'
import background from '../../assets/principal-background.jpg'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { setCartElements, getCartElements } from '../../services/purchase'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import { getTotal, convertItem } from '../../utils/purchase'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Spacer from '../../components/Spacer'
import { Formik, FieldArray } from 'formik'

const NewPurchase = () => {
  const [translate] = useTranslation(NEW_PURCHASE_SCREEN_KEY)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const scrollViewRef = useRef(null)
  const { colors } = useTheme()

  const styles = allStyles({ colors })

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }

  const saveItems = async (values) => {
    try {
      const data = await setCartElements(values)
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  const loadItems = async () => {
    try {
      const data = await getCartElements()
      setItems(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const initialValues = { items }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values }) => {
        useEffect(() => {
          if (!loading) {
            saveItems(values.items)
          }
        }, [values])

        const handleNewItem = (insertItem) => {
          const item = { name: '', unit: 0, quantity: 0, total: 0 }
          insertItem(values.items.length + 1, item)

          setTimeout(() => {
            scrollToEnd()
          }, 500)
        }

        const handleUpdateItem = (key, index, value) => {
          const item = values.items[index]

          if (key === 'name') {
            item[key] = value
          }

          if (key === 'unit') {
            item[key] = value
            item.total = item.quantity * item.unit
          }

          if (key === 'quantity') {
            item[key] = value
            item.total = item.quantity * item.unit
          }

          setFieldValue(`items[${index}]`, convertItem(item))
          saveItems(values.items)
        }

        const handleDeleteItem = (index, removeItem) => {
          removeItem(index)
        }

        const handleIncreaseQuantity = (index) => {
          const item = values.items[index]

          item.quantity++
          item.total = item.quantity * item.unit

          setFieldValue(`items[${index}]`, convertItem(item))
          saveItems(values.items)
        }

        const handleDecreaseQuantity = (index, removeItem) => {
          const item = values.items[index]

          if (item.quantity > 0) {
            item.quantity--
            item.total = item.quantity * item.unit

            setFieldValue(`items[${index}]`, convertItem(item))
            saveItems(values.items)
          } else {
            removeItem(index)
          }
        }

        return (
          <ScreenContainer background={background} withSafeArea={false}>
            <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
              <FieldArray
                name="items"
                render={({ insert, remove }) => (
                  <View style={styles.container}>
                    {values.items.length > 0 ? (
                      values.items.map((item, index) => (
                        <View key={index} style={styles.content}>
                          <View style={styles.header}>
                            <TextInput
                              style={{ ...styles.text, width: 300 }}
                              onChangeText={(value) => handleUpdateItem('name', index, value)}
                              placeholder={translate('placeholders.name')}
                              placeholderTextColor={colors.placeholder}
                              value={item.name}
                            />

                            <TouchableOpacity
                              style={styles.headerButton}
                              onPress={() => handleDeleteItem(index, remove)}
                            >
                              <Fontisto name="close-a" color="#EC4C4C" size={20} />
                            </TouchableOpacity>
                          </View>

                          <Spacer />

                          <View style={styles.body}>
                            <View style={{ gap: 10 }}>
                              <View style={styles.data}>
                                <Text style={{ ...styles.text, color: colors.text }}>
                                  {translate('fields.unit')}: $
                                </Text>

                                <TextInput
                                  style={{ ...styles.text, ...styles.label }}
                                  onChangeText={(value) => handleUpdateItem('unit', index, value)}
                                  placeholder={translate('placeholders.unit')}
                                  placeholderTextColor={colors.placeholder}
                                  keyboardType="numeric"
                                  value={item.unit}
                                />
                              </View>

                              <View style={styles.data}>
                                <Text style={{ ...styles.text, color: colors.text }}>
                                  {translate('fields.quantity')}:
                                </Text>

                                <TextInput
                                  style={{ ...styles.text, ...styles.label }}
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
                                <Text style={{ ...styles.text, color: colors.text }}>
                                  {translate('fields.total')}:
                                </Text>

                                <Text style={{ ...styles.text, ...styles.label }}>
                                  ${formatToCLP(item.total)}
                                </Text>
                              </View>
                            </View>

                            <View style={styles.actions}>
                              <CustomHighlightButton
                                handlePress={() => handleIncreaseQuantity(index)}
                                text={translate('buttons.increase')}
                              />

                              <CustomHighlightButton
                                handlePress={() => handleDecreaseQuantity(index, remove)}
                                text={translate('buttons.decrease')}
                              />
                            </View>
                          </View>
                        </View>
                      ))
                    ) : (
                      <View style={styles.messageContent}>
                        <Text style={styles.message}>{translate('noData')}</Text>
                      </View>
                    )}

                    <CustomHighlightButton
                      customStyle={{ ...styles.button }}
                      handlePress={() => handleNewItem(insert)}
                    >
                      <AntDesign name="plus" size={24} color={colors.secondary} />
                    </CustomHighlightButton>
                  </View>
                )}
              />
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <Text style={{ ...styles.text, ...styles.footerText }}>
                  {translate('fields.total')}:
                </Text>

                <Text style={{ ...styles.text, color: colors.secondary, fontSize: 32 }}>
                  $ {formatToCLP(getTotal(values.items))}
                </Text>
              </View>
            </View>
          </ScreenContainer>
        )
      }}
    </Formik>
  )
}

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
      gap: 10
    },
    content: {
      width: '100%',
      backgroundColor: colors.background,
      borderRadius: 3,
      height: 170
    },
    header: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex'
    },
    headerButton: {
      backgroundColor: colors.primary,
      padding: 5
    },
    body: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10
    },
    footer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.tertiary,
      alignItems: 'center',
      padding: 16,
      height: 76
    },
    footerLeft: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    },
    footerText: {
      color: colors.secondary,
      fontSize: 32
    },
    data: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      gap: 8
    },
    text: {
      fontSize: 20,
      fontFamily: 'RSC-Regular',
      textAlign: 'left'
    },
    label: {
      color: colors.text,
      textAlign: 'left',
      width: 200
    },
    button: {
      width: '100%',
      borderRadius: 3,
      height: 50
    },
    messageContent: {
      width: '100%',
      backgroundColor: colors.background,
      borderRadius: 3,
      padding: 20
    },
    message: {
      color: colors.text,
      fontFamily: 'RSC-Regular',
      textAlign: 'center',
      fontSize: 20
    }
  })

  return styles
}

export default NewPurchase
