import { CourseModelConstants } from "../common/constants";
import Guard from "../common/guard";
import VideoModel from "./video.model";

class CourseModel {
    constructor(
        id : string,
        name: string,
        description: string,
        price: number,
        image: string,
        createdAt: Date,
        updatedAt: Date,
        totalHours: number) {
        this.validate(id, name, description, price, image, createdAt, updatedAt, totalHours);

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalHours = totalHours;
    }

    private id: string;
    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private createdAt: Date;
    private updatedAt: Date;
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

    public updateId(id: string) {
        this.validateId(id);
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

    public updateCreatedAt(createdAt: Date) {
        this.validateCreatedAt(createdAt);
        this.createdAt = createdAt;
    }

    public updateUpdatedAt(updatedAt: Date) {
        this.validateUpdatedAt(updatedAt);
        this.updatedAt = updatedAt;
    }

    public updateTotalHours(totalHours: number) {
        this.validateTotalHours(totalHours);
        this.totalHours = totalHours;
    }

    private validateName(name: string) {
        Guard.againstInvalidString(name, "name");
        Guard.againstOutOfRange(
            name,
            CourseModelConstants.MIN_NAME_LENGTH,
            CourseModelConstants.MAX_NAME_LENGTH,
            "name"
        );
    }

    public addVideo(video: VideoModel) {
        this.videos.push(video);
    }

    private validateId(id: string) {
        Guard.againstInvalidString(id, "id");
    }

    private validateDescription(description: string) {
        Guard.againstInvalidString(description, "description");
        Guard.againstOutOfRange(
            description,
            CourseModelConstants.MIN_DESCRIPTION_LENGTH,
            CourseModelConstants.MAX_DESCRIPTION_LENGTH,
            "description"
        );
    }

    private validatePrice(price: number) {
        Guard.againstNullOrUndefined(price, "price");
        Guard.againstOutOfRange(
            price,
            CourseModelConstants.MIN_PRICE,
            CourseModelConstants.MAX_PRICE,
            "price"
        );
    }

    private validateImage(image: string) {
        Guard.againstInvalidString(image, "image");
    }

    private validateCreatedAt(createdAt: Date) {
        Guard.againstNullOrUndefined(createdAt, "createdAt");
    }

    private validateUpdatedAt(updatedAt: Date) {
        Guard.againstNullOrUndefined(updatedAt, "updatedAt");
    }

    private validateTotalHours(totalHours: number) {
        Guard.againstNullOrUndefined(totalHours, "totalHours");
        Guard.againstOutOfRange(
            totalHours,
            CourseModelConstants.MIN_TOTAL_HOURS,
            CourseModelConstants.MAX_TOTAL_HOURS,
            "totalHours"
        );
    }

    private validate(
        id: string,
        name: string,
        description: string,
        price: number,
        image: string,
        createdAt: Date,
        updatedAt: Date,
        totalHours: number) {
        this.validateId(id);
        this.validateName(name);
        this.validateDescription(description);
        this.validatePrice(price);
        this.validateImage(image);
        this.validateCreatedAt(createdAt);
        this.validateUpdatedAt(updatedAt);
        this.validateTotalHours(totalHours);
    }

}

export default CourseModel;