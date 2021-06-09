import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import Backdrop from "./Backdrop";
import styles from "../styles/Autocomplete.module.css";
import { getLocationsByCity } from "../util/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      // Redirect on selection
      redirect: false,
      //
      scrollLoc: 0,
    };
    this.listElement = React.createRef();
    this.activeRowRef = React.createRef();
  }

  clearInput() {
    this.setState({
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
    });
  }

  scrollParentToChild = (parent) => {
    // Where is the parent on page
    let parentRect = parent.getBoundingClientRect();
    console.log(parent);
    console.log(parentRect);
    // What can you see?
    let parentViewableArea = {
      height: parent.clientHeight - 140,
      width: parent.clientWidth,
    };

    // Where is the child
    let childRect = this.activeRowRef.current.getBoundingClientRect();
    console.log(this.activeRowRef.current);
    console.log(childRect);
    // Is the child viewable?
    let isViewable =
      childRect.top >= parentRect.top &&
      childRect.top <= parentRect.top + parentViewableArea.height;

    // if you can't see the child try to scroll parent
    if (!isViewable) {
      // scroll by offset relative to parent
      parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
    }
  };

  // Event fired when the input value is changed
  onChange = (e) => {
    const userInput = e.currentTarget.value;
    this.setState({ userInput: userInput });
    if (userInput.length > 2) {
      if (this.state.filteredSuggestions.length === 0) {
        this.setState({ loadingLocations: true });
      }
      getLocationsByCity(userInput)
        .then((response) => {
          this.setState({
            activeSuggestion: 0,
            filteredSuggestions: response,
            showSuggestions: true,
            loadingLocations: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        showSuggestions: false,
        userInput: e.currentTarget.value,
      });
    }
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
  };

  // Event fired when the user clicks on a suggestion
  onClick = (e) => {
    // Update the user input and reset the rest of the state
    if (this.props.type === "search") {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText,
      });
    }
    this.props.onUpdate(e.currentTarget.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      {
        if (typeof filteredSuggestions[activeSuggestion] !== "undefined") {
          this.props.onUpdate(
            filteredSuggestions[activeSuggestion].place +
              ", " +
              filteredSuggestions[activeSuggestion].stateAbbr
          );

          this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput:
              filteredSuggestions[activeSuggestion].place +
              ", " +
              filteredSuggestions[activeSuggestion].stateAbbr,
          });
        }
      }
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        this.setState({ activeSuggestion: filteredSuggestions.length - 1 });
        this.listElement.current.lastChild.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      } else {
        this.setState({ activeSuggestion: activeSuggestion - 1 });
        this.activeRowRef.current.previousSibling.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        this.setState({ activeSuggestion: 0 });
        this.listElement.current.firstChild.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      } else {
        this.setState({ activeSuggestion: activeSuggestion + 1 });
        this.activeRowRef.current.nextSibling.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  backdropClickHandler = () => {
    this.setState({ showSuggestions: false });
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: {
        loadingLocations,
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let style = this.props.look;

    let suggestionsListComponent;

    if (filteredSuggestions.length < 1 && loadingLocations) {
      suggestionsListComponent = (
        <div className={styles.noSuggestions}>
          <div className={styles.loadingSuggestionLine}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className={styles.loadingLine}></div>
          </div>
          <div className={styles.loadingSuggestionLine}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className={styles.loadingLine}></div>
          </div>
          <div className={styles.loadingSuggestionLine}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className={styles.loadingLine}></div>
          </div>
          <div className={styles.loadingSuggestionLine}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className={styles.loadingLine}></div>
          </div>
        </div>
      );
    }
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul ref={this.listElement} className={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              let activeRowRef = "";
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                // className = {styles.suggestionActive};
                activeRowRef = this.activeRowRef;
              }
              return (
                <li
                  ref={activeRowRef}
                  className={className}
                  key={suggestion.place + ", " + suggestion.stateAbbr}
                  onClick={onClick}
                >
                  <FontAwesomeIcon
                    className="mr-4"
                    icon={faMapMarkerAlt}
                    size="lg"
                  />

                  {suggestion.place + ", " + suggestion.stateAbbr}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <ul className={styles.noSuggestions}>
            <li>
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3" />{" "}
              {this.props.noneFound}
            </li>
          </ul>
        );
      }
    }
    let backdrop;
    if (this.state.showSuggestions) {
      backdrop = (
        <Backdrop
          click={this.backdropClickHandler}
          style={styles.clearBackdrop}
        />
      );
    }
    return (
      <Fragment>
        <div>
          <Input
            size={style === "nav" ? "" : "large"}
            bordered={style === "nav" ? false : true}
            placeholder={this.props.placeholder}
            name={this.props.name}
            id={this.props.id}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            className={style}
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />

          {/* <input
            name={this.props.name}
            id={this.props.id}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            className={style}
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          /> */}
          {suggestionsListComponent}
        </div>
        {backdrop}
      </Fragment>
    );
  }
}

export default Autocomplete;
