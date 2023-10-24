import { Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FixWButton, SubmitBtn } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useChangeEmailMutation } from "./userApi";
import { setMessage } from "@/app/global/globalSlice";
import { useState } from "react";

const ChangeEmailForm = () => {
    const nav = useNavigate();
    const currentRoute = useLocation().pathname;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token } = useSelector((state) => state.authSlice);
    const [changeEmail] = useChangeEmailMutation();
    const dispatch = useDispatch();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const { data, error: apiError } = await changeEmail({
                userData: { ...values },
                token,
            });

            if (data?.success) {
                setIsSubmitting(false);
                nav("/account/verify", {
                    state: {
                        email: values.newEmail,
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
                        msgContent: apiError?.data?.message || apiError?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <section className=" h-full w-full flex items-center justify-center bg-whiteGray rounded-2xl ">
            <Form
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full md:max-w-[570px] p-10 max-w-[92%] shadow"
            >
                <div className="mb-9 text-left">
                    <h2 className="text-4xl font-medium text-dark mb-6">
                        {" "}
                        Change Email Address{" "}
                    </h2>
                    <p className="text-base">
                        Enter new email address and current password to change
                        email address!
                    </p>
                </div>
                <Form.Item
                    name="newEmail"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Email address is required!",
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

                <div className="mt-9 flex gap-10 items-center justify-center">
                    <FixWButton isButton={false} label={"cancel"} />
                    <SubmitBtn
                        label={"confirm"}
                        extraStyle={"max-w-[180px] w-full"}
                        isFixedWidth={true}
                        isLoading={isSubmitting}
                    />
                </div>
            </Form>
        </section>
    );
};

export default ChangeEmailForm;
