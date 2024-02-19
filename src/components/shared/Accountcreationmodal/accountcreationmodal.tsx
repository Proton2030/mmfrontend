import React from 'react'
import { Button, Modal, Portal,Text } from 'react-native-paper';

export const Accountcreationmodal=({ visible, setVisible, message }:any)=> {
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>{message}</Text>
                <Button onPress={hideModal}>Close</Button>
            </Modal>
        </Portal>
  )
}

