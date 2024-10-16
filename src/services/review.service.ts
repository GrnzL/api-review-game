import { CreateReviewDTO, ReviewDTO } from "../dto/review.dto";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";
import { Game } from "../models/game.model";

export class ReviewService {

    // Récupére toutes les reviews
    public async getAllReviews(): Promise<ReviewDTO[]> {
        const reviews = await Review.findAll();
        return reviews;
    }

    // Récupére une review précise
    public async getReviewById(id: number): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        return review;
    }

    // Créer une review
    public async createReview(reviewData: CreateReviewDTO): Promise<ReviewDTO> {
        const game = await Game.findByPk(reviewData.gameId);
        if (!game) {
            notFound("Game");
        }
        const newReview = await Review.create(reviewData);
        return newReview;
    }

    // Mets à jour une review
    public async updateReview(id: number, reviewData: Partial<CreateReviewDTO>): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        if (!review) {
            notFound("Review");
        }
        if (reviewData.gameId) {
            const game = await Game.findByPk(reviewData.gameId);
            if (!game) {
                notFound("Game");
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

    // Supprime une review
    public async deleteReview(id: number): Promise<void> {
        const review = await Review.findByPk(id);
        if (review) {
            await review.destroy();
        } else {
            notFound("Review");
        }
    }
}

export const reviewService = new ReviewService();