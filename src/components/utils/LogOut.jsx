export const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); 
    navigate("/login");
};