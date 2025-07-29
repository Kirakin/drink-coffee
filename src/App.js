import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Auth Context ---
const AuthContext = createContext(null);

// Auth Provider to wrap your App and provide authentication state
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores logged-in user info
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Simulate persistent login using localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(userData)); // Store in localStorage
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('currentUser'); // Clear from localStorage
    };

    const authContextValue = {
        user,
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
const useAuth = () => {
    return useContext(AuthContext);
};


// Helper component for general icons (e.g., menu, cart)
const Icon = ({ name, size = 24, weight = "fill", className = "" }) => {
    // These are simple SVG icons for general UI elements
    const icons = {
        'coffee': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
                <path d="M208 80H128V48a48 48 0 0 0-96 0v32H16a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h16v48a48 48 0 0 0 96 0v-48h80a8 8 0 0 0 8-8V88a8 8 0 0 0-8-8ZM40 48a32 32 0 0 1 64 0v32H40ZM120 192a32 32 0 0 1-64 0v-48h64Zm80-48H136V96h72Z"></path>
            </svg>
        ),
        'shopping-cart': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
                <path d="M96 216a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm88 0a16 16 0 1 1-16-16 16 16 0 0 1 16 16ZM224 48H58.34L50.41 16.2A16 16 0 0 0 35.88 4H16a8 8 0 0 0 0 16h19.88l30.06 120.24A32 32 0 0 0 96 176h96a32 32 0 0 0 31.06-23.76l.1-.41 16-64a8 8 0 0 0-7.7-10.83ZM192 160H96a16 16 0 0 1-15.53-12.06L70.47 96h131.06Z"></path>
            </svg>
        ),
        'user': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
                <path d="M232 128a104 104 0 1 1-104-104A104.11 104.11 0 0 1 232 128ZM128 40a88 88 0 1 0 88 88A88.1 88.1 0 0 0 128 40Zm0 24a40 40 0 1 0 40 40A40 40 0 0 0 128 64Zm0 64a24 24 0 1 1-24 24A24 24 0 0 1 128 128Zm-40 56a71.85 71.85 0 0 1 79.77 0 71.32 71.32 0 0 0-79.77 0Z"></path>
            </svg>
        ),
        'lock': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
                <path d="M184 80a56 56 0 0 0-112 0v24a8 8 0 0 0 8 8h96a8 8 0 0 0 8-8ZM128 200a20 20 0 1 1 20-20A20.02 20.02 0 0 1 128 200Zm88-72v88a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16v-88a8 8 0 0 1 16 0v88h128v-88a8 8 0 0 1 16 0Zm-40-72a40 40 0 0 1-80 0v16h80Z"></path>
            </svg>
        ),
        'arrow-left': (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
                <path d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8Z"></path>
            </svg>
        )
    };
    return <span className={className}>{icons[name]}</span>;
};

// CoffeeIcon Component: Custom SVG icons for each coffee type
const CoffeeIcon = ({ name, size = 80, className = "" }) => {
    const coffeeIcons = {
        "Espresso": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#6F4E37"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#A0522D"/></svg>,
        "Latte": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#D2B48C"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#FFFFFF"/></svg>,
        "Cappuccino": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#8B4513"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#F5DEB3"/></svg>,
        "Americano": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#696969"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#4F4F4F"/></svg>,
        "Mocha": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#4B3621"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#CD853F"/></svg>,
        "Cold Brew": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#2F4F4F"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#6B8E23"/></svg>,
        "Macchiato": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#CD853F"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#F0E68C"/></svg>,
        "Flat White": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#704214"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#F5F5DC"/></svg>,
        "Traditional Jebena Buna": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V10C16 7.79086 14.2091 6 12 6Z" fill="#8B4513"/><path d="M12 7C13.6569 7 15 8.34315 15 10V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14V10C9 8.34315 10.3431 7 12 7Z" fill="#6F4E37"/></svg>
    };
    return <span className={className}>{coffeeIcons[name]}</span>;
};


