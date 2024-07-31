import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatToCLP } from '../../utils/purchase'
import background from '../../assets/principal-background.jpg'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import { getElementsList } from '../../services/purchase'
import CustomText from '../../components/CustomText'
import { useTheme } from '@react-navigation/native'
import { formatToText } from '../../utils/time'
import { Feather } from '@expo/vector-icons'
import Spacer from '../../components/Spacer'
import { Animated } from 'react-native'

const ViewPurchases = () => {
  const [translate] = useTranslation(VIEW_PURCHASES_SCREEN_KEY)
  const [elementsList, setElementsList] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()

  const fadeAnimation = new Animated.Value(0)
  const expandHeight = new Animated.Value(0)

  const animations = { fadeAnimation, expandHeight }

  const styles = allStyles({ colors, animations })

  const toggleExpand = () => {
    const configFade = {
      toValue: selectedId ? 1 : 0,
      useNativeDriver: false,
      duration: 500
    }

    Animated.timing(fadeAnimation, configFade).start()

    const configExpand = {
      toValue: selectedId ? 166 : 0,
      useNativeDriver: false,
      duration: 150
    }

    Animated.spring(expandHeight, configExpand).start()
  }

  const loadElementsList = async () => {
    try {
      const data = await getElementsList()
      setElementsList(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(toggleExpand, [selectedId])

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
          style={styles.container}
          contentContainerStyle={styles.itemsContainer}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Animated.View style={styles.box}>
                <View style={styles.boxContent}>
                  <View style={styles.leftSideItem}>
                    <CustomText
                      text={`${translate('indicators.total')}:`}
                      color={colors.text}
                      size={22}
                    />
                    <CustomText text={formatToCLP(item.total)} color={colors.text} size={22} />
                  </View>

                  <CustomHighlightButton
                    handlePress={() => setSelectedId(selectedId === item.id ? null : item.id)}
                    backgroundColor={colors.quinary}
                  >
                    {selectedId === item.id ? (
                      <Feather name="eye" size={24} color={colors.secondary} />
                    ) : (
                      <Feather name="eye-off" size={24} color={colors.octonary} />
                    )}
                  </CustomHighlightButton>
                </View>

                <View style={styles.boxContent}>
                  <CustomText text={formatToText(item.createdAt)} color={colors.text} />
                </View>
              </Animated.View>

              {selectedId === item.id &&
                item.elements.map((item, index) => (
                  <Animated.View key={index} style={styles.content}>
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
                          <CustomText text={`${translate('fields.total')}:`} color={colors.text} />
                          <CustomText text={item.total} color={colors.text} />
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                ))}
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.messageContent}>
              <CustomText text={translate('indicators.noData')} color={colors.text} />
            </View>
          }
          keyExtractor={(item) => item.id}
        />
      )}
    </ScreenContainer>
  )
}

const allStyles = ({ colors, animations }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    itemsContainer: {
      paddingHorizontal: 8,
      paddingVertical: 10,
      gap: 10
    },
    box: {
      flex: 1,
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
      flexDirection: 'column',
      alignItems: 'flex-end',
      borderRadius: 3,
      gap: 10
    },
    boxContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    leftSideItem: {
      flex: 3,
      flexDirection: 'row'
    },
    content: {
      flex: 1,
      marginTop: 5,
      backgroundColor: colors.background,
      height: animations.expandHeight,
      opacity: animations.fadeAnimation.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0.5, 1]
      }),
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
