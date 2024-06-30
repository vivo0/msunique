import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")({
  display: "flex",
  background: "#1e1e1e",
  overflow: "hidden",
  padding: "20px",
  width: "100%",
  maxHeight: "86.5vh",
});

export const LeftSection = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  background: "#2a2a2a",
  borderRadius: "8px",
  padding: "0px 20px 0px 0px",
  color: "white",
  width: isOpen ? "25%" : "50px",
  marginRight: !isOpen ? "40px" : "0px",
  display: "flex",
  flexDirection: "column",
  transition: "width 0.3s ease",
  minHeight: "82vh",
  maxHeight: "82vh",
}));

export const SidebarContainer = styled("div")({
  flexGrow: 1,
  display: "flex",
});

export const ContentContainer = styled("div")<{ isOpen: boolean }>(
  ({ isOpen }) => ({
    flexGrow: 1,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
    overflowY: "auto",
    maxHeight: "calc(80vh - 40px)",
    paddingRight: "20px",
    marginRight: "-20px",
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #f1f1f1",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  })
);

export const RightSection = styled("div")<{ isLeftOpen: boolean }>(
  ({ isLeftOpen }) => ({
    display: "flex",
    flexDirection: "column",
    width: isLeftOpen ? "75%" : "calc(100% - 60px)",
    transition: "width 0.3s ease",
    maxHeight: "82vh",
    overflow: "hidden",
  })
);

export const ScrollableContent = styled("div")({
  overflowY: "auto",
  height: "100%",
  padding: "20px",
});

export const ContentHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#313131",
  position: "sticky",
  top: 0,
  zIndex: 1,
  borderBottomRightRadius: "8px",
  padding: "10px 20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const ScoreSection = styled("div")<{ score: number }>(({ score }) => ({
  borderRadius: "8px",
  border: "1px solid #5882be",
  padding: "15px 18px",
  fontWeight: "bold",
  backgroundColor:
    score >= 8
      ? "rgba(0, 128, 0, 0.24)"
      : score >= 5
      ? "rgba(255, 255, 0, 0.14)"
      : "rgba(255, 0, 0, 0.14)",
  marginRight: "10px",
}));
