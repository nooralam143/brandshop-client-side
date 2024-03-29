import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serverURL } from '../../config';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("product length is",products.length);

  useEffect(() => {
    // Make an HTTP request to fetch product data from the API
    fetch(`${serverURL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched product data in the state
        console.log("data is",data);
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
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...'; // Add ellipsis for truncated text
    }
    return description;
  };

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${serverURL}/products/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your Coffee has been deleted.',
                'success'
              )
              const remaining = products.filter(product => product._id !== _id);
              setProducts(remaining);
            }
          })
      }
    })
  }
  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="w-10/12 bg-white p-4 mx-auto shadow-md rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="text-center">
              <span className="loading loading-spinner text-center loading-xs"></span>
          </div>
            ) : products.length === 0 ? (
              <div className="text-center font-bold">No products found.</div>
            ): (
              products.map((product) => (
                <div key={product?._id} className="product-card">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="product-image-container">
                      <img src={product?.imageUrl} alt={product?.name} className="w-full h-450 object-cover" />
                    </div>
                    <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
                      <div className="">
                        <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
                      
                        <p className="text-gray-700"><span className="font-bold">Brand: </span>{product?.brand}</p>
                        <p className="text-gray-700"><span className="font-bold">Product Type: </span>{product?.type}</p>
                        <p className="text-gray-700"><span className="font-bold">Price: </span>{product?.price} TK</p>
                        <Rating productID={product?._id} ratingValue={product?.rating} />
                        <div dangerouslySetInnerHTML={{ __html: truncateDescription(product?.description) }}></div>
                      </div>
                     
                      <Link to={`/products/${product?._id}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button></Link>
                      <Link to={`/update-product/${product?._id}`}><button className="w-full bg-success text-white px-4 py-2 rounded-md mt-2">Update</button></Link>
              
                      <button className=" w-1/1 bg-error text-white px-4 py-2 rounded-md mt-2" onClick={() => handleDelete(product?._id)}>Delete</button>
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
