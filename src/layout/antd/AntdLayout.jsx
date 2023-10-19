import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
    MdOutlineDashboard,
    MdOutlineBook,
    MdOutlineLibraryMusic,
} from "react-icons/md";
import "./antdlayout.css";
import Header from "../Header";

const styledIcon = {
    width: 20,
    height: 20,
};

const { Sider } = Layout;
const items = [
    {
        key: 1,
        icon: <MdOutlineDashboard style={styledIcon} />,
        label: "Dashboard",
    },
    {
        key: 2,
        icon: <MdOutlineBook style={styledIcon} />,
        label: "Books",
    },
    {
        key: 3,
        icon: <MdOutlineLibraryMusic style={styledIcon} />,
        label: "Music",
    },
];
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    padding: 0,
                    background: "#fff",
                }}
            >
                <Link className="title" to={"/"}>
                    {" "}
                    AntD Layout{" "}
                </Link>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    style={{
                        fontSize: 16,
                    }}
                    items={items}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: 200,
                }}
            >
                <Header />
                <main
                    style={{
                        padding: 20,
                    }}
                >
                    <Outlet />
                </main>
            </Layout>
        </Layout>
    );
};
export default App;
