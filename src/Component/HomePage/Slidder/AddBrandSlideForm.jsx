import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { serverURL } from '../../../config';

const AddBrandSlideForm = () => {
    const [brandSlideData, setFormData] = useState({
        brand: 'Apple', // Default brand
        slideNumber: 'Slide 1', // Default slide number
        slideImage: '',
        SlideTitle1: '',
        SlideTitle2: '',
        SlideDis: '',
        SlidePrice: '',
        type: 'phone', // Default type
      });

      const resetForm = () => {
        setFormData({
          brand: 'Apple',
          slideNumber: 'Slide 1',
          slideImage: '',
          SlideTitle1: '',
          SlideTitle2: '',
          SlideDis: '',
          SlidePrice: '',
          type: 'phone',
        });
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...brandSlideData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(brandSlideData);

        fetch(`${serverURL}/add-brand-sliders`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(brandSlideData)
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
                toast.success('Brand Slidder Add is successfully', {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                resetForm();
              }
            })
            .catch(error => {
              if (error) {
                toast.error('Slidder Added Error', {
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
    <div className="w-full lg:w-1/2 mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Slide Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Brand:</label>
          <select
            name="brand"
            value={brandSlideData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Sony">Sony</option>
            <option value="Google">Google</option>
            <option value="Intel">Intel</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slide Number:</label>
          <select
            name="slideNumber"
            value={brandSlideData.slideNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Slide 1">Slide 1</option>
            <option value="Slide 2">Slide 2</option>
            <option value="Slide 3">Slide 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slide Image URL:</label>
          <input
            type="text"
            name="slideImage"
            value={brandSlideData.slideImage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slide Title 1:</label>
          <input
            type="text"
            name="SlideTitle1"
            value={brandSlideData.SlideTitle1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slide Title 2:</label>
          <input
            type="text"
            name="SlideTitle2"
            value={brandSlideData.SlideTitle2}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slide Description:</label>
          <input
            type="text"
            name="SlideDis"
            value={brandSlideData.SlideDis}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slide Price:</label>
          <input
            type="number"
            name="SlidePrice"
            value={brandSlideData.SlidePrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Type:</label>
          <select
            name="type"
            value={brandSlideData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
            <option value="headphone">Headphone</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Slide
        </button>
      </form>
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

export default AddBrandSlideForm;
