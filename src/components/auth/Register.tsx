import React from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { FaUserAlt, FaEnvelope, FaLock, FaLockOpen } from "react-icons/fa";

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

  const validate = (values: RegisterFormValues) => {
    const errors: Partial<RegisterFormValues> = {};

    if (!values.name) {
      errors.name = "İsim alanı zorunludur";
    } else if (values.name.length < 3) {
      errors.name = "İsim en az 3 karakter olmalıdır";
    } else if (values.name.length > 50) {
      errors.name = "İsim en fazla 50 karakter olmalıdır";
    }

    if (!values.email) {
      errors.email = "Email alanı zorunludur";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Geçerli bir email adresi girin";
    }

    if (!values.password) {
      errors.password = "Şifre alanı zorunludur";
    } else if (values.password.length < 8) {
      errors.password = "Şifre en az 8 karakter olmalıdır";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Şifre onay alanı zorunludur";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Şifreler eşleşmiyor";
    }

    return errors;
  };

  const onSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-brand-100">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                <FaUserAlt className="inline-block mr-2" />
                İsim
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="İsim"
              />
              <div className="text-red-500">
                <ErrorMessage name="name" />
              </div>
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
              <div className="text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div className="mb-4">
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
              <div className="text-red-500">
                <ErrorMessage name="password" />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="confirmPassword"
              >
                <FaLockOpen className="inline-block mr-2" />
                Şifre Onay
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="******************"
              />
              <div className="text-red-500">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Kayıt Ol
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
