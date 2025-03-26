import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  

  return (
    <div className="min-h-screen bg-orange-50 font-sans">

      {/* Search Bar */}
      <section className="bg-white py-4 px-6 shadow-md ">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="w-1/2 md:w-1/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for rooms, dining, or services"
              className="w-full px-4 py-2 border border-orange-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </section> 
      <br></br>
        {/* Image Carousel */}
        <section className="py-16 bg-white text-center">
        <Carousel autoPlay infiniteLoop interval={3000}>
          <img
            src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
            alt="Luxury Room"
            className="w-full h-96 object-cover rounded-md"
          />
          <img
            src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
            alt="Swimming Pool"
            className="w-full h-96 object-cover rounded-md"
          />
          <img
            src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
            alt="Hotel Lobby"
            className="w-full h-96 object-cover rounded-md"
          />
        </Carousel>
      </section>

      {/* Features Section */}
      
      <section className="py-16 bg-gray-100 text-center ">
        <h2 className="text-4xl font-bold text-orange-600 mb-12 font-serif">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
              alt="Luxury Rooms"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-3">Luxury Rooms</h3>
            <p className="text-gray-600">Enjoy our premium and elegantly designed rooms with top-notch amenities.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
              alt="Fine Dining"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-3">Fine Dining</h3>
            <p className="text-gray-600">Savor exquisite cuisine prepared by our world-class chefs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://thespaatnorwichinn.com/wp-content/uploads/2024/08/SNI_SpaServiceCategories_MASSAGES-1024x768.jpg"
              alt="Relaxing Spa"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-3">Relaxing Spa</h3>
            <p className="text-gray-600">Indulge in ultimate relaxation with our spa and wellness services.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
              alt="Luxury Rooms"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-3">Luxury Rooms</h3>
            <p className="text-gray-600">Enjoy our premium and elegantly designed rooms with top-notch amenities.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
              alt="Luxury Rooms"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-3">Luxury Rooms</h3>
            <p className="text-gray-600">Enjoy our premium and elegantly designed rooms with top-notch amenities.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
              alt="Luxury Rooms"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-3">Luxury Rooms</h3>
            <p className="text-gray-600">Enjoy our premium and elegantly designed rooms with top-notch amenities.</p>
          </div>
        </div>
      </section> <br></br>

    
      

      <br></br>

      {/* Contact Section */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-8 font-serif">Contact Us</h2>
      <br></br>
        <div className="mt-6">
          <p>Email: <a href="mailto:info@hotelaralu.com" className="underline">info@hotelaralu.com</a></p>
          <p>Phone: +123 456 7890</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
