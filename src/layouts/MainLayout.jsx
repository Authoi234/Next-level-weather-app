import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div>
            <div className="min-h-screen flex justify-center items-center text-center">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;