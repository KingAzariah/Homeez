import { StatusBar } from 'expo-status-bar';
import {Image, ActionSheetIOS, StyleSheet, Text, Linking, View, Pressable, SafeAreaView, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const FRIENDS = [
	{
    id: '1',
    name: 'Nana Gail',
		number: '+13366842418',
    email: 'gail.pedersen@icloud.com',
    address: {
      street: '2757 Quakenbush Road',
      city: 'Snow Camp',
      state: 'NC',
      zip: '27439'
    },
    interests: ["cooking", "gardening"],
  avatar: 'https://ui-avatars.com/api/?name=Nana+Gail'
  },

	{
    id: '2',
    name: 'Shay',
		number: '+19199377550',
    email: 'koevansb@icloud.com',
    address: {
      street: '2757 Quakenbush Road',
      city: 'Snow Camp',
      state: 'NC',
      zip: '27439'
    },
    interests: ["cooking", "gardening"],
    avatar: 'https://i.pravatar.cc/100'

    },

  {
    id: '3',
    name: 'Dexter',
		number: '+15129370884',
    email: 'neega@gmail.com',
    address: {
      street: '1362 Ocean Ave',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11230'
    },
    interests: ["anime", "drawing"],
    avatar: 'https://i.pravatar.cc/100'

  },
  {
    id: '4',
    name: 'Azi',
		number: '+13363399630',
    email: 'azariahmwood@me.com',
    address: {
      street: '2819 Yanceyville St',
      city: 'Greensboro',
      state: 'NC',
      zip: '27405'
    },
    interests: ["coffee", "coding"],
    avatar: 'https://i.pravatar.cc/100'

  },

];


export default function App() {

  const showFriend = ({ item }) => (
    <Friend info={item} />
  );
  
  const detectLongPress = (info) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: info.name,
        options: ['Cancel', 'Call', 'Message', 'Email', 'Directions'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          Linking.openURL('tel:' + info.number)
        } else if (buttonIndex === 2) {
          Linking.openURL('sms:' + info.number)
        } else if (buttonIndex === 3) {
          Linking.openURL('mailto:' + info.email)
        } else if (buttonIndex === 4) {
          let address = info.address.street + '+' + info.address.city + '+' + info.address.state + '+' + info.address.zip
          Linking.openURL('maps://app?daddr=' + address)
        }
      }
    )
  }

  const Friend = ({ info }) => (
    <Pressable style={styles.friendRow} onLongPress={() => detectLongPress(info)} onPress={() => Linking.openURL('tel:' + info.number)}>
      <Image style={styles.avatar} source={{uri: info.avatar,}} />
      <Text style={styles.friendText}>{info.name}</Text>
    </Pressable>
  );

  const HomeScreen = () => {
    return (
        <SafeAreaView>
            <FlatList
                data={FRIENDS}
                renderItem={showFriend}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
  }
  const NewFriendScreen = ({ navigation, route }) => {
    return <Text>This is where the form will go.</Text>;
  };
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
                title: 'Homeez',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('New Friend')}
                    title="Add"
                  />
                ),
              })}
            />
            <Stack.Screen name="New Friend" component={NewFriendScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  friendRow: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderRadius: 5,
    borderColor: 'green',
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  friendText: {
    color: "white"
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    marginRight: 15,
    borderColor: "yellow",
    borderWidth: 2
  },
});
