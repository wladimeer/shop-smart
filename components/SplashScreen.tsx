import { StyleSheet, Text, View, StatusBar } from 'react-native'

const SplashScreen = () => {
  return (
    <>
      <StatusBar backgroundColor="#070513" barStyle="light-content" translucent={true} />

      <View style={styles.container}>
        <Text style={styles.text}>nuvli</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#070513',
    alignItems: 'center'
  },
  text: {
    fontSize: 95,
    fontFamily: 'RSC-Regular',
    textAlign: 'center',
    color: '#FFFFFF'
  }
})

export default SplashScreen
