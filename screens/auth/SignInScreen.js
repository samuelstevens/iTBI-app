import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import { signIn } from '../../api/auth';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);

    this.state = { username: 'pt1', password: 'pwd' };
  }

  _signIn = async () => {
    const { username, password } = this.state;
    signIn(async (response) => {
      if (response.success) {
        await AsyncStorage.setItem('signedIn', 'true');
        await AsyncStorage.setItem('username', username);
        this.props.navigation.navigate('App');
      }
    }, username, password);
  };

  render() {
    return (
      <View>

        <Button title="Sign in!" onPress={this._signIn} />
      </View>
    );
  }
}

export default SignInScreen;
