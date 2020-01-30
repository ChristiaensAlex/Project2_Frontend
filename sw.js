var cacheName = 'trekjeplan-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/AddClient.html',
  '/AddClientToProgressiveScheme.html',
  '/AddProgressiveSchemeToClient.html',
  '/ChangePassword.html',
  '/ClientReport.html',
  '/ContactListClient.html',
  '/CreateClient.html',
  '/CreateProgressiveScheme.html',
  '/DetailInfoClient.html',	 
  '/DetailProgressiveStepsPlan.html',
  '/EditClient.html',
  '/EditProfileMentor1.html',
  '/EditProfileMentor2.html',
  '/EditProgressiveScheme.html',
  '/FinishedProgressiveScheme.html',
  '/ForgotPassword.html',
  '/ForgotPassword2.html',
  '/LoginClient.html',
  '/LoginMentor.html',
  '/MainMenuClient.html',
  '/MentorHasCalendar.html',
  '/MentorHasClientList.html',
  '/MentorHasProfile.html',
  '/MentorHasProgressiveStepsList.html',
  '/MultipleProgressiveStepListsToMultipleClients.html',
  '/OverviewDetailClientAscribed.html',
  '/OverviewStepsForClient.html',
  '/PlanningClient.html'	,
  '/RegistrationMentor1.html',
  '/RegistrationMentor2.html',
  '/ResetPassword.html',
  '/SingleStepClient.html',
  '/add-icon.svg',
  '/pig_animation.json',
  '/profile-icon.svg',
  '/style/normalize.css',
  '/style/screen.css',
  '/style/vanillaCalendar.css',
  '/script/main.js',
  '/script/ClientProgressiveSchemes.js',
  '/script/LoadClientReport.js',
  '/script/LoadEmergencyContacts.js',
  '/script/LoadOverviewStepsForClient.js',
  '/script/LoadPlanningAllClients.js',
  '/script/LoadPlanningIndividualClient.js',
  '/script/PostMentorLogin.js',
  '/script/addComponent.js',
  '/script/addProfileImage.js',
  '/script/calendar.js',
  '/script/changePw.js',
  '/script/clientprofile.js',
  '/script/clients.js',
  '/script/createClient.js',
  '/script/getContact.js',
  '/script/getMentor.js',
  '/script/jwt-decode.min.js',
  '/script/loadMainMenuClient.js',
  '/script/loadSingleStepClient.js',
  '/script/loginClient.js',
  '/script/multipleclientsprogressiveschemes.js',
  '/script/newSwiper.js',
  '/script/overviewAscribed.js',
  '/script/overviewScheme.js',
  '/script/picto.js',
  '/script/popup.js',
  '/script/popupcalendar.js',
  '/script/postContact.js',
  '/script/profile.js,',
  '/script/progressBar.js',
  '/script/progressiveSchemes.js',
  '/script/registerMentor.js',
  '/script/resetPw.js',
  '/script/singleclient.js',
  '/script/swiper.js',
  '/script/validation.js',
  '/script/vanillaCalendar.js'

];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});




