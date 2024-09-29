import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles';
import { useTheme } from 'react-native-paper';

const Bubble = ({ message, userId }: { message: any; userId: string }) => {
  const { colors } = useTheme();
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
          {message.text}
        </Text>
      </View>
      {/* <Text style={{textAlign:"right",fontSize:11}}>{formatDate(message?.timestamp)}</Text> */}
      {message.sender === userId && message.seenBySender === true && (
        <View
          style={{
            flexDirection: 'row',
            width: 50,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginLeft: 'auto',
          }}
        >
          <Ionicons name="checkmark-done" color={colors.primary} size={18} />
          <Text style={{ color: 'black', fontSize: 12 }}>Seen</Text>
        </View>
      )}
    </View>
  );
};

export default Bubble;
