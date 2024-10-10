import { GameDTO } from "./game.dto"

export interface ReviewDTO {
    id?: number,
    rating: number,
    review: string,
    gameId: number;
}

export interface CreateReviewDTO {
    rating: number,
    review: string,
    gameId: number;
}