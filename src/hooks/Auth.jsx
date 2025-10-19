import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuthRedirection;
