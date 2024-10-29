// ProfileScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export const ProfileScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;
  console.log('Profile Loaded');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contact.name}</Text>
      <Text style={styles.text}>Teléfono: {contact.telephone}</Text>
      <Text style={styles.text}>Email: {contact.email}</Text>
      <Text style={styles.text}>Rol: {contact.role}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="pencil" size={24} color="black" />
          <Text style={styles.text}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="trash" size={24} color="black" />
          <Text style={styles.text}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="location" size={24} color="black" />
          <Text style={styles.text}>Ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
  },
  iconButton: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
