import React from "react";
import { StyledButton } from "../constants/dropdown";
import { StyledListbox } from "../constants/dropdown";
import { StyledPopper } from "../constants/dropdown";

import { Select, selectClasses } from "@mui/base/Select";

export const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

