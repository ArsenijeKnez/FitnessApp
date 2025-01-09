import { RefreshControl, View, Text, FlatList,TextInput, Alert, Pressable, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Confetti from 'react-native-confetti';
import React, { useState, useEffect , useRef } from 'react'
import { RadioButton } from 'react-native-paper'; 
import { getExercise, fetchExercises, storeExercise, clearAllData,removeExercise } from '../database/exerciseDB';


export default function Exercises() {
  const [exerciseName, setExerciseName] = useState('');
  const [exercisePR, setExercisePR] = useState('');
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Free Weight'); 
  const confettiRef = useRef(null);
  
  useEffect(() => {
    fetchExercises(setData1, setData2, setData3, setData4);
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
      Alert.alert('Invalid Input', "Enter max weight/reps/min in round numbers only");
      return;
    }
    getExercise(exerciseName).then((result) => {
      Exercise = result;
      const currentDate = new Date().toISOString().split('T')[0];
      if (Exercise == 'empty') {
        confettiRef.current?.startConfetti();
        Exercise = {
          name: exerciseName,
          exerciseType: selectedValue,
          records: [
            { date: currentDate, record: exercisePR },
          ],
        };
      } else {
        Exercise = JSON.parse(Exercise);
        Exercise.exerciseType = selectedValue;
        Exercise.records.push({ date: currentDate, record: exercisePR });
      
        let previousRecord = Exercise.records[Exercise.records.length - 2]?.record || 0;
        if (exercisePR > previousRecord) {
          confettiRef.current?.startConfetti();
        }
      }


      exerciseString = JSON.stringify(Exercise);
      storeExercise(exerciseName, exerciseString);
      setExerciseName('');
      setExercisePR('');
      fetchExercises(setData1, setData2, setData3, setData4);
    });
  };

  const handleDelete = (key) => {
    removeExercise(key).then(() => {
      fetchExercises(setData1, setData2, setData3, setData4);
    });
  };

  const handleRemoveAll= () => {
    clearAllData().then(() => {
      setData1([]);
      setData2([]);
      setData3([]);
      setData4([]);
      fetchExercises(setData1, setData2, setData3, setData4);
    });
  };

  const handleLoadTest= () => {
    clearAllData();

      const exerciseData1 = {
        name: 'Push-ups',
        exerciseType: 'Body Weight',
        records: [
          { date: '2024-02-26', record: 30 },
          { date: '2024-02-27', record: 32 },
          { date: '2024-02-28', record: 35 },
        ],
      };
      exerciseString = JSON.stringify(exerciseData1);
      storeExercise('Push-ups', exerciseString);
    
    
      const exerciseData2 = {
          name: 'Bench Press',
          exerciseType: 'Free Weight',
          records: [
              { date: '2024-02-26', record: 150 },
              { date: '2024-02-27', record: 155 },
              { date: '2024-02-28', record: 160 },
          ],
      };
      exerciseString = JSON.stringify(exerciseData2);
      storeExercise('Bench Press', exerciseString);
    
      const exerciseData3 = {
          name: 'Running',
          exerciseType: 'Cardio',
          records: [
              { date: '2024-02-26', record: 30 },
              { date: '2024-02-27', record: 32 },
              { date: '2024-02-28', record: 35 },
          ],
      };
      exerciseString = JSON.stringify(exerciseData3);
      storeExercise('Running', exerciseString);
    
      const exerciseData4 = {
        name: 'Squats',
        exerciseType: 'Free Weight',
        records: [
            { date: '2024-02-26', record: 100 },
            { date: '2024-02-27', record: 105 },
            { date: '2024-02-28', record: 110 },
        ],
    };
    exerciseString = JSON.stringify(exerciseData4);
    storeExercise('Squats', exerciseString);

    const exerciseData5 = {
        name: 'Pull-ups',
        exerciseType: 'Body Weight',
        records: [
            { date: '2024-02-26', record: 15 },
            { date: '2024-02-27', record: 16 },
            { date: '2024-02-28', record: 17 },
        ],
    };
    exerciseString = JSON.stringify(exerciseData5);
    storeExercise('Pull-ups', exerciseString);

    const exerciseData6 = {
      name: 'Cycling',
      exerciseType: 'Cardio',
      records: [
          { date: '2024-02-26', record: 20 },
          { date: '2024-02-27', record: 22 },
          { date: '2024-02-28', record: 25 },
      ],
    };
    exerciseString = JSON.stringify(exerciseData6);
    storeExercise('Cycling', exerciseString);

    fetchExercises(setData1, setData2, setData3, setData4);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Confetti
        ref={confettiRef}
        duration={2600} 
        confettiCount={40}
        size={1.2} 
        
      />
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
              color='#55B881'
            /> 
            <Text> 
              Free Weight
            </Text>    
            <RadioButton.Android 
              value="Body Weight"
              status={selectedValue === 'Body Weight' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('Body Weight')} 
              color='#55B881'
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
              color='#55B881'
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
              color='#55B881'
            /> 
            <Text> 
              Cardio
            </Text>      
            </View>
          </View>
      </View>
      <Pressable
        style={{ backgroundColor: '#55B881', marginTop: 10, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginBottom: 20, elevation: 6 }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Exercises</Text>

      <FlatList
        data={data1}
        renderItem={({ item ,index}) => (
          <View>
           {index === 0 && (
            <Text style={{ fontSize: 14, marginBottom: 6, marginLeft: 5, alignSelf: "flex-start" }}>Free Weight</Text>
           )}
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Exercise: {item.key.substring(1)}</Text>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>PR: {getRecord(item.value)}</Text>
            </View>
            <Pressable 
              onPress={() => handleDelete(item.key.substring(1))}
              style={{ backgroundColor: 'red', paddingHorizontal: 8, marginVertical: 2, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 6.4}}>Delete</Text>
            </Pressable>
          </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />
      <FlatList
        data={data2}
        renderItem={({ item ,index}) => (
          <View>
           {index === 0 && (
            <Text style={{ fontSize: 14, marginBottom: 6, marginLeft: 5, alignSelf: "flex-start" }}>Body Weight</Text>
           )}
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Exercise: {item.key.substring(1)}</Text>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>PR: {getRecord(item.value)}</Text>
            </View>
            <Pressable 
              onPress={() => handleDelete(item.key.substring(1))}
              style={{ backgroundColor: 'red', paddingHorizontal: 8, marginVertical: 2, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 6.4}}>Delete</Text>
            </Pressable>
          </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />

      <FlatList
        data={data3}
        renderItem={({ item ,index}) => (
          <View>
           {index === 0 && (
            <Text style={{ fontSize: 14, marginBottom: 6, marginLeft: 5, alignSelf: "flex-start" }}>Machine</Text>
           )}
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Exercise: {item.key.substring(1)}</Text>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>PR: {getRecord(item.value)}</Text>
            </View>
            <Pressable 
              onPress={() => handleDelete(item.key.substring(1))}
              style={{ backgroundColor: 'red', paddingHorizontal: 8, marginVertical: 2, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 6.4}}>Delete</Text>
            </Pressable>
          </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />

      <FlatList
        data={data4}
        renderItem={({ item ,index}) => (
          <View>
           {index === 0 && (
            <Text style={{ fontSize: 14, marginBottom: 6, marginLeft: 5, alignSelf: "flex-start" }}>Cardio</Text>
           )}
            <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Exercise: {item.key.substring(1)}</Text>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>PR: {getRecord(item.value)}</Text>
            </View>
            <Pressable 
              onPress={() => handleDelete(item.key.substring(1))}
              style={{ backgroundColor: 'red', paddingHorizontal: 8, marginVertical: 2, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 6.4}}>Delete</Text>
            </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />
      <Pressable
        style={{ backgroundColor: '#55B881', marginTop: 30, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginBottom: 20, elevation: 6 }}
        onPress={handleLoadTest}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Load Test Data</Text>
      </Pressable>
      <Pressable
        style={{ backgroundColor: 'red', marginTop: 30, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginBottom: 20, elevation: 6 }}
        onPress={handleRemoveAll}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Remove all data</Text>
      </Pressable>
    </View>

  )
} 