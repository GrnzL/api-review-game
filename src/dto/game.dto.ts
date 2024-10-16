import { ConsoleDTO } from "./console.dto";

export interface GameDTO {
  id?: number;
  title: string;
  console?: ConsoleDTO;
}

export interface CreateGameDTO {
  title: string;
  idConsole: number;
}

export interface UpdateGameDTO {
  title: string;
  idConsole: number;
}