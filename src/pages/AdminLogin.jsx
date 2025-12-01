import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await adminLogin(mobileNumber, password);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-br from-obsidian via-charcoal to-obsidian">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full mx-4"
            >
                <div className="bg-gradient-to-br from-white to-pearl rounded-2xl shadow-2xl p-8 border-2 border-gold">
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-br from-gold to-gold-dark p-4 rounded-full inline-block mb-4">
                            <Shield className="h-10 w-10 text-obsidian" />
                        </div>
                        <h2 className="heading-tertiary mb-2">Admin Access</h2>
                        <p className="text-ash font-outfit">Secure admin login</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-obsidian font-outfit">
                            <strong>Default Credentials:</strong><br />
                            Mobile: 9999999999<br />
                            Password: Admin@123
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-obsidian mb-2">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ash h-5 w-5" />
                                <input
                                    type="tel"
                                    required
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="input-luxury pl-10"
                                    placeholder="Admin mobile number"
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
                                    placeholder="Admin password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Admin Login'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
