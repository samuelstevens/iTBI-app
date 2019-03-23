import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem('signedIn', 'true');
    await AsyncStorage.setItem('username', 'JOHN_CENA');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
}

export default SignInScreen;
