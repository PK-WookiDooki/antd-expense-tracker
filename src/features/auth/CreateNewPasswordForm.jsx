import {Form, Input} from "antd";
import {FormTitle, SubmitBtn} from "@/components";
import {useLocation, useNavigate} from "react-router-dom";
import {useResetPasswordMutation} from "./authApi";
import {useDispatch} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";
import {useState} from "react";

const CreateNewPasswordForm = () => {
    const nav = useNavigate();
    const email = useLocation().state;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const updatedPws = {
                email,
                password: values.password,
            }
            const {data, error} = await resetPassword(updatedPws);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/signIn", {
                    replace: true,
                });
                dispatch(
                    setMessage({
                        msgType: "success", msgContent: data?.message,
                    })
                );
            } else {
                setIsSubmitting(false);
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message || error?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <Form
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full max-w-[440px] rounded md:shadow-xl lg:p-10 md:p-6 md:bg-white md:border border-cD9 "
            >
                <div className="mb-6">
                    <FormTitle
                        isCenter={true}
                        title={"Create New Password"}
                    />
                </div>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {required: true, message: "Password is required!"},
                        {
                            pattern:
                                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must have minimum eight characters with at least one uppercase letter, one number and one special character.",
                        },
                    ]}
                >
                    <Input.Password placeholder={"Enter new password"}/>
                </Form.Item>
                <Form.Item
                    name="password_confirmation"
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                            message: "Password confirmation is required!",
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The password confirmation does not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder={"Confirm your password"}/>
                </Form.Item>

                <SubmitBtn label={"Confirm"} isLoading={isSubmitting}/>
            </Form>
        </section>
    );
};

export default CreateNewPasswordForm;
