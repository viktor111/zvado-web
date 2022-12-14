import { CourseModelConstants } from "../common/constants";
import Guard from "../common/guard";
import VideoModel from "./video.model";

class CourseModel {
    constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        image: string,
        totalHours: number) {
        this.validate(name, description, price, image, totalHours);
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.totalHours = totalHours;
    }

    private id: string;
    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private createdAt = new Date();
    private updatedAt = new Date();
    private totalHours: number;
    private videos: VideoModel[] = [];

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getDescription() {
        return this.description;
    }

    public getPrice() {
        return this.price;
    }

    public getImage() {
        return this.image;
    }

    public getCreatedAt() {
        return this.createdAt;
    }

    public getUpdatedAt() {
        return this.updatedAt;
    }

    public getTotalHours() {
        return this.totalHours;
    }

    public getVideos() {
        return this.videos;
    }

    public updateId(id: string) {
        this.id = id;
    }

    public updateName(name: string) {
        this.validateName(name);
        this.name = name;
    }

    public updateDescription(description: string) {
        this.validateDescription(description);
        this.description = description;
    }

    public updatePrice(price: number) {
        this.validatePrice(price);
        this.price = price;
    }

    public updateImage(image: string) {
        this.validateImage(image);
        this.image = image;
    }

    public updateTotalHours(totalHours: number) {
        this.validateTotalHours(totalHours);
        this.totalHours = totalHours;
    }

    private validateName(name: string) {
        Guard.againstInvalidString(name, "name", 400);
        Guard.againstOutOfRange(
            name,
            CourseModelConstants.MIN_NAME_LENGTH,
            CourseModelConstants.MAX_NAME_LENGTH,
            "name",
            400
        );
    }

    public addVideo(video: VideoModel) {
        this.videos.push(video);
    }

    public removeVideosUrls() {
        this.videos.forEach(video => {
            video.removeUrl();
        });
    }

    private validateDescription(description: string) {
        Guard.againstInvalidString(description, "description", 400);
        Guard.againstOutOfRange(
            description,
            CourseModelConstants.MIN_DESCRIPTION_LENGTH,
            CourseModelConstants.MAX_DESCRIPTION_LENGTH,
            "description",
            400
        );
    }

    private validatePrice(price: number) {
        Guard.againstNullOrUndefined(price, "price", 400);
        Guard.againstOutOfRange(
            price,
            CourseModelConstants.MIN_PRICE,
            CourseModelConstants.MAX_PRICE,
            "price",
            400
        );
    }

    private validateImage(image: string) {
        Guard.againstInvalidString(image, "image", 400);
    }

    private validateTotalHours(totalHours: number) {
        Guard.againstNullOrUndefined(totalHours, "totalHours", 400);
        Guard.againstOutOfRange(
            totalHours,
            CourseModelConstants.MIN_TOTAL_HOURS,
            CourseModelConstants.MAX_TOTAL_HOURS,
            "totalHours",
            400
        );
    }

    private validate(
        name: string,
        description: string,
        price: number,
        image: string,
        totalHours: number) {
        this.validateName(name);
        this.validateDescription(description);
        this.validatePrice(price);
        this.validateImage(image);
        this.validateTotalHours(totalHours);
    }

}

export default CourseModel;