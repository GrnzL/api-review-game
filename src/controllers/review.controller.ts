import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { reviewService } from "../services/review.service";
import { ReviewDTO, CreateReviewDTO } from "../dto/review.dto";
import { notFound } from "../error/NotFoundError";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return reviewService.getAllReviews();
    }
    @Get("{id}")
    public async getReviewById(@Path() id: number): Promise<ReviewDTO> {
        const review = await reviewService.getReviewById(id);
        if (!review) notFound("Review");
        return review;
    }
    @Post("/")
    public async createReview(@Body() reviewData: CreateReviewDTO): Promise<ReviewDTO> {
        return reviewService.createReview(reviewData);
    }

    // Route pour mettre à jour une revue par ID
    @Patch("{id}")
    public async updateReview(@Path() id: number, @Body() reviewData: Partial<CreateReviewDTO>): Promise<ReviewDTO> {
        const updatedReview = await reviewService.updateReview(id, reviewData);
        if (!updatedReview) notFound("Review");
        return updatedReview;
    }
}
