import { DatePicker } from "antd";

const RecordPageHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {

    return (
        <div className=" flex items-center gap-8 md:max-w-[400px] w-full text-black">
            <div className="datepicker-wrapper">
                <label htmlFor="startDate" className="datepicker-label">Start Date</label>
                <DatePicker
                    defaultValue={startDate}
                    onChange={(dateString) => setStartDate(dateString)}
                    id="startDate"
                    format={"DD-MM-YYYY"}
                    className="!h-8 !text-base"
                    allowClear={false}
                    disabledDate={(date) => !date || date.isAfter(endDate)}
                    inputReadOnly={true}
                />
            </div>
            <div className="datepicker-wrapper">
                <label htmlFor="endDate" className="datepicker-label">End Date</label>
                <DatePicker
                    defaultValue={endDate}
                    onChange={(dateString) => setEndDate(dateString)}
                    id="endDate"
                    format={"DD-MM-YYYY"}
                    className="!h-8 !text-base"
                    allowClear={false}
                    disabledDate={(date) => !date || date.isBefore(startDate)}
                    inputReadOnly={true}
                />
            </div>
        </div>
    );
};

export default RecordPageHeader;
