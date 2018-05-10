const { $ } = require('./bling');

const toggler = () => {
  $('.chevron-up').classList.toggle('active');
  $('.chevron-down').classList.toggle('active');
  $('#sidebar').classList.toggle('hidden');
  if ($('#sidebar').classList.contains('hidden')) {
    $('#main').classList.remove('slider');
  } else {
    $('#main').classList.add('slider');
  }
};

$('#toggle-button').on('click', () => toggler());

export { toggler };
