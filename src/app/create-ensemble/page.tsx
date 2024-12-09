"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

export default function CreateEnsemblePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
        alert("Ensemble created successfully!");
        setName("");
        setDescription("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating ensemble:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <Nav />
      <div
        className="outer-grid montserrat-regular"
        style={{ backgroundColor: "var(--grey-200" }}
      >
        <div className="inner-grid my-12">
          <h1
            className="oswald-medium col-start-4 col-end-10 my-4 justify-self-center text-4xl"
            style={{ color: "var(--dark-blue)" }}
          >
            Create Ensemble
          </h1>

          {!isLoggedIn ? (
            <div className="col-start-4 col-end-10 flex flex-col items-center gap-4">
              <p>Please login to create an ensemble.</p>
              <PrimaryButton color="blue" size="large" onClick={handleLogin}>
                Log in
              </PrimaryButton>
            </div>
          ) : (
            <form
              className="col-start-4 col-end-10 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="input-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>

              <PrimaryButton
                color="blue"
                className="mt-4"
                size="large"
                type="submit"
              >
                Create Ensemble
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
