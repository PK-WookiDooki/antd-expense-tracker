import { useSelector } from "react-redux";
import { ConfirmationModal } from "../../components";
import CategoryCard from "./CategoryCard";
import { useDeleteCategoryMutation } from "./categoriesApi";

const DeleteCategoryModal = ({ category }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [deleteCategory] = useDeleteCategoryMutation();

    return (
        <ConfirmationModal
            title={"category"}
            event={() => deleteCategory({ category: category?.id, token })}
            component={<CategoryCard category={category} isRemove={true} />}
        />
    );
};

export default DeleteCategoryModal;
