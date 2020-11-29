//importing commons
import {validateEmail} from '../common/validations.js'
import {validatePassword} from '../common/validations.js'
import {validateName} from '../common/validations.js'
import {insertingFeedback} from '../common/validations.js'

//defining constants
const input_email = document.querySelector('input[type=email]')
const input_password = document.querySelector('input[type=password]')
const input_name = document.querySelector('input[type=text]')
const aside = document.querySelector('aside')
const main = document.querySelector('main')
const header = document.querySelector('header')
const buttons = main.querySelector('div.buttons')

//defining global settings
let step = 'email'

document.addEventListener('DOMContentLoaded', ()=>{
  input_email.value = ''

  input_email.addEventListener('blur', ()=>{validateEmail(input_email, main, aside)})

  input_email.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
      if(validateEmail(input_email, main, aside)){
        verifyPreviousEmail(input_email.value)
      }
    }
  })

  input_email.focus()

  input_password.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
      let validation = validatePassword(input_password.value)

      if(step === 'new_password'){
        console.log(step, 'criando novo usuário')
        validation.valid ? registrateUser() : invalidPasswordFeedback(validation)
      } else {
        console.log(step, 'logando')
        validation.valid ? validPasswordFeedback(validation) : invalidPasswordFeedback(validation)
      }
    }
  })

  input_name.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
      let validation = validateName(input_name.value)
      validation ? askNewPassword() : insertingFeedback('Precisamos saber com quem estamos falando :(', 'error', main)
    }
  })

  buttons.querySelector('a.primary').addEventListener('click', e =>{
    e.preventDefault()
    registerNewUser()
  })

  buttons.querySelector('a.secondary').addEventListener('click', e =>{
    e.preventDefault()
    tryAnotherEmail()
  })

  aside.addEventListener('click', ()=>{
    switch (step) {
      case 'email':
        if(validateEmail(input_email, main, aside)){
          verifyPreviousEmail(input_email.value)
        }
        break;

      case 'password':
        let validation = validatePassword(input_password.value)
        validation.valid ? validPasswordFeedback(validation) : invalidPasswordFeedback(validation)
        break

      case 'name':
        let nameValidation = validateName(input_name.value)
        nameValidation ? askNewPassword() : insertingFeedback('Precisamos saber com quem estamos falando :(', 'error', main)
        break

      case 'new_password':
        let passwordValidation = validatePassword(input_password.value)
        passwordValidation.valid ? registrateUser() : invalidPasswordFeedback(validation)
        break

      default:
        break;
    }
  })
})

function verifyPreviousEmail(email){
  aside.querySelector('img').setAttribute('src', img_loading)

  fetch(url_has_email + `?email=${email}`)
    .then((resp) => resp.json())
    .then(function(data){
      aside.querySelector('img').setAttribute('src', img_confirm)
      if(data.has_email){
        console.log(`Oi ${data.name}!`)
        askCurrentPassword(data)
        step = "password"
      } else {
        askRegister()
      }
    })
    .catch((fail)=>{
	    console.log(fail)
    })
}

function askCurrentPassword(data){
  let header_html = ` <div><p>Seu email:</p><p>${data.email}</p></div>
                      <div><p>Seu nome:</p><p>${data.name}</p></div>`

  header.insertAdjacentHTML('beforeend', header_html)
  header.querySelector('img').classList.add('border')

  main.querySelector('h2').innerHTML = 'Agora, sua senha, por favor:'
  input_email.style.display = 'none'
  input_password.style.display = 'block'
  input_password.value = ''
  input_password.focus()
}

function invalidPasswordFeedback(validation){
  aside.classList.remove('active')
  insertingFeedback(validation.feedback, 'error', main)
}

function validPasswordFeedback(validation){
  main.querySelectorAll('p').forEach((val)=>{
    val.remove()
  })


  authTry(input_email.value, input_password.value)
}

function authTry(email, password){
  aside.querySelector('img').setAttribute('src', img_loading)

  function tryFeedback(result){
    if(result){
      window.location.href = url_do_authentication
    } else {
      console.log('não logar, senha errada!')
    }
  }

  let login = false

  fetch(url_authenticate + `?email=${email}&password=${password}`)
    .then((resp) => resp.json())
    .then(function(data){
      login = data.auth
    })
    .then(()=>{
      tryFeedback(login)
    })
    .catch((fail)=>{
      console.log(fail)
    })
}

function askRegister(){
  main.querySelector('h2').innerHTML = `Parece que você é novo por aqui...<br>Gostaria de criar uma conta com a gente?`
  input_email.style.display = 'none'
  buttons.style.display = 'flex'
}

function tryAnotherEmail(){
  main.querySelector('h2').innerHTML = `Tente um outro email:`
  input_email.style.display = 'block'
  buttons.style.display = 'none'
}

function registerNewUser(){
  step = 'name'

  main.querySelector('h2').innerHTML = `Vamos nos conhecer melhor?`
  let header_html = ` <div><p>Seu email:</p><p>${input_email.value}</p></div>`
  header.insertAdjacentHTML('beforeend', header_html)
  header.querySelector('img').classList.add('border')

  buttons.style.display = 'none'
  input_name.style.display = 'block'
}

function askNewPassword(){
  main.querySelectorAll('p').forEach((val)=>{
    val.remove()
  })

  step = 'new_password'
  input_password.value = ''
  input_password.focus()

  main.querySelector('h2').innerHTML = `Vamos escolher sua futura senha?`
  let header_html = ` <div><p>Seu nome:</p><p>${input_name.value}</p></div>`
  header.insertAdjacentHTML('beforeend', header_html)
  header.querySelector('img').classList.add('border')

  input_name.style.display = 'none'
  input_password.style.display = 'block'
}

function registrateUser(){
  let name = input_name.value
  let email = input_email.value
  let password = input_password.value

  fetch(url_register + `?email=${email}&password=${password}&name=${name}`)
    .then((resp) => resp.json())
    .then(function(data){
      console.log(data)
      data.auth ? authTry(input_email.value, input_password.value) : console.log(data.about)
    })
    .catch((fail)=>{
      console.log(fail)
    })
}