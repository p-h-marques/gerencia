//importing commons
import {validateEmail} from '../common/validations.js'

//defining constants
const input = document.querySelector('input')
const action = document.querySelector('aside')
const main = document.querySelector('main')
const aside = document.querySelector('aside')

document.addEventListener('DOMContentLoaded', ()=>{

  input.addEventListener('blur', ()=>{
    customValidation()
  })

  input.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
      if(customValidation()){
        verifyPreviousEmail(input.value)
      }
    }
  })

  action.addEventListener('click', ()=>{
    if(customValidation()){
      verifyPreviousEmail(input.value)
    }
  })
})

function customValidation(){
  const validation = validateEmail(input, main, aside)

  return validation()
}

function verifyPreviousEmail(email){
  console.log('Carregando...')

  fetch(url_has_email + `?email=${email}`)
    .then((resp) => resp.json())
    .then(function(data){
      if(data.has_email){
        console.log(`Oi ${data.name}!`)
      } else {
        console.log('tu é novo aqui')
      }
    })
    .catch((fail)=>{
	    console.log(fail)
    })
}