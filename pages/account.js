import React, { Component } from "react";
import { UserContext } from "./../context/UserContext";
import LoadingIndicator from "../components/LoadingIndicator"
import { preventBlanks, emailIsValid, phoneIsValid } from "../util/FormTools";
import { updateUser, updateUserPhoto } from "../util/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimes,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

class Account extends Component {
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

  handleEditSubmit = (event) => {

    event.preventDefault();
    let value = this.context;
    if (
      preventBlanks(this.state.editFirstName) &&
      preventBlanks(this.state.editLastName) &&
      emailIsValid(this.state.editEmail) &&
      (phoneIsValid(this.state.editPhone) ||
        this.state.editPhone === "Not Provided")
    ) {
      const updateRequest = {
        id: value.user.userDetails.id,
        firstName: this.state.editFirstName.trim(),
        lastName: this.state.editLastName.trim(),
        phone: this.state.editPhone.replace(/\D/g, ""),
        email: this.state.editEmail.trim(),
        imageUrl: this.state.editPhoto,
        emailVerified: 0,
        phoneVerified: 0,
        createdOn: value.user.userDetails.createdOn,
        lastLogin: new Date().toISOString().substring(0, 19),
      };
      updateUser(updateRequest)
        .then((response) => {
          this.setState({
            showEditName: false,
            showEditEmail: false,
            showEditPhone: false,
          });
          this.props.onLogin();
        })
        .catch((error) => {
          alert(
            (error && error.message) ||
              alert("Oops! Something went wrong. Please try again!")
          );
        });
    } else {
      this.setState({
        firstNameValid: preventBlanks(this.state.editFirstName),
        lastNameValid: preventBlanks(this.state.editLastName),
        emailValid: emailIsValid(this.state.editEmail),
        phoneValid: phoneIsValid(this.state.editPhone),
      });
    }
  };

  uploadPhoto = () => {
    this.file.current.click();
  };

  handleCancelClick = () => {
    this.setState({
      showEditEmail: false,
      showEditName: false,
      showEditPhone: false,
    });
  };

  handleEditClick = (event) => {
    event.preventDefault();

    if (event.target.id === "edit-name-button") {
      this.setState({ showEditName: true });
    } else if (event.target.id === "edit-email-button") {
      this.setState({ showEditEmail: true });
    } else if (event.target.id === "edit-phone-button") {
      this.setState({ showEditPhone: true });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (name === "editPhone") {
      if (this.state.editPhone.length === 0) {
        this.setState({ [name]: "(" + value });
      } else if (value.length === 4 && this.state.key !== 8) {
        this.setState({ [name]: value + ") " });
      } else if (value.length === 9 && this.state.key !== 8) {
        this.setState({ [name]: value + "-" });
      }
    }
  };

  handlePhonePress = (event) => {
    const keyCode = event.which;
    this.setState({ key: keyCode });
    if ((keyCode >= 48 && keyCode <= 58) || keyCode === 8 || keyCode === 9) {
    } else {
      event.preventDefault();
    }
  };

  handleKeyPress = (event) => {
    const keyCode = event.which;
    if ((keyCode >= 48 && keyCode <= 58) || keyCode === 8) {
    } else {
      event.preventDefault();
    }
  };

  componentDidMount() {
    let value = this.context;

    if (value.loggedIn) {
      this.setState({
        loggedIn: true,
        loading: false,
        editFirstName: value.user.userDetails.firstName,
        editLastName: value.user.userDetails.lastName,
        editEmail: value.user.userDetails.email,
        editPhone: value.user.userDetails.phone,
        editPhoto: value.user.userDetails.imageUrl,
      });
    }
  }

  readURL = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      uploadingPhoto: true,
    });
  };

  uploadModalHide = () => {
    this.setState({ uploadingPhoto: false });
    this.file.current.value = null;
  };

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  sidebarToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sidebarOpen: !prevState.sidebarOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sidebarOpen: false });
  };

  updatePhoto = (image) => {
    let value = this.context;
    this.setState({
      editPhoto: image,
      uploadingPhoto: false,
    });

    const updateRequest = {

      id: value.user.userDetails.id,
      firstName: this.state.editFirstName.trim(),
      lastName: this.state.editLastName.trim(),
      phone: this.state.editPhone.replace(/\D/g, ""),
      email: this.state.editEmail.trim(),
      imageUrl: image,
      emailVerified: 0,
      phoneVerified: 0,
      createdOn: value.user.userDetails.createdOn,
      lastLogin: new Date().toISOString().substring(0, 19),
    };

    updateUserPhoto(updateRequest);
    this.file.current.value = null;
  };

  clearInput = (e) => {
    let fieldName = e.target.name;
    alert(fieldName);
    this.setState({ fieldName: "" });
  };

  render() {
    let value = this.context;
    console.log(value);
    let date = new Date();
    if (!value.status.loggedIn) {
      return <LoadingIndicator/>;
    }

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
                <div id="join-date" className="user-info">
                  Joined in {value.user.userDetails.createdOn.substring(0, 4)}
                </div>
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

                  <div id="current-full-name">
                    {value.user.userDetails.firstName}{" "}
                    {value.user.userDetails.lastName}
                  </div>
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
                <div id="current-email">{value.user.userDetails.email}</div>
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
                <div id="current-phone">{value.user.userDetails.phone}</div>
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

Account.contextType = UserContext;
export default Account;

