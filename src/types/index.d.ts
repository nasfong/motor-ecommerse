

type Product = {
  id: string
  image: string[]
  name: string
  price: number
  description: string
  type: Type
  isNews: boolean;
  isSold: 1 | 2;
  recommend: boolean;
  star: number
}

type Products = {
  data: Product[]
  totalPages: number
  currentPage: number
}

type Type = {
  id: string
  name: string
}

type Login = {
  username: string
  password: string
}

type ProductCard = Product & { quantity: number }

type QueryParams = {
  id?: string
  type?: string;
  recommend?: boolean;
  excludeId?: string;
};