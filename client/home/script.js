let voiceReply = false;
document.getElementById('link').onclick = function() {
    const inputValue = document.getElementById('inputValue').value;
    window.location.href = '/index.html?value=' + inputValue;
  }

const currentCss = document.getElementById('night__css');

if (localStorage.getItem('mode') !== null) {
  if (localStorage.getItem('mode') === 'night') {
    currentCss.href = './style/day.css';
    document.getElementById('night').style.display = 'none';
    document.getElementById('day').style.display = 'block';
    document.getElementById('night__sticky').style.display = 'none';
    document.getElementById('day__sticky').style.display = 'block';
  } else {
    currentCss.href = './style/style.css';
    document.getElementById('night').style.display = 'block';
    document.getElementById('day').style.display = 'none';
    document.getElementById('day__sticky').style.display = 'none';
    document.getElementById('night__sticky').style.display = 'block';
  }
} else {
  localStorage.setItem('mode', 'night')
  currentCss.href = './style/day.css';
  document.getElementById('night').style.display = 'none';
  document.getElementById('day').style.display = 'block';
  document.getElementById('night__sticky').style.display = 'none';
  document.getElementById('day__sticky').style.display = 'block';
}

document.getElementById('night').addEventListener('click', function () {
  // If the day CSS is enabled, disable it and enable the night CSS
  localStorage.setItem('mode', 'night')
  currentCss.href = './style/day.css';

  document.getElementById('night').style.display = 'none';
  document.getElementById('day').style.display = 'block';

  document.getElementById('night__sticky').style.display = 'none';
  document.getElementById('day__sticky').style.display = 'block';

});

document.getElementById('day').addEventListener('click', function () {
  // the night CSS is enabled, so disable it and enable the day CSS
  localStorage.setItem('mode', 'day')
  currentCss.href = './style/style.css';
  document.getElementById('night').style.display = 'block';
  document.getElementById('day').style.display = 'none';

  document.getElementById('day__sticky').style.display = 'none';
  document.getElementById('night__sticky').style.display = 'block';

});



document.getElementById('night__sticky').addEventListener('click', function () {
  // If the day CSS is enabled, disable it and enable the night CSS
  localStorage.setItem('mode', 'night')
  currentCss.href = './style/day.css';

  document.getElementById('night').style.display = 'none';
  document.getElementById('day').style.display = 'block';

  document.getElementById('night__sticky').style.display = 'none';
  document.getElementById('day__sticky').style.display = 'block';

});

document.getElementById('day__sticky').addEventListener('click', function () {
  // the night CSS is enabled, so disable it and enable the day CSS
  localStorage.setItem('mode', 'day')
  currentCss.href = './style/style.css';
  document.getElementById('night').style.display = 'block';
  document.getElementById('day').style.display = 'none';

  document.getElementById('day__sticky').style.display = 'none';
  document.getElementById('night__sticky').style.display = 'block';
});

  const toggleSwitch = document.getElementById("toggle-switch");
  const input = toggleSwitch.querySelector("input");

  const toggleSwitchSticky = document.getElementById("toggle-switch2");
const inputSticky = toggleSwitchSticky.querySelector("input");

  
  if(localStorage.getItem('voice') !== null){
    if(localStorage.getItem('voice') === 'true'){
      input.defaultChecked = true;
      inputSticky.defaultChecked = true;
      voiceReply = true;
    }else{
      input.defaultChecked = false;
      inputSticky.defaultChecked = false;
      voiceReply = false;
    }
  }
  
  input.addEventListener("change", () => {
    localStorage.setItem('voice', input.checked);
    voiceReply = input.checked;
    inputSticky.defaultChecked = false;
  });
  
  

if(localStorage.getItem('voice') !== null){
  if(localStorage.getItem('voice') === 'true'){
    inputSticky.defaultChecked = true;
    input.defaultChecked = true;
    voiceReply = true;
  }else{
    inputSticky.defaultChecked = false;
    input.defaultChecked = false;
    voiceReply = false;
  }
}

inputSticky.addEventListener("change", () => {
  localStorage.setItem('voice', inputSticky.checked);
  voiceReply = inputSticky.checked;
  input.defaultChecked = false;
});



document.getElementById('menu__btn').onclick = function() {

var elements = document.getElementsByClassName("sticky");

for (var i = 0; i < elements.length; i++) {
  elements[i].style.display = "flex";
}

}

document.getElementById('close__btn').onclick = function() {

  var elements = document.getElementsByClassName("sticky");
  
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  
}

function handleResize() {
    if (window.matchMedia("(min-width: 801px)").matches) {
    var elements = document.getElementsByClassName("sticky");
    
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }

}

window.addEventListener("resize", handleResize);

const popup = document.querySelector('.popup-content');
const body = document.querySelector('body');

popup.addEventListener('mouseenter', function () {
  body.style.overflow = 'hidden';
});

popup.addEventListener('mouseleave', function () {
  body.style.overflow = 'auto';
});

const options = document.querySelectorAll('option');
options.forEach(function (option) {
  option.addEventListener('click', function () {
    const value = this.value;
    localStorage.setItem('lang', value);
    var elements = document.getElementsByClassName("popup-content");

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    location.reload();
    
  });
});


document.getElementById('button').onclick = function() {
  recognition.start();
}


const recognition = new webkitSpeechRecognition();

if (localStorage.getItem('lang') !== null) {
  recognition.lang = localStorage.getItem('lang');
} else {
  recognition.lang = 'en';
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  document.getElementById('inputValue').value = transcript;
  const button = document.getElementById('link');
  button.click();
}