import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { title, name, _id, phone, price, status } = order;

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className="btn btn-square btn-outline hover:bg-red-500 hover:border-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className=" w-24 h-24">
                            {order?.img && <img src={order?.img} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {title}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button onClick={() => handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
            </th>
            <th>
                <Link to={`/update/${_id}`}>
                    <button className="btn btn-ghost btn-xs">Update</button>
                </Link>
            </th>

        </tr>
    );
};

export default OrderRow;