import { View, Text, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'

const ChatReportModal = ({ userDetails, blockAction, reportAction, blockStatus, blockedBysender }: any) => {
    return (
        <View style={{ paddingVertical: 50, paddingHorizontal: 20, gap: 20, zIndex: 100 }}>
            {
                blockedBysender ?
                    null :
                    <>
                        <TouchableOpacity onPress={blockAction}
                            style={{
                                flexDirection: "row", alignItems: "center", gap: 10,
                                marginLeft: "auto", marginRight: "auto"
                            }}>
                            <Entypo name="block" size={20} color={"black"} />
                            <Text style={{ color: "black", fontSize: 22 }}>
                                {blockStatus} {userDetails?.full_name}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: "gray", width: "90%", marginLeft: "auto", marginRight: "auto" }} />
                    </>
            }


            <TouchableOpacity onPress={reportAction}
                style={{
                    flexDirection: "row", alignItems: "center", gap: 10,
                    marginLeft: "auto", marginRight: "auto"
                }}>
                <Octicons name="report" size={20} color={"black"} />
                <Text style={{ color: "black", fontSize: 22 }}>
                    Report {userDetails?.full_name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatReportModal