"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

type Profile = {
  name: string;
  email: string;
};

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const fetchUserProfile = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const userData = await response.json();
      setProfile(userData);
      console.log("User profile:", userData);
    } catch (error) {
      setError((error as Error).message);
      console.error("Profile fetch failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials, try again.");
      }

      const data = await response.json();

      console.log("Login successful:", data);

      sessionStorage.setItem("token", data.access_token);

      await fetchUserProfile();
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="outer-grid montserrat-regular py-12">
      <div className="inner-grid">
        <h1
          className="oswald-medium col-start-1 col-end-13 my-8 text-4xl"
          style={{ color: "var(--dark-blue)" }}
        >
          Log In
        </h1>
        <p className="col-start-1 col-end-7 mb-8">
          Welcome to our platform! Please log in to access your account and
          unlock the full experience. By logging in, you'll gain the ability to
          create new ensembles, collaborate with others, and join existing
          groups.
        </p>
        <form
          className="col-start-1 col-end-4 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="input-field">
            <label htmlFor="name">Username</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {error && <p>{error}</p>}

          <PrimaryButton
            color="blue"
            className="mt-4"
            size="large"
            type="submit"
          >
            Login
          </PrimaryButton>
        </form>

        {/* {profile && (
          <div>
            <h2>Welcome, {profile.name}</h2>
          </div>
        )} */}
      </div>
    </div>
  );
}
