import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import css from "./SignIn.module.css";

// import login from

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(5, "Too short").max(18, "Too long").required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <h2 className={css.heading}>Sign In</h2>

        <div className={css.fieldStyle}>
          <label className={css.label}>
            Enter your email
            <Field type="email" placeholder="Enter your email" name="email" className={css.field} placeholder="E-mail" />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Enter your password
            <Field type="password" placeholder="Enter your password" name="password" className={css.field} placeholder="Password" />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>

          <button type="submit" className={css.btn}>
            Sign In
          </button>
          <button
            type="button"
            className={css.signinLink}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </Form>
    </Formik>
  );
}
