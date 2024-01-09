import { View, Text } from 'react-native'
import React from 'react'
import { Button, Card, IconButton } from 'react-native-paper'
import { IChoiceMatchCard } from '../../../@types/props/ChoiceMtchCard'
import CustomDialog from '../customDialog/CustomDialog'

const ChoiceMatchCard = React.memo(({ name, state, status, handleUnchoice, choiceMatchId }: IChoiceMatchCard) => {
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const handleOpenDialog = () => {
        setVisible(true);
    }
    const handleUnchoiceClick = () => {
        if (handleUnchoice) {
            handleUnchoice(choiceMatchId);
        }
        setVisible(false);
    }
    return (
        <>
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
                                            <IconButton icon="close" iconColor='red' onPress={handleOpenDialog} style={{ backgroundColor: "#fad1e3" }} />
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
            <CustomDialog visible={visible} hideDialog={hideDialog} handleRightButtonClick={handleUnchoiceClick} />
        </>
    )
}
)
export default ChoiceMatchCard