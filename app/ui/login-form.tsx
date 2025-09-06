'use client';

import { useState } from "react";
import { authenticate } from "@/app/lib/actions";

type LoginState = {
  error?: string;
};

const initialState: LoginState = { error: undefined };

export default function LoginForm() {
  const [state, setState] = useState<LoginState>(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const result = await authenticate(undefined, formData);
      if (result) {
        setState({ error: result });
      } else {
        console.log("Login successful");
      }
    } catch (error) {
      setState({ error: "An unexpected error occurred." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border px-2 py-1 rounded w-full"
          defaultValue="user@nextmail.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border px-2 py-1 rounded w-full"
          defaultValue="123456"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button type="submit" className="px-3 py-2 rounded bg-black text-white">
        Sign in
      </button>
    </form>
  );
}