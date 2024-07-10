import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/auth-api";
import { executeApi } from "./base-context";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigation = useNavigate();


    const executeAuthAPI = async (apiFunction, request) => {
        const response = await executeApi(
            apiFunction,
            request,
        );
        return response;
    };

    const Register = async (request) => {
        try {
            const response = await executeAuthAPI(AuthAPI.registerUser, request);
            setUser(response.data);
            navigation("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const Login = async (request) => {
        try {
            const response = await executeAuthAPI(AuthAPI.loginUser, request);
            console.log('response78787', response)
            setUser(response.data);
            localStorage.setItem("admin_user_token", response.token)
            navigation("/user");
        } catch (error) {
            console.log(error);
        }
    }

    const contextValue = {
        user,
        setUser,
        Register: useCallback((request) => {
            return Register(request);
        }, []),
        Login: useCallback((request) => {
            return Login(request);
        }, []),
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}

