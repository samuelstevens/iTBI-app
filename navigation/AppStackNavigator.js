import { createStackNavigator } from 'react-navigation';

import DocumentListScreen from '../screens/app/DocumentListScreen';
import DocumentViewScreen from '../screens/app/DocumentViewScreen';

const AppStack = createStackNavigator({
  DocumentList: DocumentListScreen,
  DocumentView: DocumentViewScreen,
});


export default AppStack;
