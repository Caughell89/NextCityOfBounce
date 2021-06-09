import { API_BASE_URL, ACCESS_TOKEN } from "./index";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": API_BASE_URL,
  });
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }
  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
    mode: "cors",
  });
}

export function loginUser(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function updateUser(updateRequest) {
  return request({
    url: API_BASE_URL + "/user/update",
    method: "PUT",
    body: JSON.stringify(updateRequest),
  });
}
export function updateUserPhoto(updateRequest) {
  return request({
    url: API_BASE_URL + "/user/updatePhoto",
    method: "PUT",
    body: JSON.stringify(updateRequest),
  });
}

export function getLocations(state) {
  return request({
    url: API_BASE_URL + "/" + state + "/Locations",
    method: "GET",
  });
}

export function registerCompany(companyRequest, userId) {
  return request({
    url: API_BASE_URL + "/RegisterCompany/" + userId,
    method: "POST",
    body: JSON.stringify(companyRequest),
  });
}

export function updateCompanyLogo(companyRequest) {
  return request({
    url: API_BASE_URL + "/company/updateLogo/",
    method: "PUT",
    body: JSON.stringify(companyRequest),
  });
}

export function saveArea(companyRequest) {
  return request({
    url: API_BASE_URL + "/company/addServiceArea/",
    method: "POST",
    body: JSON.stringify(companyRequest),
  });
}

export function sendWelcomeEmail(email) {
  return request({
    url: API_BASE_URL + "/sendWelcomeEmail",
    method: "POST",
    body: JSON.stringify(email),
  });
}

export function verifyEmail(email) {
  return request({
    url: API_BASE_URL + "/sendVEmail",
    method: "POST",
    body: JSON.stringify(email),
  });
}

export function sendEmployeeEmailRegister(companyRequest, email) {
  return request({
    url: API_BASE_URL + "/" + email + "/sendRegistrationEmail",
    method: "POST",
    body: JSON.stringify(companyRequest),
  });
}

export function removePendingEmployee(companyRequest) {
  return request({
    url: API_BASE_URL + "/deletePendingEmployee",
    method: "POST",
    body: JSON.stringify(companyRequest),
  });
}

export function getCurrentCompany(companyId) {
  return request({
    url: API_BASE_URL + "/company/" + companyId,
    method: "GET",
  });
}

export function getCompany(companyLocationUrl, companyNameUrl) {
  return request({
    url: API_BASE_URL + "/" + companyLocationUrl + "/" + companyNameUrl,
    method: "GET",
  });
}

export function getCompanyById(companyId) {
  return request({
    url: API_BASE_URL + "/resource/company/" + companyId,
    method: "GET",
  });
}

export function getEmployees(companyId) {
  return request({
    url: API_BASE_URL + "/employees/" + companyId,
    method: "GET",
  });
}

export function deleteEmployee(userId) {
  return request({
    url: API_BASE_URL + "/deleteEmployee/" + userId,
    method: "POST",
  });
}

export function removeArea(location, state, companyId) {
  return request({
    url:
      API_BASE_URL + "/removeArea/" + location + "/" + state + "/" + companyId,
    method: "POST",
  });
}

export function updateEmployee(title, userId) {
  return request({
    url: API_BASE_URL + "/updateEmployee/" + title + "/" + userId,
    method: "POST",
  });
}

export function saveProduct(productRequest) {
  console.log(productRequest);
  return request({
    url: API_BASE_URL + "/company/addProduct/",
    method: "POST",
    body: JSON.stringify(productRequest),
  });
}

export function productSearch(searchString) {
  return request({
    url: API_BASE_URL + "/products/search/" + searchString,
    method: "GET",
  });
}

export function productSearchFiltered(searchRequest) {
  console.log(searchRequest);
  return request({
    url: API_BASE_URL + "/products/search/",
    method: "POST",
    body: JSON.stringify(searchRequest),
  });
}

export function getItem(itemId) {
  return request({
    url: API_BASE_URL + "/products/" + itemId,
    method: "GET",
  });
}

export function getAllCities() {
  return request({
    url: API_BASE_URL + "/resource/locations",
    method: "GET",
  });
}

export function getAllLocations() {
  return request({
    url: API_BASE_URL + "/resource/all-locations",
    method: "GET",
  });
}

export function getLocationsByCity(userInput) {
  return request({
    url: API_BASE_URL + "/resource/locations=" + userInput,
    method: "GET",
  });
}

export function bookParty(partyRequest) {
  console.log(partyRequest);
  return request({
    url: API_BASE_URL + "/resource/Book/",
    method: "POST",
    body: JSON.stringify(partyRequest),
  });
}

export function getOrdersByDate(companyId, date) {
  return request({
    url: API_BASE_URL + "/company/orders/" + companyId + "/" + date,
    method: "GET",
  });
}

export function companyOrderSearchEmail(companyId, email) {
  return request({
    url:
      API_BASE_URL + "/company/orders/search=email" + companyId + "/" + email,
    method: "GET",
  });
}

export function companyOrderSearchName(companyId, name) {
  return request({
    url: API_BASE_URL + "/company/orders/search=name" + companyId + "/" + name,
    method: "GET",
  });
}

export function companyOrderSearchOrderNumber(companyId, orderNumber) {
  return request({
    url:
      API_BASE_URL +
      "/company/orders/search=order" +
      companyId +
      "/" +
      orderNumber,
    method: "GET",
  });
}

export function getUserOrders(userId) {
  return request({
    url: API_BASE_URL + "/user/orders/" + userId,
    method: "GET",
  });
}

export function processPayment(payment) {
  console.log(payment);
  return request({
    url: API_BASE_URL + "/payment",
    method: "POST",
    body: JSON.stringify(payment),
  });
}

export function linkStripe(companyId) {
  return request({
    url: API_BASE_URL + "/payment/register/" + companyId,
    method: "POST",
  });
}

export function getCompanyByLocAndName(loc, name) {
  return request({
    url: API_BASE_URL + "/resource/company/" + loc + "/" + name,
    method: "GET",
  });
}

export function getTaxRate1(address) {
  return request({
    url: API_BASE_URL + "/resource/taxes",
    method: "POST",
    body: JSON.stringify(address),
  });
}

export function getStripeAccount(stripeId) {
  console.log(stripeId);
  return request({
    url: API_BASE_URL + "/payment/" + stripeId,
    method: "POST",
  });
}

export function markAsRead(messageId) {
  return request({
    url: API_BASE_URL + "/resource/message/" + messageId,
    method: "POST",
  });
}
export function deleteMessage(messageId) {
  return request({
    url: API_BASE_URL + "/resource/message/delete/" + messageId,
    method: "POST",
  });
}

export function moveMessageToInbox(messageId) {
  return request({
    url: API_BASE_URL + "/resource/message/move/" + messageId,
    method: "POST",
  });
}

export function sendMessage(message) {
  return request({
    url: API_BASE_URL + "/resource/message/send/",
    method: "POST",
    body: JSON.stringify(message),
  });
}

export function getItemBlockedDates(itemId) {
  return request({
    url: API_BASE_URL + "/resource/blockedDates/" + itemId,
    method: "GET",
  });
}

export function sendMessage2(message) {
  return request({
    url: API_BASE_URL + "/resource/message/send_v2/",
    method: "POST",
    body: JSON.stringify(message),
  });
} 

export function loadConvos(userId) {
  return request({
    url: API_BASE_URL + "/resource/convos/" + userId,
    method: "GET",
  });
}

export function getNotificationsAPI(userId) {
  return request({
    url: API_BASE_URL + "/user/notifications/" + userId,
    method: "GET",
  });
}
