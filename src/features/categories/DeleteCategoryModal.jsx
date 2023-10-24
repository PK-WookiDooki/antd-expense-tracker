import { useSelector } from "react-redux";
import { ConfirmationModal } from "@/components";
import CategoryCard from "./CategoryCard";
import { useDeleteCategoryMutation } from "./categoriesApi";
import WarningModal from "./components/WarningModal";

const DeleteCategoryModal = ({ category }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [deleteCategory] = useDeleteCategoryMutation();

    return category?.type === null ? (
        <WarningModal actionType={"delete"} />
    ) : (
        <ConfirmationModal
            title={"category"}
            event={() => deleteCategory({ categoryId: category?.id, token })}
            component={<CategoryCard category={category} isRemove={true} />}
        />
    );
};

export default DeleteCategoryModal;
