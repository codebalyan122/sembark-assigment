import { useState, useEffect } from 'react'
import './App.css'
import CardComponent from './components/Card'
import Navbar from './components/Navbar'
import { useProducts } from './contextapi'

function App() {
  // All hooks must be called at the top, before any conditional logic
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState<string[] | any>('')
  const [categories, setCategories] = useState<string[] | any>([])

  // Get unique categories from products
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = getCategories();
      setCategories(['all', ...uniqueCategories]); 
    }
  }, [products])

  useEffect(()=>{
    // Check localStorage for previously selected category
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    } else {
      setSelectedCategory('all'); // Default to 'all' if no category is stored
    }
  })

  const getCategories = () => { 
    const categories = products.map(product => product.category);
    return [...new Set(categories)];
  }

  // Handle category selection
  const handleCategoryClick = (category:string) => {
    setSelectedCategory(category)
    localStorage.setItem('selectedCategory', category) // Store selected category in localStorage
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Format category name for display
  const formatCategoryName = (category:string) => {
    if (category === 'all') return 'All Products'
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'")
  }

  // Early returns after all hooks are called
  if (loading) {
    return (
      <div className="App">
        <Navbar/>
        <h1 className="text-center mt-10">Loading...</h1>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="App">
        <Navbar/>
        <h1 className="text-center mt-10">Error: {error}</h1>
      </div>
    )
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="App">
        <Navbar/>
        <h1 className="text-center mt-10">No products found</h1>
      </div>
    )
  }

  // Filter products based on selected category


  return (
    <div className="App">
      <Navbar/>
      
      {/* Category Filter Buttons */}
      <div className='flex flex-row items-center justify-center space-x-4 mt-5 mb-5 flex-wrap'>
        {categories.map((category:string) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer rounded-md p-2 text-white transition-colors mb-2 ${
              selectedCategory === category 
                ? 'bg-blue-600 shadow-lg' 
                : 'bg-blue-400 hover:bg-blue-500'
            }`}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Products Count */}
      <div className='text-center mb-4'>
        <p className='text-gray-600'>
          Showing {filteredProducts.length} 
          {selectedCategory === 'all' ? ' products' : ` ${formatCategoryName(selectedCategory).toLowerCase()} products`}
        </p>
      </div>

      {/* Products Grid */}
      <div className='flex flex-wrap justify-center gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <CardComponent 
              item={product} 
              key={product.id} 
              title={product.title}  
              description={product.description} 
              price={product.price}
              id={product.id}
              image={product.image} 
            />
          ))
        ) : (
          <div className='text-center w-full py-8'>
            <p className='text-gray-500 text-lg'>No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App