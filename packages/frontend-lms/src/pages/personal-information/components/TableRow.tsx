import Link from "next/link";
import PocketBase from "pocketbase";
import { useState } from "react";
import ToggleSwitch from "src/components/misc/toggle-switch";

const pb = new PocketBase("http://127.0.0.1:8090");

interface UsersData {
  index: number;
  subjectId: string;
  subjectName: string;
  subjectCredit: number;
  subjectYear: number | undefined;
  subjectSem: number | undefined;
  isElective: boolean | undefined;
  isComplete: boolean | undefined;
}

interface TableRowProps {
  index: number;
  subjectId: string;
  subjectName: string;
  subjectCredit: number;
  subjectYear: number | undefined;
  subjectSem: number | undefined;
  isElective: boolean | undefined;
  isComplete: boolean | undefined;
}

function TableRow({
  index,
  subjectId,
  subjectName,
  subjectCredit,
  subjectYear,
  subjectSem,
  isElective,
  isComplete,
}: TableRowProps) {
  const CLASSES_STYLES = `font-regular ${
    index % 2 !== 0 && "bg-slate-50"
  } whitespace-nowrap py-2 px-2 justify-center text-center text-lg leading-8 text-gray-800`;
  const [toggleComplete, setIsComplete] = useState(isComplete);
  const handleChangeStatus = async (status: boolean) => {
    try {
      const dataNeedUpdate = {
        index,
        subjectId,
        subjectName,
        subjectCredit,
        subjectYear,
        subjectSem,
        isElective,
        isCompleted: status,
        id: subjectId,
      };
      // setLoading(true);
      await pb
        .collection("classesInformation")
        .update(`${subjectId}`, dataNeedUpdate)
        .then(() => {
          // setLoading(false);
          setIsComplete(status);
        });
    } catch (e) {
      // setLoading(false);
      console.log(e);
    }
  };

  return (
    <>
      <div className={` ${index % 2 !== 0 && "bg-slate-50"}`}>
        <Link key={index} href={{ pathname: `class-detail/${subjectId}` }}>
          <div
            className={
              "font-regular min-w-fit whitespace-nowrap py-2 px-2 text-lg leading-8 text-gray-800"
            }
          >
            {subjectName}
          </div>
        </Link>
      </div>
      <div className={CLASSES_STYLES}>{subjectCredit}</div>
      <div className={CLASSES_STYLES}>{subjectYear}</div>
      <div className={CLASSES_STYLES}>{subjectSem}</div>
      <div className={CLASSES_STYLES}>{isElective === true && "x"}</div>
      <div className={CLASSES_STYLES}>
        {toggleComplete ? (
          <ToggleSwitch
            onClick={() => handleChangeStatus(!toggleComplete)}
            titleSwitch="Complete"
            isComplete={toggleComplete}
          />
        ) : (
          <ToggleSwitch
            onClick={() => handleChangeStatus(!toggleComplete)}
            titleSwitch="Incomplete"
            isComplete={toggleComplete}
          />
        )}
      </div>
    </>
  );
}

// export const getServerSideProps = async ({
//   req,
//   query,
//   res,
// }: GetServerSidePropsContext) => {
//   const pbServer = await getPBServer(req, res);
//   const classID = query.classID as string;

//   const classInfo = await pbServer
//     .collection(Collections.ClassesInformation)
//     .getOne<ClassesInformationResponse>(classID, {
//       expand: "course",
//     });

//   return {
//     props: {
//       data: SuperJSON.stringify({
//         classInfo,
//       } as UsersData),
//     },
//   };
// };

export default TableRow;
// function setLoading(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
