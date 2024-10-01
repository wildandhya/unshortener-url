"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>(""); // Initialize with an empty string
  const [finalUrl, setFinalUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null);
    setFinalUrl(null);

    // Basic client-side validation
    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      
      // Send POST request to your API route
      const response = await fetch(url, {
        // mode:"no-cors",
        method: "GET",
        redirect:"manual"
      });

      console.log(response, "RESPONSE")
      const data = await response.json();

      if (!response.ok) {
        // Handle errors returned by the API
        throw new Error(data.error || "Something went wrong.");
      }

    

      setFinalUrl(data.finalUrl);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-screen-md px-5 flex justify-center items-center flex-col min-h-screen">
      <header className="text-center my-10">
        <h1 className="text-4xl font-bold mb-4">URL Unshortener</h1>
        <p className="text-gray-600">
          Easily unshorten your URLs and check their safety before visiting.
        </p>
      </header>
      
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm justify-center items-center space-x-2"
      >
        <Input
          type="url"
          placeholder="Enter shortened URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </form>

      {error && (
        <p className="text-red-500 mt-4">
          <strong>Error:</strong> {error}
        </p>
      )}

      {finalUrl && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold">Unshortened URL:</h2>
          <a
            href={finalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {finalUrl}
          </a>
        </div>
      )}
    </main>
  );
}
