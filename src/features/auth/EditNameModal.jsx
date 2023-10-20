import { Alert, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";
import { SubmitBtn } from "../../components";
import { useChangeUsernameMutation } from "./userApi";

const EditNameModal = ({ username }) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);

    useEffect(() => {
        if (username) {
            form.setFieldsValue({ username });
        }
    }, [openModal]);

    const { token } = useSelector((state) => state.authSlice);
    const [changeUsername] = useChangeUsernameMutation();

    const onFormSubmit = async (values) => {
        try {
            const { data, error: apiError } = await changeUsername({
                username: values.username,
                token,
            });
            if (data?.success) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
                closeModal();
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
    };

    return (
        <section className="pb-6 border-b border-gray">
            <h2 className="text-xl font-semibold">Name</h2>
            <div className="flex items-center justify-between mt-2">
                <p> {username} </p>
                <button
                    onClick={() => setOpenModal(true)}
                    className="py-1 px-4 rounded-full border border-primaryGreen text-primaryGreen hover:text-whiteGray hover:bg-primaryGreen outline-none duration-200"
                >
                    {" "}
                    Edit{" "}
                </button>
            </div>

            <Modal
                centered
                open={openModal}
                className="account-modal"
                closeIcon={false}
                footer={null}
            >
                <div className="bg-primaryGreen px-6 py-4 text-whiteGray flex items-center justify-between">
                    <h2 className="text-2xl font-semibold"> Change Name </h2>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-xl"
                    >
                        {" "}
                        <RxCross1 />{" "}
                    </button>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                    className="p-6 pb-0"
                >
                    {error !== null ? (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            className="mb-3"
                        />
                    ) : (
                        ""
                    )}

                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Name is required!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="py-3 border-t border-gray">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" block ml-auto"}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default EditNameModal;
