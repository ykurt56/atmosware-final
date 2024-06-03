import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getOrders, deleteOrder } from "../../services/orderApi";
import { toast } from "react-toastify";

const Orders: React.FC = () => {
  const [ordersData, setOrdersData] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrdersData(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSendOrder = async (orderId: number) => {
    try {
      await deleteOrder(orderId);
      setOrdersData((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      toast.success("Order sent successfully!");
    } catch (error) {
      console.error("Error sending order:", error);
      toast.error("Failed to send order.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Order List</h1>

        {ordersData.length === 0 && (
          <div className="flex justify-center items-center ">
            <h1 className="text-2xl font-bold mb-4 text-center text-red-600">
              No Orders Found !
            </h1>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordersData.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold mb-2">{order.name}</h3>
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-full h-auto mb-2"
                />
                <p className="mb-2">
                  Size: <span className="font-bold">{order.size}</span>
                </p>
                <p className="mb-2">
                  Price: <span className="font-bold">${order.price}</span>
                </p>
                <p className="mb-2">
                  Quantity: <span className="font-bold">{order.quantity}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Ordered by: {order.user_id}</p>
              </div>
              <button
                onClick={() => handleSendOrder(order.id)}
                className="bg-black hover:bg-brand-900 text-white font-bold py-2 px-4 rounded"
              >
                Send The Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
