import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles';
import { useTheme } from 'react-native-paper';
import { useContext } from 'react';
import AuthContext from '../../../../contexts/authContext/authContext';
import { COLORS } from '../../../../constants/theme';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import { CHAT_TEXT } from '../../../../constants/texts/chat/Chat';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { decryptText } from '../../../../utils/commonFunction/decryptText';

const Bubble = ({ message, userId, userCount }: { message: any; userId: string; userCount: number }) => {
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const { user, setUser } = useContext(AuthContext);
  return (
    <View
      style={[
        styles.messageContainer,
        message.sender === userId ? styles.myMessageContainer : styles.theirMessageContainer,
      ]}
    >
      <View
        style={[styles.messageBubble, message.sender === userId ? styles.myMessageBubble : styles.theirMessageBubble]}
      >
        <Text style={[styles.messageText, message.sender === userId ? styles.myMessageText : styles.theirMessageText]}>
          {decryptText(message.text)}
        </Text>
      </View>
      {/* <Text style={{textAlign:"right",fontSize:11}}>{formatDate(message?.timestamp)}</Text> */}
      {message.sender === user?._id && userCount > 1 ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              width: 50,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginLeft: 'auto',
            }}
          >
            <Ionicons name="checkmark-done" color={COLORS.primary} size={18} />
            <Text style={{ color: colors.tertiary, fontSize: 12 }}>{selectLanguage(CHAT_TEXT.seen, language)}</Text>
          </View>
        </>
      ) : (
        <>
          {message.sender === user?._id && message.seenBySender === true && (
            <View
              style={{
                flexDirection: 'row',
                width: 50,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginLeft: 'auto',
              }}
            >
              <Ionicons name="checkmark-done" color={COLORS.primary} size={18} />
              <Text style={{ color: colors.tertiary, fontSize: 12 }}>{selectLanguage(CHAT_TEXT.seen, language)}</Text>
            </View>
          )}
        </>

      )

      }
    </View>
  );
};

export default Bubble;
