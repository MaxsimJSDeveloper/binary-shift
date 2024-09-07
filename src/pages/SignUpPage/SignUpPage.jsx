import SignUp from "../../components/SignUp/SignUp";
import css from "./SignUpPage.module.css";

function SignUpPage() {
  return (
    <div className={css.background}>
      <div className={css.wrap}>
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
