import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Package, Clock } from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders/my-orders');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            preparing: 'bg-orange-100 text-orange-800',
            ready: 'bg-green-100 text-green-800',
            delivered: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || colors.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="heading-primary mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Package className="h-24 w-24 text-gold mx-auto mb-6" />
                        <h3 className="heading-tertiary mb-4">No orders yet</h3>
                        <p className="text-ash font-outfit">Start ordering to see your order history</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-luxury p-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-playfair text-xl font-semibold text-obsidian">
                                            Order #{order._id.slice(-8)}
                                        </h3>
                                        <p className="text-ash text-sm flex items-center mt-2">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {order.items.map((item) => (
                                        <div key={item._id} className="flex justify-between text-sm">
                                            <span className="text-ash">{item.name} x{item.quantity}</span>
                                            <span className="font-semibold">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-champagne pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-playfair font-semibold">Total Amount:</span>
                                        <span className="text-2xl font-bold text-gold">₹{order.totalAmount}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
