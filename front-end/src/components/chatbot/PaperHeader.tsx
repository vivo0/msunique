interface PaperHeaderProps {
  logo: string;
  color: string;
}

const PaperHeader = ({ logo, color }: PaperHeaderProps) => {
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: color,
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
        padding: "15px 20px 15px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={logo}
          alt={""}
          style={{
            width: "50px",
            borderRadius: "50%",
          }}
        />
        <div
          style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center" }}
        >
          F<span style={{ color: "#e33900" }}>AI</span>
          nalyst - Chatbot
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
};

export default PaperHeader;
