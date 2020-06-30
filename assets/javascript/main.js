// Easter Egg to toggle color of light bulb picture once resume is clicked

function activateFilterAnimation() {
    $('#bwBulb').toggleClass('animated');
  }
  
  $('#resume').on('click', activateFilterAnimation);

  