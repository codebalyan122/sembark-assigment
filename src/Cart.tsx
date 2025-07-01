
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useProducts } from "./contextapi";
import Navbar from './components/Navbar';


const Cart = () => {
  const { cart, getCartTotal, removeFromCart, updateQuantity } = useProducts();
  
  console.log(cart);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some items to get started!</p>
        </div>
      </div>
    );
  }

const proceedToCheckout = () => {
    alert("Your has been placed successfully!");
}

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        {cart.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cart.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {item?.description}
                </p>
              
              </div>
              
              {/* Price */}
              <div className="text-lg font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {/* Item Total */}
              <div className="text-lg font-semibold text-gray-900 min-w-[80px] text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Remove from cart"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Cart Summary */}
        <div className="bg-gray-50 p-6 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                {cart.reduce((total, item) => total + item.quantity, 0)} items in cart
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                Total: ${getCartTotal().toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
     
            <button onClick={proceedToCheckout} className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;