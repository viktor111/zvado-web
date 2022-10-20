import type { NextApiRequest, NextApiResponse } from "next";
import CourseRepo from "../../repos/course.repo";
import UserRepo from '../../repos/user.repo';

const test = async (req: NextApiRequest, res: NextApiResponse) => {
    const useRepo = new UserRepo();
    const courses = await useRepo.getUserCourses("cl9hnzpup0002vz0agjcxix8n");
    res.status(200).json(courses);
};

export default test;