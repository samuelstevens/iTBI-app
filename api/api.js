import { Alert } from 'react-native';
import timeout, { mediumTimeout } from './timeout';
import { serverURL } from '../constants/server';

const getDocumentList = (callback, username) => {
  timeout(
    mediumTimeout,
    fetch(`${serverURL}/user/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  )
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
      if (!responseJson.success) {
        Alert.alert(`Error: ${responseJson.message}`);
        console.log(responseJson.message);
      }
    })
    .catch(error => {
      Alert.alert(
        `Error: ${error.message}`,
        "It looks like we're experiencing an issue. Sorry about that!",
      );
      console.log(error);
    });
};

const getDocumentDetails = (callback, documentName) => {
  // timeout(
  //   mediumTimeout,
  //   fetch(`${serverURL}/doc/${documentName}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   }),
  // )
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     callback(responseJson);
  //     if (!responseJson.success) {
  //       Alert.alert(`Error: ${responseJson.message}`);
  //       console.log(responseJson.message);
  //     }
  //   })
  //   .catch(error => {
  //     Alert.alert(`Error: ${error.message}`, 'It looks like we\'re experiencing an issue. Sorry about that!');
  //     console.log(error);
  //   });

  setTimeout(
    () => callback({
      document: {
        name: documentName,
        contactInfo: { name: 'Dr. Cena', email: 'cena@cantseeme.com' },
      },
    }),
    500,
  );
};

const getResults = (callback, query, username) => {
  const body = new FormData();

  body.append('query', query);
  timeout(
    mediumTimeout,
    fetch(`${serverURL}/search/${username}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }),
  )
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
      // if (!responseJson.success) {
      //   Alert.alert(`Error: ${responseJson.message}`);
      //   console.log(responseJson.message);
      // }
    })
    .catch(error => {
      Alert.alert(`Error: ${error.message}`, 'It looks like we\'re experiencing an issue. Sorry about that!');
      console.log(error);
    });
};

const uploadDocument = (callback, files, details) => {
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
    fetch(`${serverURL}/add/Boi`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }),
  )
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
      if (!responseJson.success) {
        Alert.alert(`Error: ${responseJson.message}`);
        console.log(responseJson.message);
      }
    })
    .catch(error => {
      Alert.alert(
        `Error: ${error.message}`,
        "It looks like we're experiencing an issue. Sorry about that!",
      );
      console.log(error);
    });

  callback({ success: true });
};

export {
  getDocumentList, getDocumentDetails, getResults, uploadDocument,
};
