import { useSelector } from "react-redux";
import { ConfirmationModal } from "../../components";
import { useDeleteRecordMutation } from "./recordsApi";
import { RecordCardBody } from "..";

const DeleteRecordModal = ({ record }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [deleteRecord] = useDeleteRecordMutation();

    return (
        <ConfirmationModal
            title={"record"}
            event={() => deleteRecord({ recordId: record?.recordId, token })}
            component={<RecordCardBody record={record} isRemove={true} />}
            isDropdown={true}
        />
    );
};

export default DeleteRecordModal;
