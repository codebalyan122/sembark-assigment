
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter,Routes,Route } from 'react-router'
import { ProductProvider } from './contextapi.tsx'
import ProductDetails from './ProductDetails.tsx'
import Cart from './Cart.tsx';


createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
    <ProductProvider>
        <Routes >
          <Route path="/" element={<App />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

    </ProductProvider>
    </BrowserRouter>

)
