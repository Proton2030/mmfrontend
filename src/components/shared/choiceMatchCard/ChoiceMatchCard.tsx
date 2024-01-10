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
                            <IconButton icon="close" iconColor='red' onPress={handleOpenDialog} style={{ backgroundColor: "#fad1e3" }} />
                        </View>
                        }
                    />
                </Card>
            </View>
            <CustomDialog title={"Are You Sure want to Unchoise ?"} leftLabel={"Cancel"} body={"After unchoising this user,this user will be removed from your choice"} visible={visible} hideDialog={hideDialog} handleRightButtonClick={handleUnchoiceClick} />
        </>
    )
}
)
export default ChoiceMatchCard