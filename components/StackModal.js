import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Text, TextInput, useColorScheme } from 'react-native';
import addStack from '../utils/addStack';
import updateStack from '../utils/updateStack';
import { getThemeStyles } from '../styles/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

const StackModal = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [stackName, setStackName] = useState('');
    const [category, setCategory] = useState('');
    
    const modalMode = props.mode;
    const stackId = props.stackId;
    const themeStyles = getThemeStyles(useColorScheme());

    const toggleStackModal = () => {
        setModalVisible(!modalVisible);
        setStackName('');
        setCategory('');
    }

    const handleRefresh = () => {
        props.onRefresh?.();
    }

    // Function to add/update a stack to Firestore database
    const handleSubmit = async () => {
        if (!stackName.trim() || !category.trim()) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            if (modalMode == 'add') {
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
        } else {
            await updateStack(stackId, {
                stackName: stackName,
                category: category,
            }).then(() => {
                setModalVisible(false);
                setStackName('');
                setCategory('');
            }
            );
        }
        handleRefresh();
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
                    <Text style={[themeStyles.titleText, { marginVertical: 10 }]}>{modalMode == 'add' ? 'New Stack' : 'Update Stack'}</Text>
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
                        <TouchableOpacity style={[themeStyles.configButton, { marginHorizontal: 5 }]} onPress={toggleStackModal}>
                        <Ionicons name="return-down-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[themeStyles.successButton, {marginHorizontal: 5}]} onPress={handleSubmit}>
                            <Text style={themeStyles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={[themeStyles.tertiaryButton, {marginHorizontal: 5}]}
                onPress={toggleStackModal}>
                    {modalMode == 'add' ? (
                <Ionicons name="add-circle-sharp" size={24} color="white" />
                ) : (
                    <Ionicons name="create" size={24} color="white" />
                )}
            </TouchableOpacity>
        </>
    );
};

export default StackModal;