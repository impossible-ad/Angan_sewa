import { useState, useEffect } from "react";
import Select from "../../shared/Select";
import { useNavigate } from "react-router-dom";
import Loading from "../../shared/IsLoading";
import { useGetDistrictsQuery } from "../../../redux/slice/publicSlice";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const { data: districtData, isLoading, error } = useGetDistrictsQuery();
  const navigate = useNavigate();

  const districtOptions = districtData?.data.map((dist) => ({
    value: dist.district_id,
    label: dist.district_name,
  }));

  // const availablePlaces = selectedDistrict
  //   ? placesByDistrict[selectedDistrict] || []
  //   : [];

  const images = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop", // House cleaning
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop", // Plumbing
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop", // Electrical work
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop", // Gardening
  ];
  const handlePlaceChange = (e) => {
    const place = e.target.value;
    setSelectedPlace(place);
    if (place) {
      navigate(`/services/${place}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center ">
        <div className="text-center px-8 bg-secondary-blue/20 ">
          <h1 className="text-5xl text-white font-bold mb-4">Aangan Sewa</h1>
          <p className="text-xl text-white mb-2">
            Quality home services, on demand
          </p>
          <p className="text-lg text-white mb-8">
            Experienced, hand-picked Professionals to serve you at your doorstep
          </p>
          <div className="max-w-2xl mx-auto bg-white/70 rounded-lg p-6">
            <p className="text-lg mb-4 text-secondary-blue">
              Where do you need a service?
            </p>
            <div className="flex gap-4">
              <Select
                options={districtOptions}
                value={selectedDistrict}
                className="w-full"
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedPlace("");
                }}
                placeholder="Select your district"
              />
              {/* <Select
                options={availablePlaces}
                value={selectedPlace}
                className="w-full"
                onChange={handlePlaceChange}
                placeholder="Select your place"
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-orange-500 scale-125"
                : "bg-orange-300 hover:bg-orange-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
