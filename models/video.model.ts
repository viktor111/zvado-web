import { VideoModelConstants } from "../common/constants";
import Guard from "../common/guard";

class VideoModel {
    constructor(id: string, name: string, description: string, url: string, courseId: string) {
        this.validate(name, description, url, courseId);

        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.courseId = courseId;
    }
    
    private id: string;
    private name: string;
    private description: string;
    private url: string;
    private courseId: string;

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getDescription() {
        return this.description;
    }

    public getUrl() {
        return this.url;
    }

    public getCourseId() {
        return this.courseId;
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

    public updateUrl(url: string) {
        this.validateUrl(url);
        this.url = url;
    }

    public updateCourseId(courseId: string) {
        this.validateCourseId(courseId);
        this.courseId = courseId;
    }

    private validateName(name: string) {
        Guard.againstInvalidString(name, "name");
        Guard.againstOutOfRange(
            name,
            VideoModelConstants.MIN_NAME_LENGTH,
            VideoModelConstants.MAX_NAME_LENGTH,
            "name"
        );
    }

    private validateDescription(description: string) {
        Guard.againstInvalidString(description, "description");
        Guard.againstOutOfRange(
            description,
            VideoModelConstants.MIN_DESCRIPTION_LENGTH,
            VideoModelConstants.MAX_DESCRIPTION_LENGTH,
            "description"
        );
    }

    private validateUrl(url: string) {
        Guard.againstInvalidString(url, "url");
    }

    private validateCourseId(courseId: string) {
        Guard.againstInvalidString(courseId, "courseId");
    }

    private validate(name: string, description: string, url: string, courseId: string) {
        this.validateName(name);
        this.validateDescription(description);
        this.validateUrl(url);
        this.validateCourseId(courseId);
    }
}

export default VideoModel;