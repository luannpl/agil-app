"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMe } from "@/services/usuarios/usuarioService";
import { UsuarioResponse } from "@/types/usuario";

interface IAuthContext {
  user: UsuarioResponse | null;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("chegou aqui");
        const userData = await getMe();
        console.log("User data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
