import Contact from '../Contact/Contact'
import css from './ContactList.module.css'

function ContactList({contacts, onDelete}) {

    return (
        <ul className={css.list}>
            {contacts.map((contact) => (         
                <li key={contact.id} className={css.item}>
                    <Contact contact={contact} onDelete={onDelete} />
                </li>
                ))}
        </ul>
    );
}

export default ContactList;