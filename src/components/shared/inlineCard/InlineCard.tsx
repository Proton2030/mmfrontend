import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { globalStyles } from '../../../globalStyles/GlobalStyles'
import Icon from 'react-native-vector-icons/Feather'
import { IInlineCardProps } from '../../../@types/props/InlineCardProps.types'

const InlineCard = ({ icon, titleKey, onClick, value }: IInlineCardProps) => {
    return (
        <Card style={{ width: "100%", marginBottom: 16 }}>
            <Card.Content style={globalStyles.inlineFlex}>
                <View style={[globalStyles.inlineFlex, { columnGap: 10 }]}>
                    <Icon name={icon} />
                    <Text>
                        {titleKey}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => onClick(value)}>
                    <Text>{value}</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
    )
}

export default InlineCard