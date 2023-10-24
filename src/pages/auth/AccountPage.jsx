import { Link } from "react-router-dom";
import { ChangePasswordModal, EditNameModal } from "@/features";
import { useGetUserDataQuery } from "@/features/auth/userApi";
import { useSelector } from "react-redux";

const Home = () => {
    const { token } = useSelector((state) => state.authSlice);
    const { data: userData } = useGetUserDataQuery(token);

    return (
        <section className=" bg-whiteGray w-full rounded-2xl overflow-hidden h-full pb-5">
            <div className="relative">
                <div className=" banner">
                    <span className="tan-blk"></span>
                    <span className="purple-blk"></span>
                    <span className="orange-blk"></span>
                    <span className="blue-blk"></span>
                </div>
                <span className="material-symbols-outlined text-[70px] w-28 h-28 rounded-full bg-dark text-whiteGray flex items-center justify-center outline outline-4 outline-whiteGray absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    {" "}
                    person{" "}
                </span>
            </div>
            <div className="lg:max-w-[660px] md:max-w-[450px] w-full mx-auto mt-14 duration-300 md:p-0 px-5">
                <EditNameModal username={userData?.username} />
                <div className="pb-6 border-b border-gray mt-4">
                    <h2 className="text-xl font-semibold">Email</h2>
                    <div className="flex items-center justify-between mt-2">
                        <p> {userData?.email || "example@gmail.com"} </p>
                        <Link
                            to={"changeEmail"}
                            className="edit-btn"   >
                            {" "}
                            Change{" "}
                        </Link>
                    </div>
                </div>
                <ChangePasswordModal />
            </div>
        </section>
    );
};

export default Home;
