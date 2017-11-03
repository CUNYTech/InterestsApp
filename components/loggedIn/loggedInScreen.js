import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';


kevUserId = "jtnAkFHYrieKZ93N7Kf8OJdEx4Y2"

export default class LoggedInScreen extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content />

        <Footer>
          <FooterTab>

            <Button>
              <Text>Camera</Text>
            </Button>

            <Button active>
              <Text>Navigate</Text>
            </Button>

            <Button>
              <Text>Contact</Text>
            </Button>
            
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}