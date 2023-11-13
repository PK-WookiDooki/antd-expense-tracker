import Modal from "antd/es/modal/Modal";
import {useEffect, useState} from "react";
import {FixWButton} from "@/components";
import {useDispatch} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";

const DeleteConfirmationBox = ({title, component, event, isDropdown}) => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false)


    const closeModal = () => {
        setOpenModal(false);
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
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: apiError?.data?.message || apiError?.error,
                    })
                );
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
                    <i className={"material-symbols-rounded text-base md:text-2xl "}> delete </i>
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
                <h2 className="md:mb-8 mb-4 md:text-3xl text-xl text-center capitalize font-medium ">
                    Remove {title}
                </h2>
                <p className="mb-6 md:text-base text-sm">
                    Are you sure you want to delete this {title}?
                </p>
                {component}

                <div className="md:mt-10 mt-8 flex md:gap-10 gap-4 items-center justify-center">
                    <FixWButton
                        isButton={true}
                        event={() => setOpenModal(false)}
                        label={"No"}
                        buttonType={"default"}
                        cssWidthConfig={" md:max-w-[180px] max-w-[148px] "}
                    />
                    <FixWButton
                        label={"Yes"}
                        buttonType={"primary"}
                        isButton={true}
                        event={onDelete}
                        isLoading={isSubmitting}
                        cssWidthConfig={" md:max-w-[180px] max-w-[148px] "}
                    />
                </div>
            </Modal>
        </section>
    );
};

export default DeleteConfirmationBox;
