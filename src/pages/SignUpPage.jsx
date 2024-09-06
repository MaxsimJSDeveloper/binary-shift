import SignUp from "../components/SignUp/SignUp";
import Header from "../components/Header/Header";
import css from "./SignUpPage.module.css";

function SignUpPage() {
  return (
    <div className={css.background}>
      {/* <Header /> */}
      <div className={css.wrap}>
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
