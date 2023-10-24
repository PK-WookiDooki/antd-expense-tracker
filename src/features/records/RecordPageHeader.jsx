import { DatePicker } from "antd";

const RecordPageHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {

    return (
        <div className=" flex items-center gap-8 md:max-w-[400px] w-full text-black">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                    defaultValue={startDate}
                    onChange={(dateString) => setStartDate(dateString)}
                    id="startDate"
                    format={"DD MMMM YYYY"}
                    className="!h-10 !text-base"
                    allowClear={false}
                    disabledDate={(date) => !date || date.isAfter(endDate)}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="endDate">End Date</label>
                <DatePicker
                    defaultValue={endDate}
                    onChange={(dateString) => setEndDate(dateString)}
                    id="endDate"
                    format={"DD MMMM YYYY"}
                    className="!h-10 !text-base"
                    allowClear={false}
                    disabledDate={(date) => !date || date.isBefore(startDate)}
                />
            </div>
        </div>
    );
};

export default RecordPageHeader;
