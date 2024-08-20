import { useSearch } from '@/hook';
import React, { useState, useRef, useEffect } from 'react';
import { debounce } from '@/lib/utils';
import { LoadingSpinner } from './LoadingSpinner';
import { CustomImage } from './CustomImage';
import { Link } from '@/navigation';
import { Search } from 'lucide-react';

export const CommandSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: products, isLoading, isError } = useSearch(searchTerm);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.length > 0);
  }, 500);

  const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 font-semibold">{part}</span>
      ) : part
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update the dropdown height when the products change
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setDropdownHeight(contentRef.current.scrollHeight);
    } else {
      setDropdownHeight(0);
    }
  }, [isOpen, products]);

  return (
    <div className="relative text-gray-600">
      <div>
        <input
          type="search"
          name="search"
          placeholder="Search"
          defaultValue={searchTerm}
          onChange={handleChange}
          className="bg-gray-100 h-10 w-[120px] md:w-64 px-5 pr-10 rounded-full text-sm focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onClick={() => searchTerm && setIsOpen(true)}
        />
        <button type="submit" className="absolute right-0 top-0 mr-4">
          {isLoading ? <LoadingSpinner className='mt-5' /> : <Search size={15} className='mt-3' />}
        </button>
      </div>

      <div
        ref={dropdownRef}
        className={`
          absolute z-10 border bg-background rounded-md 
          shadow-lg mt-1 transition-all duration-300 ease-in-out 
          w-[80vw] sm:w-[90vw] md:w-[500px] 
          transform left-[10%] -translate-x-[10%] md:left-[20%] md:-translate-x-[20%]  lg:left-1/2 lg:-translate-x-1/2 
          ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
        style={{
          height: `${dropdownHeight}px`,
          overflow: 'hidden',
        }}
      >
        <ul ref={contentRef}>
          {isError ? (
            <div className="p-4 text-red-500">Error loading products.</div>
          ) : products?.length === 0 ? (
            <div className="p-4 text-gray-500">No results found.</div>
          ) : (
            products?.map((item, index) => (
              <Link
                key={index}
                href={`/all-product/${item._id}/${item.name}`}
                className="py-2 px-6 hover:bg-gray-100 flex justify-between text-gray-800 dark:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex gap-2">
                  <div className="1/3">
                    <div className='h-20 w-20'>
                      <CustomImage src={item.image[0]} alt={item.name} height={80} width={80} />
                    </div>
                  </div>
                  <div className="2/3 ">
                    <h2 className="text-[16px] font-bold ">{highlightText(item.name, searchTerm)}</h2>
                    <h4 className="text-[12px] line-clamp-3">{highlightText(item.description, searchTerm)}</h4>
                  </div>
                </div>
                <span className="">
                  ${highlightText(item.price.toString(), searchTerm)}
                </span>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
