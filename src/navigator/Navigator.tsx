import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/homeScreen';
import {ProfileScreen} from '../screens/profileContact/profileContactScreen';
import {EditScreen} from '../screens/editContact/editContacScreen';
import {AddContactScreen} from '../screens/addContact/addContactScreen';
import LoginScreen from '../screens/login/loginScreen';
import RegisterScreen from '../register/registerScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen" // Define LoginScreen como la pantalla inicial
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileContactScreen" component={ProfileScreen} />
      <Stack.Screen name="EditContactScreen" component={EditScreen} />
      <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
