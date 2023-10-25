import "./loader.css";

const SpinnerLoader = () => {
    return (
        <section className="flex items-center justify-center h-screen fixed w-full left-0 bg-black/60 top-0 z-[20]  ">
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </section>
    );
};

export default SpinnerLoader;
