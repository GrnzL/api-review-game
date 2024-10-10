import { Body, Controller, Path, Post, Patch, Get, Route, Tags } from "tsoa";
import { CreateGameDTO, GameDTO, UpdateGameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { notFound } from "../error/NotFoundError";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }
  @Post("/")
  public async createGame(
    @Body() requestBody: CreateGameDTO
  ): Promise<GameDTO> {
    const { title, IdConsole } = requestBody;
    return gameService.createGame(title, IdConsole);
  }
  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO> {
    const game = await gameService.getGameById(id);
    if (!game) notFound("Game");
    return game;
  }

  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: UpdateGameDTO
  ): Promise<GameDTO> {
    const { title, IdConsole } = requestBody;
    const updatedConsole = await gameService.updateGame(id, title, IdConsole);
    if (!updatedConsole) notFound("Console");
    return updatedConsole;
  }
}


