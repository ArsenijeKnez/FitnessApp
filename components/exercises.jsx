import { View, Text, FlatList,TextInput, Alert, Pressable, TouchableOpacity } from 'react-native'
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'


export default function Exercises() {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePR, setExercisePR] = useState('');
 

  const handleExerciseNameChange = (inputValue) => {
    setExerciseName(inputValue.trim());
  };

  const handleExercisePRChange = (inputValue) => {
    setExercisePR(inputValue.trim());
  };

  const handleSubmit = () => {
    if(exerciseName == "" || exercisePR == ""){
      Alert.alert('Invalid Input', "Enter all fields");
      return;
    }
    if (!/^\d+$/.test(exercisePR)){
      Alert.alert('Invalid Input', "Enter pr weight in round numbers only");
      return;
    }
    Alert.alert('Pamti', exerciseName + exercisePR);
    storeData();
  };
  
  const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        'I like to save it.',
      );
    } catch (error) {
      Alert.alert('Error', "Unknown error");
      console.log(error)
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      Alert.alert('Error', "Unknown error");
    }
  };

  return (
    <View className="flex-1 flex space-y-5 justify-center items-center">
      <TextInput
          style={{ height: 50, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 30, marginTop: 40, padding: 10 }}
          placeholder="Exercise name"
          onChangeText={handleExerciseNameChange}
          value={exerciseName}
        />
      <TextInput
          style={{ height: 50, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 30, marginTop: 40, padding: 10 }}
          placeholder="Exercise personal record"
          keyboardType="numeric"
          onChangeText={handleExercisePRChange}
          value={exercisePR}
        />
        <Pressable title="Submit" onPress={handleSubmit} >
          <Text >submit</Text>
        </Pressable>


    </View>
  )
}