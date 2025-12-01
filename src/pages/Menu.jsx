import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all'); // all, veg, non-veg
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart, cartItems, updateQuantity } = useCart();

    const categories = ['All', 'Fast Food', 'Pizza', 'Burger', 'Sandwich', 'Italian', 'Desserts', 'Beverages'];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/menu');
            setMenuItems(response.data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = menuItems.filter((item) => {
        const matchesTab = activeTab === 'all' || item.type === activeTab;
        const matchesCategory = selectedCategory === 'all' ||
            selectedCategory.toLowerCase() === item.category.toLowerCase();
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesCategory && matchesSearch;
    });

    const getItemQuantity = (itemId) => {
        const cartItem = cartItems.find(item => item._id === itemId);
        return cartItem ? cartItem.quantity : 0;
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const handleIncrement = (itemId) => {
        const quantity = getItemQuantity(itemId);
        updateQuantity(itemId, quantity + 1);
    };

    const handleDecrement = (itemId) => {
        const quantity = getItemQuantity(itemId);
        updateQuantity(itemId, quantity - 1);
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="heading-primary mb-4">Our Menu</h1>
                    <div className="gold-line mx-auto mb-6" />
                    <p className="text-ash text-lg max-w-2xl mx-auto font-outfit">
                        Explore our luxurious selection of culinary delights
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto mb-8"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ash h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-champagne focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all bg-white shadow-lg"
                        />
                    </div>
                </motion.div>

                {/* Type Tabs (All, Veg, Non-Veg) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
                        {[
                            { value: 'all', label: 'All Items', emoji: '🍽️' },
                            { value: 'veg', label: 'Vegetarian', emoji: '🥗' },
                            { value: 'non-veg', label: 'Non-Veg', emoji: '🍖' }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`px-6 py-3 rounded-full font-outfit font-medium transition-all duration-300 ${activeTab === tab.value
                                        ? 'bg-gold text-obsidian shadow-md'
                                        : 'text-ash hover:text-obsidian'
                                    }`}
                            >
                                <span className="mr-2">{tab.emoji}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category.toLowerCase())}
                            className={`px-5 py-2 rounded-full font-outfit text-sm transition-all duration-300 ${selectedCategory === category.toLowerCase()
                                    ? 'bg-gold text-obsidian shadow-md'
                                    : 'bg-white text-ash hover:bg-champagne border border-champagne'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Menu Items Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeTab}-${selectedCategory}-${searchQuery}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="card-luxury group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-champagne to-pearl rounded-t-2xl overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                            {item.type === 'veg' ? '🥗' : '🍖'}
                                        </div>
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                                            <span className={`text-xs font-bold ${item.type === 'veg' ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.type === 'veg' ? '● VEG' : '● NON-VEG'}
                                            </span>
                                        </div>
                                        {!item.isAvailable && (
                                            <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">Currently Unavailable</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-playfair text-xl font-semibold text-obsidian group-hover:text-gold transition-colors">
                                                {item.name}
                                            </h3>
                                            <span className="text-sm text-ash bg-champagne px-3 py-1 rounded-full whitespace-nowrap">
                                                {item.category}
                                            </span>
                                        </div>

                                        <p className="text-ash text-sm mb-4 line-clamp-2 font-outfit">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-gold">
                                                    ₹{item.price}
                                                </span>
                                                {item.preparationTime && (
                                                    <p className="text-xs text-ash mt-1">
                                                        🕐 {item.preparationTime} mins
                                                    </p>
                                                )}
                                            </div>

                                            {/* Add to Cart / Quantity Controls */}
                                            {item.isAvailable && (
                                                <div>
                                                    {getItemQuantity(item._id) === 0 ? (
                                                        <button
                                                            onClick={() => handleAddToCart(item)}
                                                            className="btn-primary text-sm"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => handleDecrement(item._id)}
                                                                className="bg-gold hover:bg-gold-dark text-obsidian p-2 rounded-lg transition-colors"
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                            <span className="font-bold text-obsidian w-8 text-center">
                                                                {getItemQuantity(item._id)}
                                                            </span>
                                                            <button
                                                                onClick={() => handleIncrement(item._id)}
                                                                className="bg-gold hover:bg-gold-dark text-obsidian p-2 rounded-lg transition-colors"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* No Results */}
                {!loading && filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-playfair font-semibold text-obsidian mb-2">
                            No items found
                        </h3>
                        <p className="text-ash font-outfit">
                            Try adjusting your filters or search query
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Menu;
