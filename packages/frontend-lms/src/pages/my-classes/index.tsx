import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ListResult } from "pocketbase";
import { useState } from "react";
import type {
  ClassesInformationResponse,
  CoursesResponse,
  UsersResponse,
} from "server-lms";
import { Collections } from "server-lms";
import SuperJSON from "superjson";
import MainLayout from "../../components/layouts";
import type { User } from "../../contexts/AuthContextProvider";
import { getPBServer } from "../../lib/pb_server";
import ClassSemester from "./components/ClassSemester";
// const { chromium } = require('playwright');


interface CourseExpand {
  course: CoursesResponse;
}

interface UsersData {
  users: ListResult<UsersResponse>;
  courseList: ListResult<CoursesResponse>;
  classInfo: ClassesInformationResponse<CourseExpand>[];
}

function MyClasses({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dataParse = SuperJSON.parse<UsersData>(data);

  // const { username, last_name, first_name, studentID } =
  //   currentUser && currentUser;
  // const major = currentUser.expand?.major as MajorsResponse;
  // const courseList = dataParse?.courseList as ListResult<CoursesResponse>;
  const allClassInfo = dataParse.classInfo;
  const [classInfo, setClassInfo] = useState(dataParse.classInfo);
  // classList.map((classInfo: any, index: any) => {
  //   console.log(classInfo.items);
  // });
  // console.log(classList)
  return (
    <>
      <main className="h-screen bg-slate-200 p-8 px-[8vw] py-11">
        <article className="mb-8 rounded-lg bg-white px-8 py-8">
          <div className="mb-6 flex justify-between border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
            <h2>My classes</h2>
            <select
              onChange={(e) => {
                setClassInfo(
                  allClassInfo.filter((classInfo) => {
                    if (e.currentTarget.value == "all") return true;
                    return classInfo.semesterStudy == e.currentTarget.value;
                  })
                );
              }}
            >
              <option value="all">All Semesters</option>
              <option>Year 1 - Semester 1</option>
              <option>Year 1 - Semester 2</option>
              <option>Year 2 - Semester 1</option>
              <option>Year 2 - Semester 2</option>
              <option>Year 3 - Semester 1</option>
              <option>Year 3 - Semester 2</option>
              <option>Year 4 - Semester 1</option>
              <option>Year 4 - Semester 2</option>
            </select>
          </div>

          <ClassSemester classInfo={classInfo} />
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
  const user = pbServer.authStore.model as User;

  // (async () => {
  //   const browser = await chromium.launch();
  //   const page = await browser.newPage();
  //   await page.goto('https://edusoftweb.hcmiu.edu.vn/default.aspx?page=danhsachthongtin&type=0');
  //   const links = await page.$$('a');
  //   var results = {}
  //   for (const link of links) {
  //     const innerText: string = await link.innerText();
  //     const href: string = await link.href;
  //     results[href] = innerText;
  //   }
  //   console.log(JSON.stringify(results));
  //   await browser.close();
  // })();

  const courseList = await pbServer
    .collection(Collections.Courses)
    .getList<CoursesResponse>(1, 50, {
      filter: `major.id?="${user.major}"`,
    });

  const classInfo = await pbServer
    .collection(Collections.ClassesInformation)
    .getFullList<ClassesInformationResponse<CourseExpand>>(undefined, {
      expand: "course",
      filter: `student.id = "${user.id}"`,
      sort: "course.yearCurri",
    });

  const users = await pbServer
    .collection(Collections.Users)
    .getList<UsersResponse>(1, 50, {
      expand: "major",
    });

  return {
    props: {
      data: SuperJSON.stringify({
        users,
        courseList,
        classInfo,
      } as UsersData),
    },
  };
};

MyClasses.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MyClasses;
