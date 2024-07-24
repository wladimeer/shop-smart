import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import background from '../../assets/principal-background.jpg'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import { getElementsList } from '../../services/purchase'
import CustomText from '../../components/CustomText'
import { useTheme } from '@react-navigation/native'
import Spacer from '../../components/Spacer'

const ViewPurchases = () => {
  const [translate] = useTranslation(VIEW_PURCHASES_SCREEN_KEY)
  const [elementsList, setElementsList] = useState([])
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()

  const styles = allStyles({ colors })

  const loadElementsList = async () => {
    try {
      const data = await getElementsList()
      setElementsList(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadElementsList()
  }, [])

  return (
    <ScreenContainer background={background} colorSafeArea={colors.tertiary}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={elementsList}
          style={styles.flatList}
          renderItem={({ item }) => (
            <View style={styles.container}>
              {elementsList.length > 0 ? (
                <>
                  <CustomText text={item.createdAt} />

                  {item.elements.map((item, index) => (
                    <View key={index} style={styles.content}>
                      <View style={styles.header}>
                        <CustomText text={item.name} color={colors.text} />
                      </View>

                      <Spacer />

                      <View style={styles.body}>
                        <View style={styles.values}>
                          <View style={styles.data}>
                            <CustomText text={`${translate('fields.unit')}:`} color={colors.text} />

                            <CustomText text={item.unit} color={colors.text} />
                          </View>

                          <View style={styles.data}>
                            <CustomText
                              text={`${translate('fields.quantity')}:`}
                              color={colors.text}
                            />

                            <CustomText text={item.quantity} color={colors.text} />
                          </View>

                          <View style={styles.data}>
                            <CustomText
                              text={`${translate('fields.total')}:`}
                              color={colors.text}
                            />

                            <CustomText text={item.total} color={colors.text} />
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              ) : (
                <View style={styles.messageContent}>
                  <CustomText text={translate('indicators.noData')} color={colors.text} />
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScreenContainer>
  )
}

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    flatList: {
      flex: 1,
      width: '100%'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
      marginVertical: 10,
      gap: 8
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
      alignItems: 'center',
      display: 'flex'
    },
    body: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10
    },
    data: {
      flex: 1,
      flexDirection: 'row',
      gap: 10
    },
    values: {
      flex: 4,
      gap: 10
    },
    text: {
      fontSize: 20,
      color: colors.text,
      fontFamily: 'RSC-Regular',
      textAlign: 'left',
      flex: 1
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

export default ViewPurchases
