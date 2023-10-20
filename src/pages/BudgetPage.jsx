import { useSelector } from "react-redux";
import { FloatingBtn, Loader } from "../components";
import { BudgetExpenses, BudgetHeader, EditBudgetModal } from "../features";
import { useGetAllExpensesQuery } from "../features/records/recordsApi";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetUserDataQuery } from "../features/auth/userApi";

const BudgetPage = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [selectedMonth, setSelectedMonth] = useState(dayjs());
    const { data: expensesList, isLoading: isELLoading } =
        useGetAllExpensesQuery({
            token,
            selectedMonth: selectedMonth.format("YYYY-MM"),
        });
    const { data: userData, isLoading: isUDLoading } =
        useGetUserDataQuery(token);

    const totalExpensePerMonth = expensesList?.reduce(
        (pv, cv) => pv + cv.amount,
        0
    );

    const remainingBudget = parseInt(userData?.budget) - totalExpensePerMonth;

    if (isUDLoading || isELLoading) {
        return <Loader />;
    }

    return (
        <section className="h-full flex flex-col gap-6 ">
            <EditBudgetModal extraStyle={" md:hidden block "} />
            <BudgetHeader
                remainingBudget={parseInt(remainingBudget)}
                totalExpensePerMonth={totalExpensePerMonth}
                userBudget={userData?.budget}
            />
            <BudgetExpenses
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <FloatingBtn />
        </section>
    );
};

export default BudgetPage;
