import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { Screen } from './screen.types'

type ScreenOptions = Partial<Record<Screen, NativeStackNavigationOptions>>

export default ScreenOptions
