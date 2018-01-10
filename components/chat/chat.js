import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import Firebase from "firebase";

//import ReversedFlatList from 'react-native-reversed-flat-list';

//import {send, subscribe} from 'react-native-training-chat-server';
import Header from './Header';



let NAME = '@realDonaldTrump';
const CHANNEL = 'Chat';
const AVATAR =
  'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg';

export default class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Chat"
      });

      constructor(props) {
        super(props);

        var userId = Firebase.auth().currentUser.uid;
        Firebase
        .database()
        .ref("/users/" + userId)
        .on("value", snapshot => {
          NAME = snapshot.val().userName;
        });
    }
    
       // this.handlePress = this.handlePress.bind(this);
      //}

  state = {
    typing: '',
    messages: [],
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
       this.setState({messages});
     });
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  // The magical function! 🎉
  scrollToBottom(animated = true) {
    if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
      // Calculates the y scroll position inside the ListView
      const scrollTo = this.footerY - this.listHeight

      // Scroll that sucker!
      this.refs.FlatList.scrollTo({
        y: scrollTo,
        animated: animated,
      })
    }
  }

  sendMessage = async () => {
    // read message from component state
    const message = this.state.typing;

    // send message to our channel, with sender name
    await send({
      channel: CHANNEL,
      sender: NAME,
      avatar: AVATAR,
      message,
    });

    // set the component state (clears text input)
    this.setState({
      typing: '',
    });
  };

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Image style={styles.avatar} source={{uri: item.avatar}} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />
        <FlatList
          data={this.state.messages}
          renderItem={this.renderItem}
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={text => this.setState({typing: text})}
            />
            <TouchableOpacity onPress={this.sendMessage}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});

const normalizeChannelName = channel => (channel || 'default').toLowerCase();
/**
 * Send a message
 */
export const send = ({
  channel,
  sender = 'Anonymous',
  message = null,
  avatar = null,
}) => {
  if (message === '') {
    return Promise.resolve();
  }
  if (message === null) {
    throw new Error('A message body is required');
  }

  const timestamp = new Date().toISOString();
  return Firebase.database()
    .ref(normalizeChannelName(channel))
    .push({sender, message, avatar, timestamp});
};

/**
 * Subscribe to message updates
 */

let currentQuery;
let currentCallback;

export const subscribe = (channel, callback, maxMessages = 100) => {
  if (!channel) {
    throw new Error('Channel name required!');
  }

  if (!callback) {
    throw new Error('A subscription callback required!');
  }

  // only allow a single subscription at once,
  // unsubscribe from previous rooms
  if (currentQuery && currentCallback) {
    currentQuery.off('value', currentCallback);
    currentQuery = null;
    currentCallback = null;
  }

  currentQuery = Firebase.database()
    .ref(normalizeChannelName(channel))
    .limitToLast(maxMessages);
  currentCallback = callback;

  currentQuery.on('value', snapshot => {
    const data = snapshot.val();
    const messages = [];
    for (const key in data) {
      const {sender, message, avatar, timestamp} = data[key];
      messages.push({
        key,
        sender,
        message,
        timestamp: timestamp ? new Date(timestamp) : new Date(2000, 0, 1),
        avatar: avatar || 'http://i.imgur.com/h5mhz8A.png',
      });
    }

    callback(messages);
  });
};