import { Course, PrismaClient } from "@prisma/client";
import CourseModel from "../models/course.model";

class CourseRepo{
    private readonly prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async getAllCourses(): Promise<Course[]>{
        return await this.prisma.course.findMany();
    }

    async getCoursesById(id: string): Promise<Course|null>{
        return await this.prisma.course.findUnique({
            where: {
                id,
            },
        });
    }

    async createCourse(course: CourseModel): Promise<Course>{
        return await this.prisma.course.create({
            data: {
                name: course.getName(),
                description: course.getDescription(),
                price: course.getPrice(),
                image: course.getImage(),
                createdAt: course.getCreatedAt(),
                updatedAt: course.getUpdatedAt(),
                totalHours: course.getTotalHours(),
                promoCode: course.getPromoCode(),
            },
        });
    }

    async updateCourse(id: string, courseUpdated: CourseModel): Promise<Course>{
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
                promoCode: courseUpdated.getPromoCode(),
            },
        });
    }

    async deleteCourse(id: string): Promise<Course>{
        return await this.prisma.course.delete({
            where: {
                id: id,
            },
        });
    }

    async searchCoursesByName(name: string): Promise<Course[]>{
        return await this.prisma.course.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });
    }

    async filterByPriceAsc(price: number): Promise<Course[]>{
        return await this.prisma.course.findMany({
            where: {
                price: {
                    lte: price,
                },
            },
        });
    }

    async filterByPriceDesc(price: number): Promise<Course[]>{
        return await this.prisma.course.findMany({
            where: {
                price: {
                    gte: price,
                },
            },
        });
    }

    async filterByCreatedAtAsc(date: Date): Promise<Course[]>{ 
        return await this.prisma.course.findMany({
            where: {
                createdAt: {
                    lte: date,
                },
            },
        });
    }

    async filterByCreatedAtDesc(date: Date): Promise<Course[]>{
        return await this.prisma.course.findMany({
            where: {
                createdAt: {
                    gte: date,
                },
            },
        });
    }
}

export default CourseRepo;