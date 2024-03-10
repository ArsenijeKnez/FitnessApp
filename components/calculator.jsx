import { View, TextInput, Text, Alert, FlatList, Pressable , StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


export default function Calculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [max, setMax] = useState(0);

  const handleWeightChange = (inputValue) => {
    setWeight(inputValue.trim());
  };

  const handleRepsChange = (inputValue) => {
    setReps(inputValue.trim());
  };

  const handleSubmit = () => {
    if(reps == "" || weight == ""){
      Alert.alert('Invalid Input', "Enter all fields");
      return;
    }
    if (!/^\d+$/.test(reps) || !/^\d+$/.test(weight)){
      Alert.alert('Invalid Input', "Enter round numbers only");
      return;
    }
    if(reps > 10){
      Alert.alert('Reps too high', "Reps Performed must be between 1 and 10");
      return;
    }
    setMax(Math.round(weight/(1.0278-0.0278* reps)));
  };
  return (
    <View>
      <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
        <TextInput
          style={{ height: 50, width: 100, backgroundColor: 'white', borderRadius: 8, marginRight: 20, marginTop: 40, marginBottom: 30, padding: 10,elevation: 6 }}
          placeholder="Weight"
          keyboardType="numeric"
          onChangeText={handleWeightChange}
          value={weight}
        />
        <TextInput
          style={{ height: 50, width: 100, backgroundColor: 'white', borderRadius: 8, marginBottom: 30, marginTop: 40, padding: 10 ,elevation: 6}}
          placeholder="Reps"
          keyboardType="numeric"
          onChangeText={handleRepsChange}
          value={reps}
        />
      </View>
        <Pressable title="Submit" onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </Pressable>
        <Text style={styles.maxRep}>
          {max}
        </Text>
        <Text style={styles.text}>
          Estimates the maximum one-repetition weight
          someone can lift using the weight they lifted for multiple repetitions
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 53,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    elevation: 6,
    backgroundColor: '#55B881',
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    color: 'white',
  },
  maxRep: {
    textAlign: 'center',
    marginTop : 50,
    fontSize: 42,
    fontWeight: 'bold',
    color: "black",
  },
  text: {
    textAlign: 'center',
    marginTop : 40,
    fontSize: 22,
    color: "black",
  },
});