import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from "../Sidebar/Sidebar";
import { useLoaderData } from "react-router-dom";

const UpdateProduct = () => {
const useLoader = useLoaderData();
  const [brandNames, setBrandNames] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  // Fetch brand names from the API
  useEffect(() => {
    fetch('http://localhost:5000/brands')
      .then((response) => response.json())
      .then((data) => {
        const brandNameList = data.map((brand) => brand.brandName);
        setBrandNames(brandNameList);
      })
      .catch((error) => {
        console.error('Error fetching brand names: ', error);
      });
  }, []);


  const UpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const imageUrl = form.imageUrl.value;
    const name = form.name.value;
    const brand = form.brand.value;
    const type = form.type.value;
    const price = parseFloat(form.price.value);
    const description = form.description.value;
    const rating = parseFloat(form.rating.value);
    const Product = { imageUrl, name, brand, type, price, description, rating};
    console.log('Product Data:', Product);

    fetch(`http://localhost:5000/products/${useLoader._id}`, {
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
        if (data.insertedId) {
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
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
    return (
        <div>
            <div className="flex">
      {/* Sidebar */}
      <Sidebar></Sidebar>
      {/* Main content */}
      <div className="w-6/12 bg-white p-4 mx-auto shadow-md rounded-lg">
        <div className="max-w-md mx-auto my-8">
          <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
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
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="" disabled>Select a brand</option>
                {brandNames.map((brandName, index) => (
                  <option key={index} value={brandName}>
                    {brandName}
                  </option>
                ))}
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
              <textarea
                id="description"
                name="description"
                defaultValue={useLoader?.description}
                rows="4"
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                defaultValue={useLoader?.rating}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
                max="5"
                required
              />
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
        </div>
    );
};

export default UpdateProduct;