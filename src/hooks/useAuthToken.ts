import { useEffect } from "react";
import { useAppDispatch } from "../app/store";
import { getToken, setToken } from "../app/auth.slice";

const useAuthToken = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tokenInStorage = localStorage.getItem('auth_token');
        if (tokenInStorage) {
            dispatch(setToken(tokenInStorage));
        }else{
            dispatch(getToken({ login: 'admin', password: 'admin' }));
        }
    }, []);
};

export default useAuthToken;