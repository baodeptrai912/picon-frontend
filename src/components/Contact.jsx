import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Swal from 'sweetalert2';
const baseApiUrl = import.meta.env.VITE_API_URL;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Giờ chỉ cần lưu trạng thái, không cần message ở đây nữa
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset trạng thái nếu người dùng bắt đầu nhập lại
    if (submitStatus !== 'idle' && submitStatus !== 'loading') {
      setSubmitStatus('idle');
    }
  };

  // --- Hàm xử lý khi nhấn nút Gửi ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt submit form theo cách mặc định
    setIsSubmitting(true);
    setSubmitStatus('loading'); // Cập nhật trạng thái loading

    // --- Chuẩn bị dữ liệu để gửi đi ---
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      // Thêm tiền tố "(Liên hệ) " vào đầu message
      message: `${formData.message}` // <--- SỬA Ở ĐÂY
    };
    console.log("Submitting Contact Form (modified):", dataToSend);
    // ------------------------------------

    try {

      const apiUrl = `${baseApiUrl}/picon/mail/contact`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Gửi đối tượng dataToSend đã được sửa đổi
        body: JSON.stringify(dataToSend) // <--- SỬA Ở ĐÂY
      });
      // ---------------------------------------------

      // Đọc kết quả trả về từ backend (dù thành công hay lỗi)
      const result = await response.json();

      if (response.ok) { // Kiểm tra xem status code có phải là 2xx (thành công) không
        console.log("Success Response:", result);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" }); // Xóa form sau khi thành công

        // --- Sử dụng SweetAlert2 cho thông báo thành công ---
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: result.message || 'Đã gửi thông tin liên hệ thành công.',
          timer: 2500,
          showConfirmButton: false,
          customClass: { popup: 'text-sm' }
        });
        // ----------------------------------------------------

      } else { // Xử lý lỗi từ backend (status code 4xx, 5xx)
        console.error("Backend Error Response:", result);
        setSubmitStatus('error');

        // --- Sử dụng SweetAlert2 cho thông báo lỗi từ backend ---
        Swal.fire({
          icon: 'error',
          title: 'Gửi thất bại!',
          text: result.message || 'Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.',
          customClass: { popup: 'text-sm' }
        });
        // -------------------------------------------------------
      }
    } catch (error) { // Xử lý lỗi mạng (không kết nối được server,...)
      console.error("Network/Fetch Error:", error);
      setSubmitStatus('error');

      // --- Sử dụng SweetAlert2 cho thông báo lỗi mạng ---
      Swal.fire({
        icon: 'error',
        title: 'Lỗi kết nối!',
        text: 'Không thể gửi yêu cầu. Vui lòng kiểm tra kết nối mạng và thử lại.',
        customClass: { popup: 'text-sm' }
      });
      // -----------------------------------------------
    } finally {
      setIsSubmitting(false); // Luôn đặt lại trạng thái đang gửi sau khi hoàn tất
    }
  };

  return (
      <section
          className="relative min-h-screen px-4 sm:px-6 md:px-10 py-12 flex flex-col justify-center items-center bg-[url('https://toppng.com/uploads/preview/city-night-moon-buildings-water-dark-11569870921inbgemqnla.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Contact Info Header */}
          <div className="text-center mt-8 sm:mt-10 max-w-[900px]">
            <h2 className="text-3xl sm:text-4xl font-medium text-white">Liên hệ</h2>
            <p className="text-sm sm:text-base font-light text-white mt-2">
              Sẵn sàng bắt đầu dự án xây dựng tiếp theo của bạn? Hãy liên hệ với chúng tôi ngay hôm nay để thảo luận về tầm nhìn của bạn và để chúng tôi giúp bạn xây dựng một điều gì đó tuyệt vời.
            </p>
          </div>

          {/* Contact Details & Form */}
          <div className="w-full max-w-[900px] mt-10 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-10 ">
            {/* Contact Details */}
            <div className="flex flex-col space-y-6 w-full">
              {/* ... Địa chỉ, Email, Điện thoại ... */}
              <div className="flex space-x-4">
                <MapPin size={24} strokeWidth={2} className="text-cyan-500 flex-shrink-0 mt-1" />
                <div className="text-white text-sm sm:text-base font-light">
                  <h3 className="font-medium text-cyan-400 mb-1">Địa chỉ</h3>
                  <p>Đ. Lê Văn Lương, phường Nhân Chính, quận Thanh Xuân, Hà Nội</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Mail size={24} strokeWidth={2} className="text-cyan-500 flex-shrink-0 mt-1"/>
                <div className="text-white text-sm sm:text-base font-light">
                  <h3 className="font-medium text-cyan-400 mb-1">Email</h3>
                  <p>contact@picons.com.vn</p> {/* !!! THAY EMAIL THẬT !!! */}
                </div>
              </div>
              <div className="flex space-x-4">
                <Phone size={24} strokeWidth={2} className="text-cyan-500 flex-shrink-0 mt-1"/>
                <div className="text-white text-sm sm:text-base font-light">
                  <h3 className="font-medium text-cyan-400 mb-1">Điện thoại</h3>
                  {/* !!! THAY SỐ ĐIỆN THOẠI THẬT !!! */}
                  <a href="tel:+09123458676" className="hover:text-cyan-300"><p>(+84-24)33773838</p></a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg self-start md:self-center">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-800 text-center mb-6">
                Gửi mail cho chúng tôi
              </h2>

              {/* Không cần khu vực hiển thị thông báo text ở đây nữa */}
              {/* <div className="min-h-[2rem] mb-4 text-center"> ... </div> */}

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input id="contact-name" type="text" name="name" required placeholder="Họ & Tên *" value={formData.name} onChange={handleChange} className="w-full p-3 border-b-2 border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-0 transition duration-300" disabled={isSubmitting}/>
                </div>
                <div className="mb-5">
                  <input id="contact-email" type="email" name="email" required placeholder="Email *" value={formData.email} onChange={handleChange} className="w-full p-3 border-b-2 border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-0 transition duration-300" disabled={isSubmitting}/>
                </div>
                <div className="mb-6">
                  <textarea id="contact-message" name="message" required placeholder="Tin nhắn của bạn... *" value={formData.message} onChange={handleChange} rows="4" className="w-full p-3 border-b-2 border-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-0 transition duration-300 resize-none" disabled={isSubmitting}/>
                </div>

                {/* --- Cập nhật nút Gửi --- */}
                <button
                    type="submit"
                    className={`w-full p-3 bg-cyan-500 text-white font-semibold rounded-lg transition duration-300 flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-cyan-600'}`} // Thêm flex justify-center items-center
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                      // Hiển thị icon xoay khi đang gửi
                      <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                      // Hiển thị text bình thường
                      'Gửi'
                  )}
                </button>
                {/* --------------------- */}
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;
