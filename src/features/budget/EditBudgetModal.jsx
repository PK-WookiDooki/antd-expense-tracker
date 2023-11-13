import {Button, Form, InputNumber, Modal} from "antd";
import {useEffect, useState} from "react";
import {ModalHeader, SubmitBtn} from "@/components";
import {useSetBudgetMutation} from "../auth/userApi";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";

const EditBudgetModal = ({userBudget, extraStyle}) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {token} = useSelector((state) => state.authSlice);
    const [setBudget] = useSetBudgetMutation();
    useEffect(
        () => {
            form.setFieldValue("budget", userBudget)
        }, [openModal]
    )
    const closeModal = () => {
        setOpenModal(false);
        setIsSubmitting(false)
    };

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const {data, error: apiError} = await setBudget({
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

    return (
        <section className={extraStyle}>
            <Button
                onClick={() => setOpenModal(true)}
                type="primary"
                htmlType="button"
                className=" !bg-cFA rounded-2xl !px-8 !text-c26 md:!h-[50px] font-medium "
            >
                Edit Budget
            </Button>
            <Modal
                centered
                className="account-modal"
                open={openModal}
                footer={null}
                closeIcon={false}
                width={420}
            >
                <ModalHeader title={"Edit Budget"} event={closeModal}/>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}

                >
                    <div className="p-6 pb-0">
                        <Form.Item
                            label={"Budget Amount"}
                            name={"budget"}
                            rules={[
                                {
                                    required: true,
                                    message: "Budget amount is required!",
                                },
                                {
                                    type: "number",
                                    min: 0,
                                    message: "Enter valid amount!",
                                },
                            ]}
                            validateTrigger={"onSubmit"}
                        >
                            <InputNumber inputMode={"numeric"} placeholder={"Enter budget amount"} className="!w-full"/>
                        </Form.Item>
                    </div>
                    <div className="py-3 border-t px-6 border-cD9/60">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={"block ml-auto"}
                            isLoading={isSubmitting}
                        />
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default EditBudgetModal;
