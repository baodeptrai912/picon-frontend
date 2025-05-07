import React from 'react'
import { Building2, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react'

const Careers = () => {
  const jobListings = [
    {
      id: 1,
      title: "Kỹ sư xây dựng",
      department: "Kỹ thuật",
      location: "Hồ Chí Minh",
      salary: "15-25 triệu",
      type: "Toàn thời gian",
      description: "Chịu trách nhiệm quản lý và giám sát các dự án xây dựng, đảm bảo chất lượng và tiến độ công trình.",
      requirements: [
        "Tốt nghiệp đại học chuyên ngành Xây dựng",
        "Có ít nhất 3 năm kinh nghiệm",
        "Có chứng chỉ hành nghề xây dựng",
        "Kỹ năng quản lý và lãnh đạo tốt"
      ]
    },
    {
      id: 2,
      title: "Giám sát công trình",
      department: "Kỹ thuật",
      location: "Hà Nội",
      salary: "12-20 triệu",
      type: "Toàn thời gian",
      description: "Giám sát và kiểm tra chất lượng thi công tại công trường, báo cáo tiến độ dự án.",
      requirements: [
        "Tốt nghiệp cao đẳng/đại học chuyên ngành Xây dựng",
        "Có ít nhất 2 năm kinh nghiệm",
        "Có khả năng đọc bản vẽ kỹ thuật",
        "Kỹ năng giao tiếp tốt"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cơ hội nghề nghiệp</h1>
          <p className="text-xl text-gray-600">Gia nhập đội ngũ chuyên nghiệp của chúng tôi</p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobListings.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600">{job.department}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Ứng tuyển
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-5 h-5 mr-2" />
                  <span>{job.department}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả công việc</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Yêu cầu</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Không tìm thấy vị trí phù hợp?</h2>
          <p className="text-gray-600 mb-6">
            Gửi CV của bạn đến chúng tôi để được xem xét cho các vị trí trong tương lai
          </p>
          <button className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-colors duration-300">
            Gửi CV
          </button>
        </div>
      </div>
    </div>
  )
}

export default Careers 