import React from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { globalStyles } from '../../../globalStyles/GlobalStyles'

const CustomDialog = ({ visible, hideDialog, handleRightButtonClick, title, body, leftLabel, rightLabel }: any) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" color='red' />
                <Dialog.Title style={globalStyles.mediumText}>{title}</Dialog.Title>
                {
                    body !== "" ?
                        <Dialog.Content>
                            <Text variant="bodyMedium">{body}</Text>
                        </Dialog.Content> : null
                }
                <Dialog.Actions>
                    <Button onPress={hideDialog}>{leftLabel}</Button>
                    <Button onPress={handleRightButtonClick}>{rightLabel}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default CustomDialog