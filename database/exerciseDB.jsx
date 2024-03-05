import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchData = async (setData1, setData2, setData3, setData4) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keyValuePair = await AsyncStorage.multiGet(keys);
      keyValuePair.forEach(([key, value]) => {
        const exerciseData = JSON.parse(value);
        if (exerciseData.exerciseType === "Free Weight") {
          setData1([key, value]);
        }
        else if(exerciseData.exerciseType === "Body Weight"){
          setData2([key, value]);
        }
        else if(exerciseData.exerciseType === "Machine"){
          setData3([key, value]);
        }
        else if(exerciseData.exerciseType === "Cardio"){
          setData4([key, value]);
        }
      });
    } catch (e) {
      console.error('Failed to fetch data:', e);
    }
  };

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value,
      );
    } catch (error) {
      Alert.alert('Error', "Unknown error");
      console.log(error);
    }
  };

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === 'null') {
        return 'empty';
      } else if (value !== null) {
        return value;
      }
      return 'empty';
    } catch (e) {
      Alert.alert('Error', "Unknown error");
      console.log(error)
    }
  };

export const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      Alert.alert('Error', "Unknown error");
      console.error('Failed to clear data:', e);
    }
  };

export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Alert.alert('Error', "Unknown error");
      console.error('Failed to remove data:', e);
    }
  };