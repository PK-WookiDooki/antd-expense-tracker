import { Navigate, useLocation } from "react-router-dom";

const VerifyOtpGuard = ({ children }) => {
    const email = useLocation().state;

    if (!email) {
        return <Navigate to={".."} />;
    } else {
        return children;
    }
};

export default VerifyOtpGuard;
