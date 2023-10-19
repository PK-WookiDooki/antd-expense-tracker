import { useSelector } from "react-redux";
import { FloatingBtn } from "../components";
import { BudgetExpenses, BudgetHeader } from "../features";
import { useGetAllExpensesQuery } from "../features/records/recordsApi";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetUserDataQuery } from "../features/auth/userApi";

const BudgetPage = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [selectedMonth, setSelectedMonth] = useState(dayjs());
    const { data: expensesList } = useGetAllExpensesQuery({
        token,
        selectedMonth: selectedMonth.format("YYYY-MM"),
    });
    const { data: userData } = useGetUserDataQuery(token);

    const totalExpensePerMonth = expensesList?.reduce(
        (pv, cv) => pv + cv.amount,
        0
    );

    const remainingBudget = parseInt(userData?.budget) - totalExpensePerMonth;

    return (
        <section className="h-full flex flex-col gap-6 ">
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
