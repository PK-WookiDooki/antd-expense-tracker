import {Link} from "react-router-dom";
import {ChangePasswordModal, EditNameModal} from "@/features";
import {useGetUserDataQuery} from "@/features/auth/userApi";
import {useSelector} from "react-redux";
import dbImgPc from "@/assets/imgs/img_dbPc.png";
import {Loader} from "@/components/index.js";

const Home = () => {
    const {token} = useSelector((state) => state.authSlice);
    const {data: userData, isLoading: isUDLoading} = useGetUserDataQuery(token);

    if (isUDLoading) {
        return <Loader/>
    }

    return (
        <section className=" bg-whiteGray w-full rounded-2xl h-full pb-5 overflow-hidden">
            <div className="relative bg-cover bg-no-repeat bg-right md:h-[250px] h-[170px]"
                 style={{backgroundImage: `url(${dbImgPc})`}}
            >
                <span
                    className="material-symbols-outlined text-[70px] w-28 h-28 rounded-full bg-dark text-whiteGray flex items-center justify-center outline outline-4 outline-whiteGray absolute left-1/2 transform bottom-0 translate-y-1/2 -translate-x-1/2">
                    {" "}
                    person{" "}
                </span>
            </div>
            <div className="lg:max-w-[660px] md:max-w-[450px] w-full mx-auto mt-20 duration-300 md:p-0 px-5">
                <EditNameModal username={userData?.username}/>
                <div className="pb-6 border-b border-gray mt-4 text-dark ">
                    <h2 className="text-xl">Email</h2>
                    <div className="flex items-center justify-between mt-2">
                        <p> {userData?.email || "example@gmail.com"} </p>
                        <Link
                            to={"changeEmail"}
                            className="edit-btn">
                            {" "}
                            Change{" "}
                        </Link>
                    </div>
                </div>
                <ChangePasswordModal/>
            </div>
        </section>
    );
};

export default Home;
