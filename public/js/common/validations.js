export{ validateEmail }

//TODO deixar função mais genérica
function validateEmail(input, main, aside){
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
      aside.classList.remove('active')
      return false
    } else {
      setCustomMessage()
      aside.classList.add('active')
      return true
    }
  }

}