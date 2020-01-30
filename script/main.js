window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    console.log('serviceWorker')
    navigator.serviceWorker.register('./sw.js');
  }
}
