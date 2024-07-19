

type Product = {
  _id?: string
  image: string[]
  name: string
  price: string
  description: string
  type: Type
  isNews: boolean;
  isSold: 1 | 2;
  recommend: boolean;
}

type Products = {
  data: Product[]
  totalPages: number
  currentPage: number
}

type Type = {
  _id: string
  name: string
}