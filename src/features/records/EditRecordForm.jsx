import {
    Alert,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Segmented,
    Select,
} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {FixWButton, SubmitBtn} from "@/components";
import {useGetAllCategoriesQuery} from "../categories/categoriesApi";
import {useUpdateRecordMutation} from "./recordsApi";
import {setMessage} from "@/app/global/globalSlice";
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/en';

dayjs.locale('en'); // Set the locale
dayjs.extend(customParseFormat)

const EditRecordForm = ({record, date}) => {
    const [form] = Form.useForm();

    const {token} = useSelector((state) => state.authSlice);
    const {data: userCategories} = useGetAllCategoriesQuery(token);

    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState(record?.type);
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (error?.trim().length > 0) {
            setTimeout(() => {
                setError(null);
            }, 3000);
        }


    }, [error]);

    useEffect(() => {
        if (record) {
            form.setFieldValue("type", record?.type);
            form.setFieldValue("amount", record?.amount);
            form.setFieldValue("createdDate", dayjs(date));
            form.setFieldValue("description", record?.description);
        }
    }, [record]);

    useEffect(() => {
        if (type === record?.type) {
            form.setFieldValue("userCategoryId", record?.userCategory.id);
        } else {
            form.resetFields(["userCategoryId"])
        }

        // console.log(type)

    }, [type, record]);


    const catOptions = userCategories
        ?.filter(
            (category) => category?.type === type || category?.type === null
        )
        .map((category) => {
            return {
                label: (
                    <p className="flex items-center gap-1 capitalize">
                        <i
                            className="material-symbols-outlined w-8 h-8 rounded-md text-white flex items-center justify-center"
                            style={{backgroundColor: category?.iconBgColor}}
                        >
                            {category.iconName}
                        </i>{" "}
                        {category.name}{" "}
                    </p>
                ),
                value: category.id,
            };
        });

    const dispatch = useDispatch();

    const [updateRecord] = useUpdateRecordMutation();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const formattedDate = dayjs(values?.createdDate).format(
                "YYYY-MM-DD"
            );
            delete values.createdDate;

            const updatedRecord = {
                ...values,
                createdDate: formattedDate,
            };

            const {data, error: apiError} = await updateRecord({
                recordId: record?.recordId,
                record: updatedRecord,
                token,
            });

            // console.log(data);

            if (data?.success) {
                closeModal();
                dispatch(
                    setMessage({
                        msgType: "success",
                        mgsContent: data?.message,
                    })
                );
            } else {
                setIsSubmitting(false)
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setError(null);
        setIsSubmitting(false)
        setOpenModal(false);
    };

    return (
        <section className="flex">
            <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-primaryBlue menu-item"
            >
                {" "}
                Edit
            </button>

            <Modal
                centered
                footer={null}
                open={openModal}
                onCancel={closeModal}
                width={950}
                closeIcon={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                    className="!font-sans create-form"
                >
                    <h2 className="modal-form-tlt ">
                        {" "}
                        Edit Record{" "}
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
                    <Form.Item name={"type"} className={"!mb-4 md:!mb-8 "}>
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
                    <div className="flex flex-col md:flex-row lg:gap-10 md:gap-6  ">
                        <div className="w-full">
                            <Form.Item
                                label={"Amount"}
                                name={"amount"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Amount is required!",
                                    },
                                    {
                                        type: "number",
                                        message: "Enter valid value!",
                                    },
                                ]}
                                className={" md:!mb-6 !mb-2"}

                            >
                                <InputNumber placeholder={"Enter amount"}
                                             className="flex flex-col justify-center !w-full"/>
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
                                className={" md:!mb-6 !mb-2"}

                            >
                                <DatePicker
                                    className="default-input shadow-none "
                                    format={"DD-MM-YYYY"}
                                    allowClear={false}
                                    inputReadOnly={true}

                                />
                            </Form.Item>{" "}
                            <Form.Item
                                label="Category"
                                name={"userCategoryId"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Category is required!",
                                    },
                                ]}
                                className={" md:!mb-6 !mb-2"}

                            >
                                <Select placeholder={"Select category"} options={catOptions}/>
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Note"
                            name={"description"}
                            className="w-full note-input"
                        >
                            <Input.TextArea placeholder={"Enter your note"} className="!resize-none"/>
                        </Form.Item>
                    </div>

                    <div className="record-form-footer">
                        <FixWButton
                            isButton={true}
                            event={closeModal}
                            label={"cancel"}
                            buttonType={"default"}
                            cssWidthConfig={"md:max-w-[180px] max-w-[148px] w-full "}
                        />
                        <SubmitBtn label={"save"} isLoading={isSubmitting} isFixedWidth={true}
                                   extraStyle={"md:max-w-[180px] max-w-[148px] w-full "}/>
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default EditRecordForm;