// --- AuthForm Component (for both Login and Signup) ---
const AuthForm = ({ type, onAuthSuccess, onSwitchMode }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Use the login function from AuthContext

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (username.length < 3 || password.length < 6) {
            setError('Username must be at least 3 characters and password at least 6 characters.');
            return;
        }

        // In a real app, you'd send these to a backend API
        // For this demo, we'll simulate success/failure
        if (type === 'login') {
            if (username === 'testuser' && password === 'password123') {
                login({ username: 'testuser' });
                onAuthSuccess();
            } else {
                setError('Invalid username or password.');
            }
        } else { // signup
            // Simulate successful signup
            // In a real app, you'd check if username already exists
            login({ username }); // Log in the new user immediately
            onAuthSuccess();
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-6">
                {type === 'login' ? 'Login' : 'Sign Up'}
            </h2>
            {error && (
                <p className="text-red-600 mb-4 bg-red-100 p-3 rounded-lg w-full text-center">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div>
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    {type === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <button
                onClick={onSwitchMode}
                className="mt-6 text-blue-600 hover:text-blue-800 transition-colors font-medium text-md"
            >
                {type === 'login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

// CoffeeOrderPage Component: Contains the menu and cart logic
const CoffeeOrderPage = ({ coffeeOfferings, cart, addToCart, removeFromCart, cartSubtotal, vatAmount, cartTotal, handleCheckout }) => {
    // State for notification message specific to this page's actions
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' });
    // State to control which view is active: 'menu' or 'cart'
    const [currentOrderView, setCurrentOrderView] = useState('menu');

    // Function to show a notification message
    const showNotification = (message, type = 'success') => {
        setNotification({ message, visible: true, type });
    };

    // Effect to handle notification visibility
    useEffect(() => {
        if (notification.visible) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, visible: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.visible]);


    // Override addToCart and removeFromCart to include notifications
    const handleAddToCart = (coffeeId) => {
        const coffeeToAdd = coffeeOfferings.find(item => item.id === coffeeId);
        addToCart(coffeeId);
        if (coffeeToAdd) {
            showNotification(`${coffeeToAdd.name} added to cart!`, 'success');
        }
    };

    const handleRemoveFromCart = (coffeeId) => {
        const itemToRemove = cart.find(item => item.id === coffeeId);
        removeFromCart(coffeeId);
        if (itemToRemove) {
            showNotification(`${itemToRemove.name} removed from cart.`, 'error');
        }
    };

    return (
        <main className="w-full flex flex-col gap-10"> {/* Removed max-w-5xl here */}
            {/* Navigation for Menu/Cart Views */}
            <nav className="bg-white shadow-xl rounded-2xl p-4 flex justify-around items-center mb-6">
                <button
                    onClick={() => { setCurrentOrderView('menu'); }}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300
                                ${currentOrderView === 'menu' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <Icon name="coffee" size={32} className="mb-1" />
                    <span className="text-sm">Menu</span>
                </button>
                <button
                    onClick={() => { setCurrentOrderView('cart'); }}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300
                                ${currentOrderView === 'cart' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <Icon name="shopping-cart" size={32} className="mb-1" />
                    <span className="text-sm">Cart ({cart.length})</span>
                </button>
            </nav>

            {/* Conditional Rendering of Menu or Cart */}
            {currentOrderView === 'menu' && (
                <section className="flex-1 bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 pb-4 border-blue-200">Our Coffee Offerings (Prices before VAT)</h2>
                    <div id="coffee-menu" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {coffeeOfferings.map(coffee => (
                            <div
                                key={coffee.id}
                                className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
                            >
                                {/* Using CoffeeIcon component for SVG images */}
                                <CoffeeIcon name={coffee.name} size={100} className="mx-auto mb-4" /> {/* Increased size */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{coffee.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 text-center flex-grow">{coffee.description}</p>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-2xl font-extrabold text-green-700">ETB {coffee.price.toFixed(2)}</span>
                                    <button
                                        onClick={() => handleAddToCart(coffee.id)}
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {currentOrderView === 'cart' && (
 <aside className="w-full bg-white shadow-xl rounded-2xl p-8 flex flex-col" style={{ maxHeight: '80vh' }}>
   <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
   
   {/* Scrollable Cart Items */}
   <div className="flex-1 overflow-y-auto pr-2 mb-4">
     {cart.length === 0 ? (
       <p className="text-gray-500 text-center py-10 text-lg">Your cart is empty. Add some coffee!</p>
     ) : (
       <div className="space-y-4">
         {cart.map(item => (
           <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
             <div className="flex-1">
               <h4 className="font-semibold text-gray-900">{item.name}</h4>
               <p className="text-sm text-gray-600">Qty: {item.quantity} x ETB {item.price.toFixed(2)}</p>
             </div>
             <div className="flex items-center gap-4">
               <span className="font-bold text-gray-800">ETB {(item.price * item.quantity).toFixed(2)}</span>
               <button
                 onClick={() => handleRemoveFromCart(item.id)}
                 className="text-red-500 hover:text-red-700"
                 title="Remove"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                 </svg>
               </button>
             </div>
           </div>
         ))}
       </div>
     )}
   </div>

   {/* Fixed Order Summary */}
   <div className="border-t-2 border-gray-200 pt-4">
     <div className="flex justify-between items-center mb-2">
       <span className="text-lg font-semibold">Subtotal:</span>
       <span className="text-lg font-bold">ETB {cartSubtotal.toFixed(2)}</span>
     </div>
     <div className="flex justify-between items-center mb-2">
       <span className="text-lg font-semibold">VAT (15%):</span>
       <span className="text-lg font-bold text-red-600">ETB {vatAmount.toFixed(2)}</span>
     </div>
     <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
       <span className="text-xl font-bold">Total:</span>
       <span className="text-2xl font-extrabold text-green-600">ETB {cartTotal.toFixed(2)}</span>
     </div>
     <button
       onClick={handleCheckout}
       className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg mt-6 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
       disabled={cart.length === 0}
     >
       Place Order
     </button>
   </div>
 </aside>
)}

            {/* Notification Message Box */}
            <div
                id="notification-box"
                className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-xl transition-all duration-500 ease-in-out transform
                    ${notification.visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 hidden'}
                    ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
            >
                <p className="font-semibold text-lg">{notification.message}</p>
            </div>
        </main>
    );
};

// PaymentPage Component: Displays payment details and confirmation
const PaymentPage = ({ orderSummary, onBackToMenu }) => {
    const [paymentStatus, setPaymentStatus] = useState('selection'); // 'selection', 'processing', 'completed', 'failed'
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // 'card', 'online'

    // Function to simulate payment processing
    const processPayment = () => {
        setPaymentStatus('processing');
        const paymentTimer = setTimeout(() => {
            // Simulate success or failure
            const success = Math.random() > 0.2; // 80% success rate
            setPaymentStatus(success ? 'completed' : 'failed');
        }, 2000); // Simulate 2 seconds processing time

        return () => clearTimeout(paymentTimer);
    };

    const getStatusMessage = () => {
        switch (paymentStatus) {
            case 'selection':
                return "Choose your payment method:";
            case 'processing':
                return "Processing your payment...";
            case 'completed':
                return "Payment successful! Your order is confirmed.";
            case 'failed':
                return "Payment failed. Please try again.";
            default:
                return "";
        }
    };

    const getStatusColor = () => {
        switch (paymentStatus) {
            case 'completed':
                return 'text-green-600';
            case 'failed':
                return 'text-red-600';
            case 'processing':
                return 'text-blue-600';
            case 'selection':
                return 'text-gray-800';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 text-center flex flex-col items-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Payment</h2>

            <p className={`text-2xl font-semibold mb-8 ${getStatusColor()}`}>
                {getStatusMessage()}
            </p>

            {/* Payment Method Selection */}
            {paymentStatus === 'selection' && (
                <div className="w-full flex flex-col gap-4 mb-8">
                    <button
                        onClick={() => setSelectedPaymentMethod('card')}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition duration-300 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4
                            ${selectedPaymentMethod === 'card' ? 'bg-blue-600 text-white ring-blue-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 ring-gray-300'}`}
                    >
                        Pay with Card
                    </button>
                    <button
                        onClick={() => setSelectedPaymentMethod('online')}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition duration-300 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4
                            ${selectedPaymentMethod === 'online' ? 'bg-blue-600 text-white ring-blue-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 ring-gray-300'}`}
                    >
                        Pay Online
                    </button>

                    {selectedPaymentMethod && (
                        <button
                            onClick={processPayment}
                            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition duration-300 shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            Confirm Payment
                        </button>
                    )}
                </div>
            )}

            {/* Payment Processing/Confirmation/Failure */}
            {(paymentStatus === 'processing' ||
            paymentStatus === 'completed' ||
            paymentStatus === 'failed') && (
                <>
                    {paymentStatus === 'processing' && (
                        <div className="flex items-center justify-center mb-6">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
                            <p className="ml-4 text-xl font-semibold text-blue-600">Processing Payment...</p>
                        </div>
                    )}

                    <div className="w-full text-left bg-gray-50 p-6 rounded-lg mb-8 shadow-inner">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">Order Summary</h3>
                        {orderSummary.items.map(item => (
                            <p key={item.id} className="text-lg text-gray-700 mb-1">
                                {item.name} x {item.quantity} - ETB {item.price.toFixed(2)} each
                            </p>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xl font-semibold text-gray-800">Subtotal:</span>
                                <span className="text-xl font-bold text-gray-700">ETB {orderSummary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-semibold text-gray-800">VAT (15%):</span>
                                <span className="text-xl font-bold text-red-600">ETB {orderSummary.vatAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900">Total:</span>
                                <span className="text-2xl font-extrabold text-green-700">ETB {orderSummary.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onBackToMenu}
                        className="bg-purple-600 text-white py-3 px-8 rounded-xl font-bold text-lg hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        Back to Menu
                    </button>
                </>
            )}
        </div>
    );
};


// Main App component
const App = () => {
    const VAT_RATE = 0.15; // 15% VAT
    const { user, isLoggedIn, logout } = useAuth(); // Use auth state and functions

    // Define the initial, un-ordered list of coffee offerings
    const initialCoffeeOfferings = [
        { id: 1, name: "Espresso", price: 55.00, description: "A strong, concentrated shot of pure coffee.", imageUrl: "https://placehold.co/100x100/A0522D/FFFFFF?text=Espresso" },
        { id: 2, name: "Latte", price: 60.00, description: "Smooth espresso with steamed milk and a delicate foam.", imageUrl: "https://placehold.co/100x100/D2B48C/FFFFFF?text=Latte" },
        { id: 3, name: "Cappuccino", price: 65.00, description: "Classic blend of espresso, steamed milk, and rich foam.", imageUrl: "https://placehold.co/100x100/8B4513/FFFFFF?text=Cappuccino" },
        { id: 4, name: "Americano", price: 58.00, description: "Espresso diluted with hot water, similar to drip coffee.", imageUrl: "https://placehold.co/100x100/696969/FFFFFF?text=Americano" },
        { id: 5, name: "Mocha", price: 70.00, description: "A delightful mix of espresso, chocolate, and steamed milk.", imageUrl: "https://placehold.co/100x100/4B3621/FFFFFF?text=Mocha" },
        { id: 6, name: "Cold Brew", price: 75.00, description: "Slow-steeped for a naturally sweet, low-acid experience.", imageUrl: "https://placehold.co/100x100/2F4F4F/FFFFFF?text=Cold+Brew" },
        { id: 7, name: "Macchiato", price: 59.00, description: "Espresso 'stained' with a small amount of foamed milk.", imageUrl: "https://placehold.co/100x100/CD853F/FFFFFF?text=Macchiato" },
        { id: 8, name: "Flat White", price: 62.00, description: "Espresso with velvety microfoam, less airy than a latte.", imageUrl: "https://placehold.co/100x100/704214/FFFFFF?text=Flat+White" },
        { id: 9, name: "Traditional Jebena Buna", price: 25.00, description: "Authentic Ethiopian coffee, brewed in a traditional clay pot.", imageUrl: "https://placehold.co/100x100/8B4513/FFFFFF?text=Jebena+Buna" }
    ];

    // State for the current order of coffee offerings (can be reordered)
    const [currentCoffeeOfferings, setCurrentCoffeeOfferings] = useState(initialCoffeeOfferings);
    // State for the shopping cart
    const [cart, setCart] = useState([]);
    // State to manage the current page view: 'order', 'payment', 'login', 'signup'
    const [currentPage, setCurrentPage] = useState('order');
    // State to hold order summary details to pass to payment page
    const [orderSummary, setOrderSummary] = useState(null);
    // State to manage login/signup mode
    const [, setAuthMode] = useState('login');


    // Calculate subtotal, VAT, and grand total
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vatAmount = cartSubtotal * VAT_RATE;
    const cartTotal = cartSubtotal + vatAmount;

    // Function to add an item to the cart
    const addToCart = (coffeeId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === coffeeId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === coffeeId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                const coffeeToAdd = initialCoffeeOfferings.find(item => item.id === coffeeId); // Use initial list to find coffee
                return [...prevCart, { ...coffeeToAdd, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (coffeeId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== coffeeId));
    };

    // Handle checkout process - now navigates to payment page
    const handleCheckout = () => {
        if (cart.length > 0) {
            // Prepare order summary for the payment page
            setOrderSummary({
                items: cart,
                subtotal: cartSubtotal,
                vatAmount: vatAmount,
                total: cartTotal
            });
            setCurrentPage('payment'); // Navigate to the payment page
            setCart([]); // Clear the cart after initiating checkout
        }
    };

    // Function to navigate back to the order menu
    const handleBackToMenu = () => {
        setCurrentPage('order');
        setOrderSummary(null); // Clear order summary
        setCurrentCoffeeOfferings(initialCoffeeOfferings); // Reset coffee order
    };

    const handleAuthSuccess = () => {
        setCurrentPage('order'); // Redirect to order page after successful login/signup
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-200 font-inter text-gray-800 w-full"> {/* Added w-full here */}
            {/* Header */}
            <header className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 mb-10 text-center transform transition-all duration-300 hover:scale-105">
                <h1 className="text-5xl font-extrabold text-blue-800 mb-3 tracking-tight">Drink Coffee</h1>
                <p className="text-2xl text-gray-700 font-medium">Your Personalized Online Coffee Experience</p>

                {/* Login/Logout/Profile Section */}
                <div className="mt-6 flex justify-center items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <span className="text-lg font-semibold text-gray-700">Welcome, {user?.username}!</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300 shadow-md"
                            >
                                <Icon name="lock" size={20} className="inline-block mr-2" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setCurrentPage('login'); setAuthMode('login'); }}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md"
                            >
                                <Icon name="user" size={20} className="inline-block mr-2" />
                                Login
                            </button>
                            <button
                                onClick={() => { setCurrentPage('signup'); setAuthMode('signup'); }}
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 shadow-md"
                            >
                                <Icon name="user" size={20} className="inline-block mr-2" />
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Conditional rendering based on currentPage state */}
            {currentPage === 'order' && (
                <CoffeeOrderPage
                    coffeeOfferings={currentCoffeeOfferings} // Pass the reorderable list
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    cartSubtotal={cartSubtotal}
                    vatAmount={vatAmount}
                    cartTotal={cartTotal}
                    handleCheckout={handleCheckout}
                />
            )}

            {currentPage === 'payment' && (
                <PaymentPage
                    orderSummary={orderSummary}
                    onBackToMenu={handleBackToMenu}
                />
            )}

            {currentPage === 'login' && (
                <AuthForm type="login" onAuthSuccess={handleAuthSuccess} onSwitchMode={() => setCurrentPage('signup')} />
            )}

            {currentPage === 'signup' && (
                <AuthForm type="signup" onAuthSuccess={handleAuthSuccess} onSwitchMode={() => setCurrentPage('login')} />
            )}
        </div>
    );
};

// Wrap the App component with AuthProvider
const AppWrapper = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default AppWrapper;
