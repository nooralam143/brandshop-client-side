import { Link } from "react-router-dom";
import Rating from "../Product/Rating";
import { AuthContext } from "../Provider/AuthProvider";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { serverURL } from "../../config";

const MyCart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Make an HTTP request to fetch product data from the API
    fetch(`${serverURL}/mycart?userEmail=${user.email}`)
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
        fetch(`${serverURL}/mycart/${_id}`, {
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
          {isLoading ? (
            <div className="text-center">
            <span className="loading loading-spinner text-center loading-xs"></span>
        </div>
          ) : products.length === 0 ? (
            <p className="text-center font-extrabold text-3xl flex justify-center items-center h-full">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-4">
  {products.map((product) => (
    <div key={product?._id} className="product-card border">
      <div className="bg-white rounded-lg shadow-md flex flex-row overflow-hidden">
        <div className="product-image-container">
          <img src={product?.imageUrl} alt={product?.name} className="w-full md:w-2/2 md:h-450 lg:w-2/3 lg:h-600 h-64  object-cover" />
        </div>
        <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
          <div>
            <h2 className="text-sm md:text-xl lg:text-2xl font-semibold mb-2">{product?.name}</h2>
            <p className="text-gray-700">{product?.brand}</p>
            <p className="text-gray-700">{product?.type}</p>
            <p className="text-gray-700">{product?.price} Tk</p>
          </div>
          <Rating productID={product?._id} ratingValue={product?.rating} />
        </div>
        <div className="flex flex-col justify-center">
          <Link to={`/products/${product?.productID}`}>
            <button className="w-full bg-blue-500 text-white px-2 py-2 rounded-md mt-2">Details</button>
          </Link>
          <button className="w-full bg-error text-white px-2 py-2 rounded-md mt-2" onClick={() => handleDelete(product?._id)}>Delete Cart</button>
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
