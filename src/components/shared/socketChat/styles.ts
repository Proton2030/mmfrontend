import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
        backgroundColor: '#fff',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00000033',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        // padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        height: 500

    },
    backArrow: {
        marginRight: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    cardImg: {
        width: 42,
        height: 42,
        borderRadius: 62,
        marginRight: 5
    },
    cardAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9ca1ac',
    },
    cardAvatarText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardBody: {
        marginRight: 'auto',
        marginLeft: 12,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    messageList: {
        padding: 15,
        flex: 1,
        paddingBottom: 80
    },

    messageContainer: {
        marginVertical: 5,
        maxWidth: '75%',
    },
    myMessageContainer: {
        alignSelf: 'flex-end',
    },
    theirMessageContainer: {
        alignSelf: 'flex-start',
    },
    messageBubble: {
        paddingHorizontal: 15,
        paddingVertical: 11
    },
    myMessageBubble: {
        backgroundColor: COLORS.primary,
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,


    },
    theirMessageBubble: {
        backgroundColor: '#e5e5ea',
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
    },
    messageText: {
        color: '#fff',
        fontSize: 16
    },
    myMessageText: {
        color: '#fff',
    },
    theirMessageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e5e5ea',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#e5e5ea',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        color: "black"
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});