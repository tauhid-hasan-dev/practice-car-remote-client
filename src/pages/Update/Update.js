
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedOrder = useLoaderData();
    const [order, setOrder] = useState(storedOrder);
    const handleUpdateUser = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/orders/${order._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        console.log(field, value);
        const newOrder = { ...order };
        /* console.log(newOrder); */
        newOrder[field] = value;
        setOrder(newOrder)
    }


    return (
        <div>
            <h1>This is update page</h1>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue={storedOrder?.name} name='name' type="text" placeholder="name" className="input input-bordered input-error w-full" />
                <input onChange={handleInputChange} defaultValue={storedOrder?.phone} name='phone' type="text" placeholder="Your First Name" className="input input-bordered input-error w-full" />
                <input className='bg-orange-500 p-3 text-white font-bold cursor-pointer text-2xl rounded-lg hover:bg-orange-600' type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default Update;