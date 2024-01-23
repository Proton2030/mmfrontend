import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const SmallLoader = () => {
    return (
        <View style={{ paddingVertical: 20, marginBottom: 40 }}>
            <ActivityIndicator animating size="large" />
        </View>
    )
}

export default SmallLoader