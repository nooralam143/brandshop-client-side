import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP request to fetch product data from the API
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched product data in the state
        setIsLoading(false); // Data loading is complete
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Handle errors and set isLoading to false
      });
  }, []);

  // Function to truncate the description to the first 100 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...'; // Add ellipsis for truncated text
    }
    return description;
  };

  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="w-10/12 bg-white p-4 mx-auto shadow-md rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <span className="loading loading-spinner text-center loading-xs"></span>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="product-image-container">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-450 object-cover" />
                    </div>
                    <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
                      <div className="">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700">{product.brand}</p>
                        <p className="text-gray-700">{product.type}</p>
                        <p className="text-gray-700">{product.price}</p>
                        <p className="text-gray-700 h-40">{truncateDescription(product.description)}</p>
                      </div>
                      <p><Rating productID={product._id} ratingValue={product.rating} /></p>
                      <Link to={`/products/${product._id}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Product Details</button></Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
