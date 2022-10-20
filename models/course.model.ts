import { CourseModelConstants } from "../common/constants";
import Guard from "../common/guard";

class CourseModel {
    constructor(
        name: string,
        description: string,
        price: number,
        image: string,
        createdAt: Date,
        updatedAt: Date,
        totalHours: number,
        promoCode: string) {
        this.validate(name, description, price, image, createdAt, updatedAt, totalHours, promoCode);

        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.totalHours = totalHours;
        this.promoCode = promoCode;
    }

    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private createdAt: Date;
    private updatedAt: Date;
    private totalHours: number;
    private promoCode: string;

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

    public getPromoCode() {
        return this.promoCode;
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

    public updatePromoCode(promoCode: string) {
        this.validatePromoCode(promoCode);
        this.promoCode = promoCode;
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

    private validatePromoCode(promoCode: string) {
        Guard.againstInvalidString(promoCode, "promoCode");
        Guard.againstOutOfRange(
            promoCode,
            CourseModelConstants.MIN_PROMO_CODE_LENGTH,
            CourseModelConstants.MAX_PROMO_CODE_LENGTH,
            "promoCode"
        );
    }


    private validate(
        name: string,
        description: string,
        price: number,
        image: string,
        createdAt: Date,
        updatedAt: Date,
        totalHours: number,
        promoCode: string) {
        this.validateName(name);
        this.validateDescription(description);
        this.validatePrice(price);
        this.validateImage(image);
        this.validateCreatedAt(createdAt);
        this.validateUpdatedAt(updatedAt);
        this.validateTotalHours(totalHours);
        this.validatePromoCode(promoCode);
    }

}

export default CourseModel;