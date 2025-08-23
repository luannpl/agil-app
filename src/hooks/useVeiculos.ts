// src/hooks/useVeiculos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getVeiculos,
    getVeiculoById,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo,
} from "@/services/veiculos/veiculosService";
import { CreateVeiculoResponse, VeiculoFormValues } from "@/types/veiculo";
import { AxiosError } from "axios";

// GET todos os veículos
export function useVeiculos() {
    return useQuery<VeiculoFormValues[]>({
        queryKey: ["veiculos"],
        queryFn: getVeiculos,
    });
}

// GET um veículo por ID
export function useVeiculo(id: string) {
    return useQuery<VeiculoFormValues>({
        queryKey: ["veiculo", id],
        queryFn: () => getVeiculoById(id),
        enabled: !!id, // só faz a requisição se o ID existir
    });
}

// POST novo veículo
export function useCreateVeiculo() {
    const queryClient = useQueryClient();

    return useMutation<CreateVeiculoResponse, AxiosError, FormData>({
        mutationFn: createVeiculo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["veiculos"] });
        },
    });
}

// PUT atualizar veículo
export function useUpdateVeiculo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<VeiculoFormValues> }) =>
            updateVeiculo(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["veiculos"] });
        },
    });
}

// DELETE veículo
export function useDeleteVeiculo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVeiculo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["veiculos"] });
        },
    });
}
