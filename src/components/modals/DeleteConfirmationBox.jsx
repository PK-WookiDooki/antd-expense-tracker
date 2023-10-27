import Modal from "antd/es/modal/Modal";
import {useEffect, useState} from "react";
import {FixWButton} from "@/components";
import {Alert, Button} from "antd";
import {useDispatch} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";

const DeleteConfirmationBox = ({title, component, event, isDropdown}) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const closeModal = () => {
        setOpenModal(false);
        setError(null);
        setIsSubmitting(false)
    };

    const onDelete = async () => {
        try {
            setIsSubmitting(true)
            const {data, error: apiError} = await event();
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

    return (
        <section>
            {isDropdown ? (
                <button
                    onClick={() => setOpenModal(true)}
                    className="menu-item "
                >
                    Delete
                </button>
            ) : (
                <button
                    onClick={() => setOpenModal(true)}
                    className={"bg-danger hover:bg-danger/80 text-white md:h-10 h-8 aspect-square flex items-center justify-center rounded duration-200 "}>
                    <i className={"material-symbols-outlined text-base md:text-2xl "}> delete </i>
                </button>
            )}
            <Modal
                centered
                open={openModal}
                closeIcon={false}
                footer={null}
                width={isDropdown ? 580 : 480}
                className={" confirmation-modal "}
            >
                <h2 className="md:mb-8 mb-4 md:text-3xl text-xl text-center capitalize ">
                    Remove {title}
                </h2>
                <p className="mb-6 md:text-base text-sm">
                    Are you sure you want to delete this {title}?
                </p>

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

                {component}

                <div className="md:mt-10 mt-8 flex md:gap-10 gap-4 items-center justify-center">
                    <FixWButton
                        isButton={true}
                        event={() => setOpenModal(false)}
                        label={"No"}
                        htmlType={"button"}
                        buttonType={"default"}
                    />
                    <FixWButton
                        label={"Yes"}
                        htmlType={"submit"}
                        buttonType={"primary"}
                        isButton={true}
                        event={onDelete}
                        isLoading={isSubmitting}
                    />
                </div>
            </Modal>
        </section>
    );
};

export default DeleteConfirmationBox;
