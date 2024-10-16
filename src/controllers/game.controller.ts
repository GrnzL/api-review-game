import { Body, Controller, Path, Post, Patch, Get, Route, Tags, Delete } from "tsoa";
import { CreateGameDTO, GameDTO, UpdateGameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { notFound } from "../error/NotFoundError";
import { ReviewDTO } from "../dto/review.dto";

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
    const { title, idConsole } = requestBody;
    return gameService.createGame(title, idConsole);
  }
  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO> {
    const game = await gameService.getGameById(id);
    if (!game) notFound("Game");
    return game;
  }

  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: UpdateGameDTO
  ): Promise<GameDTO> {
    const { title, idConsole } = requestBody;
    const updatedConsole = await gameService.updateGame(id, title, idConsole);
    if (!updatedConsole) notFound("Game");
    return updatedConsole;
  }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }

  @Get("{id}/reviews")
  public async getAllGamesByConsoleById(@Path() id: number): Promise<ReviewDTO[]> {
    const game = await gameService.getGameById(id);
    if (!game) notFound("Game");
    const review = await gameService.getAllReviewsByGameById(id);
    if (!review) notFound("Review")
    return review;
  }
}


