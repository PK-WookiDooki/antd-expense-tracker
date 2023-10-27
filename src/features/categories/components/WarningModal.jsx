import {Button, Modal} from "antd";
import {useState} from "react";
import {MdError} from "react-icons/md";

const WarningModal = ({actionType}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <section>
            <button
                onClick={() => setOpenModal(true)}
                className={` ${actionType === "edit" ? " bg-primaryBlue hover:bg-primaryBlue/80 " :
                    " bg-danger hover:bg-danger/80 "}  text-white md:h-10 h-8 aspect-square flex items-center justify-center rounded duration-200 `}>
                <i className={"material-symbols-outlined text-base md:text-2xl "}> {actionType} </i>
            </button>

            <Modal
                centered
                open={openModal}
                onOk={() => setOpenModal(false)}
                closeIcon={false}
                footer={null}
                width={"py-6"}
            >
                {" "}
                <div className=" flex items-center gap-2 justify-center mb-6 text-[#FFA940]">
                    <MdError className="text-2xl "/>
                    <p className=" md:text-xl text-c26">
                        {" "}
                        Sorry! you can&apos;t {actionType} the system category.{" "}
                    </p>
                </div>
                {" "}
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
