import { Button, Modal } from "antd";
import { useState } from "react";
import { MdError } from "react-icons/md";

const WarningModal = ({ actionType }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <section>
            <Button
                onClick={() => setOpenModal(true)}
                type="primary"
                shape="round"
                className={`!h-6 md:!h-8 text-sm flex items-center justify-center !text-white capitalize ${
                    actionType === "edit"
                        ? "!bg-primaryGreen  hover:!bg-primaryGreen/80"
                        : " !bg-danger hover:!bg-danger/80"
                } `}
            >
                {actionType}
            </Button>
            <Modal
                centered
                open={openModal}
                onOk={() => setOpenModal(false)}
                closeIcon={false}
                footer={null}
                width={""}
            >
                {" "}
                <div className=" flex items-center gap-2 justify-center mb-6 text-yellow-400 ">
                    <MdError className="text-2xl" />
                    <p className="text-lg text-dark">
                        {" "}
                        Sorry! you can't {actionType} the system category.{" "}
                    </p>
                </div>{" "}
                <Button
                    onClick={() => setOpenModal(false)}
                    type="primary"
                    shape="round"
                    className=" !bg-primaryGreen hover:!bg-primaryGreen/80 w-full"
                >
                    Ok
                </Button>
            </Modal>
        </section>
    );
};

export default WarningModal;
