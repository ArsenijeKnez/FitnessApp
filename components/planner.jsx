import { View, Text, FlatList, Pressable,StyleSheet, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getPlan, fetchExerciseNames, storePlan, removePlan } from '../database/exerciseDB';

export default function Planner() {
  const [exerciseNames, setExerciseNames] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  useEffect(() => {
    fetchExerciseNames(setExerciseNames);
  }, []);

  const handleExerciseSelection = (day, exerciseName) => {
    const updatedSelectedExercises = { ...selectedExercises };
    if (updatedSelectedExercises[day].includes(exerciseName)) {
      updatedSelectedExercises[day] = updatedSelectedExercises[day].filter((name) => name !== exerciseName);
    } else {
      updatedSelectedExercises[day] = [...updatedSelectedExercises[day], exerciseName];
    }
    setSelectedExercises(updatedSelectedExercises);
  };

  const handleSubmit = () => {
    //removePlan();
    const selectedExercisesString = JSON.stringify(selectedExercises);
    storePlan('pPlan', selectedExercisesString)
  };

  const renderDay = (day) => {
    return (
      <View>
        <Text>{day}</Text>
        <FlatList
          data={exerciseNames}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleExerciseSelection(day, item)}
              style={{
                backgroundColor: selectedExercises[day].includes(item) ? '#55B881' : 'white',
                padding: 10,
                marginVertical: 5,
                borderRadius: 5,
              }}
            >
              <Text>{item}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  return (
    <View>  
      <Text style={styles.text}>
        Select exercises you want to complete for each day of the week
      </Text>
      <View style={{ flex: 1, padding: 20 }}>
        {Object.keys(selectedExercises).map((day) => renderDay(day))}
      </View>
      <Pressable title="Submit" onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit plan</Text>
        </Pressable>
    </View>
  );
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
  text: {
    textAlign: 'center',
    marginTop : 15,
    fontSize: 22,
    color: "black",
  },
});