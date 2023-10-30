import {
    DatePicker,
    Form,
    InputNumber,
    Modal,
    Segmented,
    Select,
    Alert,
    Input,
} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setIsAddRecordModalOpen} from "./recordsSlice";
import {CreateBtn, FixWButton, SubmitBtn} from "@/components";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {setMessage} from "@/app/global/globalSlice";
import {useAddNewRecordMutation} from "./recordsApi";
import {useGetAllCategoriesQuery} from "../categories/categoriesApi";

const AddNewRecordForm = () => {
    const {token} = useSelector((state) => state.authSlice);
    const {isAddRecordModalOpen} = useSelector((state) => state.recordsSlice);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {data: userCategories} = useGetAllCategoriesQuery(token);

    const [type, setType] = useState("EXPENSE");

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    // const [catOptions, setCatOptions] = useState([]);

    const catOptions = userCategories
        ?.filter(
            (category) =>
                category?.type === type || category?.type === null
        )
        .map((category) => {
            return {
                label: (
                    <p className="flex items-center gap-1 capitalize">
                        <i
                            className="material-symbols-outlined w-8 h-8 rounded-md text-white flex items-center justify-center"
                            style={{
                                backgroundColor: category?.iconBgColor,
                            }}
                        >
                            {category.iconName}
                        </i>{" "}
                        {category.name}{" "}
                    </p>
                ),
                value: category.id,
            };
        });

    useEffect(() => {
        form.resetFields(["userCategoryId"]);
    }, [type]);

    const [addNewRecord] = useAddNewRecordMutation();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const formattedDate = dayjs(values?.createdDate).format(
                "YYYY-MM-DD"
            );
            delete values.createdDate;
            const record = {...values, createdDate: formattedDate};
            const {data, error: apiError} = await addNewRecord({
                record,
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
        setError(null);
        setIsSubmitting(false)
        setType("EXPENSE")
        dispatch(setIsAddRecordModalOpen(false));
    }

    return (
        <section>
            <CreateBtn
                label={"record"}
                event={() => dispatch(setIsAddRecordModalOpen(true))}
            />
            <Modal
                centered
                open={isAddRecordModalOpen}
                width={950}
                footer={null}
                closeIcon={false}
            >
                <Form
                    form={form}
                    onFinish={onFormSubmit}
                    layout="vertical"
                    className="!font-sans create-form"
                >
                    <h2 className="modal-form-tlt">
                        {" "}
                        Add New Record{" "}
                    </h2>

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

                    <Form.Item name={"type"} initialValue={"EXPENSE"}>
                        <Segmented
                            options={[
                                {
                                    label: "Expense",
                                    value: "EXPENSE",
                                },
                                {
                                    label: "Income",
                                    value: "INCOME",
                                },
                            ]}
                            className="w-full"
                            size="large"
                            block
                            onChange={(value) => setType(value)}
                        />
                    </Form.Item>
                    <div className=" flex flex-col md:flex-row lg:gap-10 md:gap-6">
                        <div className="w-full">
                            <Form.Item
                                label="Amount"
                                name={"amount"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Amount is required!",
                                    },
                                    {
                                        type: "number",
                                        min: 1,
                                        message: "Amount must have at least 1.",
                                    },
                                ]}
                            >
                                <InputNumber placeholder={"Enter amount"}
                                             className="flex flex-col justify-center !w-full "/>
                            </Form.Item>
                            <Form.Item
                                label="Date"
                                name={"createdDate"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Date is required!",
                                    },
                                ]}
                                initialValue={dayjs()}
                            >
                                <DatePicker
                                    format={"DD-MM-YYYY"}
                                    allowClear={false}
                                    inputReadOnly={true}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Category"
                                name={"userCategoryId"}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Record's category is required!",
                                    },
                                ]}
                                //className="md:!mb-0"
                            >
                                <Select placeholder={"Select category"} options={catOptions}/>
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Note"
                            name={"description"}
                            className="w-full note-input"
                        >
                            <Input.TextArea placeholder={"Enter description here"} className=" !resize-none"/>
                        </Form.Item>
                    </div>
                    <div className="record-form-footer">
                        <FixWButton
                            isButton={true}
                            event={closeModal}
                            label={"cancel"}
                            buttonType={"default"}
                            cssWidthConfig={" md:max-w-[180px] max-w-[148px] "}
                        />
                        <SubmitBtn label={"save"} isLoading={isSubmitting} isFixedWidth={true}
                                   extraStyle={"md:max-w-[180px] max-w-[148px] w-full "}/>
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewRecordForm;
