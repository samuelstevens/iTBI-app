import React from 'react';
import {
  SafeAreaView, StyleSheet, TextInput, FlatList, AsyncStorage,
} from 'react-native';
import colors from '../constants/Colors';
import { getResults } from '../api/api';

import { DocumentListItem, DocumentListSeparator } from './DocumentListItem';

class SearchOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '', results: [], username: '' };
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('username');
    this.setState({ username });
  }

  _handleOnChange = async (search) => {
    this.setState({ search });

    getResults(
      ({ files }) => {
        const results = Object.keys(files).map(fileName => ({
          ...files[fileName],
          fileName,
          key: fileName,
        }));

        this.setState({ results });
      },
      search,
      this.state.username,
    );
  };

  _renderItem = ({ item }) => (
    <DocumentListItem
      item={item}
      onPress={() => this.props.navigateTo(item)}
    />
  );

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.textInput}
          onChangeText={this._handleOnChange}
          value={this.state.search}
          autoFocus
          enablesReturnKeyAutomatically
          onBlur={this.props.cancelSearch}
        />

        <FlatList
          data={this.state.results}
          renderItem={this._renderItem}
          ItemSeparatorComponent={DocumentListSeparator}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
    paddingLeft: 12,
    fontSize: 18,
    margin: 30,
  },
});

export default SearchOverlay;
