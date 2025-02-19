import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../lib/getUser";

const Protected = ({ children }) => {
  const reduxUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState(reduxUser);
  const [loading, setLoading] = useState(!reduxUser); // Only load if no redux user

  useEffect(() => {
    if (!reduxUser) {
      getUser()
        .then((fetchedUser) => {
          setUser(fetchedUser);
          setLoading(false); // Stop loading
        })
        .catch(() => {
          setUser(null);
          setLoading(false); // Stop loading
        });
    } else {
      setLoading(false);
    }
  }, [reduxUser]);

  if (loading) return <p>Loading...</p>; // Prevent redirecting before fetching user

  return user ? children : <Navigate to="/login" />;
};

export default Protected;
