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
import { registerUser } from "../../services/userApi";
import { object, string } from "zod";
import { Link, useNavigate } from "react-router-dom";

const userSchema = object({
  name: string()
    .min(3, "İsim en az 3 karakter olmalıdır")
    .max(50, "İsim en fazla 50 karakter olmalıdır"),
  email: string().email("Geçerli bir email adresi girin"),
  password: string().min(8, "Şifre en az 8 karakter olmalıdır"),
  confirmPassword: string(),
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
      userSchema.parse(values);
      await registerUser(values);
      toast.success("Kayıt başarıyla tamamlandı!");
      navigate("/login"); // Başarılı kayıt sonrası login sayfasına yönlendirme
    } catch (error) {
      console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
      toast.error("Kayıt sırasında bir hata oluştu.");
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
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                Şifre
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
                Şifre Onay
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
                {isSubmitting ? "Kayıt Olunuyor..." : "Kayıt Ol"}
              </button>
              <div>
                <h3 className="text-center">
                  Zaten kayıtlı mısınız ? {""}
                  <Link
                    className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                    to="/login"
                  >
                    <b> Giriş Yap </b>
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
