import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('menu');
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Fast Food',
        type: 'veg',
        price: '',
        preparationTime: 20
    });

    useEffect(() => {
        if (activeTab === 'menu') fetchMenuItems();
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/menu');
            setMenuItems(response.data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/menu', formData);
            setShowAddForm(false);
            setFormData({
                name: '',
                description: '',
                category: 'Fast Food',
                type: 'veg',
                price: '',
                preparationTime: 20
            });
            fetchMenuItems();
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item');
        }
    };

    const handleDeleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/menu/${id}`);
                fetchMenuItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, { status });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="heading-primary mb-8">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`px-6 py-3 rounded-lg font-outfit font-medium transition-all ${activeTab === 'menu' ? 'bg-gold text-obsidian' : 'bg-white text-ash'
                            }`}
                    >
                        Menu Items
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 rounded-lg font-outfit font-medium transition-all ${activeTab === 'orders' ? 'bg-gold text-obsidian' : 'bg-white text-ash'
                            }`}
                    >
                        Orders
                    </button>
                </div>

                {/* Menu Items Tab */}
                {activeTab === 'menu' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="heading-tertiary">Menu Management</h2>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="btn-primary flex items-center space-x-2"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Add Item</span>
                            </button>
                        </div>

                        {/* Add Item Form */}
                        {showAddForm && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="card-luxury p-6 mb-6"
                            >
                                <h3 className="font-playfair text-xl font-semibold mb-4">Add New Menu Item</h3>
                                <form onSubmit={handleAddItem} className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Item Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-luxury"
                                    />
                                    <input
                                        type="number"
                                        required
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="input-luxury"
                                    />
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="input-luxury"
                                    >
                                        <option>Fast Food</option>
                                        <option>Pizza</option>
                                        <option>Burger</option>
                                        <option>Sandwich</option>
                                        <option>Italian</option>
                                        <option>Desserts</option>
                                        <option>Beverages</option>
                                    </select>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="input-luxury"
                                    >
                                        <option value="veg">Vegetarian</option>
                                        <option value="non-veg">Non-Vegetarian</option>
                                    </select>
                                    <textarea
                                        required
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="input-luxury md:col-span-2"
                                        rows="3"
                                    />
                                    <button type="submit" className="btn-primary md:col-span-2">
                                        Add Item
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* Menu Items List */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {menuItems.map((item) => (
                                <div key={item._id} className="card-luxury p-6">
                                    <h3 className="font-playfair text-xl font-semibold text-obsidian mb-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-ash text-sm mb-3">{item.description}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xl font-bold text-gold">₹{item.price}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleDeleteItem(item._id)}
                                            className="btn-secondary text-sm flex-1 flex items-center justify-center space-x-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div>
                        <h2 className="heading-tertiary mb-6">Orders Management</h2>
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="card-luxury p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-playfair text-xl font-semibold">
                                                Order #{order._id.slice(-8)}
                                            </h3>
                                            <p className="text-ash text-sm">
                                                Customer: {order.user?.fullName} ({order.contactNumber})
                                            </p>
                                            <p className="text-ash text-sm">{order.deliveryAddress}</p>
                                        </div>
                                        <div>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                className="input-luxury text-sm"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="ready">Ready</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="border-t border-champagne pt-4">
                                        <div className="flex justify-between items-center">
                                            <span>Total Amount:</span>
                                            <span className="text-2xl font-bold text-gold">₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
