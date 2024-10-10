import { ConsoleDTO } from "../dto/console.dto";
import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }
  public async getGameById(id: number): Promise<Game | null> {
    return Game.findByPk(id);
  }

  public async createGame(
    title: string,
    IdConsole: number
  ): Promise<Game> {
    return Game.create({ title: title, console_id: IdConsole });
  }

  public async updateGame(id: number, title?: string, idConsole?: number): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if (title) game.title = title;
      if (idConsole) game.console_id = idConsole;
      await game.save();
      return game;
    }
    return null;
  }
}

export const gameService = new GameService();
