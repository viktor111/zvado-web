import { Course, PrismaClient, User } from "@prisma/client";
import UserModel from "../models/user.model";

class UserRepo {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser(user: UserModel): Promise<User> {
        return await this.prisma.user.create({
            data: {
                username: user.getUsername(),
                email: user.getEmail(),
                password: user.getPassword(),
            },
        });
    }

    async updateUser(id: string, userUpdated: UserModel): Promise<User> {
        return await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: userUpdated.getUsername(),
                email: userUpdated.getEmail(),
                password: userUpdated.getPassword(),
            },
        });
    }

    async deleteUser(id: string): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    }

    async getAllUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async getUserCourses(id: string): Promise<Course[]> {
        const owned = await this.prisma.ownedCourses.findMany({
            where: {
                userId: id,
            },
        });

        const ownedIds = owned.map(course => course.courseId);

        const courses = await this.prisma.course.findMany({
            where: {
                id: {
                    in: ownedIds,
                },
            },
        });

        return courses;
    }

    async userBuyCourse(userId: string, courseId: string): Promise<Course> {
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });

        if (!course) throw new Error(`Course with id ${courseId} not found`);

        await this.prisma.ownedCourses.create({
            data: {
                userId,
                courseId,
            },
        });

        return course;
    }
}

export default UserRepo;
