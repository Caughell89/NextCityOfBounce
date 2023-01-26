import React, { Component } from "react";
import { UserContext } from "../context/UserContext";
import LoadingIndicator from "../components/LoadingIndicator";
import { preventBlanks, emailIsValid, phoneIsValid } from "../utils/FormTools";
import { updateUser, updateUserPhoto } from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();

    this.state = {
      key: 0,
      loading: true,
      showEditName: false,
      showEditEmail: false,
      showEditPhone: false,
      editFirstName: "",
      editLastName: "",
      editPhone: "",
      editEmail: "",
      editPhoto: "",
      uploading: false,
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      phoneValid: true,
      uploadPhoto: false,
    };
  }

  handleKeyPress = (event) => {
    const keyCode = event.which;
    if ((keyCode >= 48 && keyCode <= 58) || keyCode === 8) {
    } else {
      event.preventDefault();
    }
  };

  backdropClickHandler = () => {
    this.setState({ sidebarOpen: false });
  };

  render() {
    let sidebarClasses = "side-menu";
    if (this.state.sidebarOpen) {
      sidebarClasses = "side-menu open";
    }
    return (
      <>
        <div className="content">
          <div className="row justify-content-center">
            <div className="user-info-box">
              <div className="user-photo-holder">
                {this.state.uploading && (
                  <img
                    src={bounce}
                    alt="Uploading indicator"
                    className="user-photo-loading"
                  />
                )}
                {!this.state.uploading && (
                  <img
                    id="profile-pic"
                    src={this.state.editPhoto}
                    className="user-profile-photo"
                    alt="Profile pic"
                  />
                )}

                <div className="no-display" id="add-profile-pic"></div>
                <input
                  ref={this.file}
                  type="file"
                  name="file"
                  accept="image/*"
                  className="no-display"
                  id="profile-pic-file"
                  onChange={this.readURL}
                />
                <div
                  id="upload-photo"
                  onClick={this.uploadPhoto}
                  className="input-button blue-text"
                >
                  Update Photo
                </div>
              </div>
              <div className="joined-content">
                <div id="join-date" className="user-info"></div>
              </div>
              <div className="user-content"></div>
            </div>
            <div className="personal-info-box">
              <h2>Personal Info</h2>
              <div className="info-form">
                <div className="personal-input">
                  <label className="bold" htmlFor="name">
                    Name
                  </label>
                  {this.state.showEditName && (
                    <span
                      className="edit-button"
                      id="cancel-name-edit"
                      onClick={this.handleCancelClick}
                    >
                      Cancel
                    </span>
                  )}
                  {!this.state.showEditEmail &&
                    !this.state.showEditPhone &&
                    !this.state.showEditName && (
                      <span
                        id="edit-name-button"
                        className="edit-button"
                        onClick={this.handleEditClick}
                      >
                        Edit
                      </span>
                    )}
                  {(this.state.showEditPhone || this.state.showEditEmail) && (
                    <span
                      id="dead-edit-name-button"
                      className="dead-edit-button"
                    >
                      Edit
                    </span>
                  )}

                  <div id="current-full-name"></div>
                  <div className="no-display" id="current-first-name"></div>
                  <div className="no-display" id="current-last-name"></div>
                  {this.state.showEditName && (
                    <div id="edit-name-block" className="edit-block">
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="first-name">First name</label>
                          <input
                            name="editFirstName"
                            value={this.state.editFirstName}
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                          />
                          {!this.state.firstNameValid && (
                            <div
                              id="first-name-error"
                              className="update-error "
                            >
                              <FontAwesomeIcon
                                className="warning"
                                icon={faExclamationTriangle}
                                size="md"
                              />
                              {"  "}
                              First name required
                            </div>
                          )}
                        </div>
                        <div className="col">
                          <label htmlFor="last-name">Last name</label>
                          <input
                            name="editLastName"
                            value={this.state.editLastName}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                          />
                          {!this.state.lastNameValid && (
                            <div id="last-name-error" className="update-error ">
                              <FontAwesomeIcon
                                className="warning"
                                icon={faExclamationTriangle}
                                size="md"
                              />
                              {"  "}
                              Last name required
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        id="save-name-button"
                        className="oo-button"
                        onClick={this.handleEditSubmit}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="personal-input">
                <label className="bold" htmlFor="email">
                  Email
                </label>
                {this.state.showEditEmail && (
                  <span
                    id="cancel-edit-email-button"
                    className="edit-button"
                    onClick={this.handleCancelClick}
                  >
                    Cancel
                  </span>
                )}
                {!this.state.showEditEmail &&
                  !this.state.showEditPhone &&
                  !this.state.showEditName && (
                    <span
                      id="edit-email-button"
                      className="edit-button"
                      onClick={this.handleEditClick}
                    >
                      Edit
                    </span>
                  )}
                {(this.state.showEditName || this.state.showEditPhone) && (
                  <span
                    id="dead-edit-email-button"
                    className="dead-edit-button"
                  >
                    Edit
                  </span>
                )}
                <div id="current-email"></div>
                {this.state.showEditEmail && (
                  <div id="edit-email-block" className="edit-block">
                    <div className="form-row">
                      <div className="col">
                        <input
                          name="editEmail"
                          value={this.state.editEmail}
                          type="text"
                          className="form-control"
                          onChange={this.handleChange}
                        />
                        {!this.state.emailValid && (
                          <div id="email-error" className="update-error">
                            <FontAwesomeIcon
                              className="warning"
                              icon={faExclamationTriangle}
                              size="md"
                            />
                            {"  "}
                            Valid email required
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      id="save-email-button"
                      className="oo-button"
                      onClick={this.handleEditSubmit}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="personal-input">
                <label className="bold" htmlFor="phone">
                  Phone
                </label>
                {this.state.showEditPhone && (
                  <span
                    id="cancel-edit-phone-button"
                    className="edit-button"
                    onClick={this.handleCancelClick}
                  >
                    Cancel
                  </span>
                )}
                {!this.state.showEditEmail &&
                  !this.state.showEditPhone &&
                  !this.state.showEditName && (
                    <span
                      id="edit-phone-button"
                      className="edit-button"
                      onClick={this.handleEditClick}
                    >
                      Edit
                    </span>
                  )}
                {(this.state.showEditName || this.state.showEditEmail) && (
                  <span
                    id="dead-edit-phone-button"
                    className="dead-edit-button"
                  >
                    Edit
                  </span>
                )}
                <div id="current-phone"></div>
                {this.state.showEditPhone && (
                  <div id="edit-phone-block" className="edit-block">
                    <div className="form-row">
                      <div className="col">
                        <input
                          onChange={this.handleChange}
                          onKeyDown={this.handlePhonePress}
                          name="editPhone"
                          value={this.state.editPhone}
                          type="text"
                          maxLength="14"
                          className="form-control"
                          pattern="\d*"
                        />
                        {!this.state.phoneValid && (
                          <div id="phone-error" className="update-error">
                            <FontAwesomeIcon
                              className="warning"
                              icon={faExclamationTriangle}
                              size="md"
                            />
                            {"  "}
                            Valid phone number required
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      id="save-phone-button"
                      className="oo-button"
                      onClick={this.handleEditSubmit}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
