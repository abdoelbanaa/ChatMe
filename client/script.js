const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container')

let loadInterval;

let voiceReply = false;

const urlParams = new URLSearchParams(window.location.search);
const URLvalue = urlParams.get('value');

document.getElementById('menu__btn').onclick = function () {
  var elements = document.getElementsByClassName("sticky");

  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "flex";
  }

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

document.getElementById('close__btn').onclick = function () {
  
  var elements = document.getElementsByClassName("sticky");

  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }

}

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += '.';

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  const codeRegex = /var\s\w+\s?=\s?\d+;/g;
  const coloredCode = text.replace(codeRegex, '<code style="color: red;">$&</code>');

  let index = 0
  if (voiceReply) {
    startSpeaking(text)
  }
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}


function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}


const bot = "./assets/bot.svg";
const user = "./assets/user.svg";

function chatSripe(isAi, value, uniqueId) {
  return (
    `<div class="wrappering">
    <div class="wrapper ${isAi && 'ai'}"> 
    <div class="chat">
    <div class="profile">
    <img src="${isAi ? bot : user}"
    alt="${isAi ? 'bot' : 'user'}"/>
    </div>
    <div class="msgbg ${isAi && 'ai'}">
    <div class="message" id=${uniqueId}>${value}</div>
    </div>
    </div>
    </div>
    </div>
    `
  )
}

var contentder = document.getElementById("chat_container");

var counter = 0;

const handleSubmit = async (e) => {

  var element = document.createElement("div");
  contentder.appendChild(element);
  counter++;

  if (counter % 4 == 3) {
    var text = document.createElement("div");
    text.className = "ads";
    text.innerHTML = "<p>Your Ad goes here</p>";
    contentder.appendChild(text);
  }

  e.preventDefault();

  const data = new FormData(form);


  printInput(data.get('prompt'));


}

const handle = async () => {
  const data = new FormData(form);
  form.reset();
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatSripe(true, " ", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
  const response = await fetch('https://webster.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim()
    translateNew(messageDiv, parsedData)
  } else {
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong"

  }


}

function printInput(data) {

  var sourceText = data;
  var sourceLang = 'en';
  var targetLang = '';

  if (localStorage.getItem('lang') !== null) {
    var targetLang = localStorage.getItem('lang');
  } else {
    var targetLang = 'en';
  }

  const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

  getInputJSON(url);

}

async function getInputJSON(url) {

  try {
    const response = await fetch(url);
    const data = await response.json();
    chatContainer.innerHTML += chatSripe(false, data[0][0][0]);
    handle()
  } catch (err) {
  
  }
}


async function translateNew(messageDiv, parsedData) {

  let sourceText = "";

  sourceText += " Translate this into ";

  if (localStorage.getItem('lang') !== null) {
    if (localStorage.getItem('lang') === 'en') {

      clearInterval(loadInterval);
      messageDiv.innerHTML = '';
      typeText(messageDiv, parsedData)
      return;
    } else {
      let targetLang = localStorage.getItem('lang');
      var options = document.getElementsByTagName("option");
      for (var i = 0; i < options.length; i++) {
        if (options[i].getAttribute("value") === targetLang) {
          sourceText += options[i].innerHTML;
          break;
        }
      }
    }
  } else {
    clearInterval(loadInterval);
    messageDiv.innerHTML = '';
    typeText(messageDiv, parsedData)
    return;
  }

  sourceText += " \n ";
  sourceText += parsedData;

  const response = await fetch('https://webster.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: sourceText
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if (response.ok) {
    const data = await response.json();
    const parsed = data.bot.trim()
    typeText(messageDiv, parsed)
  } else {
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong"

  }

}

form.addEventListener('submit', handleSubmit);

const toggleSwitch = document.getElementById("toggle-switch");
const input = toggleSwitch.querySelector("input");

const toggleSwitchSticky = document.getElementById("toggle-switch2");
const inputSticky = toggleSwitchSticky.querySelector("input");


if (localStorage.getItem('voice') !== null) {
  if (localStorage.getItem('voice') === 'true') {
    input.defaultChecked = true;
    inputSticky.defaultChecked = true;
    voiceReply = true;
  } else {
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



if (localStorage.getItem('voice') !== null) {
  if (localStorage.getItem('voice') === 'true') {
    inputSticky.defaultChecked = true;
    input.defaultChecked = true;
    voiceReply = true;
  } else {
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


const recognition = new webkitSpeechRecognition();

if (localStorage.getItem('lang') !== null) {
  recognition.lang = localStorage.getItem('lang');
} else {
  recognition.lang = 'en';
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  document.getElementById('textareaField').value = transcript;
  translate()
}

document.getElementById('button__mic').onclick = function () {
  recognition.start();
}

function translate() {

  var sourceText = document.getElementById('textareaField').value
  var sourceLang = '';
  var targetLang = 'en';

  if (localStorage.getItem('lang') !== null) {
    var sourceLang = localStorage.getItem('lang');
  } else {
    var sourceLang = 'en';
  }

  const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);


  getJSON(url);

}

async function getJSON(url) {

  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('textareaField').value = data[0][0][0];
    const button = document.getElementById('button');
    button.click();
  } catch (err) {

  }
}


function startSpeaking(text) {
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text);

    if (localStorage.getItem('lang') !== null) {
      utterance.lang = localStorage.getItem('lang');
    } else {
      utterance.lang = 'en';
    }

    utterance.rate = 0.7;

    window.speechSynthesis.speak(utterance);
  }
}



if (URLvalue !== null) {
  document.getElementById('textareaField').value = URLvalue;
  const button = document.getElementById('button');
  button.click();
} else {
  window.location.href = './home/index.html'
}
