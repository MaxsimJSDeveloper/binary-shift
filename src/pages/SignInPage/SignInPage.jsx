import SignIn from "../../components/SignIn/SignIn";
import css from "./SignInPage.module.css";

function SignInPage() {
  return (
    <div className={css.background}>
      <div className={css.wrap}>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
