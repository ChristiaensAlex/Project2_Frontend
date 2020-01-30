let baseURL = `https://trekjeplan.azurewebsites.net/api/`,
  username,
  password,
  usernameErrorMessage,
  usernameField,
  usernameError,
  iconUsernameCorrect,
  iconUsernameError;

const loginClient = function(payload) {
  console.log(' add existing client');
  let body = JSON.stringify(payload);
  fetch(`${baseURL}client/Login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
    .then(res => {
      status = res.status;
      return res.json();
    })

    .then(data => {
      if (status == 200) {
        removeErrors('username');
        saveData(data);

        window.location.href = 'https://trekjeplan-front.azurewebsites.net/MainMenuClient.html';
      } else {
        console.log(data);
        addErrors('username'), (usernameErrorMessage.innerText = data);
      }

      //
    })
    .catch(err => console.log(err));
};
const saveData = function(data) {
  sessionStorage.clientId = data.id;
  sessionStorage.client = JSON.stringify(data);
  console.log(sessionStorage.client);
  //client = sessionStorage.client;
  //console.log(sessionStorage.clientId, JSON.parse(client));
};
const ListenToSubmit = function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    let payload = {
      username: username.value,
      password: password.value
    };
    loginClient(payload);
  });
};
const ListenToUsername = function(username) {
  usernameField = document.querySelector('.js-username-field');
  usernameErrorMessage = document.querySelector('.js-username-errormessage');
  usernameError = document.querySelector('.js-username-error');
  iconUsernameError = document.querySelector('.js-icon-username-error');
  iconUsernameCorrect = document.querySelector('.js-icon-username');
  username.addEventListener('blur', function() {
    if (isEmpty(username.value)) {
      usernameErrorMessage.innerText = 'Dit veld is verplicht.';
      addErrors('username');
      username.addEventListener('input', doubleCheckUsername);
    }
  });
};
const GetLoginElements = function() {
  username = document.querySelector('.js-username');
  password = document.querySelector('.js-password');
  login = document.querySelector('.js-loginButton');
  ListenToSubmit(login);
  ListenToUsername(username);
};
document.addEventListener('DOMContentLoaded', function() {
  console.info('domcontentloaded');
  GetLoginElements();
});
