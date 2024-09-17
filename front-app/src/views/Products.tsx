/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';
import { useQuery } from 'react-query';

import { getCategories } from '../api/categoriesApi';
import { getProducts } from '../api/productsApi';
import HelpComponent from '../components/HelpComponent';
import ProductCard from '../components/ProductCard';
import TopNav from '../layouts/TopNav';

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
  const [querySize, setQuerySize] = useState(4);
  const [productList, setProductList] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [textValue, setTextValue] = useState('');
  const [categoryFilters, setFilters] = useState<number[]>([]);

  const filters = {
    name: queryName,
    categories: queryCategories,
    sortBy: querySortBy,
    page: queryPage,
    size: querySize,
  };

  const { isLoading, data } = useQuery<{ products: Product[]; totalCount: number }>(['params', filters], () =>
    getProducts(filters),
  );
  const { data: categoriesData } = useQuery<Category[]>(['params'], () => getCategories());

  const totalResults = data?.totalCount;

  useEffect(() => {
    setQueryCategories(categoryFilters);
  }, [categoryFilters]);

  useEffect(() => {
    setQueryPage(0);
    setHasMore(true);
    if (data?.products) setProductList(data.products);
  }, [queryName || queryCategories || querySortBy]);

  useEffect(() => {
    if (data?.products && productList.length == 0) setProductList(data.products);
  }, [data?.products]);

  const handleSortBy = (event: any) => {
    setQuerySortBy(event.target.value);
  };

  const handleInputChange = (event: any) => {
    setTextValue(event.target.value);
  };
  const handleInputClick = () => {
    setQueryName(textValue);
  };

  const handleCategoryClick = (category: number) => {
    const index = categoryFilters.indexOf(category);
    index === -1
      ? setFilters([...categoryFilters, category])
      : setFilters([...categoryFilters.slice(0, index), ...categoryFilters.slice(index + 1)]);
  };

  const loadMore = () => {
    if (totalResults && data.products.length > 0) {
      setQueryPage(queryPage + 1);
      if (queryPage > 0) {
        setProductList((prevData) => [...prevData, ...data.products]);
      }
    }
    if (data?.products && data.products.length == 0) setHasMore(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className='flex flex-col relative gap-16 w-full'>
      <TopNav textValue={textValue} onChange={handleInputChange} onClick={handleInputClick}></TopNav>
      <div className='bg-gray-100'>
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
              {categoriesData?.map((category) => (
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
              <select className='bg-transparent h-[40px]' id='order' value={querySortBy} onChange={handleSortBy}>
                <option value='' selected disabled hidden>
                  Ordenar por
                </option>
                <option value='' selected disabled hidden></option>
                <option value='price_asc' className='option'>
                  Precio ascendente
                </option>
                <option value='price_desc' className='option'>
                  Precio descendente
                </option>
              </select>
            </div>
          </div>

          <hr className='hidden md:flex border-[0.5px] border-black w-full m-inline mt-5'></hr>
          <div className='flex gap-5 mt-12 h-[700px]'>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasMore}
              useWindow={true}
              className='flex flex-col md:flex-row gap-5'
            >
              <div className='grid grid-cols-4 gap-6 overflow-auto'>
                {productList.map((product) => (
                  <ProductCard {...product}></ProductCard>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
      <HelpComponent></HelpComponent>
    </section>
  );
};

export default Products;
