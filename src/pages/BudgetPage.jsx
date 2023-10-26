import {useSelector} from "react-redux";
import {FloatingBtn, Loader} from "../components";
import {BudgetExpenses, BudgetHeader, EditBudgetModal} from "../features";
import {useGetAllExpensesQuery} from "../features/records/recordsApi";
import {useState} from "react";
import dayjs from "dayjs";
import {useGetUserDataQuery} from "../features/auth/userApi";

const BudgetPage = () => {
    const {token} = useSelector((state) => state.authSlice);
    const [selectedMonth, setSelectedMonth] = useState(dayjs());
    const {data: expensesList, isLoading: isELLoading, isFetching: isDataFetching} =
        useGetAllExpensesQuery({
            token,
            selectedMonth: selectedMonth.format("YYYY-MM"),
        });
    const {data: userData, isLoading: isUDLoading} =
        useGetUserDataQuery(token);

    const totalExpensePerMonth = expensesList?.reduce(
        (pv, cv) => pv + cv.amount,
        0
    );

    const remainingBudget = parseInt(userData?.budget) - totalExpensePerMonth > 0 ? parseInt(userData?.budget) - totalExpensePerMonth : totalExpensePerMonth - parseInt(userData?.budget);

    if (isUDLoading || isELLoading || isDataFetching) {
        return <Loader/>;
    }

    return (
        <section className="h-full flex flex-col md:gap-6 gap-4 ">
            <EditBudgetModal userBudget={userData?.budget} extraStyle={" md:hidden block "}/>
            <BudgetHeader
                remainingBudget={remainingBudget}
                totalExpensePerMonth={totalExpensePerMonth}
                userBudget={userData?.budget}
            />
            <BudgetExpenses
                userBudget={userData?.budget}
                expensesList={expensesList}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <FloatingBtn/>
        </section>
    );
};

export default BudgetPage;
