import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const API_URL = 'http://localhost:5000/api';

    // Configure axios defaults
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/auth/me`);
                    setUser(response.data.data);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [token]);

    const login = async (mobileNumber, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                mobileNumber,
                password
            });

            const { token: newToken, user: userData } = response.data.data;
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const adminLogin = async (mobileNumber, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/admin-login`, {
                mobileNumber,
                password
            });

            const { token: newToken, user: userData } = response.data.data;
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Admin login failed'
            };
        }
    };

    const register = async (fullName, mobileNumber, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                fullName,
                mobileNumber,
                password
            });

            const { token: newToken, user: userData } = response.data.data;
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        token,
        loading,
        login,
        adminLogin,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
