import { Course, PrismaClient, Video } from "@prisma/client";
import CourseModel from "../models/course.model";
import VideoModel from "../models/video.model";

class CourseRepo {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllCourses(): Promise<CourseModel[]> {
        const courses = await this.prisma.course.findMany();

        const coursesModel: CourseModel[] = [];

        for (const course of courses) {
            coursesModel.push(await this.getCourseWithVideos(course));
        }

        return coursesModel;
    }

    async getCoursesById(id: string): Promise<CourseModel | null> {
        const course = await this.prisma.course.findUnique({
            where: {
                id: id,
            },
        });

        if (course) {
            return await this.getCourseWithVideos(course);
        }

        return null;
    }

    async createCourse(course: CourseModel): Promise<Course> {
        return await this.prisma.course.create({
            data: {
                name: course.getName(),
                description: course.getDescription(),
                price: course.getPrice(),
                image: course.getImage(),
                createdAt: course.getCreatedAt(),
                updatedAt: course.getUpdatedAt(),
                totalHours: course.getTotalHours(),
            },
        });
    }

    async updateCourse(id: string, courseUpdated: CourseModel): Promise<Course> {
        return await this.prisma.course.update({
            where: {
                id: id,
            },
            data: {
                name: courseUpdated.getName(),
                description: courseUpdated.getDescription(),
                price: courseUpdated.getPrice(),
                image: courseUpdated.getImage(),
                createdAt: courseUpdated.getCreatedAt(),
                updatedAt: courseUpdated.getUpdatedAt(),
                totalHours: courseUpdated.getTotalHours(),
            },
        });
    }

    async deleteCourse(id: string): Promise<Course> {
        return await this.prisma.course.delete({
            where: {
                id: id,
            },
        });
    }

    async searchCoursesByName(name: string): Promise<CourseModel[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        const coursesModel: CourseModel[] = [];

        for (const course of courses) {
            coursesModel.push(await this.getCourseWithVideos(course));
        }

        return coursesModel;
    }

    async filterByPriceAsc(price: number): Promise<CourseModel[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                price: {
                    lte: price,
                },
            },
        });

        const coursesModel: CourseModel[] = [];

        for (const course of courses) {
            coursesModel.push(await this.getCourseWithVideos(course));
        }

        return coursesModel;
    }

    async filterByPriceDesc(price: number): Promise<CourseModel[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                price: {
                    gte: price,
                },
            },
        });

        const coursesModel: CourseModel[] = [];

        for (const course of courses) {
            coursesModel.push(await this.getCourseWithVideos(course));
        }

        return coursesModel;
    }

    async filterByCreatedAtAsc(date: Date): Promise<CourseModel[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                createdAt: {
                    lte: date,
                },
            },
        });

        const coursesModel: CourseModel[] = [];

        for (const course of courses) {
            coursesModel.push(await this.getCourseWithVideos(course));
        }

        return coursesModel;
    }

    async filterByCreatedAtDesc(date: Date): Promise<CourseModel[]> {
        const courses = await this.prisma.course.findMany({
            where: {
                createdAt: {
                    gte: date,
                },
            },
        });

        const coursesModel: CourseModel[] = [];

        for (const course of courses) {
            coursesModel.push(await this.getCourseWithVideos(course));
        }

        return coursesModel;
    }

    async createVideo(video: VideoModel): Promise<Video> {
        return await this.prisma.video.create({
            data: {
                name: video.getName(),
                description: video.getDescription(),
                url: video.getUrl(),
                courseId: video.getCourseId(),
            },
        });
    }

    async updateVideo(id: string, videoUpdated: VideoModel): Promise<Video> {
        return await this.prisma.video.update({
            where: {
                id: id,
            },
            data: {
                name: videoUpdated.getName(),
                description: videoUpdated.getDescription(),
                url: videoUpdated.getUrl(),
                courseId: videoUpdated.getCourseId(),
            },
        });
    }

    async deleteVideo(id: string): Promise<Video> {
        return await this.prisma.video.delete({
            where: {
                id: id,
            },
        });
    }

    async isOwnedByUser(courseId: string, userId: string): Promise<boolean> {
        const isOwned = await this.prisma.ownedCourses.count({
            where: {
                userId: userId,
                courseId: courseId,
            },
        });

        return isOwned > 0;
    }


    private async getCourseWithVideos(course: Course): Promise<CourseModel> {
        const videos = await this.prisma.video.findMany({
            where: {
                courseId: course.id,
            },
        });

        const courseModel = new CourseModel(
            course.id,
            course.name,
            course.description,
            +course.price,
            course.image,
            +course.totalHours);

        videos.forEach(video => {
            courseModel.addVideo(new VideoModel(
                video.id,
                video.name,
                video.description,
                video.url,
                video.courseId));
        });

        return courseModel;
    }
}

export default CourseRepo;