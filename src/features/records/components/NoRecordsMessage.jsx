const NoRecordsMessage = ({month}) => {
    return (
        <div className=" h-full flex items-center justify-center">
            {" "}
            <h3 className="md:text-2xl font-medium text-lightGray text-center">
                There is no transactions for {month ? month : "now"}!
            </h3>{" "}
        </div>
    );
};

export default NoRecordsMessage;
