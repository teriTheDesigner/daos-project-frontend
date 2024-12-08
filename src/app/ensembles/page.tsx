"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

interface Ensemble {
  _id: string;
  name: string;
  description: string;
}

export default function EnsemblesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchEnsembles();
    }
  }, []);

  const fetchEnsembles = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view ensembles.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/ensembles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnsembles(data);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching ensembles:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const createEnsamble = () => {
    router.push("/create-ensemble");
  };

  return (
    <div>
      <Nav />
      <div className="outer-grid montserrat-regular">
        <div className="inner-grid">
          <h1 className="montserrat-bold col-start-1 col-end-13 my-8 text-2xl">
            Ensembles
          </h1>
          {!isLoggedIn ? (
            <div className="col-start-1 col-end-5 my-8 flex flex-col gap-8">
              <p>Please login to create and join ensembles</p>
              <button
                className="cursor-pointer bg-blue-500 px-4 py-2 text-white"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
          ) : (
            <div className="col-start-1 col-end-13">
              <PrimaryButton onClick={createEnsamble} color="blue" size="large">
                Create Ensemble
              </PrimaryButton>
              <div className="grid grid-cols-3 gap-6 py-12">
                {ensembles.length > 0 ? (
                  ensembles.map((ensemble) => (
                    <div
                      className="rounded-md border border-black p-4"
                      key={ensemble._id}
                    >
                      <p>Title: {ensemble.name}</p>
                      <p>Description: {ensemble.description}</p>
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
