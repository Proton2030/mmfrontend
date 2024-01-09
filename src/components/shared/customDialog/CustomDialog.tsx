import React from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { globalStyles } from '../../../globalStyles/GlobalStyles'

const CustomDialog = ({ visible, hideDialog, handleRightButtonClick }: any) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={globalStyles.mediumText}>Are You Sure want to Unchoise ?</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">After unchoising this user,tho=is user will be removed from your choice</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={handleRightButtonClick}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default CustomDialog