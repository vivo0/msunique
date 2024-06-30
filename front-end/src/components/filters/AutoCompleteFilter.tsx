import React from "react";
import { TextField, AutocompleteProps, Chip } from "@mui/material";
import { StyledAutocomplete, OptionStyle } from "./FilterStyles";

interface AutocompleteFilterProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}

const AutocompleteFilter: React.FC<AutocompleteFilterProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const renderOption: AutocompleteProps<
    string,
    true,
    false,
    false
  >["renderOption"] = (props, option, state) => {
    const { key, ...other } = props;
    return (
      <OptionStyle
        key={key}
        {...other}
        style={{
          backgroundColor: state.selected ? "#3a3a3a" : "#2a2a2a",
          marginTop: "-10px",
          marginBottom: "-10px",
          padding: "15px",
        }}
      >
        {option}
      </OptionStyle>
    );
  };

  return (
    <StyledAutocomplete
      multiple
      options={options}
      value={value}
      onChange={(_event, newValue) => {
        if (Array.isArray(newValue) && newValue.length <= 2) {
          onChange(newValue as string[]);
        }
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option as React.ReactNode}
            {...getTagProps({ index })}
            style={{
              backgroundColor: "#444444",
              color: "white",
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={value.length === 0 ? placeholder : ""}
        />
      )}
      //@ts-expect-error - renderOption is not a valid prop
      renderOption={renderOption}
    />
  );
};

export default AutocompleteFilter;
