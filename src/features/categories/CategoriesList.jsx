import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import { Segmented } from "antd";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "./categoriesApi";

const CategoriesList = () => {
    //const { categoriesList } = useSelector((state) => state.categoriesSlice);
    const [type, setType] = useState("EXPENSE");

    const { token } = useSelector((state) => state.authSlice);
    const { data: userCategories } = useGetAllCategoriesQuery(token);

    const filteredCategories = userCategories?.filter(
        (category) => category.type === type || category.type === null
    );

    return (
        <section>
            <Segmented
                options={[
                    {
                        label: "Expense",
                        value: "EXPENSE",
                    },
                    {
                        label: "Income",
                        value: "INCOME",
                    },
                ]}
                value={type}
                onChange={(value) => setType(value)}
                className="w-full"
                size="large"
                block
            />
            <div className="flex flex-col gap-2 mt-8">
                {filteredCategories?.map((category) => (
                    <CategoryCard
                        category={category}
                        key={category?.id}
                        isRemove={false}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategoriesList;
