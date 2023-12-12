import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from "../Sidebar/Sidebar";
import { useLoaderData} from "react-router-dom";
import { useState, useEffect  } from "react";
import Rating from "./Rating";
import { serverURL } from "../../config";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateProduct = () => {
  const useLoader = useLoaderData();

  const [updateRating, setUpdateRating] = useState(null);
  const [productDescription, setProductDescription] = useState(useLoader?.description || ''); // Set the default description

  const handleDescriptionChange = (value) => {
    setProductDescription(value);
  };

  useEffect(() => {
    setUpdateRating(useLoader.rating);
    setProductDescription(useLoader?.description || ''); // Update description on useEffect if available
  }, [useLoader.rating, useLoader.description]);


  const handleRatingClick = (rating) => {
    setUpdateRating(rating);
  };

  const UpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  const imageUrl = form.imageUrl.value;
  const name = form.name.value;
  const brand = form.brand.value;
  const type = form.type.value;
  const price = parseFloat(form.price.value);
  const description = productDescription;
  const rating = updateRating;
  const Product = { imageUrl, name, brand, type, price, description, rating};
  console.log('Product Data:', Product);

  fetch(`${serverURL}/products/${useLoader._id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(Product)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.matchedCount) {
        toast.success('Product Update is successfully', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        form.reset();
      }
    })
    .catch(error => {
      if (error) {
        toast.error('Product Update Error', {
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
      console.error('There was a problem with the fetch operation:', error);
    });
};
  return (
    
    <div className="flex">
      {/* Sidebar */}
      <Sidebar></Sidebar>
      {/* Main content */}
      <div className="w-6/12 bg-white p-4 mx-auto shadow-md rounded-lg">
        <div className="max-w-md mx-auto my-8">
          <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
          <form onSubmit={UpdateSubmit}>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                defaultValue={useLoader?.imageUrl}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={useLoader?.name}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-600">
                Brand Name
              </label>
              <select
            id="brand"
            name="brand"
            defaultValue={useLoader?.brand}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Sony">Sony</option>
            <option value="Google">Google</option>
            <option value="Intel">Intel</option>
          </select>
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-600">
                Type
              </label>
              <select
                id="type"
                name="type"
                defaultValue={useLoader?.type}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="phone">Phone</option>
                <option value="computer">Computer</option>
                <option value="headphone">Headphone</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={useLoader?.price}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Short Description
              </label>
              <div>
            <ReactQuill value={productDescription} onChange={handleDescriptionChange} style={{ height: "250px", width: "100%" }} />
        </div>
            
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
                Rating
              </label>
              <Rating onRatingClick={handleRatingClick} productID={useLoader._id} ratingValue={updateRating} />
         
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded hover-bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Update Product
            </button>
          </form>

        </div>
      </div>
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

export default UpdateProduct;