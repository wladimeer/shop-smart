import Spacer from '../../components/Spacer'
import { Dimensions, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SCREEN_KEYS } from '../../constants/screens'
import { LineChart, PieChart } from 'react-native-chart-kit'
import ScreenContainer from '../../components/ScreenContainer'
import background from '../../assets/principal-background.jpg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { getMonthNumberFromDatetime } from '../../utils/time'
import { getMonthNameFromDatetime } from '../../utils/time'
import { getElementsList } from '../../services/purchase'
import { uniqueColorGenerator } from '../../utils/color'
import { DEFAULT_INSETS } from '../../constants/config'
import CustomText from '../../components/CustomText'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const Statistics = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { width: screenWidth } = Dimensions.get('window')
  const [translate] = useTranslation(SCREEN_KEYS.STATISTICS)
  const [highestQuantityItems, setHighestQuantityItems] = useState([])
  const [quantityThroughTime, setQuantityThroughTime] = useState([])
  const [priceThroughTime, setPriceThroughTime] = useState([])
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()

  const styles = allStyles()

  const pieChartConfig = {
    color: () => colors.denary
  }

  const lineChartConfig = {
    color: () => colors.denary,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    labelColor: () => colors.text,
    decimalPlaces: 0
  }

  const handleLoadCharts = async () => {
    try {
      const data = await getElementsList()

      const groupedByMonth = {}
      const groupedByName = {}

      data.forEach(({ elements, createdAt }) => {
        const monthName = getMonthNameFromDatetime(createdAt)
        const monthNumber = getMonthNumberFromDatetime(createdAt)

        elements.forEach(({ name, quantity, unit }) => {
          groupedByName[name] ??= {
            name,
            quantity: 0,
            unit
          }

          groupedByName[name]['quantity'] += Number(quantity)

          groupedByMonth[monthNumber] ??= {
            monthName,
            monthNumber,
            quantities: 0,
            prices: 0
          }

          groupedByMonth[monthNumber]['quantities'] += Number(quantity)
          groupedByMonth[monthNumber]['prices'] += Number(quantity) * Number(unit)
        })
      })

      const generateColor = uniqueColorGenerator()

      const sortedByQuantity = Object.values(groupedByName).sort((a, b) => {
        const result = a.quantity > b.quantity
        return result ? -1 : !result ? 1 : 0
      })

      const highestQuantityItems = sortedByQuantity.slice(0, 5).map((item) => ({
        name: item.name,
        population: item.quantity,
        legendFontColor: colors.text,
        color: generateColor(),
        legendFontSize: 15
      }))

      setHighestQuantityItems(highestQuantityItems)

      const sortedByDate = Object.values(groupedByMonth).sort((a, b) => {
        const result = a.monthNumber < b.monthNumber
        return result ? -1 : !result ? 1 : 0
      })

      const quantityThroughTime = {
        labels: sortedByDate.map((v) => v.monthName),
        datasets: [
          {
            data: sortedByDate.map((v) => v.quantities),
            color: () => colors.senary,
            strokeWidth: 2
          }
        ],
        legend: [translate('indicators.monthQuantity')]
      }

      setQuantityThroughTime(quantityThroughTime)

      const priceThroughTime = {
        labels: sortedByDate.map((v) => v.monthName),
        datasets: [
          {
            data: sortedByDate.map((v) => v.prices),
            color: () => colors.senary,
            strokeWidth: 2
          }
        ],
        legend: [translate('indicators.monthPrice')]
      }

      setPriceThroughTime(priceThroughTime)

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleLoadCharts()
  }, [])

  return (
    <ScreenContainer background={background} noSafeArea={true}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.chartContainer}>
            <View style={styles.chartTitle}>
              <CustomText
                text={translate('indicators.highestQuantity')}
                color={colors.secondary}
                size={22}
              />
            </View>

            <PieChart
              width={screenWidth - 20}
              data={highestQuantityItems}
              backgroundColor={colors.background}
              chartConfig={pieChartConfig}
              style={styles.chartElement}
              accessor={'population'}
              paddingLeft={-40}
              center={[40, 0]}
              height={220}
            />
          </View>

          <Spacer color="transparent" size={18} />

          <View style={styles.chartContainer}>
            <View style={styles.chartTitle}>
              <CustomText
                text={translate('indicators.quantityThroughTime')}
                color={colors.secondary}
                size={22}
              />
            </View>

            <LineChart
              fromZero={true}
              width={screenWidth - 20}
              data={quantityThroughTime}
              chartConfig={lineChartConfig}
              style={styles.chartElement}
              segments={3}
              height={220}
            />
          </View>

          <Spacer color="transparent" size={18} />

          <View style={styles.chartContainer}>
            <View style={styles.chartTitle}>
              <CustomText
                text={translate('indicators.priceThroughTime')}
                color={colors.secondary}
                size={22}
              />
            </View>

            <LineChart
              fromZero={true}
              width={screenWidth - 20}
              data={priceThroughTime}
              chartConfig={lineChartConfig}
              style={styles.chartElement}
              segments={3}
              height={220}
            />
          </View>

          <Spacer color={colors.primary} size={insets.bottom || DEFAULT_INSETS.BOTTOM} />
        </ScrollView>
      )}
    </ScreenContainer>
  )
}

const allStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    chartContainer: {
      alignItems: 'center',
      marginHorizontal: 8,
      marginTop: 5,
      gap: 10
    },
    chartTitle: {
      alignSelf: 'flex-start'
    },
    chartElement: {
      borderRadius: 3
    }
  })

  return styles
}

export default Statistics
