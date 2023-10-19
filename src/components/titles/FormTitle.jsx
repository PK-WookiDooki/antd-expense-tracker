const FormTitle = ({ title, desc }) => {
    return (
        <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-primaryGreen mb-2">
                {" "}
                {title}{" "}
            </h2>
            <p className="md:text-base"> {desc} </p>
        </div>
    );
};

export default FormTitle;
