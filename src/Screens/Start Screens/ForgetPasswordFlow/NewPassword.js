import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetSuccess } from '../../../Store/authSlice';
import { passChange } from '../../../Store/authActions';

import { Color } from '../../../Components/Shared/Color';
import SafeArea from '../../../Components/Shared/SafeArea';
import PrimaryButton from '../../../Components/PrimaryButton';
import ErrorMessage from '../../../Components/ErrorMessage';
import FormInputField from '../../../Components/FormInputField';

function NewPassword({ route, navigation }) {
    const dispatch = useDispatch();
    const { email } = route.params;
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch("password");
    const { loading, error, success } = useSelector((state) => state.auth);

    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());
            navigation.navigate("Login");
        }
    }, [success]);

    function onConfirmPress(data) {
        console.log("PASScreem:::", data);
        dispatch(passChange({ email, password: data.password, rePassword: data.rePassword }))
    }

    return (
        <SafeArea>
            <View style={styles.container}>
                <Text style={styles.title}>Enter New Password</Text>
                <Text style={styles.text}>
                    Please enter your new password in both feilds.
                </Text>
                <FormInputField
                    name={"password"}
                    placeholder={"Password"}
                    control={control}
                    icon={require("../../../Images/password.png")}
                    secureTextEntry
                    rule={{
                        required: "Password cannot be empty.",
                        minLength: {
                            value: 3,
                            message: "Password must contain 3 characters.",
                        },
                        maxLength: {
                            value: 15,
                            message: "Password cannot be more than 15 characters.",
                        },
                    }}
                />

                <FormInputField
                    name={"rePassword"}
                    placeholder={"Confirm Password"}
                    control={control}
                    icon={require("../../../Images/password.png")}
                    secureTextEntry
                    rule={{
                        required: "Password cannot be empty.",
                        validate: (value) => value === pwd || "Password do not match.",
                    }}
                />

                {error && <ErrorMessage err={error} />}
            </View>

            <View style={{ flex: 1 }}></View>

            <View style={{ paddingBottom: 30 }}>
                <PrimaryButton
                    title={'Confirm'}
                    disabled={loading}
                    onPress={handleSubmit(onConfirmPress)}
                />
            </View>

        </SafeArea>
    );
}

export default NewPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        paddingTop: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: Color.black,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: Color.black,
        marginBottom: 20,
    },
});