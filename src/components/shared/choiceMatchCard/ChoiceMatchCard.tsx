import { View, Text } from 'react-native'
import React from 'react'
import { Button, Card, IconButton } from 'react-native-paper'
import { IChoiceMatchCard } from '../../../@types/props/ChoiceMtchCard'

const ChoiceMatchCard = React.memo(({ name, state, status }: IChoiceMatchCard) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Card style={{ backgroundColor: "#fde8f1" }}>
                <Card.Title
                    titleStyle={{ color: "#E71B73", fontWeight: "bold" }}
                    title={name}
                    subtitle={`Lives in ${state}`}
                    right={(props) => <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {
                            status === "CHOICE-ME" ?
                                <>
                                    <IconButton icon="check" iconColor='#E71B73' style={{ backgroundColor: "#fad1e3" }} />
                                    <IconButton icon="close" iconColor='red' style={{ backgroundColor: "#fad1e3" }} />
                                </> :
                                status === "MY-CHOICE" ?
                                    <>
                                        <IconButton icon="information-outline" iconColor='#E71B73' style={{ backgroundColor: "#fad1e3" }} />
                                        <IconButton icon="close" iconColor='red' style={{ backgroundColor: "#fad1e3" }} />
                                    </>
                                    :
                                    status === "MATCHED" ?
                                        <IconButton icon="information-outline" iconColor='#E71B73' style={{ backgroundColor: "#fad1e3" }} /> : null
                        }
                    </View>
                    }
                />
            </Card>
        </View>
    )
}
)
export default ChoiceMatchCard