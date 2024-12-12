"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import { useRouter } from "next/navigation";
import PostingCard from "../components/PostingCard/PostingCard";

interface User {
  id: string;
  name: string;
  email: string;
  ensembles?: string[];
}

interface Ensemble {
  _id: string;
  title: string;
  description: string;
  city: string;
  ensembleName: string;
  instrument: string;
}

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);

    if (storedToken) {
      fetchUserProfile(storedToken);
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

        if (data.ensembles && data.ensembles.length > 0) {
          fetchEnsembles(data.ensembles, token);
        }
      } else {
        const errorData = await response.json();
        alert(`Error fetching user profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchEnsembles = async (ensembleIds: string[], token: string) => {
    try {
      const fetchedEnsembles: Ensemble[] = [];
      for (const id of ensembleIds) {
        const response = await fetch(`http://localhost:3000/ensembles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Ensemble = await response.json();
          fetchedEnsembles.push(data);
        } else {
          console.error(`Failed to fetch ensemble with ID: ${id}`);
        }
      }
      setEnsembles(fetchedEnsembles);
    } catch (error) {
      console.error("Error fetching ensembles:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
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
            <div className="col-start-1 col-end-5 my-8 flex flex-col gap-8">
              <p> Please log in to view your profile.</p>
              <PrimaryButton color="blue" size="large" onClick={handleLogin}>
                Log in
              </PrimaryButton>
            </div>
          ) : (
            <div className="col-start-1 col-end-13">
              <p>Welcome back {userData?.name}</p>
              <h2>Your Ensembles:</h2>
              <div className="grid grid-cols-3 gap-6 py-12">
                {ensembles.length > 0 ? (
                  ensembles.map((ensemble) => (
                    <div key={ensemble._id}>
                      <PostingCard
                        title={ensemble.title}
                        description={ensemble.description}
                        author={ensemble.ensembleName}
                        instrument={ensemble.instrument}
                        date="09-01-2025"
                        location={ensemble.city}
                      />
                    </div>
                  ))
                ) : (
                  <p>No ensembles available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
