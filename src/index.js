document.addEventListener('DOMContentLoaded', () => {
    function fetchDog(){
        return fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(data => data.forEach(dog => getDog(dog)))
    }
    fetchDog()

    function getDog(dog){
        const table = document.querySelector('#table-body')
        const dogList = document.createElement('tr')
        dogList.className = 'chosen-dog'
        dogList.innerHTML = `
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button>Edit</button></td>
        `
        table.appendChild(dogList)
        //Make a click event
        dogList.addEventListener('click', () => {
            let clickonDog = dog.id
            //console.log(clickonDog)
            return fetch(`http://localhost:3000/dogs/${clickonDog}`)
            .then(res => res.json())
            .then(data => {
                const dogForm = document.querySelectorAll('form#dog-form input')
                //console.log(dogForm)
                //const breed = document.querySelector('form#dog-form input')

                dogForm[0].value = data.name
                dogForm[1].value = data.breed
                dogForm[2].value = data.sex
            })
        })
        /*const form = document.querySelector('#dog-form')
        form.addEventListener('submit', () => {
            dogList.querySelectorAll('td')[0].textContent = 
        })*/
    }

    function handleSubmit(e){
        e.preventDefault()
        let DogObj = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        updateDogInfo(DogObj)
        console.log(DogObj)
    }
    function updateDogInfo(DogObj){
        /*let newInfo = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }*/
        return fetch(`http://localhost:3000/dogs/${DogObj.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(DogObj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    document.querySelector('#dog-form').addEventListener('submit', handleSubmit)
})