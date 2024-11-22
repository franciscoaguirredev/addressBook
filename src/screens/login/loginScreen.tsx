// import React, {useCallback, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Button,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {colors} from '../../config/theme/theme';

// type RootStackParamList = {
//   LoginScreen: undefined;
//   RegisterScreen: undefined;
// };

// type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

// const LoginScreen = () => {
//   const navigation = useNavigation<any>();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleLogin = async (email: string, password: string) => {
//     await AsyncStorage.removeItem('token');;
//     try {
//       if (email =='' || password =='') {
//         setModalVisible(true);
//       } else {
//         const response = await fetch(
//           'https://closetoyoureactnativebackend.onrender.com/api/auth/login',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               email: email,
//               password: password,
//             }),
//           },
//         );

//         if (response.ok) {
//           const {data} = await response.json();
//           await AsyncStorage.setItem('token', data.accessToken);
//           navigation.navigate('HomeScreen');
//         } else {
//           Alert.alert('Error', 'Email or password incorrect');
//           setModalVisible(false);
//         }
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Internet or server connection error');
//       console.error('Error verifying credentials:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       setEmail('');
//       setPassword('');
//     }, [])
//   );
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome!</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="email address"
//         placeholderTextColor={colors.text}
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           placeholderTextColor={colors.text}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Text style={styles.showPasswordText}>
//             {showPassword ? 'Hide' : 'Show'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => handleLogin(email, password)}>
//         <Text style={styles.buttonText}>Log in</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
//         <Text style={styles.linkText}>Don't have an account? Sign up!</Text>
//       </TouchableOpacity>

//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Verify email or password</Text>
//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: 'gray',
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: 'black',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 15,
//     backgroundColor: 'Black',
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 10,
//   },
//   showPasswordText: {
//     color: '#007BFF',
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   linkText: {
//     color: '#007BFF',
//     textAlign: 'center',
//     marginVertical: 10,
//     fontSize: 20
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     // backgroundColor: '#fff',
//     backgroundColor: '#000',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default LoginScreen;

import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../../config/theme/theme';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true); // Mostrar el loader
    await AsyncStorage.removeItem('token');

    try {
      if (email === '' || password === '') {
        setModalVisible(true);
        setIsLoading(false); // Ocultar el loader
      } else {
        const response = await fetch(
          'https://closetoyoureactnativebackend.onrender.com/api/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
        );

        if (response.ok) {
          const {data} = await response.json();
          await AsyncStorage.setItem('token', data.accessToken);

          // Retraso de 2.5 segundos antes de navegar
          setTimeout(() => {
            setIsLoading(false); // Ocultar el loader
            navigation.navigate('HomeScreen');
          }, 2500);
        } else {
          Alert.alert('Error', 'Email or password incorrect');
          setIsLoading(false); // Ocultar el loader
        }
      }
    } catch (error) {
      console.error('Error verifying credentials:', error);
      setIsLoading(false); // Ocultar el loader
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, []),
  );

  return (
    <View style={styles.container}>
      {isLoading ? ( // Mostrar el loader si está cargando
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome!</Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={colors.text}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(email, password)}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.linkText}>Don't have an account? Sign up!</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Verify email or password</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: 'black',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  showPasswordText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
