import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import addStack from '../utils/addStack';
import { getThemeStyles } from '../theme';

const SettingsModal = (props) => {

    const themeStyles = getThemeStyles(props.theme);
    const [modalVisible, setModalVisible] = useState(false);
    const [stackName, setStackName] = useState('');
    const [category, setCategory] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setStackName('');
        setCategory('');
    }

    // Function to add a stack to Firestore database
    const handleAddStack = async () => {
        if (!stackName.trim() || !category.trim()) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const newStackId = await addStack({
                stackName: stackName,
                category: category,
                cardCount: 0,
            });
            if (newStackId) {
                setModalVisible(false);
                setStackName('');
                setCategory('');
            } else {
                alert('An unexpected issue occurred. Please try again later.');
            }
        } catch (error) {
            // Handle error
            alert(error);
        }
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={[themeStyles.modalView]}>
                    <Text style={[themeStyles.titleText, { marginVertical: 10 }]}>New Stack</Text>
                    <Text style={[themeStyles.text, { alignSelf: 'flex-start', marginBottom: 5 }]}>Stack Name</Text>
                    <TextInput
                        style={[themeStyles.input, {
                            width: '100%',
                            height: 40,
                            paddingLeft: 10,
                            marginBottom: 15
                        }
                        ]}
                        maxLength={255}
                        value={stackName}
                        onChangeText={setStackName}
                    />
                    <Text style={[themeStyles.text, { alignSelf: 'flex-start', marginBottom: 5 }]}>Category</Text>
                    <TextInput
                        style={[themeStyles.input, {
                            width: '100%',
                            height: 40,
                            paddingLeft: 10,
                            marginBottom: 15
                        }
                        ]}
                        maxLength={255}
                        value={category}
                        onChangeText={setCategory}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={[themeStyles.dangerButton, { marginHorizontal: 5 }]} onPress={toggleModal}>
                            <Text style={themeStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={themeStyles.successButton} onPress={handleAddStack}>
                            <Text style={[themeStyles.buttonText, { marginHorizontal: 5 }]}>Add Stack</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={themeStyles.primaryButton}
                onPress={toggleModal}>
                <Text style={themeStyles.buttonText}>New Stack</Text>
            </TouchableOpacity>
        </>
    );
};

export default SettingsModal;