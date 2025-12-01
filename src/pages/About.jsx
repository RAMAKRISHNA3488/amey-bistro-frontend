import { motion } from 'framer-motion';
import { ChefHat, Award, Heart, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="heading-primary mb-4">About Amay Bistro</h1>
                    <div className="gold-line mx-auto mb-6" />
                    <p className="text-ash text-lg max-w-2xl mx-auto font-outfit">
                        Where culinary excellence meets luxury dining
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-champagne to-pearl rounded-2xl h-96 flex items-center justify-center text-8xl">
                            🍽️
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="heading-secondary mb-4">Our Story</h2>
                        <p className="text-ash font-outfit mb-4 leading-relaxed">
                            Founded with a passion for exceptional food and impeccable service, Amay Bistro has been serving
                            delightful culinary experiences since our inception. Our journey began with a simple vision: to create
                            a dining destination that combines luxury with comfort.
                        </p>
                        <p className="text-ash font-outfit leading-relaxed">
                            Today, we pride ourselves on offering an extensive menu featuring Fast Food, Pizza, Burgers, Sandwiches,
                            Italian cuisine, Desserts, and Beverages - all crafted with the finest ingredients and served with love.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-4 gap-8 mb-16">
                    {[
                        { icon: ChefHat, title: 'Expert Chefs', desc: 'Culinary masters with years of experience' },
                        { icon: Award, title: 'Quality Food', desc: 'Premium ingredients in every dish' },
                        { icon: Heart, title: 'Made with Love', desc: 'Every meal prepared with care' },
                        { icon: Users, title: 'Happy Customers', desc: 'Thousands of satisfied diners' },
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="card-luxury p-6 text-center"
                        >
                            <item.icon className="h-12 w-12 text-gold mx-auto mb-4" />
                            <h3 className="font-playfair text-xl font-semibold text-obsidian mb-2">
                                {item.title}
                            </h3>
                            <p className="text-ash font-outfit text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
