import { useEffect, useState } from "react";
import { CreateBtn, FixWButton } from "@/components";
import { Alert, Form, Input, Modal, Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAddNewCategoryMutation } from "./categoriesApi";
import { setMessage } from "@/app/global/globalSlice";

const AddNewCategoryForm = ({ iconsList }) => {
    const { token } = useSelector((state) => state.authSlice);
    //const { iconsList } = useSelector((state) => state.categoriesSlice);
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
            const { data, error: apiError } = await addNewCategory({
                category: { ...values },
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

    return (
        <section>
            <CreateBtn
                label={"Category"}
                icon={"add"}
                type={"category"}
                event={() => setOpenModal(true)}
            />

            <Modal centered open={openModal} footer={null} closeIcon={false}>
                <Form form={form} onFinish={onFormSubmit} layout="vertical" className=" create-form " >
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

                    <Form.Item name={"type"} initialValue={"EXPENSE"} className={"mb-8"} >
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
                            },
                        ]}
                        className={"mb-8"}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={"iconName"}
                        label="Icon"
                        rules={[
                            {
                                required: true,
                                message: "Category Icon is required!",
                            },
                        ]}
                    >
                        <div className="icon-box ">
                            {iconOptions?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <label
                                            htmlFor={item.name}
                                            className={`w-12 h-12 rounded-md border cursor-pointer flex items-center justify-center `}
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
                                            <i className="material-symbols-outlined text-3xl">
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
                            htmlType={"button"}
                            buttonType={"default"}
                        />
                        <FixWButton
                            label={"save"}
                            htmlType={"submit"}
                            buttonType={"primary"}
                            isButton={true}
                            isLoading={isSubmitting}
                        />
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewCategoryForm;
