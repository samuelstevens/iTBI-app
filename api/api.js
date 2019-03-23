import { Alert } from 'react-native';
import timeout, { mediumTimeout } from './timeout';
import { serverURL } from '../constants/server';

const getDocumentList = (callback, username) => {
  // timeout(
  //   mediumTimeout,
  //   fetch(`${serverURL}/user/${username}`, {
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
      files: ['John Cena', 'The Rock', 'Kanye West (very cool)'],
    }),
    500,
  );
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

const getResults = (callback, query) => {
  const docList = ['John Cena', 'The Rock', 'Kanye West (very cool)'];

  const results = docList.filter(
    doc => doc.toLowerCase().indexOf(query.toLowerCase()) > -1,
  );

  setTimeout(
    () => callback({
      results,
    }),
    15,
  );
};

const uploadPhoto = (callback, photo, username) => {
  // const body = new FormData();
  // body.append('name', 'testName'); // you can append anyone.
  // body.append('photo', {
  //   uri: photo.uri,
  //   type: photo.type, // or photo.type
  //   name: 'myPhoto.jpg',
  // });
  // timeout(
  //   mediumTimeout,
  //   fetch(`${serverURL}/add/Boi`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body,
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

  callback({ success: true });
};

export {
  getDocumentList, getDocumentDetails, getResults, uploadPhoto,
};
