import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import addStack from '../utils/addStack';
import updateStack from '../utils/updateStack';
import { getThemeStyles } from '../theme';

const StackModal = (props) => {

    const modalMode = props.mode;
    const stackId = props.stackId;
    const themeStyles = getThemeStyles(props.theme);
    const [modalVisible, setModalVisible] = useState(false);
    const [stackName, setStackName] = useState('');
    const [category, setCategory] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setStackName('');
        setCategory('');
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
                        <TouchableOpacity style={[themeStyles.dangerButton, { marginHorizontal: 5 }]} onPress={toggleModal}>
                            <Text style={themeStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={themeStyles.successButton} onPress={handleSubmit}>
                            <Text style={[themeStyles.buttonText, { marginHorizontal: 5 }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={themeStyles.primaryButton}
                onPress={toggleModal}>
                <Text style={themeStyles.buttonText}>{modalMode == 'add' ? 'New Stack' : 'Update Stack'}</Text>
            </TouchableOpacity>
        </>
    );
};

export default StackModal;