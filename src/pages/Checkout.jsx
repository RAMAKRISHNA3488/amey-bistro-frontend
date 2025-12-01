import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        deliveryAddress: '',
        contactNumber: user?.mobileNumber || '',
        paymentMethod: 'cash',
        specialInstructions: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    menuItem: item._id,
                    quantity: item.quantity
                })),
                ...formData
            };

            await axios.post('http://localhost:5000/api/orders', orderData);
            clearCart();
            navigate('/my-orders');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="heading-primary mb-8">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-obsidian mb-2">
                                    Delivery Address *
                                </label>
                                <textarea
                                    required
                                    value={formData.deliveryAddress}
                                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                                    className="input-luxury"
                                    rows="3"
                                    placeholder="Enter your delivery address"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-obsidian mb-2">
                                    Contact Number *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.contactNumber}
                                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                    className="input-luxury"
                                    placeholder="10-digit mobile number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-obsidian mb-2">
                                    Payment Method *
                                </label>
                                <select
                                    value={formData.paymentMethod}
                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                    className="input-luxury"
                                >
                                    <option value="cash">Cash on Delivery</option>
                                    <option value="card">Card</option>
                                    <option value="upi">UPI</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-obsidian mb-2">
                                    Special Instructions
                                </label>
                                <textarea
                                    value={formData.specialInstructions}
                                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                                    className="input-luxury"
                                    rows="2"
                                    placeholder="Any special requests?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full disabled:opacity-50"
                            >
                                {loading ? 'Placing Order...' : `Place Order - ₹${getCartTotal()}`}
                            </button>
                        </form>
                    </div>

                    <div>
                        <div className="card-luxury p-6">
                            <h3 className="font-playfair text-xl font-semibold mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span className="text-ash">{item.name} x{item.quantity}</span>
                                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-champagne pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-playfair text-xl font-semibold">Total:</span>
                                    <span className="text-2xl font-bold text-gold">₹{getCartTotal()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
