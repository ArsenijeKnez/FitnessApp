import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated,{ FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile() {
    const router = useRouter();
  return (
    <View className="flex-1 flex justify-end">
        
        <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('../assets/images/profile.png')} />

      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{width: wp(100), height: hp(70)}}
        start={{x: 0.5, y: 0}}
        end= {{x: 0.5, y: 0.8}}
        className="flex justify-end pb-12 space-y-8"
       >
        <TouchableOpacity
            onPress={()=> router.back()}
            className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full"
            style={{height: hp(5.5), width: hp(5.5), marginTop: hp(7)}}
        >
                 <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
        </TouchableOpacity>

        <Animated.View entering={FadeInDown.delay(550).springify()}>
            <TouchableOpacity
                onPress={()=> router.push('home')}
                style={{height: hp(7), width: wp(80)}}
                className="bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
            >
                <Text style={{fontSize: hp(3)}} className="text-white font-bold tracking-widest">
                    Završi podešavanje profila
                </Text>
            </TouchableOpacity>
        </Animated.View>
       </LinearGradient>
       
    </View>
  )
}