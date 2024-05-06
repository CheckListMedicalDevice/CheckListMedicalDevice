import { useState, createContext, ReactNode, useEffect } from "react";
import { IUser } from "../interfaces/user.interface";
import { axiosInstance } from "../axiosRequest";



interface AuthContextType {
  user: IUser | null;
  saveUser: (token: string) => void;
  removeUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  saveUser: () => {},
  removeUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosInstance.get("/users/self");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);

  const saveUser = async (token: string) => {
    try {
      await localStorage.setItem("token", token);
      const response = await axiosInstance.get("/users/self");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async () => {
    try {
      await localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}