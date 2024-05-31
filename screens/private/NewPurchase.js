import { useEffect, useState } from 'react'
import { Fontisto } from '@expo/vector-icons'
import { TouchableOpacity, TextInput } from 'react-native'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { setCartElements, getCartElements } from '../../services/purchase'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import { useTranslation } from 'react-i18next'
import Spacer from '../../components/Spacer'
import { Formik, FieldArray } from 'formik'

const NewPurchase = () => {
  const [translate] = useTranslation(NEW_PURCHASE_SCREEN_KEY)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  const convertItem = (item) => {
    const keys = Object.keys(item)

    keys.forEach((key) => {
      item[key] = String(item[key])
    })

    return item
  }

  const saveItems = async (items) => {
    try {
      await setCartElements(items)
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
          <ScrollView style={{ flex: 1 }}>
            <FieldArray
              name="items"
              render={({ insert, remove }) => (
                <View style={styles.container}>
                  {values.items.length > 0 ? (
                    values.items.map((item, index) => (
                      <View key={index} style={styles.content}>
                        <View style={styles.header}>
                          <TextInput
                            style={styles.text}
                            onChangeText={(value) => handleUpdateItem('name', index, value)}
                            placeholder={translate('placeholders.name')}
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
                              <Text style={{ ...styles.text, color: '#1B4F72' }}>
                                {translate('fields.unit')}: $
                              </Text>

                              <TextInput
                                style={{ ...styles.text, ...styles.label }}
                                onChangeText={(value) => handleUpdateItem('unit', index, value)}
                                placeholder={translate('placeholders.unit')}
                                keyboardType="numeric"
                                value={item.unit}
                              />
                            </View>

                            <View style={styles.data}>
                              <Text style={{ ...styles.text, color: '#1B4F72' }}>
                                {translate('fields.quantity')}:
                              </Text>

                              <TextInput
                                style={{ ...styles.text, ...styles.label }}
                                onChangeText={(value) => handleUpdateItem('quantity', index, value)}
                                placeholder={translate('placeholders.quantity')}
                                keyboardType="numeric"
                                value={item.quantity}
                              />
                            </View>

                            <View style={styles.data}>
                              <Text style={{ ...styles.text, color: '#1B4F72' }}>
                                {translate('fields.total')}: $
                              </Text>

                              <TextInput
                                style={{ ...styles.text, ...styles.label }}
                                placeholder={translate('placeholders.total')}
                                keyboardType="numeric"
                                value={item.total}
                                readOnly
                              />
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
                    <Text style={{ ...styles.container, ...styles.text }}>
                      {translate('noData')}
                    </Text>
                  )}

                  <CustomHighlightButton
                    customStyle={{ ...styles.button }}
                    handlePress={() => handleNewItem(insert)}
                    text="Agregar icono"
                  />
                </View>
              )}
            />
          </ScrollView>
        )
      }}
    </Formik>
  )
}

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
    backgroundColor: '#D6EAF8',
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
    backgroundColor: 'transparent',
    padding: 5
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
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
    textAlign: 'center'
  },
  label: {
    color: '#1B4F72',
    textAlign: 'left',
    width: 100
  },
  button: {
    width: '100%',
    borderRadius: 3,
    height: 50
  }
})

export default NewPurchase
