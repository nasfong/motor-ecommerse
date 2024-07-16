type Product = {
  _id: string
  name: string
  image: string
  price: string
  status: 1 | 2
  type: Type
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