import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view'
import Calculator from '../components/calculator';
import Progress from '../components/progress';
import Notification from '../components/notification';
import Planner from '../components/planner';
import Finances from '../components/finances';
import Exercises from '../components/exercises';

function DetermineFunction({param}) {
    switch (param) {
      case 'One Rep Calculator':
        return (<Calculator/>);
      case 'Progress':
        return (<Progress/>);
      case 'Notification':
        return (<Notification/>);
      case 'Planner':
        return (<Planner/>);
      case 'Finances':
        return (<Finances/>);
      case 'Exercises':
        return (<Exercises/>);
      default:
        return (<Text>Not Implemented</Text>)
    }
  }


export default function Router() {
    const router = useRouter();
    const item = useLocalSearchParams();

  return (
    <ScrollView>
        <StatusBar style="dark" />

        <TouchableOpacity
            onPress={()=> router.back()}
            className="mx-4 absolute flex justify-center items-center pr-1"
            style={{height: hp(5.5), width: hp(5.5), marginTop: hp(7)}}
        >
                 <Ionicons name="arrow-back" size={hp(6)} color="black" />
        </TouchableOpacity>

        <Image 
            source={item.image}
            style={{width: wp(55), height: hp(25), marginLeft: 84, marginTop: 50}}
            className="rounded-[25px]"
        />

        <View className="mx-4 space-y-3 mt-4">
            <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700">
                {item.name}
            </Text>
            <View className="mb-10">
                <DetermineFunction param={item.name}/>
            </View>
        </View>
    </ScrollView>
  )
}
  