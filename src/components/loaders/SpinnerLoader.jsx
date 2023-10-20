import "./loader.css";

const SpinnerLoader = () => {
    return (
        <section className="flex items-center justify-center h-full">
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </section>
    );
};

export default SpinnerLoader;
