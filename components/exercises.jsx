import { RefreshControl, View, Text, FlatList,TextInput, Alert, Pressable, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { getData,fetchData, storeData, clearAllData,removeData } from '../database/exerciseDB';


export default function Exercises() {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePR, setExercisePR] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData);
  }, []);

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
    storeData(exerciseName, exercisePR);
    setExerciseName('');
    setExercisePR('');
  };

  const handleDelete = (key) => {
    removeData(key);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add or update exercise</Text>
      <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20, width: '100%', paddingHorizontal: 10, elevation: 6 }}>
        <TextInput
          style={{ height: 50, padding: 10 }}
          placeholder="Exercise name"
          onChangeText={handleExerciseNameChange}
          value={exerciseName}
        />
      </View>
      <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20, width: '100%', paddingHorizontal: 10, elevation: 6 }}>
        <TextInput
          style={{ height: 50, padding: 10 }}
          placeholder="Exercise personal record"
          keyboardType="numeric"
          onChangeText={handleExercisePRChange}
          value={exercisePR}
        />
      </View>
      <Pressable
        style={{ backgroundColor: 'gray', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginBottom: 20, elevation: 6 }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Exercises</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Exercise: {item[0]}</Text>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>PR: {item[1]}</Text>
            </View>
            <Pressable 
              onPress={() => handleDelete(item[0])}
              style={{ backgroundColor: 'red', paddingHorizontal: 8, marginVertical: 2, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 6.4}}>Delete</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item[0]}
        style={{ width: '100%' }}
      />
    </View>

  )
} 