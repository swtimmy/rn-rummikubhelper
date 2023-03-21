import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IndexScreen from './view/IndexScreen';
import LoadScreen from './view/LoadScreen';
import GameSettingScreen from './view/GameSettingScreen';
import SettingScreen from './view/SettingScreen';
import PlayerScreen from './view/PlayerScreen';
import SequenceScreen from './view/SequenceScreen';
import GameScreen from './view/GameScreen';
import ResultScreen from './view/ResultScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={IndexScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Setting" component={SettingScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Load" component={LoadScreen} options={{headerShown:false}}/>
        <Stack.Screen name="GameSetting" component={GameSettingScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Player" component={PlayerScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Sequence" component={SequenceScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Game" component={GameScreen} options={{headerShown:false,gestureEnabled:false}}/>
        <Stack.Screen name="Result" component={ResultScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
