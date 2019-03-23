import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/auth/SignInScreen';

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
});


export default AuthStack;
