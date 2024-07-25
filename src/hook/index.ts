'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:5000/api/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] })
      toast.success("Product deleted successfully!")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error deleting product: ${errorMessage}`);
    },
  })
}

export const useSubmitProduct = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any): Promise<any> => {
      if (id) {
        return axios
          .put(`http://localhost:5000/api/product/${id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
      } else {
        return axios.post(`http://localhost:5000/api/product`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] })
      if (id) toast.success("Product has been updated")
      else toast.success("Product has been created")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error deleting product: ${errorMessage}`);
    },
  })
}