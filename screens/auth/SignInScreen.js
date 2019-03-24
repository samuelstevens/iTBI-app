import React from 'react';
import {
  View, Button, AsyncStorage, TextInput, StyleSheet, Text,
} from 'react-native';
import { signIn } from '../../api/auth';
import colors from '../../constants/Colors';
import getMessage from '../../constants/Messages';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  constructor(props) {
    super(props);

    this.state = { username: 'pt1', password: 'pwd', message: getMessage() };
  }

  _signIn = async () => {
    const { username, password } = this.state;
    signIn(async () => {
      await AsyncStorage.setItem('signedIn', 'true');
      await AsyncStorage.setItem('username', username);
      this.props.navigation.navigate('App');
    }, username, password);
  };

  render() {
    return (
      <View style={{ padding: 30 }}>
        <Text style={{
          margin: 4, fontSize: 18, fontStyle: 'italic', marginBottom: 12,
        }}
        >{this.state.message}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          autoFocus
          placeholder="Username"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          autoFocus
          placeholder="Subject"
          secureTextEntry
          autoComplete="password"
        />
        <Button title="Sign in!" onPress={this._signIn} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textInput: {
    height: 40,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 12,
    fontSize: 18,
    marginBottom: 8,
  },
});

export default SignInScreen;
