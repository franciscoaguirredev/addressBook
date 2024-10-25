import {createStackNavigator} from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/homeScreen';
import { ProfileScreen } from '../screens/profileContact/profleContactScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileContactScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
