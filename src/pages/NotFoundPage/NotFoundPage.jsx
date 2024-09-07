import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Sorry page is not found!</p>
      <p>
        Please go to{" "}
        <Link to="/" style={{ color: "#407bff" }}>
          Home page
        </Link>
        !
      </p>
    </div>
  );
}
