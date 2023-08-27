import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, Text, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../firebase/config';
import { getThemeStyles } from '../theme';
import DropDownPicker from 'react-native-dropdown-picker';


const SettingsModal = (props) => {

  const [user, setUser] = useState();
  const [theme, setTheme] = useState(props.theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(props.user);
    setTheme(props.theme);
  }, [props]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleLogout = () => {
    setModalVisible(false);
    auth.signOut();
  };

  const handleThemeChange = (newTheme) => {
    props.themeHandler(newTheme ? newTheme : 'light');
  }

  const themeStyles = getThemeStyles(theme);

  const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      {user && themeStyles ? (
        <>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={themeStyles.modalView}>
            <Text style={[themeStyles.titleText, { marginVertical: 10 }]}>Settings</Text>
              <Text style={themeStyles.text}>{user.email}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[themeStyles.text]}>Theme</Text>
              <DropDownPicker
              style={[themeStyles.input]}
              textStyle={[themeStyles.subText]}
              containerStyle={{width: '35%', marginLeft: 10, marginTop: 15}}
              modalContentContainerStyle={[themeStyles.input]}
              open={open}
              setOpen={setOpen}
              onSelectItem={(item) => handleThemeChange(item.value)}
        items={themeOptions}
        value={theme}
        dropDownDirection='TOP'
        listMode='MODAL'
      />
      </View>

              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                  style={[themeStyles.primaryButton, { marginHorizontal: 5 }]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={themeStyles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[themeStyles.dangerButton, { marginHorizontal: 5 }]}
                  onPress={handleLogout}>
                  <Text style={themeStyles.buttonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={toggleModal}>
            <Ionicons name='settings-sharp' size={28} color='gray' />
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default SettingsModal;