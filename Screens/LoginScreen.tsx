import React,{useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import LoginButton from './LoginButton';

const { width, height } = Dimensions.get('window'); // Get device screen width and height

const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();  
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={{flex:1}}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.center}>
          <Image 
            source={require('./Loginpics/ribbon.png')} 
            style={[styles.image, { width: width * 0.05 }]}  // Adjusting size based on screen width
          />
          <Text style={[styles.text, { fontSize: width * 0.08 }]}>Hello</Text>
          <Image 
            source={require('./Loginpics/ribbon.png')} 
            style={[styles.image, { width: width * 0.05 }]}  // Adjusting size based on screen width
          />
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.purpletext}>Welcome</Text>
        <Text style={styles.blacktext}>Email or Mobile</Text>
        <TextInput 
        style={[styles.input, { width: width * 0.9 }]}  // Adjust width based on screen size
        placeholder="example@example.com"
        placeholderTextColor="#CA7FEB"
        value={name} 
        onChangeText={setName}
      />
        <Text style={styles.blacktext}>Password</Text>

        <View style={styles.row}>
        <TextInput 
        style={[styles.input, { width: width * 0.9 }]}  // Adjust width based on screen size
        secureTextEntry={isPasswordHidden}
        value={pass} 
        onChangeText={setPass}
      />
      <TouchableOpacity style={{position:'absolute', marginTop:30, marginLeft: width * 0.75}} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
      <Image 
            source={require('./Loginpics/eye.png')} 
          />
      </TouchableOpacity>
        </View>
        <TouchableOpacity>
        <Text style={{color:'#6B2A88'}}>Forget Password</Text>
        </TouchableOpacity>
        </View>
      <View style={{alignItems:'center',justifyContent:'center', flexDirection:'column', gap: 15, marginTop: height * 0.05 }}>
     <LoginButton name={name} pass={pass}/>
      <Text>or</Text>
      <View style={{flexDirection:'row'}}>
      <Text>Don't have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
  <Text style={styles.signup}>Sign up</Text>
</TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor:'#EABAFF',
    borderRadius:20,
    padding: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  purpletext: {
    color:'#6B2A88',
    fontSize: 24,
    fontWeight: '600',
  },
  signup: {
    color:'#6B2A88',
    fontSize: 15,
    fontWeight: '600',
  },
  col: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 70,
    marginLeft: 20,   
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    color: '#6B2A88', 
    marginHorizontal: 10,
    fontWeight: '600',
  },
  image: {
    height: 29,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image1: {
    position: 'relative',
    right: 100,
  },
  blacktext: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
});

export default LoginScreen;
