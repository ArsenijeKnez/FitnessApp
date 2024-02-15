import { View, Text, Image ,FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { menuItems } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={['top']} >
      <StatusBar style="dark" /> 
      {/* Logo & motive */}
      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
            <Text
                style={{fontSize: hp(3.8)}}
                className="font-bold tracking-wider text-emerald-500"
            >
                PLAN & TRACK
            </Text>
            <Text
                style={{fontSize: hp(3.8)}}
                className="font-bold tracking-wider text-neutral-700"
            >
                FITNESS
            </Text>
        </View>

        <View className="flex justify-center items-center space-y-2 mx-4">
            <TouchableOpacity
                onPress={()=> router.push('appText')}>
              <Image 
                  source={require('../assets/images/logo1.png')}
                  style={{height: hp(12.5), width: hp(17)}} 
                  className="rounded-[10px]"
              />
            </TouchableOpacity>
            {/*<View 
                className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300"
                style={{height: hp(5.5), width: hp(5.5)}}
            >
                <Ionicons name="archive" size={hp(3)} color="gray" />
            </View>*/}
        </View>
      </View>
      <FlatList
        data={menuItems}
        numColumns={2}
        keyExtractor={item=> item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50, paddingTop: 20}}
        columnWrapperStyle={{
            justifyContent: 'space-between'
        }}
        renderItem={({item, index})=> <MenuItemsList router={router} index={index} item={item} />}
      />

    </SafeAreaView>
  )
}

const MenuItemsList = ({item, router, index})=>{
    return (
        <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify()}>
            <TouchableOpacity
                onPress={()=> router.push({pathname: '/menuRouter', params: item})}
                style={{width: wp(44), height: wp(52)}}
                className="flex justify-end p-4 mb-4">
                    <Image 
                        source={item.image}
                        resizeMode='cover'
                        style={{width: wp(44), height: wp(52)}}
                        className="rounded-[25px] absolute"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.9)']}
                        style={{width: wp(44), height: hp(11)}}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        className="absolute bottom-0 rounded-b-[25px]"
                    />

                    <Text
                        style={{fontSize: hp(2.4)}}
                        className="text-white font-semibold text-center tracking-wide"
                    >
                        {item?.name}
                    </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}