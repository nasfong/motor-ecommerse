import { useSearch } from '@/hook';
import React, { useState } from 'react';
import { debounce } from '@/lib/utils';
import { LoadingSpinner } from './LoadingSpinner';
import { CustomImage } from './CustomImage';

export const CommandSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: products, isLoading, isError } = useSearch(searchTerm);

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.length > 0);
  }, 500);

  // Function to highlight matching text
  const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 font-semibold">{part}</span>
      ) : part
    );
  };

  return (
    <div className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search"
        defaultValue={searchTerm}
        onChange={handleChange}
        className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border-gray-300 rounded-md shadow-lg z-10 w-[300px] border border-muted">
          {isLoading ? (
            <span className="p-4">
              <LoadingSpinner />
            </span>
          ) : isError ? (
            <div className="p-4 text-red-500">Error loading products.</div>
          ) : products?.length === 0 ? (
            <div className="p-4 text-gray-500">No found.</div>
          ) : (
            <ul>
              {products?.map((item, index) => (
                <li key={index} className="p-2 hover:bg-gray-100 flex justify-between">
                  <div className="flex gap-2">
                    <div className="1/3">
                      <CustomImage src={item.image[0]} alt={item.name} className='h-10 w-10' />
                    </div>
                    <div className='2/3'>
                      <h2>{highlightText(item.name, searchTerm)}</h2> {/* Highlight product name */}
                      <h4 className="text-[10px] line-clamp-2">{item.description}</h4>
                    </div>
                  </div>
                  <span className="text-gray-800">
                    ${highlightText(item.price.toString(), searchTerm)} {/* Highlight price */}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
