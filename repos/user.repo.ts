import { Course, PrismaClient, User } from "@prisma/client";
import ApiError from "../common/api.error";
import UserModel from "../models/user.model";
import PasswordHelper from '../helpers/password.helper';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

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

    async userLogin(email: string, password: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) throw new ApiError(`User with email ${email} not found`, 404);

        const passwordMatch = await PasswordHelper.compare(password, user.password);

        if (!passwordMatch) throw new ApiError(`Password is incorrect`, 400);

        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser(user: UserModel): Promise<User> {
        try{
            const hashedPassword = await PasswordHelper.hash(user.getPassword());
            return await this.prisma.user.create({
                data: {
                    username: user.getUsername(),
                    email: user.getEmail(),
                    password: hashedPassword,
                    isAdmin: user.getIsAdmin(),
                },
            });
        }
        catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === 'P2002'){
                    throw new ApiError(`Email or username already in use`, 409);
                }
            }
            throw new ApiError(`Internal error`, 400); 
        }
        
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
                isAdmin: userUpdated.getIsAdmin(),
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

        if (!course) throw new ApiError(`Course with id ${courseId} not found`, 404);

        const isPurchased = await this.prisma.ownedCourses.findFirst({
            where: {
                userId,
                courseId,
            },
        });

        if (isPurchased) throw new ApiError(`User already purched this course`, 400);

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
