import { useState, useEffect, useContext } from 'react';
import Rating from './Rating';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = user.email;
  const productID = id;

  const handleclick = () => {
    const { imageUrl, name, brand, type, price, description, rating } = product;

    const mycart = { userEmail, productID, imageUrl, name, brand, type, price, description, rating };
    console.log(mycart);
    fetch('http://localhost:5000/mycart', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mycart)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          toast.success('Product added in your cart', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

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

  // Function to truncate the description to the first 100 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...'; // Add ellipsis for truncated text
    }
    return description;
  };
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
                <p className="text-gray-700"><span className="font-bold">Brand: </span>{product.brand}</p>
                <p className="text-gray-700"><span className="font-bold">Product Type: </span>{product.type}</p>
                <p className="text-gray-700"> <span className="font-bold">Price: </span>${product.price} Tk</p>
                <div>
              <Rating productID={product._id} ratingValue={product.rating} />
              </div>
                <p className="text-gray-700"><span className="font-bold">Description: </span>{truncateDescription(product.description)}</p>
              </div>
              <p>
              
              </p>
              <div>

                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleclick(product._id)}>
                  Add to Cart
                </button>

              </div>
            </div>
            
          </div>
          <div className="mt-10 mb-10">
            <p className="text-gray-700"><span className="font-bold text-2xl">Product Description: </span><hr></hr><br></br>{product.description}</p>
            </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
            <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductDetails;