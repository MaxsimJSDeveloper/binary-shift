import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import * as Yup from "yup";
import css from "./SignUp.module.css";

export default function SignUp() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationControl = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  //   const handleSubmit = (values, actions) => {
  //     dispatch(register(values))
  //       .unwrap()
  //       .then((data) => {
  //         toast.success("Registration successful!");
  //         console.log(data);
  //         navigate("/signin");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Registration failed");
  //       });

  //     actions.resetForm();
  //   };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationControl}
      //   onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <h2 className={css.heading}>Sign Up</h2>
        <div className={css.fieldStyle}>
          <label className={css.label}>
            Enter your email
            <Field
              type="email"
              placeholder="Email"
              name="email"
              className={css.field}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Enter your password
            <Field
              type="password"
              placeholder="Enter your password"
              name="password"
              className={css.field}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>

          <label className={css.label}>
            Repeat password
            <Field
              type="password"
              placeholder="Repeat password"
              name="confirmPassword"
              className={css.field}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={css.error}
            />
          </label>

          <button type="submit" className={css.btn}>
            Sign Up
          </button>

          <button
            type="button"
            className={css.btn}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      </Form>
    </Formik>
  );
}
