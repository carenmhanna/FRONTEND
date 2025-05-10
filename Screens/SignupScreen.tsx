import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import NextSignUp from './NextSignUp';

const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nb, setNb] = useState('');
  const [pass, setPass] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ScrollView style={styles.container}>
            <View style={styles.topView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.backButton}
              >
                <Image
                  source={require('./Signuppics/vector.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={[styles.text, { fontSize: width * 0.08 }]}>
                New Account
              </Text>
            </View>

            <View style={styles.bar}>
              <Image
                source={require('./Signuppics/one.png')}
                style={styles.stepImage}
              />
              <Image
                source={require('./Signuppics/line.png')}
                style={styles.stepLine}
              />
              <Image
                source={require('./Signuppics/two.png')}
                style={styles.stepImage}
              />
              <Image
                source={require('./Signuppics/line.png')}
                style={styles.stepLine}
              />
              <Image
                source={require('./Signuppics/three.png')}
                style={styles.stepImage}
              />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[styles.input, { width: width * 0.9 }]}
                placeholder="Enter your full name"
                placeholderTextColor="#CA7FEB"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Password</Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { width: width * 0.9 }]}
                  secureTextEntry={isPasswordHidden}
                  placeholder="Password"
                  placeholderTextColor="#CA7FEB"
                  value={pass}
                  onChangeText={setPass}
                />
                <TouchableOpacity
                  style={{ position: 'absolute', right: 30 }}
                  onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                >
                  <Image
                    source={require('./Signuppics/eye.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, { width: width * 0.9 }]}
                placeholder="Enter your email"
                placeholderTextColor="#CA7FEB"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={[styles.input, { width: width * 0.9 }]}
                placeholder="Enter your mobile number"
                placeholderTextColor="#CA7FEB"
                keyboardType="phone-pad"
                value={nb}
                onChangeText={setNb}
              />

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: height * 0.05,
                }}
              >
                <Text style={styles.termsText}>By continuing, you agree to </Text>
                <View style={styles.termsRow}>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Terms of Use </Text>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>or </Text>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <NextSignUp name={name} nb={nb} email={email} pass={pass} />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.signup}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.08, // Increased spacing from top
    marginBottom: height * 0.04,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  text: {
    color: '#6B2A88',
    fontWeight: '600',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
    height: height * 0.08, // Increased height for visual balance
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EABAFF',
    borderRadius: 20,
    padding: 15,
    height: 60,
    marginBottom: 10,
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#EABAFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  termsText: {
    color: '#666',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#6B2A88',
    fontWeight: '500',
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  loginText: {
    color: '#666',
  },
  signup: {
    color: '#6B2A88',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  stepImage: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  stepLine: {
    width: width * 0.2,
    height: 17,
    resizeMode: 'contain',
  },
});

export default SignupScreen;
