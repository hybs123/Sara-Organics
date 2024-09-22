import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const Productitem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden aspect-w-3 aspect-h-3'>
        

        {image && image[0] && <img className='hover:scale-110 transition ease-in-out' src={`http://localhost:3001${image[0]}`} />}
        
            

        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>

    </Link>
  )
}

export default Productitem
