import React from 'react';

const Checkout = () => {
    return (
        <div className='pb-10'>
            <p className='text-4xl font-bold text-center mb-5'>You are about to checkout for {/* {title} */}</p>
            <p className='text-3xl text-orange-500 font-bold text-center mb-10'>Price: ${/* {price} */}</p>
            <form className='p-10 rounded-2xl bg-orange-50 flex flex-col gap-5'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5  '>
                    <input name='firstName' type="text" placeholder="Your First Name" className="input input-bordered input-error w-full" />
                    <input name='lastName' type="text" placeholder="Your Last Name" className="input input-bordered input-error w-full" />
                    <input name='email' type="email" placeholder="Your Email" className="input input-bordered input-error w-full" />
                    <input name='phone' type="text" placeholder="Password" className="input input-bordered input-error w-full" required />
                </div>
                <textarea name='message' className="textarea textarea-error w-full" placeholder="Your message"></textarea>
                <input className='bg-orange-500 p-3 text-white font-bold cursor-pointer text-2xl rounded-lg hover:bg-orange-600' type="submit" value="Order Confirm" />
            </form>
        </div>
    );
};

export default Checkout;