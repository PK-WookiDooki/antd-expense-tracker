import { Button, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";
import ModalHeader from "../../components/modals/ModalHeader";
import { SubmitBtn } from "../../components";

const ChangePasswordModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const [form] = Form.useForm();
    const nav = useNavigate();

    const dispatch = useDispatch();

    const onFormSubmit = (values) => {
        delete values.password_confirmation;
        console.log(values);
        nav("/signIn", {
            replace: true,
        });
        dispatch(
            setMessage({
                msgType: "success",
                msgContent: "Password changed successfully!",
            })
        );
    };

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
    };

    return (
        <section className="mt-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Password</h2>
                <button
                    onClick={() => setOpenModal(true)}
                    className="py-1 px-4 rounded-full border border-dark text-dark hover:text-whiteGray hover:bg-dark duration-200"
                >
                    {" "}
                    Change Password{" "}
                </button>
            </div>

            <Modal
                centered
                open={openModal}
                className="account-modal"
                closeIcon={false}
                footer={null}
            >
                <ModalHeader event={closeModal} title={"Change Password"} />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                    className="p-6 pb-0"
                >
                    <Form.Item
                        name="current_password"
                        label="Current Password"
                        rules={[
                            {
                                required: true,
                                message: "Current password is required!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="password"
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
                    <div className="py-3 border-t border-gray">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" block ml-auto "}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default ChangePasswordModal;
