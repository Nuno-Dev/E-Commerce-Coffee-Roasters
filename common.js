let burguer = document.getElementById('burguer');
let nav = document.getElementById('mobile-nav-dropdown');
let body = document.getElementsByTagName('body')[0];

burguer.addEventListener('click', function () {
  nav.classList.toggle('hide');
  body.classList.toggle('stop-scrolling');
});
