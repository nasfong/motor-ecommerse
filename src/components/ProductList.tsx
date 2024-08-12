import ProductCard from "./ProductCard"

const ProductList = ({ data }: { data: Products }) => {
  return (
    <article className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {data.map((item, index) => (
        <ProductCard item={item} delay={index / 4} key={index} className="h-[200px]" />
      ))}
    </article>
  )
}

export default ProductList
