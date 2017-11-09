import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content

} from "native-base";
import LoggedInScreen from '../../components/loggedIn/loggedInScreen.js';
import SimilarInterestsLayout from '../../components/similarInterests/similarInterestsView.js';
import { StackNavigator } from 'react-navigation';



const routes = StackNavigator({
  Home: { screen: LoggedInScreen},
  //SimilarInterests: { screen: SimilarInterestsLayout}, 
});

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
    
        <Content>
          <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

