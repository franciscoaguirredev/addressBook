import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export const EditScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;

  return (
    <View>
      <Text>Name:</Text>
      <TextInput style={styles.input}>{contact.name}</TextInput>
      <Text>Telephone:</Text>
      <TextInput style={styles.input}>{contact.telephone}</TextInput>
      <Text>E-mail:</Text>
      <TextInput style={styles.input}>{contact.email}</TextInput>
      <Text>Rol:</Text>
      <TextInput style={styles.input}>{contact.role}</TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
