import { User } from "./types/User";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  return fetch(API_URL).then((response) => {
    return response.json();
  });
}
