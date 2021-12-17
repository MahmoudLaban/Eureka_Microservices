
export const isLoginedUser = () => {
    return localStorage.getItem('access_token') != null ? true : false;
}
export const getLoginedUserName = () => {
    return localStorage.getItem('username') != null ? localStorage.getItem('username') : "None";
}
export const getLoginedId = () => {
    return localStorage.getItem('user_id') != null ? localStorage.getItem('user_id') : -1;
}

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    window.location.href = '/login';
}