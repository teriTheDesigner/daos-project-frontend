"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import { useRouter } from "next/navigation";

interface Ensemble {
  _id: string;
  name: string;
  description: string;
}
export default function EnsemblesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

      const data = await response.json();
      if (response.ok) {
        setEnsembles(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching ensembles:", error);
      alert("An error occurred. Please try again.");
    }
  };

  function handleLogin() {
    router.push("/login");
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create an ensemble.");
      return;
    }

    const ensembleData = {
      name,
      description,
    };

    try {
      const response = await fetch("http://localhost:3000/ensembles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ensembleData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Ensemble created successfully!`);
        console.log("data was sent", data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating ensemble:", error);
      alert("An error occurred. Please try again.");
    }
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
              <PrimaryButton color="blue" size="medium" onClick={handleLogin}>
                Log in
              </PrimaryButton>
            </div>
          ) : (
            <div className="col-start-1 col-end-12 flex justify-between">
              <form
                className="col-start-1 col-end-4 flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description">Description</label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>

                <button
                  className="cursor-pointer bg-black px-4 py-2 text-white"
                  type="submit"
                >
                  Create Ensemble
                </button>
              </form>

              <div>
                {ensembles.length > 0 ? (
                  ensembles.map((ensemble: Ensemble) => (
                    <div
                      className="mt-6 rounded-md border border-black p-4"
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
