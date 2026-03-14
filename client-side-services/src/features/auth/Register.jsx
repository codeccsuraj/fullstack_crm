import React from "react";
import { data, Link } from "react-router-dom";
import { useFormik } from "formik";
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'
import CheckBox from '../../components/form/CheckBox'
import * as Yup from "yup";
import { useRegisterMutation } from "../../store/api/authApi";

const Register = () => {
  const [register, { isLoading, isError }] = useRegisterMutation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),

    password: Yup.string()
      .min(4, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const result = await register(values).unwrap();

        console.log("object", result)
      } catch (error) {
        console.error("Error occurred in adding user", error);
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* Left Image */}
        <div className="col-md-8 d-none d-md-block p-0">
          <img
            src="https://images.pexels.com/photos/7174683/pexels-photo-7174683.jpeg"
            alt="Register visual"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-4 d-flex align-items-center justify-content-center bg-secondary-subtle">
          <div className="w-75">

            <p className="h4 text-center">Create your account</p>
            <p className="h6 text-center mb-2">
              provide below details to sign up
            </p>

            <form onSubmit={formik.handleSubmit} className="mt-4">

              <div className="mb-2">
                <label htmlFor="name" className="form-label">Name</label>
                <TextInput
                  type="text"
                  label="Full name"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger">{formik.errors.name}</small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="form-label">Email</label>
                <TextInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="mobile" className="form-label">Mobile number</label>
                <TextInput
                  type="text"
                  label="Phone"
                  name="mobile"
                  placeholder="Enter your mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <small className="text-danger">{formik.errors.mobile}</small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <TextInput
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">{formik.errors.password}</small>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">

                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              <div className="mt-4">
                <ButtonInput
                  type="submit"
                  label="Register"
                  className="btn-sm btn-dark w-100"
                  loading={isLoading}
                />
              </div>

            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;