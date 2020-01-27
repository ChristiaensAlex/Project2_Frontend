const postLoginMentorAPI = function(payload) {
	let body = JSON.stringify(payload);
	fetch('https://trekjeplan.azurewebsites.net/api/AuthMentor/Login', {
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
				removeErrors('email');
				setSession(data);
				//console.log(data), (sessionStorage.mentorId = data.id), console.log(sessionStorage.mentorId), (window.location.href = 'MentorHasClientList.html');
			} else {
				addErrors('email'), (mailErrorMessage.innerText = data);
			}

			//
		})
		.catch(err => console.log(err));
};


const setSession = function(res) {
    localStorage.setItem('token', res.token);
    readTokeDataFromLocalStorage();
}


const isAuthenticated = function() {

    const expiresAt = new Date(localStorage.getItem('expires_at'));

    if (new Date() < expiresAt) {
      this.readTokeDataFromLocalStorage();

      return true;
    }
    this.logOut();
    return false;


  }


 const readTokeDataFromLocalStorage = function() {
    const token = localStorage.getItem('token');
    if (token) {
		let decoded = jwt_decode(token);
		mentorId = decoded.nameid;
				
		let unix_timestamp = decoded.exp;
		var date = new Date(unix_timestamp * 1000);
		localStorage.setItem('expires_at', date);

    }
  }


  const logOut = function() {
    localStorage.removeItem('token');
	localStorage.removeItem('expires_at');
	mentorId = null;

  }