document.addEventListener("DOMContentLoaded", (e) => {
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => data.forEach(element => {
            fetchPups(element)
        }))
})

function fetchPups(data){
    let dogSpan = document.createElement('span'); 
    dogSpan.textContent = data.name; 
    dogSpan.id = 'dogSpan'

    document.querySelector('#dog-bar').append(dogSpan);
    
    // while(document.querySelector('#dog-info').hasChildNodes()){
    //     document.querySelector('#dog-info').removeChild(document.querySelector('#dog-info').firstChild); 
    // }

    dogSpan.addEventListener('click', (e) => {
        while(document.querySelector('#dog-info').hasChildNodes()){
            document.querySelector('#dog-info').removeChild(document.querySelector('#dog-info').firstChild)
        }
        let dogPic = document.createElement('img');
        let name = document.createElement('h2');
        let button = document.createElement('button');

        //let dogInfo = document.querySelector("#dog-info"); 

        dogPic.src = data.image;
        name = data.name; 

        if(data.isGoodDog === true){
            button.textContent = "Good dog!";
        }
        else{
            button.textContent = 'Bad dog!';
        }

        document.querySelector('#dog-info').append(dogPic, name, button);

        button.addEventListener('click', (e) => {
            if(button.textContent === "Good dog!"){
                fetch(`http://localhost:3000/pups/${data.id}`,{
                    method: 'PATCH', 
                    headers: 
                    {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify(
                        {isGoodDog:  false} )
                }).then(response => response.json())
                .then(json => console.log(json))
                button.textContent = "Bad dog!";
            }
            else{
                fetch(`http://localhost:3000/pups/${data.id}`,{
                    method: 'PATCH', 
                    headers: 
                    {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify(
                        {isGoodDog:  true} )
                }).then(response => response.json())
                .then(json => console.log(json))
                button.textContent = 'Good dog!';
            }
        })

    })

}