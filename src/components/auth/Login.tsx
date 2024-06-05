import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/userApi";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const user = await loginUser(values.email, values.password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("User_ID", user.id);
      localStorage.setItem("userName", user.name);
      if (user.id === "admin") {
        localStorage.setItem("isAdmin", "true");
        toast.success(`Welcome to Admin`);
        setTimeout(() => {
          navigate("/admin");
          window.location.reload();
        }, 2500);
      } else {
        toast.success(`Welcome ${user.name}`);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2500);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center  ">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = "Email field cannot be empty";
          }
          if (!values.password) {
            errors.password = "Password field cannot be empty";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-full max-w-md">
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
                className="text-red-500"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                <FaLock className="inline-block mr-2" />
                Password
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className={`bg-black hover:bg-brand-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                  isSubmitting || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
            <div>
              <h3 className="text-center pt-3">
                Are you not registered?{" "}
                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                  to="/signup"
                >
                  <b> Sign Up </b>
                </Link>
              </h3>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Login;
