export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.role : null;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}