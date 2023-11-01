import {formatCurrency} from "@/core/functions/formatData";
import EditBudgetModal from "./EditBudgetModal";

const BudgetHeader = ({
                          userBudget,
                          remainingBudget,
                          totalExpensePerMonth,
                      }) => {

    return (
        <section
            className="lg:p-10 md:p-5 md:py-10 p-4 rounded-2xl bg-primaryGreen font-medium flex items-center text-cFA justify-between gap-4 drop-shadow-xl ">
            <div className="md:w-full">
                <h2 className="md:text-3xl text-xl mb-2 text-cFA">
                    Budget
                </h2>
                <p className="md:text-xl text-sm font-normal md:font-medium font-rbs text-cF0 ">
                    {userBudget > 0
                        ? formatCurrency(totalExpensePerMonth)
                        : formatCurrency(userBudget)}{" "}
                    from {formatCurrency(userBudget)}
                </p>
            </div>

            <div className="flex items-center md:gap-16 justify-center md:w-full">
                <div className="text-right">
                    <p className="md:text-xl text-sm font-normal md:font-medium mb-2 text-cF0 "> {userBudget === 0 ? "Remaining" : userBudget - totalExpensePerMonth >= 0 ? "Remaining" : "Exceeded"} </p>
                    <p className="md:text-3xl text-xl font-rbs text-cFA
                    ">
                        {userBudget === 0 ? formatCurrency(userBudget) : formatCurrency(remainingBudget)}
                    </p>
                </div>
                <span className=" md:block hidden self-stretch w-[1px] bg-cFA/30"></span>
                <EditBudgetModal
                    userBudget={userBudget}
                    extraStyle={" hidden md:block "}
                />
            </div>
        </section>
    );
};

export default BudgetHeader;
