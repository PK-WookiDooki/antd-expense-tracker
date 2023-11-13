import {useState} from "react";
import {Form, Input, Modal} from "antd";
import {ModalHeader, SubmitBtn} from "@/components/index.js";
import {useDeleteAccountMutation} from "@/features/auth/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setMessage} from "@/app/global/globalSlice.js";
import {logoutAccount} from "@/features/auth/authSlice.js";

const DeleteAccountModal = () => {

    const {token} = useSelector(state => state.authSlice)
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const nav = useNavigate()

    const dispatch = useDispatch()

    const [deleteAccount] = useDeleteAccountMutation()
    const onFormSubmit = async ({password}) => {
        try {
            console.log(password)
            const {data, error: apiError} = await deleteAccount({token, password})
            if (data?.success) {
                dispatch(setMessage({msgType: "success", msgContent: data?.message}));
                dispatch(logoutAccount());
                nav("/signin", {replace: true})
                closeModal()
            } else {
                dispatch(setMessage({msgType: "error", msgContent: apiError?.data?.message || apiError?.error}));
                setIsSubmitting(false)
            }
        } catch (error) {
            dispatch(setMessage({msgType: "error", msgContent: error?.message}));
        } finally {
            setIsSubmitting(false)
        }
    }

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
    }

    return (
        <section className={`text-danger border border-danger mt-12 p-4 rounded-[10px]`}>
            <h2 className={`text-xl font-medium mb-4`}> Deleting Account </h2>
            <p className={`mb-3`}> Deleting your account will remove all of your information from our database. This
                cannot be undone. </p>
            <button
                onClick={() => setOpenModal(true)}
                className="edit-btn !bg-danger hover:!bg-danger/80 ">
                Delete Account
            </button>

            <Modal
                centered
                open={openModal}
                className="account-modal"
                closeIcon={false}
                footer={null}
                width={420}
            >
                <ModalHeader title={"delete account"} event={closeModal} isDanger={true}/>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                >
                    <div className={" p-6 pb-0"}>
                        <Form.Item
                            label={"Password"}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Current password is required!",
                                },
                            ]}
                            validateTrigger={"onSubmit"}
                        >
                            <Input.Password placeholder={"Enter your current password"}/>
                        </Form.Item>
                    </div>
                    <div className="py-3 border-t px-6 border-cD9/60">
                        <SubmitBtn
                            label={"confirm"}
                            isFixedWidth={true}
                            extraStyle={" ml-auto !h-8 "}
                            isDanger={true}
                            isLoading={isSubmitting}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default DeleteAccountModal;
