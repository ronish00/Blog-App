import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const checkAuth = () => {
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      } else {
        setLoading(false); // Only set loading to false if no navigation occurred
      }
    };

    checkAuth();
  }, [authStatus, authentication, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Simplified loading indicator
  }

  return <>{children}</>;
};

export default Protected;
