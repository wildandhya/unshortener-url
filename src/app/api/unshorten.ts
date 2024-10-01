// pages/api/unshorten.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Fetch the URL headers
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "manual", // Prevent redirection
    });

    // Get the location header if it exists
    const location = response.headers.get("Location");
    console.log(location, "SINI")

    if (location) {
      return res.status(200).json({ location });
    } else {
      return res.status(200).json({ message: "No redirect detected" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch URL" });
  }
}
