import { CreateReviewDTO, ReviewDTO } from "../dto/review.dto";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";
import { Game } from "../models/game.model";

export class ReviewService {
    public async getAllReviews(): Promise<ReviewDTO[]> {
        const reviews = await Review.findAll();
        return reviews;
    }
    public async getReviewById(id: number): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        return review;
    }

    public async createReview(reviewData: CreateReviewDTO): Promise<ReviewDTO> {
        const game = await Game.findByPk(reviewData.gameId);
        if (!game) {
            throw notFound("Game");
        }
        const newReview = await Review.create(reviewData);
        return newReview;
    }

    public async updateReview(id: number, reviewData: Partial<CreateReviewDTO>): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        if (!review) {
            throw notFound("Review");
        }
        if (reviewData.gameId) {
            const game = await Game.findByPk(reviewData.gameId);
            if (!game) {
                throw notFound("Game");
            }
            review.gameId = reviewData.gameId;
        }
        if (reviewData.rating !== undefined) {
            review.rating = reviewData.rating;
        }
        if (reviewData.review) {
            review.review = reviewData.review;
        }
        await review.save();
        return review;
    }
}

export const reviewService = new ReviewService();