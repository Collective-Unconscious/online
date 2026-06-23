import { createContext } from "svelte";
import type { User } from "$lib/types/user";

export const [ getUserContext, setUserContext ] = createContext<User | null>();
