import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoryCard = ({category, isRemove}) => {
    return (
        <div
            className={` ${
                isRemove ? "p-0" : "md:px-6 md:py-1"
            } rounded-md bg-white text-dark flex items-center justify-between`}
        >
            <div className=" capitalize flex items-center md:gap-3 gap-2 ">
                <span
                    className={`md:h-12 aspect-square h-10  rounded-md text-white flex items-center justify-center`}
                    style={{backgroundColor: category.iconBgColor}}
                >
                    <i className="material-symbols-outlined">
                        {" "}
                        {category.iconName}{" "}
                    </i>
                </span>
                <h2 className="md:text-xl"> {category.name} </h2>
            </div>
            {!isRemove ? (
                <div className="flex items-center md:gap-3 gap-2 ">
                    <EditCategoryModal category={category}/>
                    <DeleteCategoryModal category={category}/>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CategoryCard;
