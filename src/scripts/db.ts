import createClient from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app"

export const edgeClient = createClient({
    tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : undefined,
});

// Initialize EdgeDB Auth
export const auth = createAuth(edgeClient, {
    baseUrl: process.env.VERCEL_ENV === "production"
      ? "https://production.yourapp.com"
      : "http://localhost:3000",
  });