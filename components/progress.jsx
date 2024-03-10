import { View, Text, FlatList,Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LineChart } from 'react-native-chart-kit';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getExercise,fetchExercises, storeExercise, clearAllData,removeExercise } from '../database/exerciseDB';


export default function Progress() {

  const [data, setData] = useState({ labels: ['', ''], datasets: [{ data: [0, 0] }] });
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [type, setType] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchExercises(setData1, setData2, setData3, setData4).then(() => {
    //const value= JSON.parse(data1[0].value);
    //const records = value.records;
    //console.log(records);
    //const exerciseData = {
    //  labels: records.map((record) => record.date),
    //    datasets: [
    //      {
    //        data: records.map((record) => record.record),
    //      },
    //    ],
    //};
    //setData(exerciseData);
  });
  }, []);

  const handleDisplay = (displayData) => {
    const value = JSON.parse(displayData.value);
    const records = value.records;
    //const Etype = value.exerciseType;
    if(value.exerciseType == "Cardio"){
      setType(" min");
    }
    else if(value.exerciseType == "Body Weight"){
      setType(" reps");
    }
    else{
      setType(" kg");
    }
    if(records.length > 1 ){
      if(records.length < 5){
      const exerciseData = {
        labels: records.map((record) => record.date),
          datasets: [
            {
              data: records.map((record) => record.record),
            },
          ],
      };
      setData(exerciseData);
      }
      else{
        const exerciseData = {
          labels: records.map((record) => record.date),
            datasets: [
              {
                data: records.map((record) => record.record),
              },
            ],
        };
        for(id = 1; id < records.length-1; id++){
          exerciseData.labels[id] = "";
        }
        setData(exerciseData);
      }
    }
    else{
      const exerciseData = {
        labels: ['start', records[0].date],
          datasets: [
            {
              data: ['0',records[0].record],
            },
          ],
      };
      setData(exerciseData);
    }

  };

  return (
<View>
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>Exercise Records</Text>
      <LineChart
        data={data}
        width={wp(90)}
        height={220}
        yAxisSuffix={type}
        chartConfig={{
          backgroundColor: '#e6f7e9',
          backgroundGradientFrom: '#e6f7e9',
          backgroundGradientTo: '#c8e6c9',
          decimalPlaces: 0, 
          color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`, 
          labelColor: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`, 
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: "center" }}>All Exercises:</Text>

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
            </View>
            <Pressable 
              onPress={() => handleDisplay(item)}
              style={{ backgroundColor: '#55B881', paddingHorizontal: 12, marginVertical: 4, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, paddingVertical: 4}}>Show</Text>
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
            </View>
            <Pressable 
              onPress={() => handleDisplay(item)}
              style={{ backgroundColor: '#55B881', paddingHorizontal: 12, marginVertical: 4, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, paddingVertical: 4}}>Show</Text>
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
            </View>
            <Pressable 
              onPress={() => handleDisplay(item)}
              style={{ backgroundColor: '#55B881', paddingHorizontal: 12, marginVertical: 4, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, paddingVertical: 4}}>Show</Text>
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
            </View>
            <Pressable 
              onPress={() => handleDisplay(item)}
              style={{ backgroundColor: '#55B881', paddingHorizontal: 12, marginVertical: 4, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, paddingVertical: 4}}>Show</Text>
            </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />

    </View>
    
  )
}