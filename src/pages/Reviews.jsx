import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import axios from 'axios';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reviews/approved');
                setReviews(response.data.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="heading-primary mb-4">Customer Reviews</h1>
                    <div className="gold-line mx-auto mb-6" />
                    <p className="text-ash text-lg max-w-2xl mx-auto font-outfit">
                        What our customers say about us
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card-luxury p-6"
                        >
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < review.rating ? 'text-gold fill-gold' : 'text-champagne'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-ash font-outfit mb-4">{review.comment}</p>
                            <p className="font-playfair font-semibold text-obsidian">{review.userName}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
