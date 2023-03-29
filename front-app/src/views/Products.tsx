/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import HelpComponent from '../components/HelpComponent';
import TopNav from '../layouts/TopNav';
import { useQuery } from 'react-query';
import { getProducts } from '../api/productsApi';
import { getCategories } from '../api/categoriesApi';
import InfiniteScroll from 'react-infinite-scroller';
import SearchIcon from '../assets/svg/search_icon.svg';
import Vector from '../assets/svg/vector.svg';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Products = () => {
  const [queryName, setQueryName] = useState<null | string>(null);
  const [queryCategories, setQueryCategories] = useState<null | number[]>(null);
  const [querySortBy, setQuerySortBy] = useState('');
  const [queryPage, setQueryPage] = useState(0);
  const [querySize, setQuerySize] = useState(2);
  const [productList, setProductToList] = useState<Product[]>([]);
  const [hasMoreValue, setHasMore] = useState(true);

  const filters = {
    name: queryName,
    categories: queryCategories,
    sortBy: querySortBy,
    page: queryPage,
    size: querySize,
  };

  const { isLoading, data, isError, error } = useQuery<{ products: Product[]; totalCount: number }>(
    ['params', filters],
    () => getProducts(filters),
  );
  const { data: dataCategories } = useQuery<Category[]>(['params'], () => getCategories());

  const totalResults = data?.totalCount;

  const handleSortBy = (event: any) => {
    setQuerySortBy(event.target.value);
  };

  const [textValue, setTextValue] = useState('');
  const handleInputChange = (event: any) => {
    setTextValue(event.target.value);
  };
  const handleInputClick = () => {
    setQueryName(textValue);
  };

  const [categoryFilters, setFilters] = useState<number[]>([]);
  const handleCategoryClick = (category: number) => {
    const index = categoryFilters.indexOf(category);
    index === -1
      ? setFilters([...categoryFilters, category])
      : setFilters([...categoryFilters.slice(0, index), ...categoryFilters.slice(index + 1)]);
  };
  useEffect(() => {
    setQueryCategories(categoryFilters);
  }, [categoryFilters]);

  useEffect(() => {
    setQueryPage(0);
    setHasMore(true);
    if (data?.products) setProductToList(data.products);
  }, [queryName || queryCategories || querySortBy]);
  useEffect(() => {
    if (data?.products && queryPage == 0) setProductToList(data.products);
  }, [data?.products]);
  const loadMore = () => {
    if (totalResults && data.products.length > 0) {
      setQueryPage(queryPage + 1);
      if (queryPage > 0) {
        setProductToList((prevData) => [...prevData, ...data.products]);
      }
    }
    if (data?.products && data.products.length == 0) setHasMore(false);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className='flex flex-col gap-16 h-full w-full'>
      <TopNav>
        <input
          type='text'
          value={textValue}
          onChange={handleInputChange}
          placeholder=''
          className='bg-gray-100 px-12 md:px-6 h-full rounded-3xl w-full border-radius border-solid border-black'
        ></input>
        <button
          onClick={handleInputClick}
          className='absolute bg-[#9BC7FF] rounded-full w-8 h-8 right-[93%] md:right-[1%] translate-y-[7%]'
        >
          <img src={SearchIcon} className='w-20 h-4'></img>
        </button>
        <div className='flex md:hidden'>
          <img src={Vector} className='w-8 h-8 absolute right-[1%] translate-y-[7%]'></img>
        </div>
      </TopNav>
      <div className='bg-gray-100 '>
        <div className='w-[80%] m-inline flex flex-col'>
          <div className='flex flex-col mt-10 md:mt-20 gap-1'>
            <h6 className='hidden md:flex uppercase text-xl font-normal'>regalos</h6>
            <h6 className='hidden md:flex uppercase text-4xl font-medium'>Food Box</h6>
          </div>
          <div className='flex md:justify-start justify-center'>
            {totalResults && totalResults > 1 ? (
              <p className='hidden md:flex font-normal text-lg text-gray-500 mt-3'>
                Más de {totalResults - 1} opciones
              </p>
            ) : (
              <p className='hidden md:flex font-normal text-lg text-gray-500 mt-3'>{totalResults} opcion</p>
            )}
            {totalResults && (
              <p className='md:hidden flex font-normal text-lg text-gray-500 mt-3 text-center'>
                {totalResults} resultados
              </p>
            )}
          </div>

          <div className='hidden lg:flex items-center justify-between'>
            <div className='flex gap-4 mt-10 text-base'>
              {dataCategories?.map((category) => (
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={
                    categoryFilters.includes(category.id)
                      ? 'border-solid border-black bg-gray-600 text-white border-[1px] rounded-md py-1.5 px-5 cursor-pointer'
                      : 'border-solid border-black border-[1px] rounded-md py-1.5 px-5 cursor-pointer'
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div>
              <input className='bg-transparent' list='order' />
              <select className='bg-transparent h-[40px]' id='order' value={querySortBy} onChange={handleSortBy}>
                <option value=''>Ordenar por</option>
                <option value='price_asc'>Precio ascendente</option>
                <option value='price_desc'>Precio descendente</option>
              </select>
            </div>
          </div>
          <hr className='hidden md:flex border-[0.5px] border-black w-full m-inline mt-5'></hr>
          <div className='flex gap-5 mt-12 overflow-auto h-[700px]'>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasMoreValue}
              useWindow={true}
              className='flex flex-col md:flex-row gap-5'
            >
              {productList.map((product) => (
                <div className='flex flex-col' key={product.id}>
                  <img src={product.image}></img>
                  <p className='text-lg font-medium'>{product.name}</p>
                  <p className='text-transparent-bgclip text-lg font-medium'>${product.price}</p>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <HelpComponent></HelpComponent>
    </section>
  );
};

export default Products;
