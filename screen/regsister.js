import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const setfirstname = (firstname) => ({ type: 'SET_firstname', payload: firstname });
const setlastname = (lastname) => ({ type: 'SET_lastname', payload: lastname });
const setDob = (dob) => ({ type: 'SET_DOB', payload: dob });
const setphonenumber = (phonenumber) => ({ type: 'SET_phonenumber', payload: phonenumber });
const setemail = (email) => ({ type: 'SET_Email', payload: email });
const setdistrict = (district) => ({ type: 'SET_District', payload: district });
const setstate = (state) => ({ type: 'SET_state', payload: state });
const setcity = (city) => ({ type: 'SET_city', payload: city });
const setgender = (gender) => ({ type: 'SET_gender', payload: gender });
const setpassword = (password) => ({ type: 'SET_password', payload: password });
const setconfirmpassword = (confirmpassword) => ({ type: 'SET_confirmpassword', payload: confirmpassword });
const setFieldError = (field, error) => ({ type: 'SET_FIELD_ERROR', payload: { field, error } });
const setDegreeBA = (value) => ({ type: 'SET_DEGREE_BA', payload: value });
const setDegreeBE = (value) => ({ type: 'SET_DEGREE_BE', payload: value });


function Register() {
    const dispatch = useDispatch();
    const [showDatePicker, setShowDatePicker] = useState(false)
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const date = selectedDate.toISOString().split('T')[0];  
            dispatch(setDob(date));
        }
    };

    const firstname = useSelector((state) => state.firstname);
    const lastname = useSelector((state) => state.lastname);
    const dob = useSelector((state) => state.dob);
    const phonenumber = useSelector((state) => state.phonenumber);
    const email = useSelector((state) => state.email);
    const district = useSelector((state) => state.district);
    const stateValue = useSelector((state) => state.state);
    const city = useSelector((state) => state.city);
    const gender = useSelector((state) => state.gender);
    const password = useSelector((state) => state.password);
    const confirmpassword = useSelector((state) => state.confirmpassword);
    const errors = useSelector((state) => state.errors );
    const degrees = useSelector((state) => state.degrees);

    const handleClick = () => {
      
        let hasError = false;

        if (!firstname) {
            dispatch(setFieldError('firstname', 'Firstname is required'));
            hasError = true;
        }
        if (!lastname) {
            dispatch(setFieldError('lastname', 'Lastname is required'));
            hasError = true;
        }
        if (!dob) {
            dispatch(setFieldError('dob', 'Date of birth is required'));
            hasError = true;
        }
        if (!phonenumber) {
            dispatch(setFieldError('phonenumber', 'Phone number is required'));
            hasError = true;
        } else if (!/^\d{10}$/.test(phonenumber)) {
            dispatch(setFieldError('phonenumber', 'Phone number must be 10 digits'));
            hasError = true;
        }
        if (!email) {
            dispatch(setFieldError('email', 'Email is required'));
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            dispatch(setFieldError('email', 'Email is not valid'));
            hasError = true;
        }
        if (!password) {
            dispatch(setFieldError('password', 'Password is required'));
            hasError = true;
        } else if (password.length < 6) {
            dispatch(setFieldError('password', 'Password must be at least 6 characters long'));
            hasError = true;
        }
        if (password !== confirmpassword) {
            dispatch(setFieldError('confirmpassword', 'Passwords do not match'));
            hasError = true;
        }
        if (!city) {
            dispatch(setFieldError('city', 'City is required'));
            hasError = true;
        }
        if (!district) {
            dispatch(setFieldError('district', 'District is required'));
            hasError = true;
        }
        if (!stateValue) {
            dispatch(setFieldError('state', 'State is required'));
            hasError = true;
        }

        if (!hasError) {
            console.log({ firstname, lastname, dob, phonenumber, email, district, stateValue, city, gender,degrees, password, confirmpassword });
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
         
            <Text 
            style={styles.title}>Register Form</Text>
            <TextInput label="First Name"
             value={firstname}
              onChangeText={(text) => dispatch(setfirstname(text))} 
              mode="outlined"
               style={styles.textInput} />
            {errors.firstname ? <Text style={styles.errorText}>{errors.firstname}</Text> : null}

            <TextInput 
            label="Last Name"
             value={lastname} 
             onChangeText={(text) => dispatch(setlastname(text))}
              mode="outlined" 
              style={styles.textInput} />
            {errors.lastname ? <Text style={styles.errorText}>{errors.lastname}</Text> : null}

            
            <TextInput
             label="Age"
             value={dob}
              onChangeText={(text) => dispatch(setDob(text))} 
              mode="outlined" style={styles.textInput}
                />
         
          
            {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}
         
            <Text style={styles.genderLabel}>Gender:</Text>
            <RadioButton.Group
                onValueChange={(value) => dispatch(setgender(value))}
                value={gender}
            >
                <View style={styles.radioRow}>
                    <RadioButton value="Male" />
                    <Text style={styles.radioText}>Male</Text>
                    <RadioButton value="Female" />
                    <Text style={styles.radioText}>Female</Text>
                </View>
            </RadioButton.Group>
            <Text style={styles.degreeLabel}>Select Degrees:</Text>
<View style={styles.checkboxRow}>
    <View style={styles.checkboxContainer}>
        <Checkbox
            status={degrees.BA ? 'checked' : 'unchecked'}
            onPress={() => dispatch(setDegreeBA(!degrees.BA))}
        />
        <Text style={styles.checkboxText}>B.A.</Text>
    </View>
    <View style={styles.checkboxContainer}>
        <Checkbox
            status={degrees.BE ? 'checked' : 'unchecked'}
            onPress={() => dispatch(setDegreeBE(!degrees.BE))}
        />
        <Text style={styles.checkboxText}>B.E.</Text>
    </View>
</View> 
            <TextInput
             label="Phone Number" 
             value={phonenumber}
              onChangeText={(text) => dispatch(setphonenumber(text))}
               mode="outlined" 
               keyboardType="phone-pad" 
               style={styles.textInput} />
            {errors.phonenumber ? <Text style={styles.errorText}>{errors.phonenumber}</Text> : null}

            <TextInput 
            label="Email"
             value={email} onChangeText={(text) => dispatch(setemail(text))}
              mode="outlined"
               keyboardType="email-address"
                style={styles.textInput} />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput 
            label="Password"
             value={password} 
             onChangeText={(text) => dispatch(setpassword(text))}
              mode="outlined" 
             secureTextEntry 
             style={styles.textInput} />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TextInput
             label="Confirm Password"
              value={confirmpassword}
               onChangeText={(text) => dispatch(setconfirmpassword(text))}
               mode="outlined" 
               secureTextEntry 
               style={styles.textInput} />
            {errors.confirmpassword ? <Text style={styles.errorText}>{errors.confirmpassword}</Text> : null}

            <TextInput 
            label="City"
             value={city} 
             onChangeText={(text) => dispatch(setcity(text))}
              mode="outlined"
              style={styles.textInput} />
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

            <TextInput 
            label="District" 
            value={district}
             onChangeText={(text) => dispatch(setdistrict(text))}
              mode="outlined"
               style={styles.textInput} />
            {errors.district ? <Text style={styles.errorText}>{errors.district}</Text> : null}
          
          
            <Picker
                selectedValue={stateValue}
                onValueChange={(value) => dispatch(setstate(value))}
                style={styles.picker}
            >
                <Picker.Item label="Select State" value="" />
                <Picker.Item label="Tamilnadu" value="Tamilnadu" />
                <Picker.Item label="Kerala" value="Kerala" />
                <Picker.Item label="West Bengal" value="West Bengal" />
                <Picker.Item label="ANDHRA" value="Andhra" />
            
            </Picker>
            {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
       

            <Button mode="contained" onPress={handleClick} style={styles.button}>Register</Button>
            <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Login here</Text>
            </Text>
           
        </View>
        </ScrollView>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInput: {
        width: 200,
        marginBottom: 1,
    },
    genderLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    radioText: {
        marginRight: 20,
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        width: '100%',
    },
    loginText: {
        marginVertical: 5,
        fontSize: 14,
    },
    loginLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    degreeLabel: {
        fontSize: 16,
        marginVertical: 2,
    },
    dateButton: {
        width: 200,
        marginVertical: 5,
        
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    picker: {
        width: 200,
        marginBottom: 3,
        height: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 3,
    },
});

export default Register;
