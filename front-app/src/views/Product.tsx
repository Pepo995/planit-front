import React, { useState, useEffect } from 'react';
import Footer from '../layouts/Footer';
import TopNav from '../layouts/TopNav';
import { getProductById } from '../api/productsApi';
import { useQuery } from 'react-query';
import { useLocation, Link } from 'react-router-dom';
import SearchIcon from '../assets/svg/search_icon.svg';
import GoBackVector from '../assets/svg/go_back_vector.svg';
import { Button } from '../components/Button';
import Heart from '../components/Heart';
import { Description1, Description2 } from '../layouts/Description';

const Product = () => {
  const location = useLocation();
  const params = location.pathname.split('/');
  const id = params[params.length - 1];
  const { isLoading, data } = useQuery(['params', id], () => getProductById(id));

  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState<any[]>([]);

  useEffect(() => {
    if (data?.price) setTotalPrice(data.price);
  }, [data?.price]);

  const handleCheckBox = (value: any, price: number) => {
    if (selectedCheckBoxes.includes(value)) {
      setSelectedCheckboxes(selectedCheckBoxes.filter((item) => item !== value));
      setTotalPrice(totalPrice - price);
    } else {
      setSelectedCheckboxes([...selectedCheckBoxes, value]);
      setTotalPrice(totalPrice + price);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col m-inline'>
      <div className='hidden lg:flex mb-10'>
        <TopNav>
          <input
            type='text'
            placeholder=''
            className='bg-gray-100 px-12 md:px-6 h-full rounded-3xl w-full border-radius border-solid border-black'
          ></input>
          <button className='absolute bg-[#9BC7FF] rounded-full w-8 h-8 right-[93%] md:right-[1%] translate-y-[7%]'>
            <img src={SearchIcon} className='w-20 h-4'></img>
          </button>
        </TopNav>
      </div>

      <div className='bg-gray-100 w-full'>
        <div className='sm:w-[80%] m-inline sm:mt-24 flex flex-col sm:flex-row gap-14 order'>
          <div className='sm:w-[55%] flex flex-col gap-12'>
            <div className='relative sm:static'>
              <img src={data.image} className='max-h-[300px] w-full'></img>
              <div className='sm:hidden flex absolute top-[5%] right-[6%]'>
                <Heart></Heart>
              </div>
              <Link to={'/products'}>
                <div className='sm:hidden flex cursor-pointer gap-4 items-center absolute top-[5%] left-[6%]'>
                  <img src={GoBackVector}></img>
                  <p className='text-white font-medium'>Volver</p>
                </div>
              </Link>
            </div>

            <Description2 {...data}></Description2>
          </div>

          <div className='w-[90%] m-inline sm:w-[45%] flex flex-col gap-10'>
            <div className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <p className='uppercase text-3xl sm:text-2xl font-medium'>filipa</p>
                <div className='hidden sm:flex'>
                  <Heart></Heart>
                </div>
              </div>
              <h5 className='text-4xl sm:text-3xl font-medium text-transparent-bgclip'>{data.name}</h5>
            </div>

            <Description1 {...data}></Description1>

            <h3 className='flex gap-5 sm:hidden font-medium text-xl text-transparent-bgclip'>${data.price} / unidad</h3>
            <div className='flex justify-between items-center sm:items-start w-full'>
              <div className='flex items-center justify-center w-[25%]  sm:w-24 h-6 mt-1-5 bg-white rounded-md'>
                <span
                  onClick={() => amount > 1 && setAmount(amount - 1)}
                  className='w-24 text-center text-sm font-normal border-[1px] cursor-pointer border-black'
                >
                  -
                </span>
                <span className='w-24 text-center text-sm font-normal border-y-[1px] border-black'>{amount}</span>
                <span
                  onClick={() => setAmount(amount + 1)}
                  className='w-24 text-center text-sm font-normal border-[1px] cursor-pointer border-black'
                >
                  +
                </span>
              </div>
              <div className='flex w-[65%] sm:hidden'>
                <Link to={`/products/${id}/checkout`} state={{ total: totalPrice * amount }} className='w-full'>
                  <Button>comprar ahora</Button>
                </Link>
              </div>
            </div>

            <div className='hidden sm:flex flex-col gap-4'>
              <h5 className='text-lg font-normal'>Personaliza tu box</h5>
              <div className='flex flex-col gap-2'>
                {data?.ExtraItems.map((element: any) => (
                  <div key={element.id} className='flex gap-3'>
                    <label className='switch'>
                      <input
                        type='checkbox'
                        onChange={(event) => handleCheckBox(event.target.value, element.price)}
                      ></input>
                      <span className='slider round'></span>
                    </label>
                    <div key={element.id} className='flex flex-col gap-1'>
                      <p className='text-base font-normal' key={element.id}>
                        {element.name}
                      </p>
                      {element.price > 0 ? (
                        <p className='text-sm font-light' key={element.id}>
                          ${element.price} adicionales
                        </p>
                      ) : (
                        <p key={element.id}>Sin costo adicional</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col mt-8'>
                <p className='text-gray-400'>¿Necesita más personalización?</p>
                <p className='text-transparent-bgclip cursor-pointer'>Hablar con un ejecutivo</p>
              </div>
            </div>

            <div className='hidden sm:flex justify-between'>
              <h3 className='uppercase font-medium text-3xl'>total</h3>
              <div className='flex items-end'>
                <h3 className='font-medium text-3xl'>${totalPrice * amount}</h3>
                <h5>+ IVA</h5>
              </div>
            </div>
            <div className='hidden sm:flex flex-col gap-4 items-center'>
              <Link
                to={`/products/${id}/checkout`}
                state={{ total: totalPrice * amount, amount: amount }}
                className='w-full'
              >
                <Button>comprar</Button>
              </Link>
              <p className='text-transparent-bgclip cursor-pointer'>Imprimir presupuesto</p>
            </div>
          </div>
        </div>

        <div className='w-[90%] sm:w-[80%] m-inline mt-32 mb-5'>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Product;
