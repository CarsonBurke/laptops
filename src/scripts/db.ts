import createClient from "edgedb";

export const edgeClient = createClient({
    tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : undefined,
});