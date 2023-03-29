import React from 'react';

import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
}

const ProductCard = ({ id, image, name, price }: ProductCardProps) => {
  return (
    <div className='flex flex-col cursor-pointer' key={id}>
      <Link to={`/products/${id}`}>
        <img src={image}></img>
      </Link>
      <p className='text-lg font-medium'>{name}</p>
      <p className='text-transparent-bgclip text-lg font-medium'>${price}</p>
    </div>
  );
};

export default ProductCard;
