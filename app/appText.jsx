import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated,{ FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AppText() {
    const router = useRouter();
  return (
    <View className="flex-1 flex justify-end">
        
        <StatusBar style="dark" />
      <Image className="h-full w-full absolute" source={require('../assets/images/appText.png')} />

        <TouchableOpacity
            onPress={()=> router.back()}
            className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full"
            style={{height: hp(5.5), width: hp(5.5), marginTop: hp(7)}}
        >
                 <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
        </TouchableOpacity>

       
    </View>
  )
}