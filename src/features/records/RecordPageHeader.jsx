import {DatePicker} from "antd";

const RecordPageHeader = ({dates, setDates}) => {

    return (
        <div className=" flex items-center gap-8 md:max-w-[400px] w-full text-black">
            <div className="datepicker-wrapper">
                <label htmlFor="startDate" className="datepicker-label">Start Date</label>
                <DatePicker
                    defaultValue={dates.startDate}
                    onChange={(startDate) => setDates({...dates, startDate})}
                    id="startDate"
                    format={"DD-MM-YYYY"}
                    className="!h-8 !text-base"
                    allowClear={false}
                    disabledDate={(date) => !date || date.isAfter(dates.endDate)}
                    inputReadOnly={true}
                />
            </div>
            <div className="datepicker-wrapper">
                <label htmlFor="endDate" className="datepicker-label">End Date</label>
                <DatePicker
                    defaultValue={dates.endDate}
                    onChange={(endDate) => setDates({...dates, endDate})}
                    id="endDate"
                    format={"DD-MM-YYYY"}
                    className="!h-8 !text-base"
                    allowClear={false}
                    disabledDate={(date) => !date || date.isBefore(dates.startDate)}
                    inputReadOnly={true}
                />
            </div>
        </div>
    );
};

export default RecordPageHeader;
