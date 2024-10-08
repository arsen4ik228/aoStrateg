import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";

// Создание кастомного компонента Checkbox с измененными стилями
const CustomCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "#005475", // Голубая галочка
  },
  "&.MuiCheckbox-root": {
    backgroundColor: "white", // Белый фон
    borderColor: "blue", // Синяя обводка
  },
  "&:hover": {
    borderColor: "blue", // Синяя обводка при наведении
  },
});

export default function CustomStyledCheckbox({ checked, onChange, disabled}) {
  return (
    <CustomCheckbox
    checked={checked}
    onChange={onChange}
    disabled={disabled}
    />
  );
}
