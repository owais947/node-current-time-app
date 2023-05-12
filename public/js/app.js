console.log('Client side script loaded...')

const timeForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

timeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locate = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/time?address='+locate).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = 'Time- ' + data.current.current_time.substr(11, 8) + '.   Date: ' + data.current.current_time.substr(0, 10)
                messageTwo.textContent = 'Location: ' + data.current.location
            }
        })
    })
})