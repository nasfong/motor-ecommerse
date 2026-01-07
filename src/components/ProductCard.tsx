import React, { useEffect, useRef } from 'react';
import { CustomImage } from './custom/CustomImage';
// import { Link } from '@/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { getProduct, getProductById, useProducts } from '@/hook';
import { parseHTML } from 'linkedom';
import { Link } from './ui/link';

type Props = {
  item: Product;
  delay?: number;
  imageCount?: number;
};


const ProductCard = ({ item, delay, imageCount = 0 }: Props) => {
  const queryClient = useQueryClient();

  // Prefetch product data using TanStack Query
  const prefetchProductData = async (typeId: string, id: string) => {
    const staleTime = 5 * 60 * 1000; // 5 minutes

    await queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => getProductById(id),
      staleTime,
    });

    await queryClient.prefetchQuery({
      queryKey: ['product', { type: typeId, excludeId: id }],
      queryFn: () => getProduct({ type: typeId, excludeId: id }),
      staleTime,
    });
  };

  return (
    <div className="h-full rounded-lg border overflow-hidden dark:bg-black relative border-black dark:border-white transform hover:-translate-y-1 transition-transform duration-100 shadow">
      <Link
        // ref={linkRef}
        href={`/all-product/${item.id}/${item.name}`}
        prefetch={true}
        onHover={() => prefetchProductData(item.type.id, item.id)}
      >
        <CustomImage
          loading={imageCount < 15 ? "eager" : "lazy"}
          src={item.image[0]}
          alt={item.name}
          width={500}
          height={500}
        />
        <div className="w-[80%] border-t border-gray-300 dark:border-gray-600 mx-auto"></div>
        <div className="flex flex-col justify-between h-[80px] px-2 pb-2">
          <h2 className="text-lg text-ellipsis overflow-hidden">{item.name}</h2>
          <div className="flex justify-between gap-3 text-sm">
            <span className="font-bold truncate">{item.type.name}</span>
            <span>
              {item.price}
              <span className="text-gray-400">$</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
