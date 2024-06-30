import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const QuadrantSection = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  gap: "20px",
  position: "relative",
  overflow: "hidden",
});

export const LoadingContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Quadrant = styled("div")<{ expanded?: boolean }>(
  ({ expanded }) => ({
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    padding: "20px",
    minHeight: "300px",
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto 1fr 1fr auto",
    gap: "10px",
    ...(expanded && {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto 1fr 1fr 1fr auto",
    }),
  })
);

export const QuadrantStock = styled("div")<{ expanded?: boolean }>(
  ({ expanded }) => ({
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "11fr 6fr",
    position: "relative",
    minHeight: "300px",
    gridTemplateRows: expanded ? "auto 1fr 1fr auto" : "auto 1fr auto",
    gap: "10px",
    ...(expanded && {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto 1fr 1fr 1fr auto",
    }),
  })
);

export const FinancialCard = styled("div")<{ expanded?: boolean }>(() => ({
  backgroundColor: "#333333",
  borderRadius: "8px",
  padding: "15px",
}));

export const GraphPlaceholder = styled("div")({
  backgroundColor: "#3a3a3a",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  height: "100%",
});

export const QuadrantButton = styled(Button)`
  && {
    background-color: #2a2a2a;
    color: white;
    text-transform: none;
    border-radius: 5px;
    outline: none;
    padding: 5px 20px;
    font-size: 16px;
    transition: background-color 1s;
    border: "1px solid #5882be";

    &:hover {
      background-color: #3a3a3a;
    }
  }
`;
