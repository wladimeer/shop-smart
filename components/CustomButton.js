import { Pressable, Text, StyleSheet } from 'react-native'

const CustomButton = ({ text, handlePress }) => {
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 397,
    alignItems: 'center',
    backgroundColor: '#154360',
    justifyContent: 'center',
    borderRadius: 22,
    display: 'flex',
    height: 76
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'RSC-Regular'
  }
})

export default CustomButton