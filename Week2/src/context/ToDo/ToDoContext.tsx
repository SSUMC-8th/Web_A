import { createContext } from "react";
import { IToDoContext } from "../../types/todo";

export const ToDoContext = createContext<IToDoContext | undefined>(undefined);
