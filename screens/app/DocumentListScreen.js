import React from 'react';
import {
  FlatList,
  StyleSheet,
  AsyncStorage,
  Modal,
  SafeAreaView,
  Button,
} from 'react-native';

import { getDocumentList } from '../../api/api';

import {
  DocumentListItem,
  DocumentListSeparator,
} from '../../components/DocumentListItem';
import ActionButton from '../../components/ActionButton';
import SearchOverlay from '../../components/SearchOverlay';
import AddOverlay from '../../components/AddOverlay';

export default class DocumentListScreen extends React.Component {
  static navigationOptions = {
    title: 'Documents',
  };

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      searchOverlayVisible: false,
      addOverlayVisible: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('username');

    this.setState({ username });

    this._getDocuments(username);
  }

  _getDocuments = (username = this.state.username, callback = () => {}) => {
    getDocumentList(response => {
      const documents = Object.keys(response.files).map(fileName => ({
        ...response.files[fileName],
        fileName,
        key: fileName,
      }));

      this.setState({ documents });
      callback();
    }, username);
  };

  _renderItem = ({ item }) => (
    <DocumentListItem
      item={item}
      onPress={() => this.props.navigation.push('DocumentView', {
        file: item,
        username: this.state.username,
        refresh: this._getDocuments,
      })
      }
    />
  );

  _navigateTo = file => {
    this._closeModal();
    console.log('navigating to', file.fileName);
    this.props.navigation.push('DocumentView', {
      file,
      username: this.state.username,
      refresh: this._getDocuments,
    });
  };

  _closeModal = () => {
    this._getDocuments();
    this.setState({ searchOverlayVisible: false, addOverlayVisible: false });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this._getDocuments(this.state.username, () => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          data={this.state.documents}
          renderItem={this._renderItem}
          ItemSeparatorComponent={DocumentListSeparator}
        />
        <Button
          onPress={async () => {
            await AsyncStorage.setItem('signedIn', 'false');
            await AsyncStorage.setItem('username', '');
            this.props.navigation.navigate('Auth');
          }}
          title="Log out"
        />
        <ActionButton
          onPress={() => this.setState({ addOverlayVisible: true })}
          iconName="ios-add"
          buttonIndex={1}
        />
        <ActionButton
          onPress={() => this.setState({ searchOverlayVisible: true })}
          iconName="ios-search"
          buttonIndex={0}
        />
        <Modal
          animationType="slide"
          transparent
          visible={this.state.searchOverlayVisible}
        >
          <SearchOverlay
            cancelSearch={this._closeModal}
            navigateTo={this._navigateTo}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.addOverlayVisible}
        >
          <AddOverlay close={this._closeModal} />
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
