import { ConsoleDTO } from "../dto/console.dto";
import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";

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

  public async deleteGame(id: number): Promise<void> {
    const games = await Game.findByPk(id);
    if (games) {
      const reviewsCount = await Review.count({
        where: { gameId: id }
      });
      if (reviewsCount > 0) {
        throw new Error("Cannot delete game because it has reviews.");
      }
      await games.destroy();
    } else {
      notFound("Game");
    }
  }

  public async getAllReviewsByGameById(id: number): Promise<Review[] | null> {
    const reviewsList = await Review.findAll({ where: { gameId: id } });
    return reviewsList;
  }
}

export const gameService = new GameService();
