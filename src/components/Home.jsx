import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

// how to import ảnh
import img1 from "../assets/home-image-1.jpg";
import img2 from "../assets/home-image-2.jpg";
import img3 from "../assets/home-image-3.jpg";
import { PhoneCall } from "lucide-react";
import Achievements from "./Achievements";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <>
    <div className="relative w-full h-screen">
      {/* Fullscreen Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-full"
      >
        <SwiperSlide>
          <img src={img1} alt="Home 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Home 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Home 3" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>

      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-logo-gradient leading-tight text-logo-stroke-3">
        <ReactTyped
          strings={["XÂY DỰNG", "SÁNG TẠO", "ĐỔI MỚI"]}
          typeSpeed={40}
          backSpeed={30}
          loop
        />
        </h1>
        
        <div className="w-full flex justify-center mt-6">
          <button className=" cursor-pointer bg-red-600 flex items-center text-white px-6 py-3 font-bold text-lg rounded shadow-md hover:bg-red-700">
            <PhoneCall className="mr-2" /> Nhận tư vấn miễn phí
          </button>
        </div>
      </div>
    </div>
    
    <Achievements/>

    <div className="w-full h-auto flex flex-col items-center text-center p-12">

    {/* Text Content */}
    <div className="w-full max-w-3xl">
      <h2 className="text-gray-500 text-3xl font-light">Giới thiệu</h2>
      <h1 className="text-logo-gradient text-6xl font-bold">PICONS</h1>
      <p className="mt-6 text-gray-700 text-lg font-semibold">
        Chúng tôi là ai?
      </p>
      <p className="mt-4 text-gray-600 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam pretium leo vel maximus. Curabitur finibus felis eget tellus porta, et ultricies dolor maximus. Quisque mauris nisi, malesuada eget elementum quis, eleifend eget neque. Morbi condimentum, dolor ut pellentesque mattis, quam magna dignissim sem, sed consectetur sapien sapien a mi. Vestibulum vehicula scelerisque placerat. Nam eu ligula nec lorem malesuada tristique et hendrerit velit. Duis at odio at mi convallis hendrerit id eu arcu. Morbi ultricies vulputate iaculis. Nunc elementum porta ornare.
      </p>
    </div>

    {/* Image Grid Section */}
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Image 1 */}
      <Link to="/chung-toi#tong-quan" className="relative group">
        <img src={img1} alt="Lịch sử hình thành" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-xl font-semibold">TỔNG QUAN CÔNG TY</span>
        </div>
      </Link>

      {/* Image 2 */}
      <Link to="/chung-toi#su-menh" className="relative group">
        <img src={img2} alt="Tầm nhìn sứ mệnh" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-xl font-semibold">TẦM NHÌN SỨ MỆNH</span>
        </div>
      </Link>

      {/* Image 3 */}
      <Link to="/chung-toi#gia-tri" className="relative group">
        <img src={img3} alt="Giá trị cốt lõi" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-xl font-semibold">GIÁ TRỊ CỐT LÕI</span>
        </div>
      </Link>
    </div>

    {/* Learn More Button */}
    <Link to='/chung-toi' className="mt-6 text-[#1f377e] font-semibold hover:underline">Tìm hiểu thêm →</Link>
    </div>

    </>
  );
};

export default Home;
