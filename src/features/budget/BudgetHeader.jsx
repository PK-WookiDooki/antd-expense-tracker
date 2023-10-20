import { useSelector } from "react-redux";
import { formatCurrency } from "../../core/functions/formatData";
import { useGetUserDataQuery } from "../auth/userApi";
import EditBudgetModal from "./EditBudgetModal";

const BudgetHeader = ({
    userBudget,
    remainingBudget,
    totalExpensePerMonth,
}) => {
    return (
        <section className="md:p-10 p-4 rounded-2xl bg-primaryGreen font-medium flex items-center text-whiteGray justify-between">
            <div className="md:w-full">
                <h2 className="lg:text-[40px] md:text-3xl text-xl mb-2">
                    Budget
                </h2>
                <p className="md:text-xl text-sm font-normal md:font-medium">
                    {formatCurrency(totalExpensePerMonth)} from{" "}
                    {formatCurrency(userBudget)}
                </p>
            </div>

            <div className="flex items-center md:gap-16 justify-center md:w-full">
                <div className="text-right">
                    <p className="lg:text-xl text-sm mb-2">Remaining</p>
                    <p className="lg:text-[40px] md:text-3xl text-xl">
                        {" "}
                        {formatCurrency(remainingBudget)}{" "}
                    </p>
                </div>
                <span className=" md:block hidden self-stretch w-[1px] bg-whiteGray"></span>
                <EditBudgetModal
                    userBudget={userBudget}
                    extraStyle={" hidden md:block "}
                />
            </div>
        </section>
    );
};

export default BudgetHeader;
