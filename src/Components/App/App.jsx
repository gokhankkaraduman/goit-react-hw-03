import { useState } from 'react';
// Style
import './App.css';
// Data
import contactsData from '../../data/contacts.json';
// Components
import ContactForm from '../ContactForm/ContactForm.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ErrorModal from '../ErrorModal/ErrorModal.jsx';
import IsDuplicate from '../isDuplicate/IsDuplicate.jsx';
import { Player } from "@lottiefiles/react-lottie-player";
import PhoneAnimated from './animatedPhone.json'

function App() {
  // Variables
  const savedContacts = JSON.parse(window.localStorage.getItem('Contacts'));

  // State
  const [contacts, setContacts] = useState(() => (savedContacts && savedContacts.length !== 0 ? savedContacts : contactsData));
  const [error, setError] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  // Functions
  const addContact = (contact) => {
    // Aynı isim veya numara var mı diye kontrol et
    const isDuplicate = contacts.some(
      (existingContact) =>
        existingContact.name.toLowerCase() === contact.username.toLowerCase() ||
        existingContact.number === contact.phone
    );

    if (isDuplicate) {
      setDuplicate(true); // Duplicate hata mesajını aktif et
      return; // Kişiyi eklemeyi durdur
    }

    // Yeni kişiyi ekle
    setContacts((prevContacts) => {
      const updatedContacts = [
        ...prevContacts,
        { id: contact.id, name: contact.username, number: contact.phone },
      ];
      window.localStorage.setItem('Contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter((contact) => contact.id !== id);
      // Güncellenmiş listeyi localStorage'e yeniden yaz
      window.localStorage.setItem('Contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

const handleClick = () => {
  setError(false);
  setDuplicate(false); // duplicate hatasını sıfırlayalım
  // Hata veya duplicate durumunda arama sonucunda eski veriye dönmek gerekebilir
  if (savedContacts && savedContacts.length > 0) {
    setContacts(savedContacts); // savedContacts varsa onu kullan
  } else {
    setContacts(contactsData); // savedContacts yoksa, başlangıç verisini kullan
  }
};


  const handleSearch = (searchValue) => {
    console.log('Search Value:', searchValue);

    // Boş bir input kontrolü
    if (searchValue.trim() === '') {
      // Eğer boş arama yapıldıysa, savedContacts'e geri dön
      if (savedContacts && savedContacts.length > 0) {
        setContacts(savedContacts); // savedContacts varsa onu kullan
      } else {
        setContacts(contactsData); // savedContacts yoksa, başlangıç verisini kullan
      }
      setError(false); // Hata durumunu sıfırla
      return; // Fonksiyonu sonlandır
    }

    // Arama işlemi
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
        contact.number.includes(searchValue)
    );

    // Sonuç bulunamazsa
    if (filtered.length === 0) {
      setError(true); // Hata durumunu tetikle
      setContacts(savedContacts || contactsData); // Orijinal verileri geri yükle
    } else {
      setError(false); // Hata durumunu kaldır
      setContacts(filtered); // Filtrelenmiş veriyi ayarla
    }
  };

  return  (
  <div className="app">
    <div className='title-wrapper'>
      <Player
                autoplay
                loop
                src={PhoneAnimated}
                className="animation"
        />
    <h1>Phone Book</h1>
    </div>
    <div className="app-wrapper">
      <div className="wrapper">
        {error && <ErrorModal handleClick={handleClick} />}
        {duplicate && <IsDuplicate closeModal={handleClick} />}
        
        {/* Eğer hata veya duplicate yoksa, Search ve Contact formunu göster */}
        {!error && !duplicate && (
          <>
            <div className="search">
              <SearchBox handleChange={handleSearch} />
            </div>
            <div className="contact">
              <ContactForm onSubmit={addContact} />
            </div>
          </>
        )}
      </div>

      {/* Sadece hata veya duplicate yoksa ContactList'i göster */}
      {!error && !duplicate && (
        <div className="list">
          <ContactList contacts={contacts} onDelete={handleDelete} />
        </div>
      )}
    </div>
  </div>
);
}

export default App;
