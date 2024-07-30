'use client'
import { useGlobalContext } from "@/lib/context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useQueryType = () => {
  return useQuery<Type>({
    queryKey: ['type'],
    queryFn: () =>
      axios.get('http://localhost:5000/api/type')
        .then((res) => res.data)
        .catch(
          (error) => {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            toast.error(`Error deleting product: ${errorMessage}`);
          }
        ),
  });
}

export const useQueryProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () =>
      axios.get(`http://localhost:5000/api/product/${id}`).then((res) => res.data),
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<string, void, unknown>({
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

export const useMutationLogin = () => {
  const { dispatch } = useGlobalContext()
  return useMutation({
    mutationFn: (data: Login): Promise<string> => {
      return axios.post('http://localhost:5000/api/login', data).then(resp => resp.data.token)
    },
    onSuccess: (token) => {
      dispatch({ type: 'LOGIN', payload: token })
      toast.success("Login Successfully!")
      // router.push('/')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error Login: ${errorMessage}`);
    },
  })
}

export const useProducts = () => {
  return useQuery<Products>({
    queryKey: ['product'],
    queryFn: () =>
      axios.get('http://localhost:5000/api/product',).then((res) => res.data),
  });
};