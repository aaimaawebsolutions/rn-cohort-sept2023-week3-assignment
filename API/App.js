import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  View } from 'react-native';
import JobStories from './components/JobStories';
import ShowStories from './components/ShowStories';
import NewStories from './components/NewStories';
import AskStories from './components/AskStories';
import NewsList from './components/NewsList';

import { Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = ({  }) => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Button
                  mode='text'
                  title="Job Stories"
                  onPress={() => navigation.navigate('JobStories')}
                >jobs
                </Button>
                <Button
                  mode='text'
                  title="Show Stories"
                  onPress={() => navigation.navigate('ShowStories')}
                >show
                </Button>
                <Button
                  mode='text'
                  title="New Stories"
                  onPress={() => navigation.navigate('NewStories')}
                >new
                </Button>
                <Button
                  mode='text'
                  title="Ask Stories"
                  onPress={() => navigation.navigate('AskStories')}
                >ask
                </Button>
              </View>
            ),
          })}
        />
        <Stack.Screen name="JobStories" component={JobStories} />
        <Stack.Screen name="ShowStories" component={ShowStories} />
        <Stack.Screen name="NewStories" component={NewStories} />
        <Stack.Screen name="AskStories" component={AskStories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  return (
    <View>
      <NewsList></NewsList>
    </View>
  );
};

export default App;
