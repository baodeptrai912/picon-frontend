import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Hourglass, Calendar, Search } from "lucide-react";
// SỬA DÒNG IMPORT NÀY:
// Đảm bảo đường dẫn '../lib/sanityClient' là chính xác đến file client Sanity của bạn
import { client, urlFor } from '../lib/sanityClient';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // Thêm startDateFilter nếu bạn muốn có bộ lọc này như File 1
  const [startDateFilter, setStartDateFilter] = useState('');

  const navigate = useNavigate();

  // 🟢 Fetch dữ liệu từ Sanity (CẬP NHẬT QUERY VÀ XỬ LÝ DATA)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Cập nhật query để lấy 'slug' và 'image' (dưới dạng asset reference)
        const query = `
          *[_type == "project"] {
            _id,
            name,
            slug, // Lấy slug để dùng cho navigation
            location,
            status,
            startDate,
            image, // Lấy image asset reference để dùng với urlFor
            description
          }
        `;

        const data = await client.fetch(query);

        // Xử lý dữ liệu, có thể thêm giá trị mặc định nếu cần
        const formattedProjects = data.map((item) => ({
          ...item, // Giữ lại tất cả các trường gốc từ Sanity như _id, slug, image object
          // Bạn có thể vẫn muốn id riêng nếu JSX đang dùng project.id thay vì project._id
          // id: item._id,
          name: item.name || "Chưa có tên", // Ví dụ thêm default
          location: item.location || "Không xác định",
          status: item.status || "Chưa cập nhật",
          startDate: item.startDate || "N/A", // Hoặc một định dạng ngày mặc định
          description: item.description || "Chưa có mô tả."
          // image sẽ là object, không phải imageUrl trực tiếp nữa
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Lỗi khi fetch dự án từ Sanity:", error);
        // Có thể set một trạng thái lỗi để hiển thị cho người dùng
      }
    };

    fetchProjects();
  }, []);

  // 🟡 Filter theo tìm kiếm và bộ lọc (Thêm startDateFilter vào logic)
  const filteredProjects = projects.filter((project) => {
    const projectStartDate = project.startDate && project.startDate !== "N/A" ? new Date(project.startDate) : null;
    const filterStartDate = startDateFilter ? new Date(startDateFilter) : null;

    return (
        (project.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
        (locationFilter === "" || project.location === locationFilter) &&
        (statusFilter === "" || project.status === statusFilter) &&
        (startDateFilter === "" || (projectStartDate && filterStartDate && projectStartDate >= filterStartDate))
    );
  });

  return (
      <div className="py-16 px-6 max-w-7xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-center mb-6">Danh sách Dự án</h1>

        {/* Bộ lọc - Thêm bộ lọc ngày nếu cần */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6"> {/* Tăng cols nếu thêm filter */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
              className="border rounded-lg py-2 px-3"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Tất cả địa điểm</option>
            {[...new Set(projects.map((p) => p.location).filter(Boolean))].sort().map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
            ))}
          </select>
          <select
              className="border rounded-lg py-2 px-3"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            {[...new Set(projects.map((p) => p.status).filter(Boolean))].sort().map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
            ))}
          </select>
          {/* Ví dụ thêm bộ lọc ngày bắt đầu */}
          <input
              type="date"
              className="border rounded-lg py-2 px-3"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>

        {/* Danh sách dự án */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                  <div
                      key={project._id} // Nên dùng _id là key gốc từ Sanity
                      className="relative group cursor-pointer"
                      // CẬP NHẬT NAVIGATION: Dùng slug nếu có, fallback về _id
                      onClick={() => navigate(`/du-an/${project.slug?.current || project._id}`, { state: project })}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out">
                      {/* CẬP NHẬT HIỂN THỊ ẢNH: Dùng urlFor */}
                      <img
                          src={project.image ? urlFor(project.image).width(400).height(300).url() : 'https://via.placeholder.com/400x300?text=No+Image'}
                          alt={project.name}
                          className="w-full h-64 object-cover transition duration-500 group-hover:opacity-50"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-4 flex flex-col justify-end">
                        <div className="text-white text-lg font-semibold">{project.name}</div>
                        <div className="text-gray-200 mt-1 text-sm"> {/* Giảm kích thước chữ cho dễ nhìn */}
                          <div className="flex items-center gap-1 truncate"> {/* Thêm truncate nếu text dài */}
                            <MapPin size={14} /> {project.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Hourglass size={14} /> {project.status}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} /> {new Date(project.startDate).toLocaleDateString('vi-VN')} {/* Format lại ngày */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <p className="text-center text-gray-500 col-span-full">Không tìm thấy dự án nào phù hợp!</p>
          )}
        </div>
      </div>
  );
};

export default Project;
