import React, { useState, useEffect } from "react";
import Conatct from "./Contact/Conatct";
import styles from "./Contacts.module.css";
import { useHistory } from "react-router-dom";

import * as api from "../../api/index";
import CreateEditModal from "./CreateEditModal/CreateEditModal";



export default function Contacts() {
  const history = useHistory();

  // Redirect if not logged in
  if (!localStorage.getItem("profile")) {
    history.push("/")
  }

  // CRUD OPERATIONS //
  // Fetches contact
  const getContacts = async () => {
    try {
      const { data } = await api.fetchContacts();
      // console.log(JSON.parse(localStorage.getItem('profile')).token+" AND " + data[11].creator)
      const newData = await data.filter(
        (contact) => contact.creator === JSON.parse(localStorage.getItem("profile")).result._id
);
      return newData;
    } catch (error) {
      console.log(error.message);
    }
  };

  // Creates contact from modal
  const createContacts = async (contact) => {
    try {
      const { data } = await api.createContacts(contact);
      // Append the new contact
      setContactData([...contactData, data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Edit contact form modal
  const editContacts = async (id, contact) => {
    try {
      const { data } = await api.updateContact(id, contact);
      // Edit the new contact
      setContactData(
        contactData.map((orjContact) => orjContact._id === id ? contact : orjContact
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete posts
  const deleteContacts = async (id) => {
    try {
      await api.deleteContact(id);
      // Delete the contact form state
      setContactData(contactData.filter((orjContact) => orjContact._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get all contacts and store in state
  const [contactData, setContactData] = useState([]);
  useEffect(() => {
    getContacts().then((contacts) => {
      setContactData(contacts);
    });
  }, []);

  // For Modal
  const [ModalData, setModalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
  });

  // Clears the modal when creating new one
  const clearModal = () => {
    setModalData({ firstName: "", lastName: "", email: "", phone: "", id: "" });
  };

  // Pagnation
  const [pagnationNum, setPagnationNum] = useState(20);
  const prevPage = () => {
    if(pagnationNum-20>0) {
      setPagnationNum(pagnationNum-20)
      window.scrollTo(0, 0);
    }
  }

  const nextPage = () => {
    if(contactData.length>pagnationNum) {
      setPagnationNum(pagnationNum+20)
      window.scrollTo(0, 0);
    }
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Contacts:
        {!contactData?.length ? <strong>No Saved Contacts</strong> : null}
      </h1>
      <div className={styles.contactsContainer}>
        <div className={styles.createContact}>
          <h3>Create a new contact</h3>
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className={"btn btn-primary " + styles.addNew}
            onClick={clearModal}
          >
            Create...
          </button>
        </div>

        {contactData?.map(
          ({ firstName, lastName, email, phone, createdAt, _id }, index) => {
            if (index < pagnationNum && index >= pagnationNum - 20) {
              return (
                <Conatct
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  phone={phone}
                  id={_id}
                  date={new Date(createdAt)}
                  key={_id}
                  setModalData={setModalData}
                  deleteContacts={deleteContacts}
                />
              );
            }
          }
        )}
      </div>
      <nav aria-label="Page navigation example" className={styles.pagnation}>
        <ul className="pagination">
          <li className="page-item">
           <button onClick={prevPage} className="page-link">
              Previous
            </button>
          </li>

          <li className="page-item">
            <button onClick={nextPage} className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
      <CreateEditModal
        createContacts={createContacts}
        editContacts={editContacts}
        contactData={ModalData}
        setContactData={setModalData}
      />
    </div>
  );
}
