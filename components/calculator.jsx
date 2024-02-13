import { View, TextInput, Text, Alert, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


export default function Calculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [max, setMax] = useState('');

  const handleWeightChange = (inputValue) => {
    setWeight(inputValue);
  };

  const handleRepsChange = (inputValue) => {
    setReps(inputValue);
  };

  const handleSubmit = () => {
    if(reps.trim() == "" || weight.trim() == ""){
      Alert.alert('Invalid Input', "Enter all fields");
      return;
    }
    if (!/^\d+$/.test(reps) || !/^\d+$/.test(weight)){
      Alert.alert('Invalid Input', "Enter numbers only");
      return;
    }
    if(reps > 10){
      Alert.alert('Reps too high', "Reps Performed must be between 1 and 10");
      return;
    }
    setMax(Math.round(weight/(1.0278-0.0278* reps)));
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Weight"
        keyboardType="numeric"
        onChangeText={handleWeightChange}
        value={weight}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Reps"
        keyboardType="numeric"
        onChangeText={handleRepsChange}
        value={reps}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text>{max}</Text>
    </View>
  )
}