const table = document.querySelector('table')
const dogForm = document.querySelector('#dog-form')
let dogId;
let dogObj;
// not sure if this is safe or not to implement
// I couldn't associate the form with an individual dog on submit and this is my solution for now
// implementation on line 36 and 54

fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogsArray => {
        generateTable(table, dogsArray)
    })

const generateTable = (table, data) => {

    data.forEach( dog => {
        let row = table.insertRow()
        let nameCell = row.insertCell()
        let nameText = document.createTextNode(dog.name)
        nameCell.append(nameText)

        let breedCell = row.insertCell()
        let breedText = document.createTextNode(dog.breed)
        breedCell.append(breedText)

        let sexCell = row.insertCell()
        let sexText = document.createTextNode(dog.sex)
        sexCell.append(sexText)

        let editCell = row.insertCell()
        let editButton = document.createElement('button')
        editButton.innerText = 'Edit Dog'
        editCell.append(editButton)

        editButton.addEventListener('click', event => {
            dogObj = dog //variable declared line 3
            dogId = dog.id //variable delcared line 4
            dogForm.name.value = dog.name
            dogForm.breed.value = dog.breed 
            dogForm.sex.value = dog.sex
        })

    })

}

dogForm.addEventListener('submit', event => {
    event.preventDefault()
    let nameEdit = event.target.name.value
    let breedEdit = event.target.breed.value 
    let sexEdit = event.target.sex.value

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: nameEdit,
            breed: breedEdit,
            sex: sexEdit
        })
    })
    .then(response => response.json())
    .then(updatedObj => {
        console.log(updatedObj)

        let record = document.querySelector('thead').children[updatedObj.id]
        dogObj.name = updatedObj.name 
        dogObj.breed = updatedObj.breed 
        dogObj.sex = updatedObj.sex
        record.children[0].innerText = updatedObj.name
        record.children[1].innerText = updatedObj.breed 
        record.children[2].innerText = updatedObj.sex

    })

})

