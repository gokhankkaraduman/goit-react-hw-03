import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './SearchBox.module.css';
import { FaSearch } from "react-icons/fa";


function SearchBox ({handleChange}) {
    const searchId = useId();

    
    return (
        <Formik
        initialValues="">
            <Form 
                className={css.from}>
                <div className={css.wrapper}>
                    <label htmlFor={searchId} className={css.label}><span className={css.icon}><FaSearch /></span> Search</label>
                    <Field 
                    type="text"
                    id={searchId}
                    name="search"
                    placeholder=" Please start typing to find contacts..."
                    className={css.field}
                    onChange={(e) => {handleChange(e.target.value)}}
                    />
                </div>
            </Form>
        </Formik>
    )
}
export default SearchBox;