import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, FormData} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serverApi from '../util/server-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';

const SignUpScreen = ({navigation}) => {
  const [dataRegist, setDataRegist] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    gender: "",
    birthDate: "",
  });
  const [gender, setGender] = useState([
    {key:1, value: "Male"},
    {key:2, value: "Female"},
  ]);

  const signUp = async () => {
    // console.log(dataRegist);
    try {
      const {status, data} = await serverApi.post('register', {
        email: dataRegist.email,
        password: dataRegist.password,
        user_detail: [
          {
            name: dataRegist.name,
            address: dataRegist.address,
            gender: dataRegist.gender,
            birthDate: dataRegist.birthDate
          }
        ]
      });

      if (status === 200) {
        navigation.navigate('Login');

        setDataRegist({
          email: "",
          password: "",
          name: "",
          address: "",
          gender: "",
          birthDate: "",
        });
      } else {
        console.log(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigateToLogin = async () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView>
      <ImageBackground style={styles.background} source={require('../assets/login-bg.jpg')}>
        <View style={styles.header}>
          <View style={styles.welcomeArea}>
            <Text style={styles.welcomeText}>Fill up this form to register!</Text>
            <View style={styles.loginNav}>
              <Text style={styles.loginNavText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.buttonTextLogin}>Login</Text>
              </TouchableOpacity> 
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.inputArea}>
            <TextInput 
            style={styles.textInput} 
            placeholder="Email" 
            value={dataRegist.email}
            onChangeText={value => setDataRegist(prev => { return { ...prev, email: value } })}/>
            <TextInput 
            style={styles.textInput} 
            placeholder="Password" 
            value={dataRegist.password}
            onChangeText={value => setDataRegist(prev => { return { ...prev, password: value } })} 
            secureTextEntry={true}/>
            <TextInput 
            style={styles.textInput} 
            placeholder="Name" 
            value={dataRegist.name}
            onChangeText={value => setDataRegist(prev => { return { ...prev, name: value } })}/>
            <TextInput 
            style={styles.textInput} 
            placeholder="Address" 
            value={dataRegist.address}
            onChangeText={value => setDataRegist(prev => { return { ...prev, address: value } })}/>
            <SelectList 
              data={gender} 
              setSelected={value => setDataRegist(prev => { return { ...prev, gender: value } })}
              maxHeight={100}
              boxStyles={{backgroundColor: 'white', width: 290, margin: 5, borderRadius: 0}}
              placeholder='Select Gender'
              dropdownStyles={{backgroundColor: "white", borderRadius: 0}}
              dropdownTextStyles={{fontSize: 15}}
            />
            <TextInput 
            style={styles.textInput} 
            placeholder="Birth Date" 
            value={dataRegist.birthDate}
            onChangeText={value => setDataRegist(prev => { return { ...prev, birthDate: value } })}/>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.buttonLogin} onPress={signUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeArea: {
    alignItems: 'center',
    marginVertical: 50,
    padding: 2
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 25,
    fontStyle: 'italic',
    color: 'white'
  },
  body: {
    justifyContent: 'center',
    marginBottom: 20
  },
  inputArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    padding: 9,
    margin: 5,
    borderRadius: 0,
    width: '80%',
    paddingHorizontal: 18,
  },
  buttonArea: {
      marginBottom: 50
  },
  buttonLogin: {
      backgroundColor: '#cbad8d',
      marginVertical: 10,
      padding: 9,
      borderRadius: 0,
      width: '80%',
      height: 50,
      alignSelf: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black'
  },
  loginNav: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  loginNavText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonTextLogin: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline'
  }
  // buttonSignup: {
  //   backgroundColor: '#cbad8d',
  //   margin: 10,
  //   padding: 9,
  //   borderRadius: 25,
  //   width: '80%',
  //   height: 50,
  //   alignSelf: 'center',
  //   justifyContent: 'center'
  // },
})

export default SignUpScreen;
