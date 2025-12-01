import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Star, Award, Users, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        const fetchFeaturedItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menu?limit=6');
                setFeaturedItems(response.data.data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching featured items:', error);
            }
        };

        fetchFeaturedItems();
    }, []);

    const stats = [
        { icon: ChefHat, label: 'Expert Chefs', value: '15+' },
        { icon: Star, label: 'Menu Items', value: '100+' },
        { icon: Award, label: 'Awards Won', value: '25+' },
        { icon: Users, label: 'Happy Customers', value: '10K+' },
    ];

    const categories = [
        { name: 'Fast Food', emoji: '🍟', gradient: 'from-orange-400 to-red-500' },
        { name: 'Pizza', emoji: '🍕', gradient: 'from-yellow-400 to-orange-500' },
        { name: 'Burger', emoji: '🍔', gradient: 'from-amber-400 to-orange-600' },
        { name: 'Sandwich', emoji: '🥪', gradient: 'from-green-400 to-emerald-500' },
        { name: 'Italian', emoji: '🍝', gradient: 'from-red-400 to-pink-500' },
        { name: 'Desserts', emoji: '🍰', gradient: 'from-pink-400 to-purple-500' },
        { name: 'Beverages', emoji: '🥤', gradient: 'from-blue-400 to-cyan-500' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory via-champagne to-pearl">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [90, 0, 90],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-gold/20 to-transparent rounded-full blur-3xl"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block"
                        >
                            <div className="bg-gradient-to-br from-gold to-gold-dark p-4 rounded-full mb-6 inline-block shadow-2xl">
                                <ChefHat className="h-16 w-16 text-obsidian" />
                            </div>
                        </motion.div>

                        <h1 className="heading-primary text-6xl md:text-7xl lg:text-8xl">
                            Welcome to
                            <span className="block text-gold-gradient mt-2">Amay Bistro</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-ash max-w-3xl mx-auto font-outfit leading-relaxed">
                            Experience luxury dining with our exquisite collection of{' '}
                            <span className="text-gold font-semibold">Fast Food</span>,{' '}
                            <span className="text-gold font-semibold">Pizza</span>,{' '}
                            <span className="text-gold font-semibold">Burgers</span>,{' '}
                            <span className="text-gold font-semibold">Italian</span> delicacies, and more.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                        >
                            <Link to="/menu" className="btn-primary text-lg group">
                                Explore Menu
                                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link to="/about" className="btn-secondary text-lg">
                                Our Story
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-gold rounded-full mt-2"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="section-padding bg-white">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="heading-secondary mb-4">Our Categories</h2>
                        <div className="gold-line mx-auto mb-6" />
                        <p className="text-ash text-lg max-w-2xl mx-auto font-outfit">
                            Discover our diverse menu featuring cuisine from around the world
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="card-luxury card-gold-border p-6 text-center cursor-pointer group"
                            >
                                <div className={`text-5xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    {category.emoji}
                                </div>
                                <h3 className="font-playfair font-semibold text-obsidian group-hover:text-gold transition-colors">
                                    {category.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Items - Horizontal Scroll */}
            <section className="section-padding bg-gradient-to-br from-champagne to-ivory">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="heading-secondary mb-4">Featured Dishes</h2>
                        <div className="gold-line mx-auto mb-6" />
                        <p className="text-ash text-lg max-w-2xl mx-auto font-outfit">
                            Handpicked favorites from our kitchen
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="overflow-x-auto custom-scrollbar pb-6">
                            <div className="flex space-x-6 min-w-min">
                                {featuredItems.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="menu-item-card w-80 flex-shrink-0"
                                    >
                                        <div className="relative h-64 bg-champagne rounded-t-2xl overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                                {item.type === 'veg' ? '🥗' : '🍖'}
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                                <span className={`text-xs font-bold ${item.type === 'veg' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {item.type === 'veg' ? '● VEG' : '● NON-VEG'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-b-2xl">
                                            <h3 className="font-playfair text-xl font-semibold text-obsidian mb-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-ash text-sm mb-4 line-clamp-2">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-gold">
                                                    ₹{item.price}
                                                </span>
                                                <span className="text-sm text-ash bg-champagne px-3 py-1 rounded-full">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/menu" className="btn-primary">
                            View Full Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding bg-gradient-to-br from-obsidian to-charcoal text-white">
                <div className="section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="h-12 w-12 text-gold mx-auto mb-4" />
                                <div className="text-4xl md:text-5xl font-playfair font-bold text-gold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-pearl font-outfit">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-gold via-gold-dark to-gold">
                <div className="section-container text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="heading-secondary text-obsidian">
                            Ready to Order?
                        </h2>
                        <p className="text-xl text-charcoal font-outfit max-w-2xl mx-auto">
                            Join thousands of satisfied customers and experience the best dining experience
                        </p>
                        <Link to="/menu" className="btn-secondary border-obsidian text-obsidian hover:bg-obsidian hover:text-gold text-lg inline-flex items-center">
                            Order Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
