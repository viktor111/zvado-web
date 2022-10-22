import UserModel from "./models/user.model";
import CourseRepo from "./repos/course.repo";
import UserRepo from "./repos/user.repo";
import CourseModel from './models/course.model';
import VideoModel from './models/video.model';

const userRepo = new UserRepo();
const courseRepo = new CourseRepo();

async function main() {
    const admin = new UserModel("", "admin", "swifrorlilko@gmail.com", "123456", true);
    const user1 = new UserModel("", "BardBit", "azohop@gmail.com", "123456", false);
    const user2 = new UserModel("", "ErolPetrol", "draganovop@gmail.com", "123456", false);
    const user3 = new UserModel("", "YovkaKamayovka", "zhenya@gbg.bg", "123456", false);

    const course1 = new CourseModel("", "React course", "Course about react with typescript", 10.5, "testImage1", 11.5);
    const course2 = new CourseModel("", "C# course", "Course about c#", 2.2, "testImage2", 22);
    const course3 = new CourseModel("", "Java course", "Course about java", 30.5, "testImage3", 33);

    await userRepo.createUser(admin);
    await userRepo.createUser(user1);
    await userRepo.createUser(user2);
    await userRepo.createUser(user3);

    const createCourse1 = await courseRepo.createCourse(course1);
    const createCourse2 = await courseRepo.createCourse(course2);
    const createCourse3 = await courseRepo.createCourse(course3);

    const video1 = new VideoModel("", "testVideo1", "testVideo1", "https://www.youtube.com/watch?v=6FvX68gL2hg", createCourse1.id);
    const video2 = new VideoModel("", "testVideo1", "testVideo1", "https://www.youtube.com/watch?v=6FvX68gL2hg", createCourse1.id);
    const video3 = new VideoModel("", "testVideo1", "testVideo1", "https://www.youtube.com/watch?v=6FvX68gL2hg", createCourse2.id);
    const video4 = new VideoModel("", "testVideo1", "testVideo1", "https://www.youtube.com/watch?v=6FvX68gL2hg", createCourse2.id);
    const video5 = new VideoModel("", "testVideo1", "testVideo1", "https://www.youtube.com/watch?v=6FvX68gL2hg", createCourse3.id);

    await courseRepo.createVideo(video1);
    await courseRepo.createVideo(video2);
    await courseRepo.createVideo(video3);
    await courseRepo.createVideo(video4);
    await courseRepo.createVideo(video5);

}

export default main;