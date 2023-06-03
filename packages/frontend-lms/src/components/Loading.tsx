import type { CSSProperties } from "react";
import {
  ScaleLoader
} from "react-spinners";

const Loading = () => {
  const override: CSSProperties = {
    position: "relative",
    top: "15rem",
    right: 0,
    left: "50%",
    fontSize: 150,
    margin: "auto",
  };
  return (
    <div className="fixed	z-50 top-0 left-0 bg-slate-200/80 w-full h-full">
      <ScaleLoader
        color={"#1C9ACC"}
        loading={true}
        cssOverride={override}
        // size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
