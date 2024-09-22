import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency, orders, orderloading } = useContext(ShopContext);
  const [ordersshow, setordersshow] = useState([]);
  const [orderspast, setOrdersPast] = useState([]);

  const getProductDetails = (productId) => {
    return products.find(product => product._id === productId);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const updatedOrders = [];

      for (const item of orders) {
        try {
          const prodObject = await getProductDetails(item.orderitemId);
          updatedOrders.push({
            ...item,
            prodObject: prodObject
          });
        } catch (error) {
          console.error(`Error fetching details for item ${item.orderitemId}:`, error);
        }
      }

      console.log("Useeffect was called in orders and:", updatedOrders);
      const filteredShowOrders = updatedOrders.filter(item => 
        item.track !== "Delivered to your address" && item.track !== "Cancelled by you or returning"
      );

      const filteredPastOrders = updatedOrders.filter(item => 
        item.track === "Delivered to your address" || item.track === "Cancelled by you or returning"
      );

      console.log("Filtered Show Orders:", filteredShowOrders);
      console.log("Filtered Past Orders:", filteredPastOrders);

      setordersshow(filteredShowOrders);
      setOrdersPast(filteredPastOrders);
    };

    if (orders.length > 0 && !orderloading) {
      fetchProductDetails();
    }
  }, [orders, orderloading]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>

      <div>
        {!ordersshow.length ? (
          <p>No Orders</p>
        ) : (
          <>
            {ordersshow.map((item, index) => (
              <div key={index} className='py-4 border-t text-gray-700 border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-center gap-6'>
                  <img className='w-16 sm:w-20 aspect-1' src={`http://localhost:3001${item.prodObject.image[0]}`} alt={item.prodObject.productname} />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{item.prodObject.productname}</p>
                    <div className='flex flex-col sm:flex-row items-start sm:gap-5 gap-1 mt-2'>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.orderitemsize}</p>
                      <p className='text-sm sm:text-lg font-medium border bg-slate-50 px-3 py-1'>{item.orderitemquantity}</p>
                    </div>
                  </div>
                </div>
                <p className='text-sm sm:text-md'>{item.track}</p>
              </div>
            ))}

            <div className='mt-6'>
              <h3 className='text-xl mb-2'>Past Orders</h3>
              {!orderspast.length ? (
                <p>No past orders.</p>
              ) : (
                orderspast.map((item, index) => (
                  <div key={index} className='py-4 border-t text-gray-700 border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                    <div className='flex items-center gap-6'>
                      <img className='w-16 sm:w-20 aspect-1' src={`http://localhost:3001${item.prodObject.image[0]}`} alt={item.prodObject.productname} />
                      <div>
                        <p className='text-sm sm:text-lg font-medium'>{item.prodObject.productname}</p>
                        <div className='flex flex-col sm:flex-row items-start sm:gap-5 gap-1 mt-2'>
                          <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.orderitemsize}</p>
                          <p className='text-sm sm:text-lg font-medium border bg-slate-50 px-3 py-1'>{item.orderitemquantity}</p>
                        </div>
                      </div>
                    </div>
                    <p className='text-sm sm:text-md'>{item.track}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
