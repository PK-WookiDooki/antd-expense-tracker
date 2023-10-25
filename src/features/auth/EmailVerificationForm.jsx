import {Form, Input} from "antd";
import {FormTitle, SubmitBtn} from "@/components";
import {useLocation, useNavigate} from "react-router-dom";
import {useResendOtpMutation} from "./authApi";
import {useDispatch} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";
import {useState} from "react";

const EmailVerificationForm = () => {
    const nav = useNavigate();
    const currentRoute = useLocation().pathname;

    const [resendOtp] = useResendOtpMutation();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const {data, error} = await resendOtp({email: values.email});
            if (data?.success) {
                setIsSubmitting(false);

                nav("/verify", {
                    state: {email: values.email, previousRoute: currentRoute},
                });
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
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
                className="w-full max-w-[440px] md:shadow-md lg:p-10 md:p-6 md:bg-white/80 "
            >
                <div className="mb-6 text-center">
                    <FormTitle
                        isCenter={true}
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
                    <Input placeholder="example@gmail.com"/>
                </Form.Item>

                <SubmitBtn label={"Confirm"} isLoading={isSubmitting}/>
            </Form>
        </section>
    );
};

export default EmailVerificationForm;
