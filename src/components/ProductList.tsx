import ProductCard from "./ProductCard"

const ProductList = ({ data }: { data: Products }) => {
  return (
    <div className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.map((item, index) => (
        <ProductCard item={item} delay={index / 4} key={index} className="h-[200px]" />
      ))}
    </div>
  )
}

export default ProductList
