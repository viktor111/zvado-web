import type { NextApiRequest, NextApiResponse } from "next";
import CourseRepo from "../../repos/course.repo";
import UserRepo from '../../repos/user.repo';

const buy = async (req: NextApiRequest, res: NextApiResponse) => {
    const useRepo = new UserRepo();
    const courses = await useRepo.userBuyCourse("cl9hnzpup0002vz0agjcxix8n", "cl9hnzrc8000cvz0a7n6yxuim");
    res.status(200).json(courses);
};

export default buy;