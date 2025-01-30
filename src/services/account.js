import api from '../services/Api';

export const getAccountDetails = async (token) => {
    const account = await api.account(token);
    return account;
};
