import { Pressable, Text, StyleSheet } from 'react-native'

const CustomButton = ({ text, children, handlePress }) => {
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>{text}</Text>
      {children && children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 382,
    alignItems: 'center',
    backgroundColor: '#154360',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 22,
    display: 'flex',
    height: 72,
    gap: 12
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'RSC-Regular',
    fontSize: 32
  }
})

export default CustomButton
