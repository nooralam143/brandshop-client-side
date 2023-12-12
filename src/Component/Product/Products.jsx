import { useEffect, useState } from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { serverURL } from '../../config';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("this call from products usestate,product length:",products.length);
  

  useEffect(() => {
    fetch(`${serverURL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        console.log("Error in fetching brands:", error);
      });
  }, []);


  // Function to truncate the description to the first 100 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...'; // Add ellipsis for truncated text
    }
    return description;
  };

  
  return (
    <div>
      <div className="flex">
        <div className="w-10/12 bg-white p-4 mx-auto shadow-md rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="text-center">
              <span className="loading loading-spinner text-center loading-xs"></span>
          </div>
            ) : products.length === 0 ? (
              <div className="text-center font-bold">No products found.</div>
            ) : (
              products.map((product) => (
                <div key={product?._id} className="product-card">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="product-image-container">
                      <img src={product?.imageUrl} alt={product?.name} className="w-full h-450 object-cover" />
                    </div>
                    <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
                      <div className="">
                        <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
                      
                        <Link to={`/brands/}`}><p className="text-gray-700"><span className="font-bold">Brand: </span>{product?.brand}</p></Link>
                        <p className="text-gray-700"><span className="font-bold">Product Type: </span>{product?.type}</p>
                        <p className="text-gray-700"><span className="font-bold">Price: </span>{product?.price} TK</p>
                        <Rating productID={product?._id} ratingValue={product?.rating} />
                        <div dangerouslySetInnerHTML={{ __html: truncateDescription(product?.description) }}></div>
                      </div>
                     
                      <Link to={`/products/${product?._id}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button></Link>
              
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

export default Products;
