import {Alert, Form, Input, Modal} from "antd";
import {useEffect, useState} from "react";
import {RxCross1} from "react-icons/rx";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";
import {ModalHeader, SubmitBtn} from "@/components";
import {useChangeUsernameMutation} from "./userApi";

const EditNameModal = ({username}) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [error, setError] = useState(null);

    useEffect(() => {
        if (username) {
            form.setFieldsValue({username});
        }
    }, [openModal]);

    const {token} = useSelector((state) => state.authSlice);
    const [changeUsername] = useChangeUsernameMutation();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const {data, error: apiError} = await changeUsername({
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
                setIsSubmitting(false)
                setError(apiError?.data?.message || apiError?.error);
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
        <section className="pb-6 border-b border-gray text-dark ">
            <h2 className="text-xl">Name</h2>
            <div className="flex items-center justify-between mt-2">
                <p> {username || "Nexcoder"} </p>
                <button
                    onClick={() => setOpenModal(true)}
                    className="edit-btn">
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
                <ModalHeader title={"change name"} event={closeModal}/>
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
                        <Input/>
                    </Form.Item>
                    <div className="py-3 border-t border-gray">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" block ml-auto"}
                            isLoading={isSubmitting}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default EditNameModal;
