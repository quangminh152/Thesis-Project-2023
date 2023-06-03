import React from "react";
import type { SchedulesResponse } from "server-lms";

interface IRowProps {
  index: number;
  session: number;
  content: string | undefined;
}
function LabRow({ index, session, content }: IRowProps) {
  return (
    <>
      <div className={`${index % 2 !== 0 && "bg-slate-50"}`}>
        <p className="font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-black">
          Lab {session}
        </p>
      </div>
      <div className={`${index % 2 !== 0 && "bg-slate-50"}`}>
        <p className="font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-black">
          {content}
        </p>
      </div>
      {/* <div className={`${index % 2 !== 0 && "bg-slate-50"}`}>
          <p className="font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-black">
            {classMaterial ? (
              <a
                href={`data:application/pdf;base64,{slideData}`}
                download={`slide.pdf`}
              >
                slide.pdf
              </a>
            ) : (
              <form>
                <label
                  className="cursor-pointer rounded-md border px-4 py-2"
                  htmlFor="file-upload"
                >
                  Upload
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  name="file-upload"
                  required
                />
              </form>
            )}
          </p>
        </div> */}
      {/* <div className={`${index % 2 !== 0 && "bg-slate-50"}`}>
        <div className="font-regular min-w-fit whitespace-nowrap py-2 pl-4 pr-4 text-center text-lg leading-8 text-black">
          {studentNote ? (
            <a
              href={`data:application/pdf;base64,{slideData}`}
              download={`slide.pdf`}
            >
              slide.pdf
            </a>
          ) : (
            <form>
              <label
                className="cursor-pointer rounded-md border px-4 py-2"
                htmlFor="file-upload"
              >
                Upload
              </label>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                name="file-upload"
                required
              />
            </form>
          )}
        </div>
      </div> */}
    </>
  );
}

export default LabRow;
