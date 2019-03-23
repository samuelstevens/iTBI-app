import React from 'react';
import {
  SafeAreaView, StyleSheet, TextInput, FlatList,
} from 'react-native';
import colors from '../constants/Colors';
import { getResults } from '../api/api';

import { DocumentListItem, DocumentListSeparator } from './DocumentListItem';

class SearchOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '', results: [] };
  }

  _handleOnChange = search => {
    this.setState({ search });
    getResults(({ results }) => {
      this.setState({ results: results.map(result => ({ key: result })) });
    }, search);
  };

  _renderItem = ({ item }) => (
    <DocumentListItem
      item={item}
      onPress={() => this.props.navigateTo(item.key)}
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
