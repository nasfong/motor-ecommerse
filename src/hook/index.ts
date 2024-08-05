import { useGlobalContext } from "@/lib/context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<string, void, unknown>({
    mutationFn: (id) => {
      return axios.delete(`/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
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
          .put(`/product/${id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
      } else {
        return axios.post(`/product`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      if (id) toast.success("Product has been updated")
      else toast.success("Product has been created")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error product: ${errorMessage}`);
    },
  })
}

export const useMutationLogin = () => {
  const { dispatch } = useGlobalContext()
  return useMutation({
    mutationFn: (data: Login): Promise<string> => {
      return axios.post('/login', data).then(resp => resp.data.token)
    },
    onSuccess: (token) => {
      dispatch({ type: 'LOGIN', payload: token })
      toast.success("Login Successfully!")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error Login: ${errorMessage}`);
    },
  })
}

export const useProducts = (queryParams?: Record<string, any>) => {
  return useQuery<Products>({
    queryKey: ['product', queryParams],
    queryFn: () =>
      axios.get('/product', {
        params: queryParams
      }).then((res) => res.data),
  });
};

export const useSubmitType = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any): Promise<any> => {
      if (id) {
        return axios
          .put(`/type/${id}`, data)
      } else {
        return axios.post(`/type`, data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productType'] })
      if (id) toast.success("Type has been updated")
      else toast.success("Type has been created")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error deleting type: ${errorMessage}`);
    },
  })
}

export const useDeleteType = () => {
  const queryClient = useQueryClient();

  return useMutation<string, void, unknown>({
    mutationFn: (id) => {
      return axios.delete(`/type/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productType'] })
      toast.success("Type deleted successfully!")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error deleting type: ${errorMessage}`);
    },
  })
}

export async function getProduct(): Promise<Products> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getType(): Promise<Type[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/type`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export const useQueryType = () => {
  return useQuery<Type[]>({
    queryKey: ['productType'],
    queryFn: getType
  });
}
