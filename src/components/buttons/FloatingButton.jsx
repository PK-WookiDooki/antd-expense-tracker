import { Button, FloatButton } from "antd";
import { useDispatch } from "react-redux";
import { setIsAddRecordModalOpen } from "../../features/records/recordsSlice";
const FloatingButton = () => {
    const dispatch = useDispatch();

    const openRecordModal = () => {
        dispatch(setIsAddRecordModalOpen(true));
    };

    return (
        <Button
            onClick={openRecordModal}
            type="primary"
            htmlType="button"
            size="large"
            shape="circle"
            className=" !w-14 !h-14 flex items-center justify-center !bg-primaryGreen hover:!bg-primaryGreen/80 fixed left-1/2 transform -translate-x-1/2 bottom-10 md:hidden z-[5]  "
        >
            <i className="material-symbols-outlined">add</i>
        </Button>
    );
};

export default FloatingButton;
