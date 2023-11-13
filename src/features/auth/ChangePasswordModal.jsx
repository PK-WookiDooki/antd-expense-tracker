import {Form, Input, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";
import ModalHeader from "@/components/modals/ModalHeader";
import {SubmitBtn} from "@/components";
import {useChangePasswordMutation} from "./userApi";
import {logoutAccount} from "@/features/auth/authSlice.js";

const ChangePasswordModal = () => {
    const {token} = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form] = Form.useForm();
    const nav = useNavigate();

    const dispatch = useDispatch();
    const [changePassword] = useChangePasswordMutation();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            delete values.password_confirmation;
            const {data, error: apiError} = await changePassword({
                passwords: {...values},
                token,
            });

            // console.log(data, apiError)
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
                dispatch(logoutAccount())
                closeModal();
            } else {
                setIsSubmitting(false)
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

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
        setIsSubmitting(false)
    };

    return (
        <section className="mt-5">
            <div className="flex items-center justify-between text-c26">
                <h2 className="text-xl">Password</h2>
                <button
                    onClick={() => setOpenModal(true)}
                    className="edit-btn">
                    {" "}
                    Change{" "}
                </button>
            </div>

            <Modal
                centered
                open={openModal}
                className="account-modal"
                closeIcon={false}
                footer={null}
                width={420}
            >
                <ModalHeader event={closeModal} title={"change password"}/>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                >
                    <div className={"p-6 pb-0"}>
                        <Form.Item
                            validateTrigger={"onSubmit"}
                            name="oldPassword"
                            label="Current Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Current password is required!",
                                },
                            ]}
                        >
                            <Input.Password placeholder={"Enter your current password"}/>
                        </Form.Item>
                        <Form.Item
                            validateTrigger={"onSubmit"}
                            name="newPassword"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Password is required!",
                                },
                                {
                                    pattern:
                                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must have minimum eight characters with at least one uppercase letter, one number and one special character.",
                                },
                            ]}
                        >
                            <Input.Password placeholder={"Enter your new password"}/>
                        </Form.Item>
                        <Form.Item
                            validateTrigger={"onSubmit"}
                            name="password_confirmation"
                            label="Confirm Password"
                            dependencies={["newPassword"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Password confirmation is required!",
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("newPassword") === value
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
                            <Input.Password placeholder={"Confirm your new password"}/>
                        </Form.Item>
                    </div>
                    <div className="py-3 px-6 border-t border-cD9/60">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" !h-8 ml-auto "}
                            isLoading={isSubmitting}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default ChangePasswordModal;
