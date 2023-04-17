import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import serverApi from '../util/server-api';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [ userProfile, setUserProfile ] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    // console.log(id);
    // console.log(token);

    try {
      let {status, data} = await serverApi.get(`api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(status);
      // console.log(data);
      setUserProfile(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);

    try {
      await serverApi.post('api/logout/', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await AsyncStorage.clear();
      dispatch({ type: 'SET_LOGOUT'});
      navigation.navigate('Login');

    } catch(err) {
      Alert.alert(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome style={styles.userProfile} name="user-circle" size={80} color="gray" />
      <Text style={styles.name}>{userProfile.name}</Text>
      <View style={styles.detail}>
        <Text style={styles.field}>Email</Text>
        <Text style={styles.dataField}>{userProfile.email}</Text>
        <Text style={styles.field}>Address</Text>
        <Text style={styles.dataField}>{userProfile.address}</Text>
        <Text style={styles.field}>Gender</Text>
        {userProfile.gender === 1 
        ?
          <Text style={styles.dataField}>Male</Text>
        :
          <Text style={styles.dataField}>Female</Text>
        }
        <Text style={styles.field}>Birth Date</Text>
        <Text style={styles.dataField}>{userProfile.birthDate}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  userProfile: {
    paddingBottom: 10,
    alignSelf: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 10,
    alignSelf: 'center'
  },
  detail: {
    borderTopColor: '#ccc',
    borderTopWidth: 2,
    paddingVertical: 10
  },
  field: {
    fontSize: 17,
    fontWeight: '600',
    padding: 5
  },
  dataField: {
    fontSize: 17,
    fontWeight: '500',
    padding: 5,
  },
  logoutButton: {
    paddingVertical: 6,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'white',
  },
  logoutText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  }
})

export default ProfileScreen;
