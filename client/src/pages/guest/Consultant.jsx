import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function ConsultantGuest() {
  const navigate = useNavigate();
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      const res = await axios.get("/api/consultants");
      setConsultants(
        res.data.map((c) => ({
          ...c,
          note: c.note || "No additional notes available.",
          image: c.image || null,
        }))
      );
    } catch (err) {
      toast.error("Failed to fetch consultants");
    }
  };

  const handleViewMore = (consultant) => {
    setSelectedConsultant(consultant);
  };

  const closePanel = () => {
    setSelectedConsultant(null);
  };

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0 font-['Lato']">
      <Navbar />
      <div className="w-full h-[70vh] bg-[url(/images/anhdatrang.png)] bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundAttachment: "fixed" }}>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-outline-2 -smooth pacifico-regular text-[90px] font-bold leading-[134.4px] text-[#fff] tracking-[-2.24px] text-center z-[1]">
          View our consultant
        </span>
      </div>

      <div className="w-full max-w-[1800px] h-[48px] relative z-10 mt-[37.33px] mx-auto flex items-center justify-between">
        <div className="w-[300px] h-[1px] bg-[url(/images/line.png)] bg-cover bg-no-repeat flex-1" />
        <span className="flex-shrink-0 font-['Lato'] text-[40px] text-[#C54759] pacifico-regular leading-[48px] tracking-[-0.8px] text-center px-[80px]">
          <span className="text-[50px]">A</span>
          bout Our Consultants
        </span>
        <div className="w-[300px] h-[1px] bg-[url(/images/line.png)] bg-cover bg-no-repeat flex-1" />
      </div>

      <div className="w-full max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-4 mt-10">
        {consultants.map((consultant, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg transition-all duration-300 hover:border-2 hover:border-[#ffc0cb]"
          >
            {consultant.image ? (
              <motion.img
                src={consultant.image}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                alt="Consultant"
                className="w-[100px] h-[100px] rounded-full"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
            <span className="text-[16px] font-semibold text-[#000] mt-2">
              {consultant.firstName} {consultant.lastName}
            </span>
            <div className="relative mt-[10px] flex items-center justify-center">
              <span className="absolute top-[-10px] right-[-10px] flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8a8a] opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-[#C54759]"></span>
              </span>
              <motion.button
                className="w-[100px] h-[32px] bg-[#ffc0cb] rounded-full border hover:bg-[#ff8a8a] transition duration-300 mt-3"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewMore(consultant)}
              >
                <span className="text-[14px] font-bold text-[#C54759]">
                  View More
                </span>
              </motion.button>
            </div>
          </div>
        ))}
      </div>


      {selectedConsultant && (
        <motion.div
          initial={{ x: 300, opacity: 0 }} // Bắt đầu từ bên phải và ẩn đi
          animate={{ x: 0, opacity: 1 }} // Hiện ra dần dần
          exit={{ x: 300, opacity: 0 }} // Khi ẩn đi thì trượt về bên phải
          transition={{ duration: 0.4, ease: "easeOut" }} // Tạo hiệu ứng mượt mà
          className="fixed top-20 right-0 h-[800px] w-[300px] bg-white shadow-lg z-50 p-6 rounded-xl border-2 border-[#C54759]"
        >
          <button
            className="absolute top-2 right-2 text-xl text-[#C54759] hover:text-[#ff8a8a] transition-colors duration-300"
            onClick={closePanel}
          >
            ✖
          </button>
          <div className="mt-6">
            {selectedConsultant.image && (
              <img
                src={selectedConsultant.image}
                alt="Consultant"
                className="w-full rounded-lg mb-4"
              />
            )}
            <h2 className="text-lg font-semibold">
              {selectedConsultant.firstName} {selectedConsultant.lastName}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{selectedConsultant.note}</p>
          </div>
        </motion.div>
      )}



      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="relative">
          <span className="absolute -inset-1 inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <motion.button
            onClick={() => navigate("/services")}
            className="relative px-6 py-3 text-white rounded-full shadow-lg pacifico-regular focus:outline-none focus:ring-4 focus:ring-green-300"
            style={{
              background: "linear-gradient(135deg, #6B8E23, #32CD32)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
            variants={{
              float: {
                y: [0, -5, 5, -5, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
            initial="float"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
