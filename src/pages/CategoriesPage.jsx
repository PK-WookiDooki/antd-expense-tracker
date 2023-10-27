import {FloatingBtn, Loader} from "../components";
import {CategoriesList} from "../features";
import AddNewCategoryForm from "../features/categories/AddNewCategoryForm";
import {useGetAllCategoriesQuery, useGetAllIconsQuery} from "../features/categories/categoriesApi";
import {useSelector} from "react-redux";

const CategoriesPage = () => {
    const {token} = useSelector((state) => state.authSlice);

    const {data: iconsList, isLoading: isIconsLoading} =
        useGetAllIconsQuery(token);

    const {data: categoriesList, isLoading: isCatLoading} = useGetAllCategoriesQuery(token)

    if (isIconsLoading || isCatLoading) {
        return <Loader/>;
    }

    return (
        <section className="lg:p-10 md:p-5 p-4 bg-cFA rounded-2xl flex flex-col gap-8 h-full">
            <AddNewCategoryForm iconsList={iconsList}/>
            <CategoriesList categoriesList={categoriesList}/>
            <FloatingBtn/>
        </section>
    );
};

export default CategoriesPage;
