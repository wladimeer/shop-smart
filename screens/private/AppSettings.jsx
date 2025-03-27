import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SCREEN_KEYS } from '../../constants/screens'
import background from '../../assets/principal-background.jpg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import useFadeExpandAnimation from '../../hooks/useFadeExpandAnimation'
import ScreenContainer from '../../components/ScreenContainer'
import { TouchableOpacity, TextInput } from 'react-native'
import { DEFAULT_INSETS } from '../../constants/config'
import CustomText from '../../components/CustomText'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from '@react-navigation/native'
import { useLanguageStore } from 'store/language'
import { FIELDS } from '../../constants/forms'
import Spacer from '../../components/Spacer'
import { Formik } from 'formik'

const AppSettings = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [translate] = useTranslation(SCREEN_KEYS.APP_SETTINGS)
  const [currentLanguage, setCurrentLanguage] = useState({})
  const [filteredOptions, setFilteredOptions] = useState([])
  const { language, setLanguage } = useLanguageStore()
  const [languageList, setLanguageList] = useState([])
  const [loading, setLoading] = useState(true)
  const { i18n } = useTranslation()
  const { colors } = useTheme()

  const animations = useFadeExpandAnimation({
    isVisible: filteredOptions.length > 0,
    expandedHeight: 100
  })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animations.fadeOpacity.value,
    height: animations.expandHeight.value
  }))

  const styles = allStyles({ colors })

  const handleOptionPress = (field, code) => {
    if (field === FIELDS.LANGUAGE) {
      i18n.changeLanguage(code)
      setLanguage(code)
    }
  }

  const handleChangeLanguage = () => {
    setCurrentLanguage({})
    setFilteredOptions([])
    handleLoadSettings()
  }

  const handleLoadSettings = async () => {
    try {
      const languages = translate('data.languages', { returnObjects: true })
      const currentLanguage = languages.find(({ code }) => code === language)

      setCurrentLanguage(currentLanguage)
      setLanguageList(languages)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(handleChangeLanguage, [language])

  useEffect(() => {
    handleLoadSettings()
  }, [])

  const initialValues = { language: '' }

  return (
    <ScreenContainer background={background} noSafeArea={true}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView style={styles.container}>
          <Formik initialValues={initialValues}>
            {({ setFieldValue, resetForm, values }) => {
              const handleUpdateItem = (fieldKey, value) => {
                if (fieldKey === FIELDS.LANGUAGE) {
                  if (value.length > 0) {
                    const filtered = languageList.filter((option) => {
                      const { name } = option

                      const newName = name.toLowerCase()
                      const newValue = value.toLowerCase()

                      if (newName.startsWith(newValue)) return option
                    })

                    if (filtered.length > 5) filtered.splice(5)

                    setFilteredOptions(filtered)
                  } else {
                    setFilteredOptions([])
                  }
                }

                setFieldValue(fieldKey, value)
              }

              useEffect(resetForm, [language])

              return (
                <View style={styles.configContainer}>
                  <CustomText text={translate('fields.language')} size={22} />

                  <View style={styles.header}>
                    <View style={styles.headerInput}>
                      <TextInput
                        onChangeText={(value) => handleUpdateItem(FIELDS.LANGUAGE, value)}
                        placeholder={translate('placeholders.language')}
                        placeholderTextColor={colors.placeholder}
                        value={values.language}
                        style={styles.input}
                      />
                    </View>

                    <Spacer />

                    {filteredOptions.length === 0 ? (
                      <View style={styles.content}>
                        <View style={styles.defaultOption}>
                          <CustomText text={currentLanguage.name} color={colors.text} />
                          <AntDesign name="check" size={24} color={colors.nonary} />
                        </View>
                      </View>
                    ) : (
                      <Reanimated.View style={[animatedStyle]}>
                        <View style={styles.content}>
                          {filteredOptions.map(({ name, code }, index) => (
                            <TouchableOpacity
                              onPress={() => handleOptionPress(FIELDS.LANGUAGE, code)}
                              style={styles.option}
                              key={index}
                            >
                              <CustomText text={name} color={colors.text} align="left" />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </Reanimated.View>
                    )}
                  </View>
                </View>
              )
            }}
          </Formik>

          <Spacer color={colors.primary} size={insets.bottom || DEFAULT_INSETS.BOTTOM} />
        </ScrollView>
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
    configContainer: {
      alignItems: 'flex-start',
      marginHorizontal: 8,
      marginTop: 5,
      gap: 10
    },
    header: {
      backgroundColor: colors.background,
      borderRadius: 3,
      width: '100%'
    },
    headerInput: {
      padding: 5
    },
    input: {
      fontSize: 20,
      color: colors.text,
      fontFamily: 'RSC-Regular',
      textAlign: 'left',
      padding: 5
    },
    content: {
      padding: 5,
      gap: 5
    },
    option: {
      borderRadius: 3,
      backgroundColor: colors.secondary,
      padding: 8
    },
    defaultOption: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      borderRadius: 3,
      padding: 8
    }
  })

  return styles
}

export default AppSettings
