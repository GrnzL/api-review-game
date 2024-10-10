import { ConsoleDTO } from "./console.dto";

export interface GameDTO {
  id?: number;
  title: string;
  console?: ConsoleDTO;
}

export interface CreateGameDTO {
  title: string;
  IdConsole: number;
}

export interface UpdateGameDTO {
  title: string;
  IdConsole: number;
}