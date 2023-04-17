import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const MoviewithFirestore = () => {
  const [movies, setMovies] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const moviesCollection = collection(db, 'movie');
  
  useEffect(() => {
    // const unsubscribe =  async () => {
    //   setMovies([]);
    //   try {
    //     const querySnapshot = await getDocs(moviesCollection);
    //     // console.log(querySnapshot)
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data());
    //       let movies = { id: doc.id, ...doc.data()};

    //       setMovies(currMovie => {
    //         return [ ...currMovie, movies]
    //       })
    //     })
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // unsubscribe();

  }, []);

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registration");
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  }

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Login");
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <SafeAreaView>
      {/* <Text>Movie Screen</Text> */}
      {/* {movies.map((movie) => {
        return (
          <View key={movie.id}>
            <Text>{movie.title}</Text>
            <Text>{movie.year}</Text>
            {movie.cast && <Text>{movie.cast}</Text>}
          </View>
        )
      })} */}

      <View style={styles.body}>
        <View style={styles.inputArea}>
          <TextInput style={styles.textInput} placeholder="Username" value={email} onChangeText={setEmail}/>
          <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={setPassword}/>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttonLogin} onPress={signUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.inputArea}>
          <TextInput style={styles.textInput} placeholder="Username" value={email} onChangeText={setEmail}/>
          <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={setPassword}/>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttonLogin} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    marginTop: 20,
  },
  inputArea: {
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    padding: 10,
    borderRadius: 25,
    width: '80%'
  },
  buttonArea: {
      marginBottom: 50
  },
  buttonLogin: {
      backgroundColor: '#6e3f25',
      margin: 10,
      padding: 10,
      borderRadius: 25,
      width: '80%',
      height: 50,
      alignSelf: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white'
  },
})

export default MoviewithFirestore;
