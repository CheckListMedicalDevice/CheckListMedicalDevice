import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { IUser } from "../../../interfaces/user.interface";
import NavbarDashboard from "../../../components/NavDashboard";
import { axiosInstance } from "../../../axiosRequest";

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  address: string;
  phoneNumber: string;
}


const UserEditPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get<IUser>(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      await axiosInstance.put(`/users/${id}`, values);
      // Show dialog or modal here
      alert("User updated successfully!");
      // Redirect to /users/:id
      window.location.href = `/users/`;
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <NavbarDashboard>
      <Formik
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          username: user?.username || "",
          password: "",
          email: user?.email || "",
          address: user?.address || "",
          phoneNumber: user?.phoneNumber || "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          username: Yup.string().required("Required"),
          password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
          email: Yup.string().email("Invalid email address").required("Required"),
          address: Yup.string().required("Required"),
          phoneNumber: Yup.string().required("Required"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Field name="firstName" type="text" placeholder="First Name" />
          <ErrorMessage name="firstName" component="div" />
          <Field name="lastName" type="text" placeholder="Last Name" />
          <ErrorMessage name="lastName" component="div" />
          <Field name="username" type="text" placeholder="Username" />
          <ErrorMessage name="username" component="div" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <Field name="email" type="email" placeholder="Email Address" />
          <ErrorMessage name="email" component="div" />
          <Field name="address" type="text" placeholder="Address" />
          <ErrorMessage name="address" component="div" />
          <Field name="phoneNumber" type="text" placeholder="Phone Number" />
          <ErrorMessage name="phoneNumber" component="div" />
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      </Formik>
    </NavbarDashboard>
  );
};

export default UserEditPage;
