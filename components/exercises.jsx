import { View, Text, FlatList,TextInput, TouchableOpacity } from 'react-native'
import {AsyncStorage} from 'react-native';
import React, { useState } from 'react'


export default function Exercises() {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePR, setExercisePR] = useState('');

  const handleExerciseNameChange = (inputValue) => {
    setExerciseName(inputValue.trim());
  };

  const handleExercisePRChange = (inputValue) => {
    setExercisePR(inputValue.trim());
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
          onChangeText={handleExercisePRChange}
          value={exercisePR}
        />
    </View>
  )
}