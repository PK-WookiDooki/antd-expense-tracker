import {useEffect, useState} from "react";
import {CreateBtn, FixWButton, SubmitBtn} from "@/components";
import {Alert, Form, Input, Modal, Segmented} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useAddNewCategoryMutation} from "./categoriesApi";
import {setMessage} from "@/app/global/globalSlice";

const AddNewCategoryForm = ({iconsList}) => {
    const {token} = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [icon, setIcon] = useState(null);
    const [type, setType] = useState("EXPENSE");
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch();

    const [addNewCategory] = useAddNewCategoryMutation();

    const [iconOptions, setIconOptions] = useState(
        iconsList?.filter((icon) => icon.type === type || icon.type == null)
    );

    const [form] = Form.useForm();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 3000);
        }

        if (type) {
            setIconOptions(
                iconsList?.filter(
                    (icon) => icon.type === type || icon.type == null
                )
            );
        }
    }, [error, type]);

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const {data, error: apiError} = await addNewCategory({
                category: {...values},
                token,
            });

            //console.log(data, error);
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
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.resetFields();
        setIcon(null);
        setIsSubmitting(false)
        setOpenModal(false);
    };

    const customValidator = async (rule, value) => {
        if (value?.toString().charAt(0) === " ") {
            throw new Error("Enter valid category name!")
        }
    }

    return (
        <section>
            <CreateBtn
                label={"category"}
                event={() => setOpenModal(true)}
            />

            <Modal centered open={openModal} footer={null} closeIcon={false} width={600}>
                <Form form={form} onFinish={onFormSubmit} layout="vertical" className=" create-form ">
                    <h2 className="modal-form-tlt">
                        {" "}
                        Add New Category{" "}
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

                    <Form.Item name={"type"} initialValue={"EXPENSE"} className={"!mb-4 md:!mb-8"}>
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
                            onChange={(value) => setType(value)}
                            className="w-full"
                            size="large"
                            block
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category Name"
                        name={"userCategoryName"}
                        rules={[
                            {
                                required: true,
                                message: "Category name is required!",
                            }, {
                                validator: customValidator
                            }
                        ]}
                        className={"!mb-4 md:!mb-8"}
                        validateTrigger={"onSubmit"}
                    >
                        <Input placeholder={"Enter category name"}/>
                    </Form.Item>

                    <Form.Item
                        name={"iconName"}
                        label="Select Icon"
                        rules={[
                            {
                                required: true,
                                message: "Category Icon is required!",
                            },
                        ]}
                        validateTrigger={"onSubmit"}
                    >
                        <div className="icon-box ">
                            {iconOptions?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <label
                                            htmlFor={item.name}
                                            className={`icon-style `}
                                            style={{
                                                color:
                                                    icon == item.name
                                                        ? "#FFF"
                                                        : item.iconBgColor,
                                                backgroundColor:
                                                    icon == item.name
                                                        ? item.iconBgColor
                                                        : "#FFF",
                                                borderColor: item.iconBgColor,
                                            }}
                                        >
                                            <i className="material-symbols-outlined text-lg md:text-2xl">
                                                {item.name}
                                            </i>
                                        </label>
                                        <input
                                            id={item.name}
                                            type="radio"
                                            name="iconName"
                                            value={item.name}
                                            onChange={(e) =>
                                                setIcon(e.target.value)
                                            }
                                            checked={icon == item.name}
                                            className="hidden"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Item>

                    <div className="category-form-footer">
                        <FixWButton
                            isButton={true}
                            event={closeModal}
                            label={"cancel"}
                            buttonType={"default"}
                            cssWidthConfig={"lg:max-w-[180px] max-w-[148px]"}
                        />
                        <SubmitBtn label={"save"} isLoading={isSubmitting} isFixedWidth={true}
                                   extraStyle={" lg:max-w-[180px] max-w-[148px] w-full "}/>
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewCategoryForm;
