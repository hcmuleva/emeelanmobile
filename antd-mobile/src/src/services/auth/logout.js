export const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    localStorage.removeItem("user");  // Clear user dat
};