import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChefHat } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-charcoal text-pearl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-br from-gold to-gold-dark p-2 rounded-full">
                                <ChefHat className="h-6 w-6 text-obsidian" />
                            </div>
                            <span className="text-2xl font-playfair font-bold text-gold">
                                Amay Bistro
                            </span>
                        </div>
                        <p className="text-sm text-ash leading-relaxed">
                            Experience luxury dining with our exquisite selection of fast food, pizzas, burgers, and Italian delicacies.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover-scale">
                                <Facebook className="h-5 w-5 text-gold hover:text-gold-light transition-colors" />
                            </a>
                            <a href="#" className="hover-scale">
                                <Instagram className="h-5 w-5 text-gold hover:text-gold-light transition-colors" />
                            </a>
                            <a href="#" className="hover-scale">
                                <Twitter className="h-5 w-5 text-gold hover:text-gold-light transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-ivory mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-ash hover:text-gold transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" className="text-ash hover:text-gold transition-colors">
                                    Our Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-ash hover:text-gold transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/reviews" className="text-ash hover:text-gold transition-colors">
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-ivory mb-4">
                            Categories
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-ash hover:text-gold transition-colors cursor-pointer">
                                Fast Food
                            </li>
                            <li className="text-ash hover:text-gold transition-colors cursor-pointer">
                                Pizza
                            </li>
                            <li className="text-ash hover:text-gold transition-colors cursor-pointer">
                                Burgers
                            </li>
                            <li className="text-ash hover:text-gold transition-colors cursor-pointer">
                                Italian
                            </li>
                            <li className="text-ash hover:text-gold transition-colors cursor-pointer">
                                Desserts
                            </li>
                            <li className="text-ash hover:text-gold transition-colors cursor-pointer">
                                Beverages
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-ivory mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                                <span className="text-sm text-ash">
                                    123 Gourmet Street, Food District, City 12345
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                                <span className="text-sm text-ash">+91 9876543210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                                <span className="text-sm text-ash">hello@amaybistro.com</span>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <p className="text-sm text-ash">
                                <span className="font-semibold text-ivory">Hours:</span>
                                <br />
                                Mon - Sun: 10:00 AM - 11:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-ash/20 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-ash">
                            © {currentYear} Amay Bistro. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm text-ash">
                            <a href="#" className="hover:text-gold transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-gold transition-colors">
                                Terms of Service
                            </a>
                            <Link to="/admin-login" className="hover:text-gold transition-colors">
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
