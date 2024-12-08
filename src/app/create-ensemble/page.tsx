"use client";

import { useState } from "react";
import Nav from "../components/Nav/Nav";

export default function CreateEnsemblePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <div>
      <Nav />
      <div
        className="outer-grid montserrat-regular"
        style={{ backgroundColor: "var(--grey-200" }}
      >
        <div className="inner-grid my-12">
          <h1
            className="oswald-medium col-start-4 col-end-10 my-4 text-4xl"
            style={{ color: "var(--dark-blue)" }}
          >
            Create Ensemble
          </h1>
          <form
            className="col-start-4 col-end-10 flex flex-col gap-4"
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
        </div>
      </div>
    </div>
  );
}
