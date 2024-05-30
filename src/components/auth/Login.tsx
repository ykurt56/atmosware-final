import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/userApi";
import { useNavigate } from "react-router-dom";

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
      toast.success(`Başarıyla giriş yaptınız, hoş geldiniz ${user.email}!`);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("User_ID", user.id);
      localStorage.setItem("userName", user.name);
      navigate("/");
      window.location.reload();
      // Giriş başarılı olduğunda doğrudan ana sayfaya yönlendir
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-brand-100">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = "Email alanı boş bırakılamaz";
          }
          if (!values.password) {
            errors.password = "Şifre alanı boş bırakılamaz";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
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
                Şifre
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
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isSubmitting || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Login;
