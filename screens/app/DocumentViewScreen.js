import React from 'react';
import {
  Linking,
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  WebView,
} from 'react-native';

import { getDocumentDetails } from '../../api/api';
import colors from '../../constants/Colors';

export default class DocumentViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('documentName', ''),
  });

  constructor(props) {
    super(props);
    this.state = { document: {} };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const documentName = navigation.getParam('documentName', '');
    getDocumentDetails(({ document }) => {
      this.setState({ document });
    }, documentName);
  }

  _email = emailAddress => {
    const url = `mailto:${emailAddress}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Can't open email.");
        }
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  render() {
    const { document } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contactContainer}>
          <Text style={styles.headerText}>Contact</Text>
          <Text style={styles.contactText}>{document.contactInfo?.name}</Text>
          <Text
            style={[styles.contactText, { color: colors.blue }]}
            onPress={() => this._email(document.contactInfo?.email)}
          >
            {document.contactInfo?.email}
          </Text>
          <Text style={styles.contactText}>{document.contactInfo?.phone}</Text>
        </View>
        <WebView
          source={{
            uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
          }}
          style={{ margin: 20 }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  contactText: {
    fontSize: 17,
    marginBottom: 3,
  },
});
