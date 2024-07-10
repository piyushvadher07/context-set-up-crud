import { createContext, useCallback, useState } from "react";
import { UserAPI } from "../api/user-api";
import { executeApi } from "./base-context";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const executeUserAPI = async (apiFunction, request) => {
        const response = await executeApi(
            apiFunction,
            request,
        );
        return response;
    };

    const getUser = async (request) => {
        try {
            const response = await executeUserAPI(UserAPI.getUser, request);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (request) => {
        try {
            const response = await executeUserAPI(UserAPI.updateUser, request);

            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            await executeUserAPI(UserAPI.deleteUser, id);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };


    const contextValue = {
        user,
        setUser,
        getUser: useCallback((request) => {
            return getUser(request);
        }, []),
        updateUser: useCallback((request) => {
            return updateUser(request);
        }, []),
        deleteUser: useCallback((id) => {
            return deleteUser(id);
        }, []),
    }
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

