'use client';
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/navigation";
import { useEffect, useRef, useState } from 'react';

const Cambodia = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
    <path fill="#ce2c2d" d="M1 8H31V24H1z"></path>
    <path d="M5,4H27c2.208,0,4,1.792,4,4v2H1v-2c0-2.208,1.792-4,4-4Z" fill="#0f299c"></path>
    <path d="M5,22H27c2.208,0,4,1.792,4,4v2H1v-2c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 25)" fill="#0f299c"></path>
    <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path>
    <path d="M23,19.56h-.349v-.676h-.349v-.577h-.347v-.435h-.207v-.337c-1.181,.12-.041-2.08-.268-2.706-.088-.009-.162,.047-.201,.106,.061-.16-.094-.609-.184-.242h-.181v-.487c-.454,.425-.108,.088-.26-.33-.01,.067-.09,.196-.123,.185,.068-.165,.156-.285,.036-.509-.147,.466,.042-.047-.102-.253-.007,.054-.06,.209-.069,.197,.05-.796-.769-.795-.718,0-.009,.012-.062-.143-.069-.197-.143,.206,.045,.719-.102,.253-.121,.225-.033,.344,.036,.509-.033,.011-.113-.117-.123-.184-.152,.418,.194,.755-.26,.33v.852h-.219c.024-.097-.19-.093-.159,.002h-1.3l.002-.783c-.201,.078-.192,.183-.189,.307-.227,.098-.265-.318-.043-.304v-.323c-.041,.009-.158,.007-.262,.165v-.082c-.137-.012-.138,.117-.141,.367h-.036c-.098-.348,.306-.505,.096-.845-.337,.542,.262-.405-.03-.57-.267,.722,.085-.266-.144-.401-.175,.661,.045-.217-.104-.27-.232,.429,.065-.11-.094-.215-.166,.279-.063-.112-.049-.184h-.062l.022-.171h-.079l.019-.142h-.137l.013-.144h-.125c.031-.286-.322-.285-.292,0h-.125l.013,.144h-.137l.019,.142h-.079l.022,.171h-.061c.01,.067,.107,.463-.049,.184-.157,.11,.136,.646-.096,.208-.149,.101,.081,.885-.102,.277-.229,.134,.123,1.124-.144,.401-.292,.164,.307,1.112-.03,.57-.21,.341,.195,.498,.096,.845h-.017c-.001-.267,0-.377-.149-.367v.081c-.104-.156-.22-.154-.261-.164v.323c.218-.019,.188,.401-.034,.304,.006-.127,.003-.227-.197-.306v.783h-1.297c.031-.095-.183-.099-.159-.002h-.218v-.852c-.454,.425-.108,.088-.26-.33-.01,.067-.09,.196-.123,.184,.068-.165,.156-.285,.036-.509-.146,.466,.042-.047-.102-.253-.007,.054-.06,.209-.069,.197,.05-.796-.769-.795-.718,0-.009,.012-.062-.143-.069-.197-.143,.206,.045,.719-.102,.253-.121,.225-.032,.344,.036,.509-.033,.011-.113-.117-.123-.185-.152,.419,.194,.755-.26,.33v.487h-.181c-.09-.368-.245,.083-.184,.242-.039-.058-.114-.115-.201-.106-.227,.626,.914,2.824-.269,2.706v.337h-.207v.438l-.347-.003v.578h-.349v.676s-.349,0-.349,0v.724h2.493c.235,0,.683,0,.918,0h0s3.131,0,3.131,0h0c.235,0,.683,0,.918,0h0s3.125,0,3.125,0h0c.235,0,.683,0,.918,0h0s2.499,0,2.499,0v-.724Z" fill="#fff"></path>
    <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
  </svg>
);

const English = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
    <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect>
    <path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path>
    <path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path>
    <path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path>
    <path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path>
    <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
    <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
    <rect x="14" y="4" width="4" height="24" fill="#b92932"></rect>
    <rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect>
    <path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path>
    <path d="M2.328,26.656l1.113-8.79-1.2-1.2-1.113,8.79c.1,.003.1,.003,.1,.003C1.632,26.66,2.07,27.164,2.328,26.656Z" fill="#b92932"></path>
  </svg>
);

const options = [
  {
    value: "kh",
    label: "ខ្មែរ",
    icon: Cambodia,
  },
  {
    value: "en",
    label: "English",
    icon: English,
  },
];

export const LanguageSelector = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (value: string) => {
    router.replace(pathname, { locale: value });
    setIsOpen(false);
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

  const { label, icon: Icon } = options.find(item => item.value === locale) || {};

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-input w-[110px]"
      >
        <div className="flex justify-between items-center w-full">
          <span className='flex gap-1'>
            {Icon && <Icon />}
            {label}
          </span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" aria-hidden="true">
            <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </div>
      </button>
      <div
        ref={dropdownRef}
        className={`absolute z-10 w-[120px] border bg-background  rounded-md shadow-lg mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 overflow-hidden'}`}
      >
        <ul className="rounded-md p-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map(({ value, label, icon: Icon }) => (
            <li
              key={value}
              onClick={() => selectOption(value)}
              className={cn("cursor-pointer select-none relative py-2 px-1 hover:bg-secondary rounded")}
            >
              <div className='flex gap-1'>
                <Icon />
                {label}
                {locale === value && (
                  <span className="absolute right-2 text-blue-600">&#10003;</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
