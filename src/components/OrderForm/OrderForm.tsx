import { useId } from "react";
import css from "./OrderForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "Yup";

interface OrderFormValues {
  userName: string;
  email: string;
  // delivery: string;
  delivery: "pickup" | "courier" | "drone";
  // restrictions: string[];
  restrictions: ("vegan" | "gluten-free" | "nut-free")[];
  // deliveryTime: string;
  deliveryTime: "" | "morning" | "afternoon" | "evening";
  message: string;
}

const INITIAL_VALUES: OrderFormValues = {
  userName: "Dave",
  email: "dave@mail.com",
  delivery: "courier",
  restrictions: [],
  deliveryTime: "",
  message: "",
};

const OrderSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  delivery: Yup.string()
    .oneOf(["pickup", "courier", "drone"], "Delivery is not valid")
    .required("Delivery is required"),
  restrictions: Yup.array().of(
    Yup.string().oneOf(
      ["vegan", "gluten-free", "nut-free"],
      "Restrictions is not valid"
    )
  ),
  deliveryTime: Yup.string()
    .oneOf(["morning", "afternoon", "evening"])
    .required("Delivery time is required"),
  message: Yup.string().max(200, "Too long"),
});

export default function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    formikHelpers: FormikHelpers<OrderFormValues>
  ) => {
    // const username = values.get("userName");
    // console.log({ username });

    console.log("values:", values);
    formikHelpers.resetForm();
  };
  // <form action={handleSubmit} className={css.form}>

  return (
    <Formik
      initialValues={
        // {
        // userName: "Dave",
        // email: "dave@mail.com",
        // delivery: "courier",
        // // restrictions: ["vegan"],
        // restrictions: [],
        // deliveryTime: "",
        // // deliveryTime: "morning",
        // // message: "lorem ipsum",
        // message: "",
        // }
        INITIAL_VALUES
      }
      validationSchema={OrderSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>
          <label htmlFor={`${fieldId}-username`} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="userName"
            id={`${fieldId}-username`}
            className={css.input}
          />
          <ErrorMessage
            name="userName"
            component="span"
            className={css.error}
          />
          <label htmlFor={`${fieldId}-email`} className={css.label}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            className={css.input}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Delivery method</legend>

          <label className={css.option}>
            <Field type="radio" name="delivery" value="pickup" />
            Pickup
          </label>

          <label className={css.option}>
            <Field type="radio" name="delivery" value="courier" />
            Courier
          </label>

          <label className={css.option}>
            <Field type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
          <ErrorMessage
            name="delivery"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Dietary restrictions</legend>

          <label className={css.option}>
            <Field type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>

          <label className={css.option}>
            <Field type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>

          <label className={css.option}>
            <Field type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
          <ErrorMessage
            name="restrictions"
            component="span"
            className={css.error}
          />
        </fieldset>

        <label htmlFor={`${fieldId}-deliveryTime`} className={css.label}>
          Preferred delivery time
        </label>
        <Field
          as="select"
          name="deliveryTime"
          id={`${fieldId}-deliveryTime`}
          className={css.input}
        >
          <option value="" disabled>
            — Choose delivery time —
          </option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </Field>
        <ErrorMessage
          name="deliveryTime"
          component="span"
          className={css.error}
        />

        <label htmlFor={`${fieldId}-message`} className={css.label}>
          Additional message
        </label>
        <Field
          as="textarea"
          name="message"
          rows={4}
          id={`${fieldId}-message`}
          className={css.textarea}
        />
        <ErrorMessage name="message" component="span" className={css.error} />

        <button type="submit" className={css.button}>
          Place order
        </button>
      </Form>
    </Formik>
  );
}
