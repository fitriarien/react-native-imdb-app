import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigations/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/store/store';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
    // <SignUpScreen />
    // <ProfileScreen />
  );
}
