import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  Image,
  Keyboard,
  ScrollView, AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import colors from '../constants/Colors';
import { uploadDocument } from '../api/files';

class AddOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      subject: '',
      email: '',
      files: [],
    };
  }

  _addPhoto = async () => {
    Keyboard.dismiss();

    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const { files } = this.state;
      files.push(result);

      this.setState({ files });
    }
  };

  _addCamera = async () => {
    Keyboard.dismiss();
    await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      const { files } = this.state;
      files.push(result);

      this.setState({ files });
    }
  }

  _saveDocument = async () => {
    const {
      name, phone, email, subject, files, notes,
    } = this.state;
    const details = {
      name, phone, email, subject, notes,
    };

    uploadDocument(
      this.props.close,
      files,
      details,
      await AsyncStorage.getItem('username'),
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <ScrollView
          style={[styles.container]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ padding: 30 }}>
            <Text style={styles.titleText}>Add Note</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={subject => this.setState({ subject })}
              value={this.state.subject}
              autoFocus
              placeholder="Subject"
            />
            <TextInput
              style={[styles.textInput, { height: 80 }]}
              onChangeText={notes => this.setState({ notes })}
              value={this.state.notes}
              placeholder="Notes..."
              multiline
            />
            <Text style={styles.subtitleText}>Contact Information</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}

              placeholder="Name"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}

              placeholder="Phone"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}

              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.subtitleText}>Documents</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={this._addCamera}
                underlayColor={colors.white}
              >
                <View>
                  <Ionicons
                    name="ios-camera"
                    size={62}
                    color={colors.primaryColor}
                  />
                  <Text style={{ color: colors.primaryColor }}>Camera</Text>
                </View>
              </TouchableHighlight>
              <View style={{ width: 20 }} />
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={this._addPhoto}
                underlayColor={colors.white}
              >
                <View>
                  <Ionicons
                    name="ios-photos"
                    size={62}
                    color={colors.primaryColor}
                  />
                  <Text style={{ color: colors.primaryColor }}>Photos</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}
            >
              {this.state.files.length > 0 ? (
                this.state.files.map((image, i) => (
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: 50,
                      height: 50,
                      margin: 3,
                      borderRadius: 3,
                    }}
                    key={i}
                  />
                ))
              ) : (
                <Text style={{ fontStyle: 'italic' }}>
                You haven&#39;t added any documents yet.
                </Text>
              )}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableHighlight
                style={[
                  styles.buttonStyle,
                  { padding: 12, width: '100%', marginBottom: 8 },
                ]}
                onPress={this._saveDocument}
                underlayColor={colors.white}
              >
                <View>
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  >
                  Save Note
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={[
                  styles.buttonStyle,
                  { padding: 12, width: '100%', borderColor: colors.red },
                ]}
                onPress={this.props.close}
                underlayColor={colors.white}
              >
                <View>
                  <Text
                    style={{
                      color: colors.red,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  >
                  Cancel
                  </Text>
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
    backgroundColor: colors.white,
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

  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  subtitleText: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },

  buttonStyle: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 12,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddOverlay;
