import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import { clsx } from "clsx";
import { HiArrowUpTray } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import css from "./UserSettingsForm.module.css";
import { updateUser, updateUserAvatar } from "../../redux/users/operations";
import { selectUser } from "../../redux/users/selectors";

const validationSchema = Yup.object({
  gender: Yup.string().oneOf(["male", "female"]),
  name: Yup.string().max(32, "Too Long!"),
  email: Yup.string().email("Invalid email address"),
  password: Yup.string().min(8, "Too Short!").max(64, "Too Long!"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .max(64, "Too Long!"),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

export default function UserSettingsForm({ onClose }) {
  const user = useSelector(selectUser);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showOutdatedpassword, setShowOutdatedpassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || "");
  const dispatch = useDispatch();
  const fieldId = useId();

  const initialValues = {
    gender: user?.gender || "female",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      await handleUploadPhoto(file);
    } else {
      toast.error("No file selected or file is undefined");
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleUploadPhoto = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(updateUserAvatar(formData))
      .unwrap()
      .then(() => {
        toast.success("Photo uploaded successfully!");
      })
      .catch(() => {
        toast.error("Error uploading photo.");
      });
  };

  const handleUpdate = (values, { setSubmitting }) => {
    const { gender, name, email, password, newPassword } = values;

    if (!name && !email && !password && !newPassword) {
      toast.error("Please fill in at least one field.");
      setSubmitting(false);
      return;
    }

    dispatch(
      updateUser({
        gender,
        name,
        email,
        password,
        newPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
        onClose();
      })
      .catch(() => {
        toast.error("Error updating profile.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h2 className={css.setting_title}>Setting</h2>
            <h3 className={css.photoTitle}>Your photo</h3>
            <div className={css.uploadPhotoWrapper}>
              <div className={css.photoUrlWrapper}>
                {photoPreview ? (
                  <img
                    className={css.photoUrl}
                    src={photoPreview}
                    alt="User Photo"
                  />
                ) : (
                  <HiOutlineUserCircle className={css.photoUrl} />
                )}
              </div>
              <div className={css.uploadPhotoButtonWrapper}>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <HiArrowUpTray className={css.uploadPhotoButtonIcon} />
                <button
                  className={css.uploadPhotoButton}
                  type="button"
                  onClick={handleButtonClick}
                >
                  Upload a photo
                </button>
              </div>
            </div>

            <div className={css.user_info_block_desktop}>
              <div className={css.gender_name_email_desktop}>
                <div className={css.genderPart}>
                  <p className={css.genderTitle}>Your gender identity</p>
                  <div
                    className={css.genderInputsContainer}
                    role="group"
                    aria-labelledby="gender"
                  >
                    <label>
                      <Field
                        className={css.genderText}
                        type="radio"
                        name="gender"
                        value="female"
                      />
                      Woman
                    </label>
                    <label>
                      <Field type="radio" name="gender" value="male" />
                      Man
                    </label>
                  </div>
                </div>

                <div className={css.namePart}>
                  <label className={css.nameTitle} htmlFor={`${fieldId}-name`}>
                    Your name
                  </label>
                  <Field
                    className={clsx(css.user_info_input, {
                      [css["input_error"]]: errors.name && touched.name,
                    })}
                    type="text"
                    name="name"
                    id={`${fieldId}-name`}
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css["error-message"]}
                  />
                </div>

                <div className={css.emailPart}>
                  <label
                    className={css.emailTitle}
                    htmlFor={`${fieldId}-email`}
                  >
                    E-mail
                  </label>
                  <Field
                    className={clsx(css.user_info_input, {
                      [css["input_error"]]: errors.email && touched.email,
                    })}
                    type="email"
                    name="email"
                    id={`${fieldId}-email`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css["error-message"]}
                  />
                </div>
              </div>
              <div className={css.passwordPart}>
                <p className={css.passwordTitle}>Password</p>
                <div className={css.password_label_wrapper}>
                  <label htmlFor={`${fieldId}-password`}>
                    Outdated password:
                    <div className={css.password_form_input_wrapper}>
                      <Field
                        className={clsx(css.user_info_input, {
                          [css["input_error"]]:
                            errors.password && touched.password,
                        })}
                        type={showOutdatedpassword ? "text" : "password"}
                        name="password"
                        id={`${fieldId}-password`}
                        placeholder="Password"
                      />
                      <button
                        className={css.user_form_input_button}
                        type="button"
                        onClick={() =>
                          setShowOutdatedpassword(!showOutdatedpassword)
                        }
                      >
                        {showOutdatedpassword ? (
                          <HiOutlineEye className={css.user_form_input_icon} />
                        ) : (
                          <HiOutlineEyeOff
                            className={css.user_form_input_icon}
                          />
                        )}
                      </button>
                    </div>
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css["error-message"]}
                  />
                </div>

                <div>
                  <label htmlFor={`${fieldId}-newPassword`}>
                    New Password:
                    <div className={css.password_form_input_wrapper}>
                      <Field
                        className={clsx(css.user_info_input, {
                          [css["input_error"]]:
                            errors.newPassword && touched.newPassword,
                        })}
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id={`${fieldId}-newPassword`}
                        placeholder="Password"
                      />
                      <button
                        className={css.user_form_input_button}
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <HiOutlineEye className={css.user_form_input_icon} />
                        ) : (
                          <HiOutlineEyeOff
                            className={css.user_form_input_icon}
                          />
                        )}
                      </button>
                    </div>
                  </label>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className={css["error-message"]}
                  />
                </div>

                <div>
                  <label htmlFor={`${fieldId}-repeatNewPassword`}>
                    Repeat New Password:
                    <div className={css.password_form_input_wrapper}>
                      <Field
                        className={clsx(css.user_info_input, {
                          [css["input_error"]]:
                            errors.repeatNewPassword &&
                            touched.repeatNewPassword,
                        })}
                        type={showRepeatNewPassword ? "text" : "password"}
                        name="repeatNewPassword"
                        id={`${fieldId}-repeatNewPassword`}
                        placeholder="Password"
                      />
                      <button
                        className={css.user_form_input_button}
                        type="button"
                        onClick={() =>
                          setShowRepeatNewPassword(!showRepeatNewPassword)
                        }
                      >
                        {showRepeatNewPassword ? (
                          <HiOutlineEye className={css.user_form_input_icon} />
                        ) : (
                          <HiOutlineEyeOff
                            className={css.user_form_input_icon}
                          />
                        )}
                      </button>
                    </div>
                  </label>
                  <ErrorMessage
                    name="repeatNewPassword"
                    component="div"
                    className={css["error-message"]}
                  />
                </div>
              </div>
            </div>

            <button
              className={css.save_form_submit_btn}
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <Toaster />
      </div>
    </>
  );
}