const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const RecordCardDate = ({ record }) => {
    const { date: usageDate } = record;

    const date = new Date(usageDate).getDate();
    const month = new Date(usageDate).getMonth();
    const year = new Date(usageDate).getFullYear();

    return (
        <div className="bg-[#F0F0F0] py-1 md:px-5 px-2 rounded-md text-primaryBlue">
            <div className="flex items-center gap-2 md:text-xl font-medium">
                <p className="md:text-[40px] text-3xl font-semibold  md:h-12 h-11 aspect-square flex items-center justify-center">
                    {" "}
                    {date}{" "}
                </p>
                <p> {months[month]} </p>
                <p> {year} </p>
            </div>
        </div>
    );
};

export default RecordCardDate;
