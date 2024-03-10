import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { storeData, getData, fetchExpense,removeData} from '../database/exerciseDB';

export default function Finances() {
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchExpense(setPurchases);
  }, []);

  const handlePurchaseNameChange = (inputValue) => {
    setPurchaseName(inputValue.trim());
  };

  const handlePurchaseAmountChange = (inputValue) => {
    setPurchaseAmount(inputValue.trim());
  };

  const handleAddPurchase = () => {
    if (purchaseName == "" || purchaseAmount == "") {
      Alert.alert("Invalid Input", "Enter all fields");
      return;
    }
    if (!/^\d+$/.test(purchaseAmount)){
      Alert.alert('Invalid Input', "Enter amount in round numbers only");
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0];
    const newPurchase = {
      name: purchaseName,
      amount: purchaseAmount,
      date: currentDate,
    };
    stringPurchase = JSON.parse(newPurchase);
    storeData(purchaseName, stringPurchase).then(() => {
      setPurchaseName('');
      setPurchaseAmount('');
      fetchExpense(setPurchases);
    });
  };

  const handleDeletePurchase = (purchase) => {
    removeData(purchase);
    fetchExpense(setPurchases);
    //Alert.alert('Delete', 'Are you sure you want to delete this purchase?', [
    //  { text: 'Cancel', style: 'cancel' },
    //  { text: 'Delete', onPress: () => console.log('Delete pressed') },
    //]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Expense</Text>
      <TextInput
        style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Expense Name"
        onChangeText={handlePurchaseNameChange}
        value={purchaseName}
      />
      <TextInput
        style={{ height: 50, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Amount"
        keyboardType="numeric"
        onChangeText={handlePurchaseAmountChange}
        value={purchaseAmount}
      />
      <Pressable
        style={{ backgroundColor: '#55B881', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginBottom: 20 }}
        onPress={handleAddPurchase}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Add Purchase</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Purchases</Text>
      <FlatList
        data={purchases}
        renderItem={({ item ,index}) => (
          <View style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, elevation: 6 ,flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 16 }}>Expense: {item.key}</Text>
            </View>
            <Pressable 
              onPress={() => handleDeletePurchase(item.key)}
              style={{ backgroundColor: 'red', paddingHorizontal: 8, marginVertical: 2, borderRadius: 4,  marginLeft: 'auto' }}>
              <Text style={{ color: 'white', fontSize: 16, marginTop: 6.4}}>Delete</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />
    </View>
  );
}
