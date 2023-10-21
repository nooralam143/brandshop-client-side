import { Link } from "react-router-dom";
import Rating from "../Product/Rating";
import { AuthContext } from "../Provider/AuthProvider";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";

const MyCart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Make an HTTP request to fetch product data from the API
    fetch(`http://localhost:5000/mycart?userEmail=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched product data in the state
        setIsLoading(false); // Data loading is complete
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Handle errors and set isLoading to false
      });
  }, [user.email]);

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
        fetch(`http://localhost:5000/mycart/${_id}`, {
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
              const remaining = products.filter(cof => cof._id !== _id);
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
          {isLoading ? (
            <span className="loading loading-spinner text-center loading-xs"></span>
          ) : products.length === 0 ? (
            <p className="text-center font-extrabold text-3xl flex justify-center items-center h-full">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                 <div className="bg-white rounded-lg shadow-md flex flex-row overflow-hidden">
                    <div className="product-image-container">
                      <img src={product.imageUrl} alt={product.name} className=" w-full h-450 object-cover" />
                    </div>
                    <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
                      <div className="">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700">{product.brand}</p>
                        <p className="text-gray-700">{product.type}</p>
                        <p className="text-gray-700">{product.price}</p>
                        
                      </div>
                      <p><Rating productID={product._id} ratingValue={product.rating} /></p>
                      
                    </div>
                    <div className="flex flex-col">
                    
                    <Link to={`/products/${product.productID}`}><button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Product Details</button></Link>
                    <button className=" w-1/1 bg-error text-white px-4 py-2 rounded-md mt-2" onClick={() => handleDelete(product._id)}>Delete my Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
