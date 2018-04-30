const { $ } = require('./bling');

$('#toggle-button').on('click', () => {
  $('.chevron-up').classList.toggle('active');
  $('.chevron-down').classList.toggle('active');
  $('#sidebar').classList.toggle('hidden');
  if ($('#sidebar').classList.contains('hidden')) {
    $('#main').classList.remove('slider');
  } else {
    $('#main').classList.add('slider');
  }
});

//     // toggle button
//     uiController.toggleButton.addEventListener('click', function() {
//       uiController.toggler();
//   // switch chevron on click and reposition content if needed
//   var toggler = function toggler() {
//     chevronUp
//
//     sidebar.classList.toggle('hidden');
//     sidebar.classList.contains('hidden')
//       ?
//   };
