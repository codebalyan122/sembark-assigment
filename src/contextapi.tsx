
import  { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description?: string; 
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart:CartItem[];
  fetchProducts: () => Promise<void>;
  getProductById: (id: number) => Product | any;
 addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getcartCount: () => number;
}


const ProductContext = createContext<ProductContextType |any>(undefined);


export const ProductProvider = ({ children }:
    {  children: ReactNode;}
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


   const addToCart = (product: Product) => {
    console.log(product)
    setCart(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
       
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        
        return [...prevItems, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1
        }];
      }
    });
  };

    const removeFromCart = (productId: number) => {
    setCart(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getcartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };




  useEffect(() => {
    fetchProducts();
  }, []);

  const value: ProductContextType = {
    products,
    loading,
    error,
    cart,
    fetchProducts,
    getProductById,
    addToCart,
    clearCart,
    getCartTotal,
    getcartCount,
    updateQuantity,
    removeFromCart

  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);

  return context;
};