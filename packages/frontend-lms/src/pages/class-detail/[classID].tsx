import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ListResult } from "pocketbase";
import { useRef, useState } from "react";
import {
  ClassesInformationRecord,
  ClassesInformationResponse,
  ClassesInformationSemesterStudyOptions,
  CoursesResponse,
  GradesRecord,
  GradesResponse,
  ScheduleAttachmentsResponse,
  SchedulesResponse,
} from "server-lms";
import { Collections } from "server-lms";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import ScheduleRow from "./components/ScheduleRow";

import PocketBase from "pocketbase";
import Loading from "src/components/Loading";
import MainLayout from "src/components/layouts";
import ToggleSwitch from "src/components/misc/toggle-switch";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSaveDoc } from "src/hooks/forms/useSaveDoc";

const pb = new PocketBase("http://127.0.0.1:8090");

interface CourseGradeExpand {
  course: CoursesResponse;
  "grades(classesInformation)": GradesResponse[];
}

interface UsersData {
  classInfo: ClassesInformationResponse<CourseGradeExpand>;
  classList?: ListResult<ClassesInformationResponse>[];
  scheduleList: ListResult<SchedulesResponse>;
  scheduleAttachment: ListResult<ScheduleAttachmentsResponse>;
}

function ClassDetail({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dataParse = SuperJSON.parse<UsersData>(data);
  const classInfo = dataParse?.classInfo;
  const scheduleList = dataParse?.scheduleList as ListResult<SchedulesResponse>;
  const grades = classInfo.expand?.["grades(classesInformation)"].at(0);
  // const scheduleAttachment =
  //   dataParse?.scheduleAttachment as ListResult<ScheduleAttachmentsResponse>;

  const headerScheduleTable = ["Syllabus", "Lecture material", "Student notes"];
  const headerLabTable = ["Session", "Lab Assignment", "Lab work"];

  const { register, handleSubmit, watch } = useForm<ClassesInformationRecord>({
    defaultValues: classInfo,
  });

  const onSubmit: SubmitHandler<ClassesInformationRecord> = async (data) => {
    await pb.collection("classesInformation").update(`${classInfo.id}`, data);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  const hasSaved = useSaveDoc({ formRef, submitRef, watch });

  const [isComplete, setIsComplete] = useState(classInfo.isCompleted);
  const [loading, setLoading] = useState(false);

  const handleChangeStatus = async (status: boolean) => {
    try {
      const dataNeedUpdate = {
        ...classInfo,
        isCompleted: status,
        id: classInfo.id,
      };
      setLoading(true);
      await pb
        .collection("classesInformation")
        .update(`${classInfo.id}`, dataNeedUpdate)
        .then(() => {
          setLoading(false);
          setIsComplete(status);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <main className="h-screen bg-slate-200 p-8 px-[8vw]">
      {loading && <Loading />}
      <article className="mb-8 rounded-lg bg-white px-8 py-8">
        <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
          Class Information
        </h2>
        <form
          className="mb-6 grid grid-cols-[1fr_3fr] gap-x-0 gap-y-0"
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="courseName" className="self-center whitespace-nowrap text-lg font-regular text-gray-600">Subject</label>
          <input
            className="input-ghost input !cursor-default !border-white !bg-white text-lg font-bold"
            // <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800"></p>
            id="courseName"
            value={classInfo?.expand?.course.name}
            disabled
          />

          <label htmlFor="lecturerName" className="self-center whitespace-nowrap text-lg font-regular leading-8 text-gray-600">Lecturer</label>
          <input
            className="input-ghost input text-lg font-bold leading-8"
            id="lecturerName"
            {...register("lecturerName")}
          />

          <label htmlFor="lecturerMail" className="self-center whitespace-nowrap text-lg font-regular leading-8 text-gray-600">Lecturer Email</label>
          <input
            className="input-ghost input text-lg font-bold leading-8"
            id="lecturerMail"
            {...register("lecturerMail")}
          />

          <label htmlFor="room" className="self-center whitespace-nowrap text-lg font-regular leading-8 text-gray-600">Room</label>
          <input
            className="input-ghost input text-lg font-bold leading-8"
            id="room"
            {...register("room")}
          />

          <label htmlFor="semesterStudy" className="self-center whitespace-nowrap text-lg font-regular leading-8 text-gray-600">Semester Study</label>
          <select
            className="select text-lg font-bold leading-8"
            id="semesterStudy"
            {...register("semesterStudy")}
          >
            <option disabled selected>
              Pick your semester
            </option>
            {Object.entries(ClassesInformationSemesterStudyOptions).map(
              ([stringValue]) => (
                <option key={stringValue} value={stringValue}>
                  {stringValue}
                </option>
              )
            )}
          </select>

          <label htmlFor="isCompleted" className="self-center whitespace-nowrap text-lg font-regular leading-8 text-gray-600">Status</label>
          <div className="px-4 py-2 content-center">
            <input
              id="isCompleted"
              type="checkbox"
              className="toggle toggle-success content-center"
              {...register("isCompleted")}
            />
          </div>


          <input ref={submitRef} className="hidden" type="submit" />
        </form>

        <p>{hasSaved ? "SAVED" : "NEED TO SAVE"}</p>


        {/* <div className="mb-6 grid grid-cols-[1fr_3fr] gap-x-0 gap-y-0">
          <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
            Subject
          </p>
          <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
            {classInfo?.expand?.course.name}
          </p>

          <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
            Lecturer
          </p>
          <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
            {classInfo.lecturerName}
          </p>

          <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
            Email Address
          </p>
          <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
            {classInfo.lecturerMail}
          </p>

          <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
            Semester
          </p>
          <p className="whitespace-nowrap text-lg font-bold leading-8 text-gray-800">
            {classInfo.semesterStudy}
          </p>

          <p className="whitespace-nowrap text-lg font-semibold leading-8 text-gray-600">
            Status
          </p>

          {isComplete ? (
            <ToggleSwitch
              onClick={() => handleChangeStatus(!isComplete)}
              titleSwitch="Complete"
              isComplete={isComplete}
            />
          ) : (
            <ToggleSwitch
              onClick={() => handleChangeStatus(!isComplete)}
              titleSwitch="Incomplete"
              isComplete={isComplete}
            />
          )}
        </div> */}
        {/* Teaching Schedule */}
        <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
          Teaching schedule
        </h2>

        <div className="grid grid-cols-[1fr_2fr_2fr_2fr] gap-x-0 gap-y-0 bg-sky-600">
          <div className="">
            <p className="font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-white">
              Lecture
            </p>
          </div>

          {headerScheduleTable.map((items, index) => {
            return (
              <p
                key={index}
                className="font-regular whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-white"
              >
                {items}
              </p>
            );
          })}
        </div>
        <div className="grid grid-cols-[1fr_2fr_2fr_2fr] gap-x-0 gap-y-0 mb-6">
          {scheduleList.items.map((scheduleList, index) => {
            return (
              <ScheduleRow
                key={index}
                index={index}
                session={scheduleList.session}
                content={scheduleList.content}
              />
            );
          })}
        </div>

        {/* Lab
        <div className="grid grid-cols-[1fr_2fr_2fr] gap-x-0 gap-y-0 bg-sky-600">
          {headerLabTable.map((items, index) => {
            return (
              <p
                key={index}
                className="font-regular whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-white"
              >
                {items}
              </p>
            );
          })}
        </div> */}

        {/* Grades */}
        {grades && <GradeTable grades={grades}></GradeTable>}
      </article>
    </main>
  );
}

interface GradeTableProps {
  grades: GradesResponse;
}

function GradeTable({ grades }: GradeTableProps) {
  const headerScoreTable = [
    "In-class",
    "Midterm Exam",
    "Final Exam",
    "Overall (number)",
    "Overall (letter)",
  ];

  const { register, handleSubmit, watch } = useForm<GradesRecord>({
    defaultValues: grades,
  });

  const onSubmit: SubmitHandler<GradesRecord> = async (data) => {
    await pb
      .collection(Collections.Grades)
      .update<GradesResponse>(grades.id, data);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  const hasSaved = useSaveDoc({ formRef, submitRef, watch });

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
        Scores
      </h2>
      <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr] gap-x-0 gap-y-0 bg-sky-600">
        {headerScoreTable.map((items, index) => {
          return (
            <p
              key={index}
              className="font-regular whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-white"
            >
              {items}
            </p>
          );
        })}
      </div>
      <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr] gap-x-0 gap-y-0">
        <input
          {...register("gradeInclass")}
          className="input-ghost input text-lg font-bold leading-8 font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-black"
          // font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-black">
          type="number"
        />
        <input
          {...register("gradeMid")}
          className="input-ghost input text-lg font-bold leading-8 font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-black"
          type="number"
        />
        <input
          {...register("gradeFinal")}
          className="input-ghost input text-lg font-bold leading-8 font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-black"
          type="number"
        />
        <input
          {...register("gradeOverallNumber")}
          className="input-ghost input text-lg font-bold leading-8 font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-black"
          type="number"
        />
        <input
          {...register("gradeOverallLetter")}
          className="input-ghost input text-lg font-bold leading-8 font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-black"
        />
        <p>{hasSaved ? "SAVED" : "NEED TO SAVE"}</p>
      </div>
    </form>
  );
}

export const getServerSideProps = async ({
  req,
  query,
  res,
}: GetServerSidePropsContext) => {
  const pbServer = await getPBServer(req, res);
  const classID = query.classID as string;

  const classInfo = await pbServer
    .collection(Collections.ClassesInformation)
    .getOne<ClassesInformationResponse<CourseGradeExpand>>(classID, {
      expand: "course,grades(classesInformation)",
    });

  const scheduleList = await pbServer
    .collection(Collections.Schedules)
    .getList<SchedulesResponse>(1, 50, {
      filter: `course="${classInfo.course}"`,
    });

  if (classInfo.expand && !classInfo.expand?.["grades(classesInformation)"]) {
    const gradeData: GradesRecord = {
      classesInformation: classInfo.id,
      gradeFinal: 0,
      gradeInclass: 0,
      gradeMid: 0,
      gradeOverallNumber: 0,
      gradeOverallLetter: "F",
    };
    console.log(gradeData);
    const newGrade = await pbServer
      .collection(Collections.Grades)
      .create<GradesResponse>(gradeData);

    classInfo.expand["grades(classesInformation)"] = [newGrade];
  }

  // const grade = await pbServer.collection(Collections.Grades).

  // const scheduleAttachment = await pbServer
  //   .collection(Collections.ScheduleAttachments)
  //   .getList<ScheduleAttachmentsResponse>(1, 50, {
  //     filter: `course="${classInfo.course}"`,
  //   });

  return {
    props: {
      data: SuperJSON.stringify({
        classInfo,
        scheduleList,
        // scheduleAttachment,
      } as UsersData),
    },
  };
};

ClassDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ClassDetail;
