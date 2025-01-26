    import { useId } from 'react';
    import { Formik, Form, Field, ErrorMessage } from 'formik';
    import css from './ContactForm.module.css';
    import * as Yup from "yup";
    import { nanoid } from "nanoid";
    import { FaUserPlus, FaUser, FaPlusCircle,FaPhoneAlt } from "react-icons/fa";

    // Initial form values
    const initialValues = {
    username: '',
    phone: ''
    };

    // Validation schema using Yup
    const contactSchema = Yup.object().shape({
    username: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters long')
        .max(20, 'Name must be less than 20 characters'),
    phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        
    });

    
    function ContactForm({onSubmit}) {
    // Form submit handler
    const handleSubmit = (values,actions) => {
        const id = nanoid();
        onSubmit({...values, id});
        actions.resetForm();
    };

    const usernameId = useId();
    const numberId = useId();

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
        >
        
        <Form className={css.form}>
            <div className={css.fieldcontainer}>
            <h2 className={css.title}><span><FaUserPlus className={css.icon} /></span>Add Contact</h2>
            <label htmlFor={usernameId} className={css.label}><span classame={css.fieldicon}><FaPhoneAlt /></span> Name</label>
            <Field
                type="text"
                id={usernameId}
                name="username"
                placeholder="Please Enter Name"
                className={css.field}
                
            />
            {/* ErrorMessage for username */}
            <ErrorMessage name="username" component="span" className={css.error} />
            </div>

            <div className={css.fieldcontainer}>
            <label htmlFor={numberId} className={css.label}><span className={css.fieldicon}><FaUser /></span> Phone Number</label>
            <Field
                type="text"
                id={numberId}
                name="phone"
                placeholder="Please Enter Phone Number"
                className={css.field}
            />
            {/* ErrorMessage for phone */}
            <ErrorMessage name="phone" component="span" className={css.error} />
            </div>

            <button type="submit" className={css.button}>Add Contact <FaPlusCircle className={css.icon} /></button>
        </Form>
    </Formik>
    );
    }

    export default ContactForm;
