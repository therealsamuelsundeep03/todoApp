import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(location.pathname === '/login' || location.pathname === '/signin' && user){
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }
    setUser(user);
  }, [location.pathname, navigate, user]);

  return user;
};

export default useAuth;
