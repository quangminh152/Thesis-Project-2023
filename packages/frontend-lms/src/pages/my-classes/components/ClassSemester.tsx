import Image from "next/image";
import Link from "next/link";
import type { ClassesInformationResponse, CoursesResponse } from "server-lms";
import ThumbnailImage from "../../../assets/images/thumbnail.jpg";

interface CourseExpand {
  course: CoursesResponse;
}

interface IClassProps {
  classInfo: ClassesInformationResponse<CourseExpand>[];
}
function ClassSemester({ classInfo }: IClassProps) {
  console.log(classInfo);
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-regular flex pb-4 text-xl leading-8 text-gray-700">
          {/* {dataSubjects.items[1].seme} */}
        </p>

        <p className="font-regular flex pb-4 text-right text-xl leading-8 text-blue-700">
          Add class
        </p>
      </div>

      {classInfo && (
        <div className="grid grid-cols-4 gap-8">
          {classInfo.map((data, index) => (
            <Link key={index} href={{ pathname: `class-detail/${data.id}` }}>
              <div className="relative flex flex-col rounded-lg border border-gray-300">
                <Image
                  width={500}
                  height={500}
                  className="rounded-t-lg object-cover brightness-75"
                  src={ThumbnailImage}
                  alt="Course Cover"
                />
                <h3 className="pl-4 pr-4 pt-2 text-lg font-semibold leading-8 text-gray-800">
                  {data?.expand?.course?.name}
                </h3>
                <h3 className="font-regular pb-2 pl-4 pr-4 pt-0 text-lg leading-8 text-gray-800">
                  {data.lecturerName}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassSemester;
