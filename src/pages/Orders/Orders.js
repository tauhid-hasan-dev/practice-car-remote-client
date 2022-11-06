import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Orders = () => {
    const [orders, setOrders] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }, [user?.email])

    return (
        <div>
            <p>this is orders</p>
        </div>
    );
};

export default Orders;