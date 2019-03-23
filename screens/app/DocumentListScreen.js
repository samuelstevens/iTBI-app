import React from 'react';
import {
  FlatList,
  StyleSheet,
  AsyncStorage,
  Modal,
  Alert,
  SafeAreaView,
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
    };
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('username');

    getDocumentList(response => {
      const documents = response.files.map(doc => ({ key: doc }));
      this.setState({ documents });
    }, username);
  }

  _renderItem = ({ item }) => (
    <DocumentListItem
      item={item}
      onPress={() => this.props.navigation.push('DocumentView', { documentName: item.key })
      }
    />
  );

  _navigateTo = docName => {
    this._closeModal();
    console.log('navigating to', docName);
    this.props.navigation.push('DocumentView', { documentName: docName });
  };

  _closeModal = () => {
    this.setState({ searchOverlayVisible: false, addOverlayVisible: false });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.documents}
          renderItem={this._renderItem}
          ItemSeparatorComponent={DocumentListSeparator}
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
