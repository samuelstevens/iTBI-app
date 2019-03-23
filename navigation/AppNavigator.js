import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';

export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStackNavigator,
  Auth: AuthStackNavigator,
},
{
  initialRouteName: 'AuthLoading',
}));
