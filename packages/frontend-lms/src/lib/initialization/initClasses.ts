import type {
  ClassesInformationRecord,
  ClassesInformationResponse,
  CoursesResponse,
  UsersResponse,
} from "server-lms";
import { Collections } from "server-lms";
import type { PBCustom } from "src/types/pb-custom";

export async function initClasses(
  pbServer: PBCustom,
  user: UsersResponse
): Promise<string[]> {
  const userMajor = user.major;

  const allCourses = await pbServer
    .collection(Collections.Courses)
    .getFullList<CoursesResponse>(undefined, {
      filter: `major.id ?= "${userMajor}"`,
    });

  const registeredCoursesIdSet = new Set(
    (
      await pbServer
        .collection(Collections.ClassesInformation)
        .getFullList<ClassesInformationResponse>(undefined, {
          filter: `student.id = "${user.id}"`,
        })
    ).map((classInfo) => classInfo.course)
  );

  const toAddClasses = allCourses.filter(
    (course) => !registeredCoursesIdSet.has(course.id)
  );

  const newlyAddedClasses: string[] = [];

  for (const course of toAddClasses) {
    const classData: ClassesInformationRecord = {
      course: course.id,
      student: user.id,
    };

    await pbServer
      .collection(Collections.ClassesInformation)
      .create<ClassesInformationResponse>(classData, { $autoCancel: false })
      .then((classInfo) => {
        newlyAddedClasses.push(classInfo.course);
      });
  }

  return newlyAddedClasses;
}
