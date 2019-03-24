import React from 'react';
import {
  Linking,
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  WebView,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { serverURL } from '../../constants/server';
import Layout from '../../constants/Layout';
import colors from '../../constants/Colors';
import { deleteDocument } from '../../api/files';

export default class DocumentViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const param = navigation.getParam('file', null);
    const title = param?.fileName;
    return {
      title,
    };
  };

  constructor(props) {
    super(props);
    this.state = { originalFile: true };
  }

  componentDidMount() {
    // console.log(this.props.navigation.getParam('file'));
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

  _getFileType = fileName => {
    const split = fileName.split('.');
    return split[split.length - 1];
  };

  _fileView = () => {
    const username = this.props.navigation.getParam('username');
    const note = this.props.navigation.getParam('file');

    return Object.keys(note).map(noteKey => {
      const file = note[noteKey];
      if (typeof file !== 'object') {
        return null;
      }

      const fileType = this._getFileType(note[noteKey].fileName);
      console.log(fileType);

      switch (fileType) {
        case 'jpg':
        case 'png':
          console.log(`${serverURL}/${username}/${file.fileName}`);
          return (
            <Image
              style={{
                width: Layout.window.width - 10,
                minHeight: Layout.window.width,
                margin: 5,
              }}
              key={noteKey}
              resizeMode="contain"
              source={{
                uri: `${serverURL}/${username}/${file.fileName}`,
              }}
            />
          );
        case 'pdf':
          console.log(`${serverURL}/${username}/${file.fileName}`);
          return (
            <WebView
              key={noteKey}
              source={{
                uri: `${serverURL}/${username}/${file.fileName}`,
              }}
              style={{
                margin: 20, flex: 1, height: 440, width: Layout.window.width - 40,
              }}
            />
          );

        default:
          return null;
      }
    });
  };

  _deleteFile = () => {
    const note = this.props.navigation.getParam('file');
    const username = this.props.navigation.getParam('username');
    let counter = 0;
    const refresh = this.props.navigation.getParam('refresh', () => {});
    for (let i = 0; i < Object.keys(note).length - 2; i += 1) {
      const { fileName } = note[String(i)];

      deleteDocument(
        () => {
          counter += 1;
          if (counter === Object.keys(note).length - 2) {
            this.props.navigation.goBack();
            refresh();
          }
        },
        fileName,
        username,
      );
    }
  };

  _textView = () => {
    const note = this.props.navigation.getParam('file');

    return Object.keys(note).map(noteKey => {
      const file = note[noteKey];
      if (typeof file !== 'object') {
        return null;
      }

      const text = file.text.replace(/\r?\n|\r/g, ' ');

      if (!/^\s*$/.test(text)) {
        return (
          <View key={noteKey} style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      }
      return null;
    });
  };

  _selectOriginal = () => {
    this.setState({ originalFile: true });
  };

  _selectText = () => {
    console.log('hello');
    this.setState({ originalFile: false });
  };

  render() {
    const fileView = this._fileView();
    const textView = this._textView();
    const { contactInfo } = this.props.navigation.getParam('file')['0'];
    const borderRadiusConst = 8;
    return (
      <SafeAreaView style={styles.container}>

        <ScrollView>
          <View style={{ paddingBottom: 30, paddingTop: 12 }}>
            <View style={styles.contactContainer}>
              <Text style={styles.headerText}>Contact</Text>
              <Text style={styles.contactText}>{contactInfo?.name}</Text>
              <Text
                style={[styles.contactText, { color: colors.blue }]}
                onPress={() => this._email(contactInfo?.Email)}
              >
                {contactInfo?.email}
              </Text>
              <Text style={styles.contactText}>{contactInfo?.phone}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 6,
              }}
            >
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={this._selectText}
                style={[
                  styles.selectButtonContainer,
                  {
                    alignItems: 'flex-end',
                    borderTopLeftRadius: borderRadiusConst,
                    borderBottomLeftRadius: borderRadiusConst,
                  },
                  this.state.originalFile
                    ? { backgroundColor: colors.white }
                    : { backgroundColor: colors.primaryColor },
                ]}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    this.state.originalFile
                      ? { color: colors.primaryColor }
                      : { color: colors.white },
                  ]}
                >
                Text
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._selectOriginal}
                style={[
                  styles.selectButtonContainer,
                  {
                    alignItems: 'flex-start',
                    borderTopRightRadius: borderRadiusConst,
                    borderBottomRightRadius: borderRadiusConst,
                  },
                  this.state.originalFile
                    ? { backgroundColor: colors.primaryColor }
                    : { backgroundColor: colors.white },
                ]}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    this.state.originalFile
                      ? { color: colors.white }
                      : { color: colors.primaryColor },
                  ]}
                >
                Original
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
            {this.state.originalFile ? fileView : textView}

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <TouchableHighlight
                onPress={this._deleteFile}
                activeOpacity={0.25}
                underlayColor="rgba(0,0,0,0)"
              >
                <View style={styles.deleteButtonContainer}>
                  <Ionicons name="ios-trash" size={32} color={colors.red} />
                  <Text style={styles.deleteButtonText}>Delete Note</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
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
  deleteButtonContainer: {
    marginTop: 12,
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.red,
    backgroundColor: colors.white,
  },

  deleteButtonText: {
    color: colors.red,
  },

  textContainer: { padding: 12 },
  text: { fontSize: 22, lineHeight: 40 },

  selectButtonContainer: {
    padding: 6,
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },

  selectButtonText: { fontSize: 18 },
});
