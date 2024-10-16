import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console | null> {
    return Console.findByPk(id);
  }

  // Crée une nouvelle console
  public async createConsole(name: string, manufacturer: string): Promise<Console> {
    return Console.create({ name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);
    if (console) {
      const games = await Game.findAll({ where: { console_id: id } });
      const hasReviews = await Promise.all(
        games.map(game => Review.count({ where: { gameId: game.id } }))
      );
      if (hasReviews.some(count => count > 0)) {
        throw new Error("Cannot delete console because it has games with reviews.");
      }
      await console.destroy();
    } else {
      notFound("Console");
    }
  }

  // Met à jour une console
  public async updateConsole(id: number, name?: string, manufacturer?: string): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    return null;
  }

  // Récupérer les jeux présents dans une console
  public async getAllGamesByConsoleById(id: number): Promise<Game[] | null> {
    const gamesList = await Game.findAll({ where: { console_id: id } });
    return gamesList;
  }
}

export const consoleService = new ConsoleService();
