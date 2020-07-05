//importing commons
import {validateEmail} from '../common/validations.js'
import {validatePassword} from '../common/validations.js'
import {insertingFeedback} from '../common/validations.js'

//defining constants
const input_email = document.querySelector('input[type=email]')
const input_password = document.querySelector('input[type=password]')
const aside = document.querySelector('aside')
const main = document.querySelector('main')
const header = document.querySelector('header')

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

  input_password.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
      let validation = validatePassword(input_password.value)
      validation.valid ? console.log('validou') : invalidPasswordFeedback(validation)
    }
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

      default:
        break;
    }
  })
})

function verifyPreviousEmail(email){
  console.log('Carregando...')

  fetch(url_has_email + `?email=${email}`)
    .then((resp) => resp.json())
    .then(function(data){
      if(data.has_email){
        console.log(`Oi ${data.name}!`)
        askCurrentPassword(data)
        step = "password"
      } else {
        console.log('tu é novo aqui')
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
  console.log('ask')
}

function invalidPasswordFeedback(validation){
  console.log(validation)
  aside.classList.remove('active')
  insertingFeedback(validation.feedback, 'error', main)
}

function validPasswordFeedback(validation){
  main.querySelectorAll('p').forEach((val)=>{
    val.remove()
  })

  console.log(validation)
}