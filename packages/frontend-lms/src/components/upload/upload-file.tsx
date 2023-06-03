import React from "react";

function UploadFile() {
  return (
    <form>
      <label htmlFor="file-upload">
        <div
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   flexDirection: "column",
          // }}
        >
          <p >Your report</p>
        </div>
      </label>
      <input
        type="file"
        style={{ display: "none" }}
        id="file-upload"
        name="file-upload"
        required
      />
    </form>
  );
}

export default UploadFile;
