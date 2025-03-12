import { createContext, useState, useContext, ReactNode } from "react";
import {User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";


//skapar context
const AuthContext = createContext<AuthContextType | null>(null);


export interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async(credentials: LoginCredentials) => {
        try {
            const response = await fetch("http://localhost:6000/users/login", {
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

            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch(error) {
            throw error
        }
    }
}