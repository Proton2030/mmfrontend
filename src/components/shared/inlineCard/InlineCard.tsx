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
                    <Icon name={icon} style={{fontSize:15,color:"white"}}  />
                    <Text style={{fontWeight:"700",fontSize:15,color:"white"}}>
                        {titleKey}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => onClick(value)}>
                    <Text style={{fontWeight:"700",fontSize:15,color:"white"}}>{value}</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
    )
}

export default InlineCard