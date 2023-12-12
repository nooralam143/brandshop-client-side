import { useState, useEffect, useContext } from 'react';
import Rating from './Rating';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { serverURL } from '../../config';


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
    fetch(`${serverURL}/mycart`, {
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
    fetch(`${serverURL}/products/${id}`)
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
  <div className="bg-white flex flex-col md:flex-row rounded-lg shadow-md overflow-hidden">
   <div className="flex justify-center items-center">
   <img
      src={product.imageUrl}
      alt={product.name}
      className="w-96 h-96 sm:w-96 sm:h-96 md:w-64 md:h-64 lg:w-96 lg:h-96  object-cover"
     
    />
   </div>
 
    <div className="flex flex-col flex-shrink flex-grow h-full p-4">
      <div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-700"><span className="font-bold">Brand: </span>{product.brand}</p>
        <p className="text-gray-700"><span className="font-bold">Product Type: </span>{product.type}</p>
        <p className="text-gray-700"><span className="font-bold">Price: </span>${product.price} Tk</p>
        <div>
          <Rating productID={product._id} ratingValue={product.rating} />
        </div>
        <span className="font-bold">Description: </span>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: truncateDescription(product?.description) }}></div>

      </div>
      <div>
        <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleclick(product._id)}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <div className="mt-5 md:mt-10 lg:mt-10">
  <span className="font-bold text-lg md:text-xl lg:text-2xl">Product Description: </span><hr></hr><br></br>
  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }}></div>
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