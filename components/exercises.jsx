import { RefreshControl, View, Text, FlatList,TextInput, Alert, Pressable, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { RadioButton } from 'react-native-paper'; 
import { getData,fetchData, storeData, clearAllData,removeData } from '../database/exerciseDB';


export default function Exercises() {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePR, setExercisePR] = useState('');
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Free Weight'); 
  
  useEffect(() => {
    fetchData(setData1, setData2, setData3, setData4);
  }, []);

  const handleExerciseNameChange = (inputValue) => {
    setExerciseName(inputValue.trim());
  };

  const getRecord = (values) =>{
    Exercise = JSON.parse(values);
    const records = Exercise.records;
    let maxRecord = null;
    records.forEach((record) => {
    if (maxRecord === null || record.record > maxRecord) {
      maxRecord = record.record;
    }
    });
    return maxRecord;
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
    getData(exerciseName).then((result) => {
      Exercise = result;
      const currentDate = new Date().toISOString().split('T')[0];
      if(Exercise == 'empty')
      {
        Exercise = {
          name: exerciseName,
          exerciseType: selectedValue,
          records: [
            { date: currentDate, record: exercisePR },
          ],
        };
      }
      else
      {
      Exercise = JSON.parse(Exercise);
      Exercise.exerciseType = selectedValue;
      Exercise.records.push({date: currentDate, record: exercisePR});
    }
    exerciseString = JSON.stringify(Exercise);
    storeData(exerciseName, exerciseString);
    setExerciseName('');
    setExercisePR('');
    fetchData(setData1, setData2, setData3, setData4);
    });
  };

  const handleDelete = (key) => {
    removeData(key);
    fetchData(setData1, setData2, setData3, setData4);
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
          placeholder="Personal record (weight/reps/min)"
          keyboardType="numeric"
          onChangeText={handleExercisePRChange}
          value={exercisePR}
        />
      </View>
      <View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <RadioButton.Android 
              value="Free Weight"
              status={selectedValue === 'Free Weight' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('Free Weight')} 
              color="#007BFF"
            /> 
            <Text> 
              Free Weight
            </Text>    
            <RadioButton.Android 
              value="Body Weight"
              status={selectedValue === 'Body Weight' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('Body Weight')} 
              color="#007BFF"
            /> 
            <Text> 
              Body Weight
            </Text>  
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <View style={{flexDirection: "row",alignItems: 'center'}}>
            <RadioButton.Android 
              value="Machine"
              status={selectedValue === 'Machine' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('Machine')} 
              color="#007BFF"
            /> 
            <Text> 
              Machine
            </Text>     
            </View>
            <View style={{flexDirection: "row", alignItems: 'center', marginLeft: 19}}>
            <RadioButton.Android
              value="Cardio"
              status={selectedValue === 'Cardio' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('Cardio')} 
              color="#007BFF"
            /> 
            <Text> 
              Cardio
            </Text>      
            </View>
          </View>
      </View>
      <Pressable
        style={{ backgroundColor: 'gray', marginTop: 10, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginBottom: 20, elevation: 6 }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Exercises</Text>
      <FlatList
        data={data1}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Exercise: {item[0]}</Text>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>PR: {getRecord(item[1])}</Text>
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