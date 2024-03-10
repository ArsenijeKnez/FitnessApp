import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchExercises = async (setData1, setData2, setData3, setData4) => {
    try {
      const Allkeys = await AsyncStorage.getAllKeys();
      const keys = Allkeys.filter(key => key.startsWith('e')) 
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

  export const fetchExerciseNames = async (setExerciseNames) => {
    const Allkeys = await AsyncStorage.getAllKeys();
    const keys = Allkeys.filter(key => key.startsWith('e'));
    const keyValuePair = await AsyncStorage.multiGet(keys);
    const exerciseNames = keyValuePair.map(([key, value]) => key.substring(1));
    setExerciseNames(exerciseNames);
  };

  export const fetchExpense = async (setPurchases) => {
    try {
      const Allkeys = await AsyncStorage.getAllKeys();
      const keys = Allkeys.filter(key => key.startsWith('p')) 
      const keyValuePair = await AsyncStorage.multiGet(keys);
      
      setPurchases(keyValuePair);
    } catch (e) {
      console.error('Failed to fetch data:', e);
    }
  };

  export const fetchPlan = async (setPlan) => {
    try {
      const Allkeys = await AsyncStorage.getAllKeys();
      const keys = Allkeys.filter(key => key.startsWith('w')) 
      const keyValuePair = await AsyncStorage.multiGet(keys);
      
      setPlan(keyValuePair);
    } catch (e) {
      console.error('Failed to fetch data:', e);
    }
  };


export const storeExercise = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        'e'+key,
        value,
      );
    } catch (error) {
      Alert.alert('Error', "Unknown error");
      console.log(error);
    }
  };

export const storePlan = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        'w'+key,
        value,
      );
    } catch (error) {
      Alert.alert('Error', "Unknown error");
      console.log(error);
    }
  };

  export const storeExpense = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        'p'+key,
        value,
      );
    } catch (error) {
      Alert.alert('Error', "Unknown error");
      console.log(error);
    }
  };

export const getExercise = async (key) => {
    try {
      const value = await AsyncStorage.getItem('e'+key);
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

export const getExpense = async (key) => {
    try {
      const value = await AsyncStorage.getItem('p'+key);
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

export const getPlan = async (key) => {
    try {
      const value = await AsyncStorage.getItem('w'+key);
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

export const removeExercise = async (key) => {
    try {
      await AsyncStorage.removeItem('e'+key);
    } catch (e) {
      Alert.alert('Error', "Unknown error");
      console.error('Failed to remove data:', e);
    }
  };

  export const removePlan = async (key) => {
    try {
      await AsyncStorage.removeItem('w'+key);
    } catch (e) {
      Alert.alert('Error', "Unknown error");
      console.error('Failed to remove data:', e);
    }
  };

  export const removeExpense = async (key) => {
    try {
      await AsyncStorage.removeItem('p'+key);
    } catch (e) {
      Alert.alert('Error', "Unknown error");
      console.error('Failed to remove data:', e);
    }
  };