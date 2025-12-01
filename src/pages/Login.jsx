import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(mobileNumber, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-br from-ivory via-champagne to-pearl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full mx-4"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="heading-tertiary mb-2">Welcome Back</h2>
                        <p className="text-ash font-outfit">Login to your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-obsidian mb-2">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ash h-5 w-5" />
                                <input
                                    type="tel"
                                    required
                                    pattern="[0-9]{10}"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="input-luxury pl-10"
                                    placeholder="10-digit mobile number"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-obsidian mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ash h-5 w-5" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-luxury pl-10"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6 text-center space-y-3">
                        <p className="text-ash font-outfit">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-gold font-semibold hover:text-gold-dark">
                                Register
                            </Link>
                        </p>
                        <p className="text-ash font-outfit text-sm">
                            Are you an admin?{' '}
                            <Link to="/admin-login" className="text-gold font-semibold hover:text-gold-dark">
                                Admin Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
