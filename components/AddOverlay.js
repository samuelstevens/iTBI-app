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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import colors from '../constants/Colors';
import { uploadPhoto } from '../api/api';

class AddOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', phone: '', files: [] };
  }

  _addPhoto = async () => {
    Keyboard.dismiss();

    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      uploadPhoto(
        () => {
          const { files } = this.state;
          files.push(result);

          this.setState({ files });
        },
        result,
        'pt1',
      );
    }

    console.log(result);
  };

  _saveDocument = () => {
    const {
      name, phone, email, files,
    } = this.state;
    const details = { name, phone, email };

    uploadPhoto(response => {
      this.props.close();
    }, files, details);
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
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titleText}>Add Note</Text>
          <Text style={styles.subtitleText}>Contact Information</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            autoFocus
            enablesReturnKeyAutomatically
            placeholder="Name"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            enablesReturnKeyAutomatically
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoFocus
            enablesReturnKeyAutomatically
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.subtitleText}>Documents</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              style={styles.buttonStyle}
              onPress={async () => {
                await Permissions.askAsync(Permissions.CAMERA);

                const result = await ImagePicker.launchCameraAsync();

                console.log(result);
              }}
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
              style={[styles.buttonStyle, { padding: 12, width: '100%', marginBottom: 8 }]}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 30,
  },
  textInput: {
    height: 40,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 8,
    paddingLeft: 12,
    fontSize: 22,
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
