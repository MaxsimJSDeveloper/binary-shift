import SignIn from "../components/SignIn/SignIn";
import Header from "../components/Header/Header";
import css from "./SignInPage.module.css"

function SignInPage() {
  return (
    <div className={css.background}>
      <Header />
      <div className={css.wrap}>
      <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
