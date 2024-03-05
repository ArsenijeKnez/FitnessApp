import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchData = async (setData1, setData2, setData3, setData4) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keyValuePair = await AsyncStorage.multiGet(keys);
      const data1 = [];
      const data2 = [];
      const data3 = [];
      const data4 = [];
      keyValuePair.forEach(([key, value]) => {
        const exerciseData = JSON.parse(value);
        if (exerciseData.exerciseType === "Free Weight") {
          data1.push({ key, value });
        }
        else if (exerciseData.exerciseType === "Body Weight") {
          data2.push({ key, value });
        }
        else if (exerciseData.exerciseType === "Machine") {
          data3.push({ key, value });
        }
        else if (exerciseData.exerciseType === "Cardio") {
          data4.push({ key, value });
        }

        setData1(data1);
        setData2(data2);
        setData3(data3);
        setData4(data4);
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