import * as React from "react";
import PropTypes from "prop-types";
import { StyledOption } from "../constants/dropdown";
import { CustomSelect } from "./CustomSelect";
import "../index.css";

const Dropdown = ({ organisation, organisationChoices, setOrganisation }) => {
  return (
    <div>
      <CustomSelect
        sx={{ height: "53px" }}
        value={organisation}
        onChange={(_, newValue) => setOrganisation(newValue)}
      >
        <StyledOption defaultValue="Organisation" value="Organisation">
          Organisation
        </StyledOption>
        {organisationChoices.map((choice) => (
          <StyledOption key={choice.org_name} value={choice.id}>
            {choice.org_name}
          </StyledOption>
        ))}
      </CustomSelect>
    </div>
  );
};

Dropdown.propTypes = {
  organisation: PropTypes.number.isRequired,
  organisationChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
  setOrganisation: PropTypes.func.isRequired,
};

export default Dropdown;

