import { login } from "@/services/usuarios/usuarioService";
import { LoginResponse, LoginForm } from "@/types/usuario";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useLoginUsuario(){
    const queryClient = useQueryClient();
    return useMutation<LoginResponse, AxiosError,LoginForm>({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(["usuario"], data.usuario);
            localStorage.setItem("token", data.token);
        }
    })
}