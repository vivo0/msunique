import { styled } from "@mui/material/styles";
import { Autocomplete, Button } from "@mui/material";

export const StyledAutocomplete = styled(Autocomplete)({
  flex: 1,
  "& .MuiAutocomplete-inputRoot": {
    background: "#333333",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    padding: "5px 10px",
    "& .MuiChip-root": {
      background: "#444444",
      color: "white",
    },
    "& .MuiChip-label": {
      color: "white",
    },
    "& .MuiChip-deleteIcon": {
      color: "white",
      "&:hover": {
        color: "white",
        backgroundColor: "#555555",
      },
    },
    "& ::placeholder": {
      color: "#999999",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiAutocomplete-endAdornment": {
    color: "white",
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
  "& .MuiAutocomplete-paper": {
    backgroundColor: "#2a2a2a",
  },
  "& .MuiAutocomplete-listbox": {
    padding: 0,
    margin: 0,
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "white",
    "&:hover": {
      background: "transparent",
    },
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "white",
    "&:hover": {
      background: "transparent",
    },
  },
});
export const ButtonContainer = styled("div")({
  display: "flex",
  gap: "10px",
});
export const ResetFilterButton = styled(Button)`
  && {
    background-color: #2a2a2a;
    color: #5882be;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 5px 16px;
    text-transform: uppercase;
    font-size: 16px;
    transition: background-color 1s;
    margin-left: 10px;

    &:hover {
      background-color: #3a3a3a;
    }
  }
`;
export const FilterWrapper = styled("div")({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#1e1e1e",
  padding: "20px",
  paddingBottom: "10px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});
export const FilterContainer = styled("div")({
  display: "flex",
  gap: "15px",
  alignItems: "center",
});

export const OptionStyle = styled("li")({
  color: "white !important",
  backgroundColor: "#a2a2a !important",
  "&:hover, &.Mui-focused": {
    backgroundColor: "#3a3a3a !important",
  },
});

export const InsightButton = styled(Button)`
  && {
    background-color: #2a2a2a;
    color: white;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 5px 16px;
    text-transform: none;
    font-size: 14px;
    transition: background-color 0.3s;
    margin-right: 10px;

    &:hover {
      background-color: #3a3a3a;
    }
  }
`;
