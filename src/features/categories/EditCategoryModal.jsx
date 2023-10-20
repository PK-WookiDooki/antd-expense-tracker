import { useEffect, useState } from "react";
import { FixWButton } from "../../components";
import { Alert, Button, Form, Input, Modal, Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    useGetAllIconsQuery,
    useUpdateCategoryMutation,
} from "./categoriesApi";
import { setMessage } from "../../app/global/globalSlice";

const EditCategoryModal = ({ category }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [icon, setIcon] = useState(category?.iconName);
    const [type, setType] = useState(category?.type);

    const { data: iconsList } = useGetAllIconsQuery(token);

    const [iconOptions, setIconOptions] = useState(
        iconsList?.filter((icon) => icon.type === type || icon.type === null)
    );

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }

        if (type) {
            setIconOptions(
                iconsList?.filter(
                    (icon) => icon.type === type || icon.type === null
                )
            );
        }

        if (category) {
            form.setFieldValue("userCategoryName", category?.name);
            form.setFieldValue("iconName", category?.iconName);
        }
    }, [error, type, openModal]);

    const onFormSubmit = async (values) => {
        try {
            //console.log({
            //    categoryId: category?.id,
            //    category: values,
            //    token,
            //});
            //return;

            const { data, error: apiError } = await updateCategory({
                categoryId: category?.id,
                category: values,
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

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <section>
            <Button
                onClick={() => setOpenModal(true)}
                type="primary"
                shape="round"
                className=" !h-6 md:!h-8 text-sm !bg-primaryGreen !text-white hover:!bg-primaryGreen/80 flex items-center justify-center "
            >
                Edit
            </Button>

            <Modal
                centered
                open={openModal}
                //width={600}
                footer={null}
                closeIcon={false}
            >
                <Form form={form} onFinish={onFormSubmit} layout="vertical">
                    <h2 className="text-xl font-medium mb-10">
                        {" "}
                        Update Category{" "}
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

                    <Form.Item name={"type"} initialValue={category?.type}>
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
                        <div className="grid grid-cols-6 md:grid-cols-8 gap-2 p-2 rounded-md border border-secondary place-items-center min-h-[40px] ">
                            {iconOptions?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <label
                                            htmlFor={`category${category.id}${item.name}`}
                                            className={`w-12 h-12 rounded-md border cursor-pointer flex items-center justify-center `}
                                            style={{
                                                color:
                                                    icon === item.name
                                                        ? "#FFF"
                                                        : item.iconBgColor,
                                                backgroundColor:
                                                    icon === item.name
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
                                            id={`category${category.id}${item.name}`}
                                            type="radio"
                                            name="icon"
                                            value={item.name}
                                            onChange={(e) =>
                                                setIcon(e.target.value)
                                            }
                                            checked={icon === item.name}
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

export default EditCategoryModal;
