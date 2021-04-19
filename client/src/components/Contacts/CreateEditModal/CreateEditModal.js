import React, { useState } from "react";
import styles from "./CreateEditModal.module.css";

export default function CreateEditModal(props) {
  const { contactData, setContactData } = props;
  const user = JSON.parse(localStorage.getItem('profile'))

  const submitContact = () => {
    if (contactData.id) {
      console.log(contactData.id)
      props.editContacts(contactData.id, contactData)
    } else {
      props.createContacts(contactData);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalCenterTitle">
              Add/Edit
            </h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className={styles.form}>
              <div className="form-group">
                <label htmlFor="inputEmail4">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={contactData.firstName}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="First Name"
                  required
                />
                <label htmlFor="inputEmail4">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={contactData.lastName}
                  onChange={(e) =>
                    setContactData({ ...contactData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputAddress">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputAddress"
                  value={contactData.email}
                  onChange={(e) =>
                    setContactData({ ...contactData, email: e.target.value })
                  }
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress2">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  value={contactData.phone}
                  onChange={(e) =>
                    setContactData({ ...contactData, phone: e.target.value })
                  }
                  placeholder="Phone"
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className={"btn btn-danger " + styles.btn}
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={submitContact}
              data-dismiss="modal"
              className={"btn btn-primary " + styles.btn}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
