import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

    const result = await saveUser(user);
    if (result.error) {
      console.error(result.error);
    } else {
      router.push("/login");
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
    <div className="outer-grid montserrat-regular">
      <div className="inner-grid">
        <h1 className="montserrat-bold col-start-1 col-end-13 my-8 text-2xl">
          Sign up
        </h1>
        <p className="col-start-1 col-end-7 mb-8">
          Welcome to our platform! Join our community and take the first step
          toward creating and discovering ensembles.
        </p>
        <form
          className="col-start-1 col-end-4 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
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

          <div className="flex flex-col gap-2">
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

          <div className="flex flex-col gap-2">
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
