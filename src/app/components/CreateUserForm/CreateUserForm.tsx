import { useState } from "react";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
    };

    console.log("user info", user);

    const result = await saveUser(user);
    if (result.error) {
      console.error(result.error);
    }
  };

  async function saveUser(user: object) {
    const url = "http://localhost:3000/users";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Failed to create user");
      }
      return json;
    } catch (error) {
      console.error(error);
      return { error: (error as Error).message || "An error occurred" };
    }
  }

  return (
    <div className="outer-grid">
      <div className="inner-grid">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              className="border-2 border-black"
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border-2 border-black"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              className="border-2 border-black"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            className="cursor-pointer bg-black px-4 py-2 text-white"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
