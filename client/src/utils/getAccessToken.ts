const getAccessToken = (): string | null => {
    return localStorage.getItem('jwt_access_token');
};

export default getAccessToken;
