import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatToCLP } from '../../utils/purchase'
import { PAID_VARIANT } from '../../constants/config'
import { Swipeable } from 'react-native-gesture-handler'
import background from '../../assets/principal-background.jpg'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import { SectionList, View, StyleSheet, ActivityIndicator } from 'react-native'
import { getElementsList, removeElementList } from '../../services/purchase'
import { formatToText, formatToDate, fromUntilNow } from '../../utils/time'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import useActionModal from '../../hooks/useActionModal'
import ActionModal from '../../components/ActionModal'
import CustomText from '../../components/CustomText'
import { useTheme } from '@react-navigation/native'
import { isTodayDatetime } from '../../utils/time'
import Spacer from '../../components/Spacer'
import { Animated } from 'react-native'
import Constants from 'expo-constants'

const ViewPurchases = ({ navigation }) => {
  const { appVariant } = Constants.expoConfig.extra
  const [translate] = useTranslation(VIEW_PURCHASES_SCREEN_KEY)
  const { actionModal, setActionModal, resetActionModal } = useActionModal()
  const [elementsList, setElementsList] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()

  const isPaidVariant = appVariant === PAID_VARIANT

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

  const handleRemoveElementList = async (elementListId) => {
    resetActionModal()
    await removeElementList(elementListId)
    handleLoadElementsList()
  }

  const handleLoadElementsList = async () => {
    try {
      const data = await getElementsList()
      const groupedData = {}

      data.forEach((item) => {
        const sectionId = formatToDate(item.createdAt)

        let title = translate('indicators.time.today')

        if (!isTodayDatetime(item.createdAt)) {
          title = fromUntilNow(item.createdAt)
        }

        groupedData[sectionId] ??= {}
        groupedData[sectionId].title ??= title
        groupedData[sectionId].data ??= []
        groupedData[sectionId].data.push(item)
      })

      setElementsList(Object.values(groupedData))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(toggleExpand, [selectedId])

  useEffect(() => {
    handleLoadElementsList()
  }, [])

  return (
    <ScreenContainer background={background} colorSafeArea={colors.primary}>
      <ActionModal {...{ actionModal, resetActionModal }} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <SectionList
          sections={elementsList}
          stickyHeaderHiddenOnScroll={true}
          stickySectionHeadersEnabled={true}
          SectionSeparatorComponent={({ trailingSection, leadingItem, trailingItem }) => (
            <>
              <Spacer color="transparent" size={leadingItem && trailingSection ? 25 : 0} />
              <Spacer color="transparent" size={trailingItem ? 10 : 0} />
            </>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.headerSection}>
              <CustomText text={section.title} color={colors.secondary} />
            </View>
          )}
          ItemSeparatorComponent={({ trailingItem }) => (
            <Spacer color="transparent" size={trailingItem ? 10 : 0} />
          )}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() =>
                selectedId !== item.id && (
                  <>
                    <CustomHighlightButton
                      handlePress={() => {
                        navigation.navigate(NEW_PURCHASE_SCREEN_KEY, {
                          elementsList: item.elements
                        })
                      }}
                      customStyle={styles.rightContent}
                      backgroundColor={colors.nonary}
                    >
                      <MaterialCommunityIcons
                        name="cart-arrow-up"
                        color={colors.secondary}
                        size={24}
                      />
                    </CustomHighlightButton>

                    <CustomHighlightButton
                      handlePress={() => {
                        setActionModal({
                          visible: true,
                          title: translate('modals.removeList.title'),
                          message: translate('modals.removeList.message'),
                          action: () => handleRemoveElementList(item.id),
                          confirm: translate('modals.removeList.buttons.confirm'),
                          cancel: translate('modals.removeList.buttons.cancel')
                        })
                      }}
                      customStyle={styles.rightContent}
                      backgroundColor={colors.septenary}
                    >
                      <MaterialCommunityIcons
                        name="cart-remove"
                        color={colors.secondary}
                        size={24}
                      />
                    </CustomHighlightButton>
                  </>
                )
              }
            >
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
            </Swipeable>
          )}
          ListEmptyComponent={
            <View style={styles.messageContent}>
              <CustomText text={translate('indicators.noData')} color={colors.text} />
            </View>
          }
          contentContainerStyle={styles.itemsContainer}
          keyExtractor={(item) => item.id}
          style={styles.container}
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
    headerSection: {
      marginVertical: 5,
      alignSelf: 'center',
      backgroundColor: '#353131',
      paddingHorizontal: 10,
      borderRadius: 3
    },
    itemsContainer: {
      paddingBottom: 10,
      paddingHorizontal: 8,
      paddingTop: 5
    },
    rightContent: {
      marginLeft: 10,
      height: '100%'
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
      marginVertical: 5,
      borderRadius: 3,
      padding: 20
    }
  })

  return styles
}

export default ViewPurchases
