import dayjs from "dayjs";

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

const RecordCardDate = ({record}) => {
    const {date: createdDate} = record;

    // const date = dayjs(createdDate).date();
    // const month = dayjs(createdDate).month();
    // const year = dayjs(createdDate).year();

    const dateArray = createdDate?.split(",")
    return (
        <div className="bg-cF0 py-1 md:px-5 px-2 rounded-md text-c3A">
            <div className="flex items-center gap-2 md:text-xl font-medium">
                <p className="md:text-[40px] text-3xl font-semibold  md:h-[52px] h-11 aspect-square flex items-center justify-center">
                    {" "}
                    {dateArray[2]}{" "}
                </p>
                <p> {months[dateArray[1] - 1]} </p>
                <p> {dateArray[0]} </p>
            </div>
        </div>
    );
};

export default RecordCardDate;
