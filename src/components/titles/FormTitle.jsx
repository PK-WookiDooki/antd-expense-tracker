const FormTitle = ({ title, desc, extraStyle }) => {
    return (
        <div className={"text-center"}>
            <h2 className={`text-2xl ${extraStyle ? extraStyle : "md:text-3xl"} font-medium text-primaryGreen mb-2 md:mb-4`}>
                {" "}
                {title}{" "}
            </h2>
            <p className="text-lightGray"> {desc} </p>
        </div>
    );
};

export default FormTitle;
