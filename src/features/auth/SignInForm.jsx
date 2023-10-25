import { Form, Input } from "antd";
import { FormTitle, SubmitBtn } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "@/app/global/globalSlice";

import { useLoginAccountMutation } from "./authApi";
import { setLoggedInStatus } from "./authSlice";
import Cookies from "js-cookie";
import { useState } from "react";

const SignInForm = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [loginAccount] = useLoginAccountMutation();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const { data, error } = await loginAccount(values);
            if (data?.token) {
                setIsSubmitting(false);
                dispatch(setLoggedInStatus({ token: data?.token }));
                Cookies.set("token", data?.token);
                nav("/");
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Login Successful!",
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
        <section className="lg:min-h-screen w-full flex flex-col items-center justify-center">
            <Form
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full max-w-[420px]  "
            >
                <div className="mb-6 text-center">
                    <h2 className={`text-4xl md:text-[40px] text-primaryGreen mb-2 font-medium `}>
                        Welcome Back!
                    </h2>
                    <p> Don&apos;t have an account? <Link to={"/signUp"} className={"text-primaryBlue hover:text-primaryBlue/80 duration-200"} >Sign Up</Link> </p>
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
                    <Input placeholder="example@gmail.com" type="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: "Password is required!" },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Link
                    to={"/signIn/forgotPassword"}
                    className="text-primaryBlue mb-6 block"
                >
                    {" "}
                    Forgot Password?{" "}
                </Link>

                <SubmitBtn label={"sign in"} isLoading={isSubmitting} />
            </Form>
        </section>
    );
};

export default SignInForm;
