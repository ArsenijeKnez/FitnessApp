import { View, Text, FlatList,TextInput, Alert, Pressable, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'


export default function Exercises() {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePR, setExercisePR] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const keyValuePair = await AsyncStorage.multiGet(keys);
        setData(keyValuePair);
      } catch (e) {
        console.error('Failed to fetch data:', e);
      }
    };

    fetchData();
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
    clearAllData();
    storeData(exerciseName, exercisePR);
    setExerciseName('');
    setExercisePR('');
  };
  
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value,
      );
    } catch (error) {
      Alert.alert('Error', "Unknown error");
      console.log(error);
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
      console.log(error)
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Failed to clear data:', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>New Exercise</Text>
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
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 }}>
            <Text style={{ fontSize: 16 }}>{item[0]}</Text>
            <Text style={{ fontSize: 14, color: '#6b7280' }}>{item[1]}</Text>
          </View>
        )}
        keyExtractor={(item) => item[0]}
        style={{ width: '100%' }}
      />
    </View>

  )
} 