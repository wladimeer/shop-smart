import { useTranslation } from 'react-i18next'
import { COUNTRIES } from '../../constants/locales'
import { formatCurrency } from '../../utils/purchase'
import { useEffect, useRef, useState } from 'react'
import { SCREEN_KEYS } from '../../constants/screens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import CustomHighlightButton from '../../components/CustomHighlightButton'
import { getElementsList, removeElementList } from '../../services/purchase'
import { formatToText, formatToDate, fromUntilNow } from '../../utils/time'
import useFadeExpandAnimation from '../../hooks/useFadeExpandAnimation'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import ScreenContainer from '../../components/ScreenContainer'
import { DEFAULT_INSETS } from '../../constants/config'
import useActionModal from '../../hooks/useActionModal'
import ActionModal from '../../components/ActionModal'
import CustomText from '../../components/CustomText'
import { useTheme } from '@react-navigation/native'
import { isTodayDatetime } from '../../utils/time'
import Spacer from '../../components/Spacer'

const ViewPurchases = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [translate] = useTranslation(SCREEN_KEYS.VIEW_PURCHASES)
  const { actionModal, setActionModal, resetActionModal } = useActionModal()
  const [elementsList, setElementsList] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const swipeablesRef = useRef([])
  const { colors } = useTheme()

  const animations = useFadeExpandAnimation({ isVisible: !!selectedId })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animations.fadeOpacity.value,
    height: animations.expandHeight.value
  }))

  const styles = allStyles({ colors })

  const handleReuseElementList = (item) => {
    swipeablesRef.current.forEach((ref) => {
      if (ref) ref.close()
    })

    resetActionModal()

    navigation.replace(SCREEN_KEYS.NEW_PURCHASE, {
      elementsList: item.elements
    })
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

      const flatData = Object.values(groupedData).flatMap((section, index) => [
        { type: 'header', title: section.title, id: `header-${index}` },
        ...section.data.map((item) => ({ ...item, type: 'item' }))
      ])

      setElementsList(flatData)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleLoadElementsList()
  }, [])

  const HeaderItem = ({ item }) => (
    <View style={styles.headerSection}>
      <CustomText text={item.title} color={colors.secondary} />
    </View>
  )

  const SwipeableItem = ({ item }) => (
    <Swipeable
      ref={(ref) => swipeablesRef.current.push(ref)}
      renderRightActions={() =>
        selectedId !== item.id && (
          <>
            <CustomHighlightButton
              handlePress={() => {
                setActionModal({
                  visible: true,
                  title: translate('modals.reuseList.title'),
                  message: translate('modals.reuseList.message'),
                  action: () => handleReuseElementList(item),
                  confirm: translate('modals.reuseList.buttons.confirm'),
                  cancel: translate('modals.reuseList.buttons.cancel')
                })
              }}
              customStyle={styles.rightContent}
              backgroundColor={colors.nonary}
            >
              <MaterialCommunityIcons name="cart-arrow-up" color={colors.secondary} size={24} />
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
              <MaterialCommunityIcons name="cart-remove" color={colors.secondary} size={24} />
            </CustomHighlightButton>
          </>
        )
      }
    >
      <View style={styles.box}>
        <View style={styles.boxContent}>
          <View style={styles.leftSideItem}>
            <CustomText
              text={`${translate('indicators.total')}: ${formatCurrency({
                value: item.total,
                country: COUNTRIES.CL.code
              })}`}
              color={colors.text}
              size={22}
            />
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
      </View>

      {selectedId === item.id &&
        item.elements.map((item, index) => (
          <Reanimated.View key={index} style={[styles.content, animatedStyle]}>
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
                  <CustomText text={`${translate('fields.quantity')}:`} color={colors.text} />
                  <CustomText text={item.quantity} color={colors.text} />
                </View>

                <View style={styles.data}>
                  <CustomText text={`${translate('fields.total')}:`} color={colors.text} />
                  <CustomText text={item.total} color={colors.text} />
                </View>
              </View>
            </View>
          </Reanimated.View>
        ))}
    </Swipeable>
  )

  const ListEmpty = () => (
    <View style={styles.messageContent}>
      <CustomText text={translate('indicators.noData')} color={colors.text} />
    </View>
  )

  return (
    <ScreenContainer noSafeArea={true}>
      <ActionModal {...{ actionModal, resetActionModal }} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Reanimated.FlatList
          data={elementsList}
          renderItem={({ item, index }) => {
            if (item.type === 'header') {
              const isFirstItem = index === 0

              return (
                <>
                  {!isFirstItem && <Spacer color={colors.primary} size={25} />}
                  <HeaderItem item={item} />
                </>
              )
            }

            if (item.type === 'item') {
              const isLastItem = index === elementsList.length - 1
              const size = insets.bottom || DEFAULT_INSETS.BOTTOM

              return (
                <>
                  <SwipeableItem item={item} />
                  {isLastItem && <Spacer color={colors.primary} size={size} />}
                </>
              )
            }
          }}
          ItemSeparatorComponent={<Spacer color={colors.primary} size={10} />}
          contentContainerStyle={styles.itemsContainer}
          ListEmptyComponent={<ListEmpty />}
          keyExtractor={(item) => item.id}
          style={styles.container}
        />
      )}
    </ScreenContainer>
  )
}

const allStyles = ({ colors }) => {
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
      alignItems: 'center',
      gap: 5
    },
    leftSideItem: {
      flex: 3,
      flexDirection: 'row'
    },
    content: {
      flex: 1,
      marginTop: 5,
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
      marginVertical: 5,
      borderRadius: 3,
      padding: 20
    }
  })

  return styles
}

export default ViewPurchases
