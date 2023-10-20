import { useState, useEffect } from 'react';
import Rating from './Rating';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product data based on the id from the URL
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="product-detail container mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : product ? (
        <div className="product-card">
          <div className="bg-white flex rounded-lg shadow-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-350 h-450 object-cover"
            />
            <div className=" flex flex-col flex-shrink flex-grow h-full p-4  ">
              <div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">{product.brand}</p>
                <p className="text-gray-700">{product.type}</p>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-700">{product.description}</p>
              </div>
              <p>
                <Rating productID={product._id} ratingValue={product.rating} />
              </p>
              <div>
                <Link to="/products">
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    Add to Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
