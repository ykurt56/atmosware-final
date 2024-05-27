import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-brand-100">
      <div></div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};

          if (!values.email) {
            errors.email = "Email alanı zorunludur";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Geçerli bir email adresi girin";
          }

          if (!values.password) {
            errors.password = "Şifre alanı zorunludur";
          } else if (values.password.length < 8) {
            errors.password = "Şifre en az 8 karakter olmalıdır";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Giriş Yap
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
