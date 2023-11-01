import CategoryCard from "./CategoryCard";
import {Segmented} from "antd";
import {useEffect, useState} from "react";

const CategoriesList = ({categoriesList}) => {
    const [type, setType] = useState("EXPENSE");
    useEffect(() => {
        if (categoriesList) {
            setFilteredCategories(categoriesList?.filter(
                (category) => category.type === type || category.type === null))
        }
    }, [categoriesList, type]);

    const [filteredCategories, setFilteredCategories] = useState([])

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
