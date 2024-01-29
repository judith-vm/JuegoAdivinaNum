let randomNumber = Math.floor(Math.random() * 100) + 1;//Generar el numero aleatorio
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
let guessCount = 1;//Contador de intentos
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value);//Se guarda el valor que ingreso el usuario
  if (guessCount === 1) {//Si es el primer intento despues se muestra los anteriores
    guesses.textContent = "Intentos anteriores: ";
  }

  guesses.textContent += userGuess + " ";//Muestra los numeros ingresados

  if (userGuess === randomNumber) {//Si adivino el numero
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
    lastResult.style.backgroundColor = "#A1EC40";
    lowOrHi.textContent = "";//Borrar el cuadro de entrada
    setGameOver();
  } else if (guessCount === 10) {//Revisar si ya esta en su ultimo intento
    lastResult.textContent = "!Perdiste!";
    lowOrHi.textContent = "";
    setGameOver();
  } else {//Si no adivina el numero
    lastResult.textContent = "¡Ese no es el número!";
    lastResult.style.backgroundColor = "#F46F62";
    if (userGuess < randomNumber) {
        guessField.focus();
        lowOrHi.textContent = "¡Intenta con un número mayor!";
        lowOrHi.style.backgroundColor = "#F3C35E";
    } else if (userGuess > randomNumber) {
        guessField.focus();
        lowOrHi.textContent = "¡Intenta con un número menor!";
        lowOrHi.style.backgroundColor = "#EBF56B";
    }
  }

  guessCount++;//Incremento de intentos
  guessField.value = "";//Borrar lo del cuadro
}

//Se ejecuta la funcion checkGuess cuando damos click en enviar
guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true;//Desabilitar el campo de texto
  guessSubmit.disabled = true;//Desactivar boton
  resetButton = document.createElement("button");//Creacion de boton
  resetButton.textContent = "Iniciar nuevo juego";//Etiqueta boton
  resetButton.classList.add("resetButton");
  document.body.append(resetButton);//Añadir el boton al final
  resetButton.addEventListener("click", resetGame);//Al presionar el boton resetear el juego
}

function resetGame() {
  guessCount = 1;//Reinicia el contador de intentos
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";//Vaciar toda la informacion existente
  }

  resetButton.parentNode.removeChild(resetButton);//Quita el boton de reinicio
  guessField.disabled = false;//Habilita el campo de texto
  guessSubmit.disabled = false;//Habilita boton
  guessField.value = "";
  guessField.focus();//Listo para ingresar un nuevo numero
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1;//Genera un nuevo numero
}