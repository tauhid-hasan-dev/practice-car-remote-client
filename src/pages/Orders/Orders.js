import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setOrders(data)
            })
    }, [user?.email]);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remained = orders.filter(odr => odr._id !== id);
                    setOrders(remained)
                    console.log(remained);
                    alert(`Deleted!`)
                }
            })
    }

    return (
        <div>
            <p>total orders : {orders?.length}</p>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                            >
                            </OrderRow>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Orders;