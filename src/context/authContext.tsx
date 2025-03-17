import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

//skapar context
const AuthContext = createContext<AuthContextType | null>(null);

//https://www.googleapis.com/books/v1/volumes?q=batman&key=AIzaSyBm0cqyfBpxn59su38MwwSwO_jM6sU8j3g
export interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async(credentials: LoginCredentials) => {
        try {
            const response = await fetch("http://localhost:4000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if(!response.ok){
                throw new Error("Inlogging misslyckades")
            }

            const data = await response.json() as AuthResponse;

            console.log("Data från API:", data);
            localStorage.setItem("token", data.token);
            setUser(data.user);

            console.log("Användare satt i AuthProvider:", data.user);
        } catch(error) {
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const validateToken = async () => {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/users/validate", {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + token
                }
            });

            if(response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch(error) {
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    useEffect(() => {
        validateToken();
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth måste användas inom AuthProvider");
    }

    return context;
}