import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, LogOut, ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/menu', label: 'Menu' },
        { path: '/about', label: 'About' },
        { path: '/reviews', label: 'Reviews' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-gold to-gold-dark p-2 rounded-full"
                        >
                            <ChefHat className="h-6 w-6 text-obsidian" />
                        </motion.div>
                        <span className="text-2xl font-playfair font-bold text-gold-gradient">
                            Amay Bistro
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative font-outfit font-medium transition-colors duration-300 ${location.pathname === link.path
                                        ? 'text-gold'
                                        : 'text-obsidian hover:text-gold'
                                    }`}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                                        initial={false}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Cart Icon */}
                        <Link to="/cart" className="relative p-2 hover-scale">
                            <ShoppingCart className="h-6 w-6 text-obsidian hover:text-gold transition-colors" />
                            {getCartCount() > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-gold text-obsidian text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                >
                                    {getCartCount()}
                                </motion.span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                {isAdmin ? (
                                    <Link to="/admin" className="btn-outline text-sm">
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link to="/my-orders" className="btn-outline text-sm">
                                        My Orders
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-2 text-obsidian hover:text-gold transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="font-outfit">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="btn-outline text-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary text-sm">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-champagne transition-colors"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6 text-obsidian" />
                        ) : (
                            <Menu className="h-6 w-6 text-obsidian" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-champagne"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-2 font-outfit font-medium ${location.pathname === link.path
                                            ? 'text-gold'
                                            : 'text-obsidian'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                to="/cart"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between py-2 font-outfit font-medium text-obsidian"
                            >
                                <span>Cart</span>
                                {getCartCount() > 0 && (
                                    <span className="bg-gold text-obsidian text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                )}
                            </Link>

                            <div className="border-t border-champagne pt-4 space-y-3">
                                {isAuthenticated ? (
                                    <>
                                        {isAdmin ? (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsOpen(false)}
                                                className="block btn-outline text-center"
                                            >
                                                Admin Panel
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/my-orders"
                                                onClick={() => setIsOpen(false)}
                                                className="block btn-outline text-center"
                                            >
                                                My Orders
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full btn-secondary"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block btn-outline text-center"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="block btn-primary text-center"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
