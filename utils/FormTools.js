export function preventBlanks(input) {
    return input.trim() !== "";
  }
  
  export function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export function phoneIsValid2(phone) {
    return phone.length === 10;
  }
  
  export function phoneIsValid(phone) {
    return phone.length === 14;
  }
  
  export function urlLocToString(location) {
    location = location.replace(/_/g, " ");
    let city = location.substr(0, location.length - 3);
    let state = location.substr(location.length - 3);
    state = state.replace(" ", ", ");
    return city.concat(state);
  }
  
  export function stringLocToUrl(location) {
    if (location === null) {
      location = "Buffalo NY";
    } else {
      location = location.replace(/, | /g, "_");
    }
    return location;
  }
  
  export function testHours(oHour, oMinute, oAMPM, cHour, cMinute, cAMPM) {
    if (oHour > 0 && oHour <= 12) {
      return true;
    } else {
      return false;
    }

    
  }

  