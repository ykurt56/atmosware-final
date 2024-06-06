import React from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import {
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers, registerUser } from "../../services/userApi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name can be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const users = await getUsers();

      // Kullanıcının e-posta adresini kontrol etmek için diziyi döngüyle kontrol ediyoruz
      const emailExists = users.some(
        (user: any) => user.email === values.email
      );

      if (emailExists) {
        toast.error("Email already exists");
        setSubmitting(false);
        return;
      }

      await validationSchema.validate(values, { abortEarly: false });
      await registerUser(values);
      toast.success("Registration completed successfully!");

      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("An error occurred while registering the user:", error);
      toast.error("An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  max-w-xl sm:w-full w-max">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                <FaUserAlt className="inline-block mr-2" />
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                <FaEnvelope className="inline-block mr-2" />
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                <FaLock className="inline-block mr-2" />
                Password
              </label>
              <div className="relative">
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="******************"
                />
                <span
                  className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                <FaLock className="inline-block mr-2" />
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="******************"
                />
                <span
                  className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>

            <div className="items-center justify-between">
              <button
                className={`bg-black hover:bg-brand-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <div>
                <h3 className="text-center pt-3">
                  Already registered? {""}
                  <Link
                    className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                    to="/login"
                  >
                    <b> Sign In </b>
                  </Link>
                </h3>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;
