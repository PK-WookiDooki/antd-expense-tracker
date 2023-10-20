import { useEffect, useState } from "react";
import { CreateBtn, FixWButton } from "../../components";
import { Alert, Form, Input, Modal, Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAddNewCategoryMutation } from "./categoriesApi";
import { setMessage } from "../../app/global/globalSlice";

const AddNewCategoryForm = ({ iconsList }) => {
    const { token } = useSelector((state) => state.authSlice);
    //const { iconsList } = useSelector((state) => state.categoriesSlice);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [icon, setIcon] = useState(null);
    const [type, setType] = useState("EXPENSE");

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
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.resetFields();
        setIcon(null);
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
                <Form form={form} onFinish={onFormSubmit} layout="vertical">
                    <h2 className="text-xl font-medium mb-10">
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
                        <div className="grid grid-cols-5 md:grid-cols-8 gap-2 p-2 rounded-md border border-gray min-h-[40px]">
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

                    <div className="mt-9 flex md:gap-10 gap-4 items-center justify-center">
                        <FixWButton
                            isButton={true}
                            event={closeModal}
                            label={"cancel"}
                            htmlType={"button"}
                            buttonType={"default"}
                        />
                        <FixWButton
                            label={"confirm"}
                            htmlType={"submit"}
                            buttonType={"primary"}
                            isButton={true}
                        />
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewCategoryForm;
