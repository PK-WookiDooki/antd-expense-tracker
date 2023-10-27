import {Form, Input} from "antd";
import {SubmitBtn} from "@/components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useRegisterAccountMutation} from "./authApi";
import {setMessage} from "@/app/global/globalSlice";

import {useDispatch} from "react-redux";
import {useState} from "react";

const SignUpForm = () => {
    const nav = useNavigate();
    const currentRoute = useLocation().pathname;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form] = Form.useForm()

    const [registerAccount] = useRegisterAccountMutation();
    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const username = values.username?.trim()
            delete values.password_confirmation;
            delete values.username;

            const userData = {...values, username}
            const {data, error} = await registerAccount(userData);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/verify", {
                    state: {
                        email: values.email,
                        previousRoute: currentRoute,
                    },
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
        <section
            className=" min-h-screen w-full flex flex-col items-center justify-center py-5 md:bg-[url('src/assets/imgs/img_signupMobile.png')] bg-cover bg-center lg:bg-[url('')] lg:bg-white ">
            <div className=" w-full md:max-w-[420px] text-white mb-14 px-5 hidden md:block lg:hidden mt-auto">
                <p className="text-3xl">Welcome to</p>
                <h2 className="text-[60px] leading-[70px] font-dms ">
                    Nextracker
                </h2>
                <p className="text-xl">Let us help you manage your finances.</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full max-w-[420px] my-auto md:my-0 lg:mt-auto md:bg-white md:p-10 lg:p-0 rounded-2xl"
            >
                {" "}
                <div className="mb-2 md:hidden font-medium text-c26">
                    <p>Welcome to</p>
                    <h3 className="text-3xl font-dms">Nextracker</h3>
                </div>
                <h2 className="text-[38px] md:text-[40px] mb-6 font-medium text-primaryGreen ">
                    {" "}
                    Create Account{" "}
                </h2>
                <Form.Item
                    name="username"
                    label="Name"
                    rules={[{required: true, message: "Name is required!"},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (
                                    value.trim().length > 0
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "Enter valid username!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input placeholder="Enter your name"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Email address is required!",
                        },
                        {
                            pattern: /^([\w.]{4,10})+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Invalid email address!",
                        },
                    ]}
                >
                    <Input placeholder="Enter your email address" type="email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {required: true, message: "Password is required!"},
                        {
                            pattern:
                                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must have minimum eight characters with at least one uppercase letter, one number and one special character. Password can not include space keyword.",
                        },
                    ]}
                >
                    <Input.Password placeholder={"Enter your password"}/>
                </Form.Item>
                <Form.Item
                    name="password_confirmation"
                    label="Confirm Password"
                    dependencies={["password"]}
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
                <SubmitBtn label={"sign up"} isLoading={isSubmitting}/>
            </Form>
            <p className="mt-auto md:text-white lg:text-c26 text-base">
                {" "}
                Already have an account?{" "}
                <Link to={"/signIn"} className="text-[#20C]">
                    {" "}
                    Sign In{" "}
                </Link>{" "}
            </p>
        </section>
    );
};

export default SignUpForm;
