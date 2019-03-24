import { Alert } from 'react-native';
import timeout, { mediumTimeout } from './timeout';
import { serverURL } from '../constants/server';

const uploadDocument = (callback, files, details, username) => {
  const body = new FormData();

  for (const detail in details) {
    body.append(detail, details[detail]);
  }

  for (let i = 0; i < files.length; i += 1) {
    body.append(`file-${i}`, {
      uri: files[i].uri,
      type: files[i].type, // or photo.type
      name: `${details.subject}-${i}.jpg`,
    });
  }

  timeout(
    mediumTimeout,
    fetch(`${serverURL}/add/${username}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }),
  )
    .then(callback)
    .catch(error => {
      Alert.alert(
        `Error: ${error.message}`,
        "It looks like we're experiencing an issue. Sorry about that!",
      );
      console.log(error);
    });
};

const deleteDocument = (callback, fileName, username) => {
  timeout(
    mediumTimeout,
    fetch(`${serverURL}/delete/${username}/${fileName}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  )
    .then(() => {
      callback();
    })
    .catch(error => {
      console.log(error);
    });
};

export { uploadDocument, deleteDocument };
