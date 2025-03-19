import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";  // ✅ Import the CSS file

const Home = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);   // ✅ Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHome = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("https://taskone-phn9.onrender.com/api/home", {
          headers: {
            Authorization: token    // ✅ Send token in header
          }
        });

        setMessage(res.data.message);
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        setLoading(false);   // ✅ Set loading to false after request
      }
    };

    fetchHome();
  }, [navigate]);

  return (
    <div className="home-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>   {/* ✅ Loading spinner */}
        </div>
      ) : (
        <div className="content">
          <h1>{message || "Welcome!"}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
