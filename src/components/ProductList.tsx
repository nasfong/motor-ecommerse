import ProductCard from "./ProductCard"

const ProductList = ({ data }: { data: Products }) => {
  return (
    <article className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2'>
      {data.map((item, index) => (
        <ProductCard key={index} item={item} delay={index / 4} imageCount={index} />
      ))}
    </article>
  )
}

export default ProductList
