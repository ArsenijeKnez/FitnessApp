import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Progress() {
  const data = {
    labels: ['Feb 1', 'Feb 2', 'Feb 3', 'Feb 4', 'Feb 5', 'Feb 6'], // Use your actual dates here
    datasets: [
      {
        data: [50, 55, 52, 60, 58, 62], // Use your actual records here
      },
    ],
  };
  return (
<View>
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>Exercise Records</Text>
      <LineChart
        data={data}
        width={wp(90)}
        height={220}
        yAxisSuffix="kg"
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
    </View>
  )
}