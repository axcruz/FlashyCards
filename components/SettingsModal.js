import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase/config';

const SettingsModal = (props) => {
  const [user, setUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleLogout = () => {
    setModalVisible(false);
    auth.signOut();
  };

  return (
    <View style={styles.container}>
            {user ? (
                <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{user.email}</Text>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonLogout]} // Added a new style for the logout button
              onPress={handleLogout}>
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.userIcon}
        onPress={toggleModal}>
        <Icon name="gear" size={28} color="gray"/>
      </TouchableOpacity>
      </>
    ) : (
        <ActivityIndicator size="large" color="#007AFF" />
    )}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonLogout: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  userIcon: {
    marginRight: 10,
  },
});

export default SettingsModal;
