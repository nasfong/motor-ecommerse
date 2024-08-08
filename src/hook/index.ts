import { useGlobalContext } from "@/lib/context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export async function getProduct(queryParams?: QueryParams): Promise<Products> {
  const res = await
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      params: queryParams
    })
  return res.data
}

export async function getProductById(id: string): Promise<Product> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
  return res.data
}

export async function getType(): Promise<Type[]> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type`)
  return res.data
}

export const useQueryType = () => {
  return useQuery<Type[]>({
    queryKey: ['productType'],
    queryFn: getType,
  });
}

export const useProducts = (queryParams?: QueryParams) => {
  return useQuery<Products>({
    queryKey: ['product', queryParams],
    queryFn: () =>
      axios.get('/product', {
        params: queryParams
      }).then((res) => res.data),
  });
};

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
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      if (status === 400) {
        toast.warning(errorMessage);
      } else if (status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error deleting product: ${errorMessage}`);
      }
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
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      if (status === 400) {
        toast.warning(errorMessage);
      } else if (status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error deleting type: ${errorMessage}`);
      }
    },
  })
}


