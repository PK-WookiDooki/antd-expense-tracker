import { Alert, Button, Form, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { ModalHeader, SubmitBtn } from "../../components";
import { useSetBudgetMutation } from "../auth/userApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";

const EditBudgetModal = ({ userBudget }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [setBudget] = useSetBudgetMutation();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error, openModal]);

    const closeModal = () => {
        setOpenModal(false);
        setError(null);
    };

    const onFormSubmit = async (values) => {
        try {
            const { data, error: apiError } = await setBudget({
                ...values,
                token,
            });

            if (data?.success) {
                closeModal();
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="hidden md:block">
            <Button
                onClick={() => setOpenModal(true)}
                type="primary"
                htmlType="button"
                size="large"
                shape="round"
                className=" !bg-whiteGray !text-dark"
            >
                Edit Budget
            </Button>
            <Modal
                centered
                width={420}
                className="account-modal"
                open={openModal}
                footer={null}
                closeIcon={false}
            >
                <ModalHeader title={"Edit Budget"} event={closeModal} />
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
                        label={"Budget Amount"}
                        name={"budgetAmount"}
                        rules={[
                            {
                                required: true,
                                message: "Budget amount is required!",
                            },
                            {
                                type: "number",
                                min: 1,
                                message: "Enter valid amount!",
                            },
                        ]}
                    >
                        <InputNumber className="!w-full" />
                    </Form.Item>
                    <div className="border-t border-gray py-3">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" block ml-auto"}
                        />
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default EditBudgetModal;
