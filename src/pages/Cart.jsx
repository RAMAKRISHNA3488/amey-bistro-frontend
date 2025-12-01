import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-ivory">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <ShoppingBag className="h-24 w-24 text-gold mx-auto mb-6" />
                    <h2 className="heading-secondary mb-4">Your cart is empty</h2>
                    <p className="text-ash font-outfit mb-8">Add some delicious items to get started</p>
                    <Link to="/menu" className="btn-primary">
                        Browse Menu
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="heading-primary mb-8">Shopping Cart</h1>

                <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card-luxury p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="font-playfair text-xl font-semibold text-obsidian mb-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-gold font-bold text-xl">₹{item.price}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="bg-gold hover:bg-gold-dark text-obsidian p-2 rounded-lg"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="font-bold text-obsidian w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="bg-gold hover:bg-gold-dark text-obsidian p-2 rounded-lg"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="card-luxury p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-playfair text-2xl font-semibold">Total:</span>
                        <span className="text-3xl font-bold text-gold">₹{getCartTotal()}</span>
                    </div>
                    <Link to="/checkout" className="btn-primary w-full block text-center">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
