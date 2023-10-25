

const NoRecordsMessage = ({month}) => {
    return (
        <div className=" h-full flex items-center justify-center">
            {" "}
            <h3 className="md:text-2xl text-lg font-medium text-lightGray text-center">
                There is no transactions for {month ? month : " the selected dates"}!
            </h3>{" "}
        </div>
    );
};

export default NoRecordsMessage;
