import { View, Text } from 'react-native'
import React from 'react'
import { Snackbar } from 'react-native-paper'
import { ISnackbarProps } from '../../../@types/props/SnackbarProps'

const SnackbarAlert = ({ visible, onDismissSnackBar, message }: ISnackbarProps) => {
    return (
        <View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Retry',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                {message}
            </Snackbar>
        </View>
    )
}

export default SnackbarAlert