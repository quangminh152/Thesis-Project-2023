import React from "react";

type ButtonTypes = {
  buttonName: string;
  stylesOverride: string;
  onClick: () => void;
};
function ButtonCustom({ buttonName, onClick, stylesOverride }: ButtonTypes) {
  return (
    <button className={stylesOverride} onClick={onClick}>
      {buttonName}
    </button>
  );
}

export default ButtonCustom;
