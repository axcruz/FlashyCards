// HomeScreen.js
import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image
                    style={styles.logo}
                    source={require('../assets/icon.png')}
                /> */}
      <TouchableOpacity onPress={() => navigation.navigate('Flash Cards')}>
        <Text>Start Flashy Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Add Stack')}>
        <Text>Add a Stack</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  title: {

  },
  logo: {
      flex: 1,
      height: 120,
      width: 120,
      alignSelf: "center",
      margin: 30
  },
  input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16
  },
  button: {
      backgroundColor: '#788eec',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },
  footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  }
});

export default HomeScreen;
