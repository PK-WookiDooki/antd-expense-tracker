import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoryCard = ({ category, isRemove }) => {
    return (
        <div
            className={` ${
                isRemove ? "p-0" : "md:p-3"
            } rounded-md md:bg-white text-black flex items-center justify-between`}
        >
            <div className=" capitalize flex items-center gap-3 ">
                <span
                    className={`min-w-[48px] h-12 rounded-md text-white flex items-center justify-center`}
                    style={{ backgroundColor: category.iconBgColor }}
                >
                    <i className="material-symbols-outlined">
                        {" "}
                        {category.iconName}{" "}
                    </i>
                </span>
                <h2 className="md:text-xl"> {category.name} </h2>
            </div>
            {!isRemove ? (
                <div className="flex items-center gap-2">
                    <EditCategoryModal category={category} />
                    <DeleteCategoryModal category={category} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CategoryCard;
