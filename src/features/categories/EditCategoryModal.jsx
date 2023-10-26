import {useEffect, useState} from "react";
import {FixWButton} from "@/components";
import {Alert, Button, Form, Input, Modal, Segmented} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    useGetAllIconsQuery,
    useUpdateCategoryMutation,
} from "./categoriesApi";
import {setMessage} from "@/app/global/globalSlice";
import WarningModal from "./components/WarningModal";

const EditCategoryModal = ({category}) => {
    const {token} = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [icon, setIcon] = useState(category?.iconName);
    const [type, setType] = useState(category?.type);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {data: iconsList} = useGetAllIconsQuery(token);

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
            setIsSubmitting(true)
            const {data, error: apiError} = await updateCategory({
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
                setIsSubmitting(false)
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setIsSubmitting(false)
    };

    return category?.type === null ? (
        <WarningModal actionType={"edit"}/>
    ) : (
        <section>
            <button
                onClick={() => setOpenModal(true)}
                className={"bg-primaryBlue hover:bg-primaryBlue/80 text-white md:h-10 h-8 aspect-square flex items-center justify-center rounded duration-200 "}>
                <i className={"material-symbols-outlined text-base md:text-2xl "}> edit </i>
            </button>

            <Modal
                centered
                open={openModal}
                width={600}
                footer={null}
                closeIcon={false}
            >
                <Form form={form} onFinish={onFormSubmit} layout="vertical" className={"create-form"}>
                    <h2 className="modal-form-tlt">
                        {" "}
                        Edit Category{" "}
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

                    <Form.Item name={"type"} initialValue={category?.type} className={"mb-8"}>
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
                        <Input/>
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
                    >
                        <div className="icon-box">
                            {iconOptions?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <label
                                            htmlFor={`category${category.id}${item.name}`}
                                            className={`icon-style
                                           `}
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
                                            <i className="material-symbols-outlined text-lg md:text-2xl">
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

export default EditCategoryModal;
