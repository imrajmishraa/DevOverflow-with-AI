import env from "@/app/env";
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

console.log("Endpoint:", env.appwrite.endpoint);
console.log("Project:", env.appwrite.projectId);

const client = new Client()
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId); // Your project ID

const databases = new Databases(client);  
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { client, databases, account, avatars, storage}


