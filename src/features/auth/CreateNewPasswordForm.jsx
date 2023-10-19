import { Form, Input } from "antd";
import { FormTitle, SubmitBtn } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";

const CreateNewPasswordForm = () => {
    const nav = useNavigate();
    const email = useLocation().state;

    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        try {
            const { data, error } = await resetPassword({
                email,
                password: values.password,
            });
            if (data?.success) {
                nav("/signIn", {
                    replace: true,
                });
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
            } else {
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.error || error?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
        //const data = { email, password: values.password };
        //console.log(data);
        //nav("/signIn", {
        //    replace: true,
        //    state: { message: "Password changed successfully!" },
        //});
    };
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <Form
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full max-w-[440px] md:p-10 p-4 md:shadow-md md:bg-white/80"
            >
                <div className="mb-6">
                    <FormTitle
                        title={"Create New Password"}
                        desc={
                            "Your password have to be different from previous one!"
                        }
                    />
                </div>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: "Password is required!" },
                        {
                            pattern:
                                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                        },
                        {
                            min: 8,
                            message:
                                "Password must have at least 8 characters!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="password_confirmation"
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                            message: "Password confirmation is required!",
                        },
                        ({ getFieldValue }) => ({
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
                    <Input.Password />
                </Form.Item>

                <SubmitBtn label={"Confirm"} />
            </Form>
        </section>
    );
};

export default CreateNewPasswordForm;
