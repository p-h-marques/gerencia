const input = document.querySelector('input')
const action = document.querySelector('aside')
const main = document.querySelector('main')
const aside = document.querySelector('aside')
// const form = document.querySelector('form')



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
  const validation = validateEmail()

  return validation()
}

function validateEmail(){

  function verifyErrors() {
    let foundError = false;

    for(let error in input.validity) {
      if (input.validity[error] && !input.validity.valid ) {
        foundError = error
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      email: {
        valueMissing: "Não esqueça de digitar seu email, ein!",
        typeMismatch: "O email digitado é inválido, que tal dar uma revisada nele?"
      }
    }

    return messages[input.type][typeError]
  }

  function insertingFeedback(msg, type = 'error'){
    let icon = ''

    switch (type){
      case 'error':
        icon = img_error
        break
    }

    let html = `<p><img src="${icon}" alt=""><span>${msg}</span></p>`

    main.querySelectorAll('p').forEach((val)=>{
      val.remove()
    })

    main.insertAdjacentHTML('beforeend', html)
  }

  function setCustomMessage(message) {
    if (message) {
      insertingFeedback(message, 'error')
    } else {
      main.querySelectorAll('p').forEach((val)=>{
        val.remove()
      })
    }
  }

  return function() {
    const error = verifyErrors()

    if(error) {
      const message = customMessage(error)
      setCustomMessage(message)
      return false
    } else {
      setCustomMessage()
      aside.classList.add('active')
      return true
    }
  }

}

function verifyPreviousEmail(email){
  console.log('Carregando...')

  fetch(url_has_email + `?email=${email}`)
    .then((resp) => resp.json())
    .then(function(data){
	    console.log(data)
    })
    .catch((fail)=>{
	    console.log(fail)
    })
}