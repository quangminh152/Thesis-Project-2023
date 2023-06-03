import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import type { ListResult } from "pocketbase";
import { useState } from "react";
import type {
  UsersResponse,
  CoursesResponse,
  ClassesInformationResponse,
  MajorsResponse,
} from "server-lms";
import { Collections } from "server-lms";
import MainLayout from "src/components/layouts";
import CurriculumTable from "src/components/reacttable/CurriculumTable";
import type { User } from "src/contexts/AuthContextProvider";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import TableRow from "./components/TableRow";
import { usePBClient } from "src/lib/pb_client";
import { initClasses } from "src/lib/initialization/initClasses";

interface MajorExpand {
  major: MajorsResponse;
}

interface CourseExpand {
  course: CoursesResponse;
}

interface UsersData {
  currentUser: UsersResponse<MajorExpand>;
  courseList: ListResult<CoursesResponse>;
  coursesClassInfoList: ListResult<ClassesInformationResponse<CourseExpand>>[];
  majorName: MajorsResponse;
  classInfo: ClassesInformationResponse<CourseExpand>[];
  pbAuthCookie: string;
}

function PersonalInformation({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dataParse = SuperJSON.parse<UsersData>(data);
  const { pbClient } = usePBClient(dataParse.pbAuthCookie);

  const currentUser = dataParse.currentUser;
  const majorName = currentUser.expand?.major as MajorsResponse;
  const courseList = dataParse.courseList as ListResult<CoursesResponse>;
  const coursesClassInfoList = dataParse.coursesClassInfoList;
  const classInfo = dataParse.classInfo;

  const headerTableElement = [
    "Credits",
    "Year",
    "Semester",
    "Elective",
    "Status",
  ];
  const personalInformation = [
    "Name",
    "Student ID",
    "Major",
    // "Department",
    "Email",
  ];
  const completedNumbers = [
    "Subjects Completed",
    "Credits Completed",
  ];
  // const curriculum = dataParse.curriculumList as ListResult<CurriculumsResponse>
  // curriculum.map(itemCur => itemCur.items.map(item => console.log(item.content)))

  const totalSubjectCompleted = coursesClassInfoList.filter(
    (classInfoList) => classInfoList.items[0]?.isCompleted
  );
  const [totalSubjectComplete, setTotalComplete] = useState(
    totalSubjectCompleted.length
  );

  const totalCreditCompleted = totalSubjectCompleted.reduce(
    (partialSum, sum) =>
      partialSum + (sum.items[0]?.expand?.course.credit ?? 0),
    0
  );
  const [totalCreditComplete, setTotalCreditComplete] =
    useState(totalCreditCompleted);

  return (
    <>
      <main className="bg-slate-200 p-8 px-[8vw]">

        <article className="mb-8 rounded-lg bg-white px-8 py-8">
          <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
            Personal Information
          </h2>
          <div className="flex">
            <div className="mb-4 flex w-2/12 flex-col">
              {personalInformation.map((personalInfo, index) => (
                <p
                  key={index}
                  className="whitespace-nowrap text-lg font-regular leading-8 text-gray-600"
                >
                  {personalInfo}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                {currentUser.last_name} {currentUser.first_name}
              </p>
              <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                {currentUser.studentID}
              </p>
              <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                {majorName?.name}
              </p>
              {/* <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                Department
              </p> */}
              <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-y-7 whitespace-nowrap rounded bg-white">
            <a
              className="mb-8 flex items-center rounded border border-gray-300 px-10 py-3 font-bold text-sky-600"
              href="#"
            >
              Change password
            </a>
          </div>
          <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
            Curriculum
          </h2>

          <div className="flex">
            <div className="mb-4 flex w-2/12 flex-col">
              {completedNumbers.map((completedNumberTitle, index) => (
                <p
                  key={index}
                  className="whitespace-nowrap text-lg font-regular leading-8 text-gray-600"
                >
                  {completedNumberTitle}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                {totalSubjectComplete}
              </p>
              <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
                {totalCreditComplete}/150
              </p>
            </div>
          </div>


          <div>
            <CurriculumTable
              pbClient={pbClient}
              classInfo={classInfo}
            ></CurriculumTable>
          </div>

          {/* <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_2fr] gap-x-0 gap-y-0 bg-sky-600">
            <p className="font-regular min-w-fit whitespace-nowrap px-2 py-2 text-lg leading-8 text-white">
              &nbsp;
            </p>
            <div className="">
              <p className="font-regular min-w-fit whitespace-nowrap px-2 py-2 text-lg leading-8 text-white">
                Subject Name
              </p>
            </div>
            {headerTableElement.map((items, index) => {
              return (
                <p
                  key={index}
                  className="font-regular whitespace-nowrap px-2 py-2 text-center text-lg leading-8 text-white"
                >
                  {items}
                </p>
              );
            })}
          </div> */}

          <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_2fr] gap-x-0 gap-y-0">
            {/* {coursesClassInfoList.map((classInfoList, index) => {
              return (
                <>
                  <p
                    className={`font-regular whitespace-nowrap py-2 px-2 text-center ${index % 2 !== 0 && "bg-slate-50"
                      } text-lg leading-8 text-gray-800`}
                  >
                    {index + 1}
                  </p>
                  <TableRow
                    key={index}
                    data={{
                      index: index,
                      subjectName:
                        classInfoList.items[0]?.expand?.course.name,
                      subjectCredit:
                        classInfoList.items[0]?.expand?.course.credit,
                      subjectYear:
                        classInfoList.items[0]?.expand?.course.yearCurri,
                      subjectSem:
                        classInfoList.items[0]?.expand?.course.semesterCurri,
                      isElective:
                        classInfoList.items[0]?.expand?.course.isElective,
                      isComplete:
                        classInfoList.items[0]?.isCompleted,
                    }}
                  />
                </>
              );
            })} */}

            {/* {courseList &&
              courseList.items.map((course, index) => {
                return (
                  <>
                    <p
                      key={index + "index"}
                      className={`font-regular whitespace-nowrap px-2 py-2 text-center ${index % 2 !== 0 && "bg-slate-50"
                        } text-lg leading-8 text-gray-800`}
                    >
                      {index + 1}
                    </p>
                    <TableRow
                      key={index}
                      index={index}
                      subjectId={course.id}
                      subjectName={course.name}
                      subjectCredit={course.credit}
                      subjectYear={course.yearCurri}
                      subjectSem={course.semesterCurri}
                      isElective={course.isElective}
                      isComplete={
                        coursesClassInfoList[index]?.items[0]?.isCompleted
                      }
                    />
                  </>
                );
              })} */}
          </div>
          <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
            Graduation needs
          </h2>
          <div className="mb-6 grid grid-cols-[2fr_3fr] gap-x-0 gap-y-0">
            <div className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
              Annual Political Education - Entry
            </div>
            <div className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
              {currentUser.shcd_dk === true ? (
                <p className="text-green-500">Complete</p>
              ) : (
                <p className="text-orange-300">Incomplete</p>
              )}
            </div>
            <div className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
              Annual Political Education - Middle 1
            </div>
            <div className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
              {currentUser.shcd_gk1 === true ? (
                <p className="text-green-500">Complete</p>
              ) : (
                <p className="text-orange-300">Incomplete</p>
              )}
            </div>

            <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
              Annual Political Education - Middle 2
            </p>
            <div className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
              {currentUser.shcd_gk2 === true ? (
                <p className="text-green-500">Complete</p>
              ) : (
                <p className="text-orange-300">Not Complete</p>
              )}
            </div>

            <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
              Annual Political Education - Final
            </p>
            <div className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
              {currentUser.shcd_ck === true ? (
                <p className="text-green-500">Complete</p>
              ) : (
                <p className="text-orange-300">Not Complete</p>
              )}
            </div>
            <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
              English Certificate
            </p>
            <div className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
              {currentUser.englishCertificate === true ? (
                <p className="text-green-500">Complete</p>
              ) : (
                <p className="text-orange-300">Not Complete</p>
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const pbServer = await getPBServer(req, res);
  const user = pbServer.authStore.model as unknown as UsersResponse;

  await initClasses(pbServer, user);

  const courseList = await pbServer
    .collection(Collections.Courses)
    .getList<CoursesResponse>(1, 50, {
      filter: `major.id?="${user.major}"`,
      expand: "major",
      sort: "yearCurri,semesterCurri",
    });

  const classInfo = await pbServer
    .collection(Collections.ClassesInformation)
    .getFullList<ClassesInformationResponse<CourseExpand>>(undefined, {
      expand: "course",
      filter: `student.id = "${user.id}"`,
      sort: "course.yearCurri",
    });

  const majorName = await pbServer
    .collection(Collections.Majors)
    .getFirstListItem<MajorsResponse>(`id="${user.major}"`, {
      filter: `id="${user.major}"`,
    });

  const currentUser = await pbServer
    .collection(Collections.Users)
    .getFirstListItem<UsersResponse<MajorExpand>>(`id="${user.id}"`, {
      expand: "major",
    });

  let coursesClassInfoList = await Promise.all(
    courseList.items.map((item) =>
      pbServer
        .collection(Collections.ClassesInformation)
        .getList<ClassesInformationResponse<CourseExpand>>(1, 50, {
          filter: `course.id="${item.id}" && student.id="${user.id}"`,
          expand: "course",
          $autoCancel: false,
        })
    )
  );

  coursesClassInfoList = coursesClassInfoList.filter(
    (coursesClassInfo) => coursesClassInfo.totalItems > 0
  );
  return {
    props: {
      data: SuperJSON.stringify({
        currentUser,
        majorName,
        courseList,
        classInfo,
        coursesClassInfoList,
        pbAuthCookie: pbServer.authStore.exportToCookie(),
      } as UsersData),
    },
  };
};

PersonalInformation.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default PersonalInformation;
