import { Link } from "react-router-dom";

export default function RedirectPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Sorry page is not available!</p>
      <p>
        Please go to{" "}
        <Link to="/home" style={{ color: "#407bff" }}>
          Home page
        </Link>
        !
      </p>
    </div>
  );
}
