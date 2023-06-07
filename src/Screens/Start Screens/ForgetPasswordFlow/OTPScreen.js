import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetSuccess } from '../../../Store/authSlice';

import { Color } from '../../../Components/Shared/Color';
import SafeArea from '../../../Components/Shared/SafeArea';
import OTPInput from "../../../Components/StartFlow/OTPInput";
import PrimaryButton from '../../../Components/PrimaryButton';
import ErrorMessage from '../../../Components/ErrorMessage';
import { verifyOTP } from '../../../Store/authActions';

function OTPScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const { e } = route.params;
    const { control, handleSubmit } = useForm();
    const { loading, error, success } = useSelector((state) => state.auth);

    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());
            navigation.navigate("Login");
        }
    }, [success]);

    function onVerifyPress(data) {
        console.log("OTPSCreem:::", data);
        dispatch(verifyOTP({ email: e, OTP: data.OTP }))
    }

    return (
        <SafeArea>
            <View style={styles.container}>
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.text}>
                    To change your password code, please enter the OTP sent to your email.
                </Text>
                <OTPInput
                    title={'Enter OTP:'}
                    name={'OTP'}
                    max={6}
                    control={control}
                    rule={{
                        required: 'OTP cannot be empty.',
                        minLength: {
                            value: 6,
                            message: 'OTP must contain 6 digits.',
                        },
                        maxLength: {
                            value: 6,
                            message: 'OTP cannot be more than 6 digits.',
                        },
                    }}
                />
                {error && <ErrorMessage err={error} />}
            </View>

            <View style={{ flex: 1 }}></View>

            <View style={{ paddingBottom: 30 }}>
                <PrimaryButton
                    title={'Verify'}
                    disabled={loading}
                    onPress={handleSubmit(onVerifyPress)}
                />
            </View>

        </SafeArea>
    );
}

export default OTPScreen;

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