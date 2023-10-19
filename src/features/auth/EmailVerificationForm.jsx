import { Form, Input } from "antd";
import { FormTitle, SubmitBtn } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";

const EmailVerificationForm = () => {
    const nav = useNavigate();
    const currentRoute = useLocation().pathname;

    const [forgotPassword] = useForgotPasswordMutation();
    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        try {
            const { data, error } = await forgotPassword(values.email);
            console.log(values);
            nav("/verify", {
                replace: true,
                state: { email: values.email, previousRoute: currentRoute },
            });
            return;

            if (data?.success) {
                nav("/verify", {
                    replace: true,
                    state: { email: values.email, previousRoute: currentRoute },
                });
            } else {
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
                className="w-full max-w-[440px] md:shadow-md md:p-10 p-4 md:bg-white/80 "
            >
                <div className="mb-6 text-center">
                    <FormTitle
                        title={"Forgot Password"}
                        desc={
                            "Please enter your email address to verify your account."
                        }
                    />
                </div>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Email address is required!",
                        },
                        {
                            type: "email",
                            message: "Enter valid email address!",
                        },
                    ]}
                >
                    <Input placeholder="example@gmail.com" />
                </Form.Item>

                <SubmitBtn label={"Confirm"} />
            </Form>
        </section>
    );
};

export default EmailVerificationForm;
