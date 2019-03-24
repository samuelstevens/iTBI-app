import { Alert } from 'react-native';
import timeout, { mediumTimeout } from './timeout';
import { serverURL } from '../constants/server';

const signIn = (callback, username, password) => {
  const body = new FormData();

  body.append('username', username);
  body.append('password', password);
  timeout(
    mediumTimeout,
    fetch(`${serverURL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    }),
  )
    .then(response => {
      callback(response);
    })
    .catch(error => {
      Alert.alert(
        `Error: ${error.message}`,
        "It looks like we're experiencing an issue. Sorry about that!",
      );
      console.log(error);
    });
};

export { signIn };
