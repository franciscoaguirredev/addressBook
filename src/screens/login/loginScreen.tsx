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
import {colors, globalStyles} from '../../config/theme/theme';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true); 
    await AsyncStorage.removeItem('token');

    try {
      if (email === '' || password === '') {
        setModalVisible(true);
        setIsLoading(false); 
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

          setTimeout(() => {
            setIsLoading(false); 
            navigation.navigate('HomeScreen');
          }, 2500);
        } else {
          Alert.alert('Error', 'Email or password incorrect');
          setIsLoading(false);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Internet or server connection error');
      console.error('Internet or server connection error', error);
      setIsLoading(false); 
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
      {isLoading ? (
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

          <View style = {styles.viewBotton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(email, password)}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.linkText}>Don't have an account?</Text>
            <Text style={styles.linkTextSignIn}>Sign up!</Text>
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
    backgroundColor: colors.primary,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.iconColor
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'black',
    fontSize: 18
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
    fontSize: 18
  },
  showPasswordText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginRight: 10,
  },
  viewBotton:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '30%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color:colors.iconColor,
    fontSize: 20,
  },
  linkText: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  linkTextSignIn: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
