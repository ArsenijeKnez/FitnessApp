import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view'
import Calculator from '../components/calculator';

export default function Router() {
    const router = useRouter();
    const item = useLocalSearchParams();
    // console.log('got item: ', item);

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

        {/* exercises */}
        <View className="mx-4 space-y-3 mt-4">
            <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700">
                {item.name}
            </Text>
            <View className="mb-10">

            </View>
        </View>
    </ScrollView>
  )
}