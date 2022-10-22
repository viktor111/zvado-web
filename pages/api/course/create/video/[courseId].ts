import { NextApiRequest, NextApiResponse } from "next";
import ApiError from '../../../../../common/api.error';
import VideoModel from '../../../../../models/video.model';
import CourseRepo from "../../../../../repos/course.repo";
import * as pino from "pino";

const logger = pino.default();

const createVideo = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { courseId } = req.query;
        if(!courseId) {
            throw new ApiError("Course id not provided", 404);
        }
        if(typeof courseId !== "string") {
            throw new ApiError("Invalid courseId", 400);
        }
        const { name, description, url } = req.body;
        
        const video = new VideoModel("", name, description, url, courseId);
        const courseRepo = new CourseRepo();
        const videoCreated = await courseRepo.createVideo(video);
        res.status(200).json({ videoCreated });
        return;
    }
    catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error });
        return;
    }
};

export default createVideo;