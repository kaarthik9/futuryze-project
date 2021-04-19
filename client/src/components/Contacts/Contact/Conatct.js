import React from "react";
import styles from "./Contact.module.css";
import moment from "moment"

export default function Conatct({ firstName, lastName, email, phone, date, id, setModalData, deleteContacts }) {
  // Fills modal with contact data
  const fillEditModal = () => {
    setModalData({ firstName, lastName, email, phone, id})
  }

  const deleteContact = () => {
    deleteContacts(id)
  }

  return (
    <div className={styles.contactCard}>
      <h3 className={styles.title}>Name:</h3>
      <div className={styles.name}>{firstName + " " + lastName}</div>

      <h3 className={styles.title}>Email:</h3>
      <div className={styles.italic + " " + styles.name}>{email}</div>

      <h3 className={styles.title}>phone:</h3>
      <div className={styles.name}>{phone}</div>

      <div className={styles.date}>
        Created:{" "}
        <span className={styles.dateJoin}>
          {moment(date).fromNow()}
        </span>
      </div>

      <div onClick={fillEditModal} data-toggle="modal"
            data-target="#exampleModalCenter" className={styles.edit}>
        <i className="fas fa-2x fa-edit"></i>
      </div>

      <div onClick={deleteContact} className={styles.delete}>
        <i className="far fa-2x fa-trash-alt"></i>
      </div>
    </div>
  );
}
