"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";

interface User {
  id: string;
  name: string;
  email: string;
  ensembles?: string[];
}

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);

    if (storedToken) {
      fetchUserProfile(storedToken);

      // fetchEnsembles();
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: User = await response.json();
        setUserData(data);
      } else {
        const errorData = await response.json();
        alert(`Error fetching user profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div>
      <Nav />
      <div className="outer-grid montserrat-regular">
        <div className="inner-grid">
          <h1
            className="oswald-medium col-start-1 col-end-13 mb-4 mt-12 text-4xl"
            style={{ color: "var(--dark-blue)" }}
          >
            Profile
          </h1>
          {!isLoggedIn ? (
            <p className="montserrat-regular col-start-1 col-end-13 text-lg">
              You must be logged in to view your profile.
            </p>
          ) : (
            <p>Welcome back {userData?.name}</p>
          )}
        </div>
      </div>
    </div>
  );
}
