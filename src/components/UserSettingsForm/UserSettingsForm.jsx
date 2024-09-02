import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import { HiArrowUpTray } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { updateUser, uploadPhoto } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import css from "./UserSettingsForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string(),
  // .required('Name is required'),
  email: Yup.string().email("Invalid email address"),
  // .required('Email is required'),
  outdatedPassword: Yup.string(),
  // .required('Outdated password is required'),
  newPassword: Yup.string(),
  // .required('New password is required'),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
  // .required('Please confirm your new password'),
});
//  добавить проверку, чтобы хотя бы одно поле было заполнено перед сабмитом

export default function UserSettingsForm({ user, onClose }) {
  const [showOutdatedpassword, setShowOutdatedpassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();
  const fieldId = useId();

  const initialValues = {
    gender: user?.gender || "woman",
    name: user?.name || "",
    email: user?.email || "",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      await handleUploadPhoto(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleUploadPhoto = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    dispatch(uploadPhoto(formData))
      .unwrap()
      .then(() => {
        toast.success("Photo uploaded successfully!");
      })
      .catch(() => {
        toast.error("Error uploading photo.");
      });
  };

  const handleUpdate = (values, { setSubmitting }) => {
    console.log("Form values:", values);
    const { gender, name, email, outdatedPassword, newPassword } = values;

    dispatch(
      updateUser({
        photo: selectedFile,
        gender,
        name,
        email,
        outdatedPassword,
        newPassword,
      })
    )
      .unwrap()
      .then(() => {
        // console.log('Update result:', result);
        toast.success("Profile updated successfully!");
        onClose();
      })
      .catch(() => {
        // console.error('Error updating profile:', error);
        toast.error("Error updating profile.");
        // console.log('Error result:');
      })
      .finally(() => {
        setSubmitting(false);
        // actions.resetForm();
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting }) => (
          <Form>
            <h3 className={css.photoTitle}>Your photo</h3>
            <div className={css.uploadPhotoWrapper}>
              <div className={css.photoUrlWrapper}>
                {photoPreview ? (
                  <img
                    className={css.photoUrl}
                    // style={{
                    //   width: '80px',
                    //   height: '80px',
                    //   objectFit: 'cover',
                    // }}
                    src={photoPreview}
                    alt="User Photo"
                  />
                ) : (
                  <HiOutlineUserCircle className={css.photoUrl} />
                )}
              </div>
              {/* <img
              src={user?.photo || 'placeholder.jpg'}
              alt="User Photo"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            /> */}
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
                    value="woman"
                  />
                  Woman
                </label>
                <label>
                  <Field type="radio" name="gender" value="man" />
                  Man
                </label>
              </div>
            </div>

            <div className={css.namePart}>
              <label className={css.nameTitle} htmlFor={`${fieldId}-name`}>
                Your name
              </label>
              <Field
                className={css.user_info_input}
                // className={css.user_info_field}
                type="text"
                name="name"
                id={`${fieldId}-name`}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className={css.emailPart}>
              <label className={css.emailTitle} htmlFor={`${fieldId}-email`}>
                E-mail
              </label>
              <Field
                className={css.user_info_input}
                type="email"
                name="email"
                id={`${fieldId}-email`}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className={css.passwordPart}>
              <p className={css.passwordTitle}>Password</p>
              <div className={css.password_label_wrapper}>
                <label htmlFor={`${fieldId}-outdatedPassword`}>
                  Outdated password:
                  <div className={css.password_form_input_wrapper}>
                    <Field
                      className={css.user_info_input}
                      type={showOutdatedpassword ? "text" : "password"}
                      name="outdatedPassword"
                      id={`${fieldId}-outdatedPassword`}
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
                        <HiOutlineEyeOff className={css.user_form_input_icon} />
                      )}
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="outdatedPassword"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor={`${fieldId}-newPassword`}>
                  New Password:
                  <div className={css.password_form_input_wrapper}>
                    <Field
                      className={css.user_info_input}
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
                        <HiOutlineEyeOff className={css.user_form_input_icon} />
                      )}
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor={`${fieldId}-repeatNewPassword`}>
                  Repeat New Password:
                  <div className={css.password_form_input_wrapper}>
                    <Field
                      className={css.user_info_input}
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
                        <HiOutlineEyeOff className={css.user_form_input_icon} />
                      )}
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="repeatNewPassword"
                  component="div"
                  className="error"
                />
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
