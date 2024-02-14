// NAVBAR EVENTO SCROLL

let navbar = document.querySelector(".navbar")


window.addEventListener("scroll", ()=>{

    if(window.scrollY >= 0){
        navbar.classList.add("nav-custom")
    } else {
        navbar.classList.remove("nav-custom")
    }
})

// CHIAMATE API -> (Application programming Interface)
//JSON -> JavaScript Object Notation - Un tipo di dati che viaggia e che utilizziamo per rendere più leggeri i dati.

//La risposta di una fetch avviene mediante un oggetto chiamato PROMISE 

fetch("./prodotti.json").then( ( response) => response.json()).then( (data)=> {
    // console.log(data)
    let prodottiWrapper = document.querySelector("#prodottiWrapper")

    // CREAZIONE CARDS
    function createCards(array){
        prodottiWrapper.innerHTML = ""
        array.sort((a,b) => b.prezzo - a.prezzo).forEach( (prodotto, i)=>{
                let colonna = document.createElement("div");
                colonna.classList.add("col-12", "col-md-3", "my-3");
                colonna.innerHTML = `
                                <div class="card">
                                    <div class="overflow-hidden card-img-top">
                                        <img src="https://picsum.photos/20${i}" class="card-img-top transition" alt="...">
                                    </div>
                                    <div class="card-body">
                                    <h5 class="card-title text-center">${prodotto.nome}</h5>
                                    <p class="card-text">Categoria: ${prodotto.categoria}</p>
                                    <p class="card-text">Prezzo: ${prodotto.prezzo}</p>
                                    <div class="d-flex justify-content-center">
                                        <a href="#" class="btn btn-danger">Aggiungi al carrello</a>
                                    </div>
                                    </div>
                                </div>
                `
                prodottiWrapper.appendChild(colonna)    
        })
    }
    createCards(data)

    // SETTING DELLE CATEGORIE
    let radioWrapper = document.querySelector("#radioWrapper")

    function setCategory(){
        let categorie = data.map( (el)=> el.categoria)
        let categorieUniche = [];
        categorie.forEach( (categoria)=>{
            
            if( !categorieUniche.includes(categoria) ){
                categorieUniche.push(categoria)
            }
        })
        // console.log(categorieUniche);
        categorieUniche.forEach((categorieUnica)=>{
            let div = document.createElement("div");
            div.classList.add("form-check")
            div.innerHTML = `
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id=${categorieUnica}>
                            <label class="form-check-label color-S" for=${categorieUnica}>
                            ${categorieUnica}
                            </label>
            `
            radioWrapper.appendChild(div);
        })

    }
    setCategory()
    let radioButtons = document.querySelectorAll(".form-check-input")

    // FILTRO PER CATEGORIA 
    function filterByCategory(){
        let radioBtnArray = Array.from(radioButtons)
        let checked = radioBtnArray.find( (el)=> el.checked == true )

        if(checked.id == "All"){
            return data
        } else {
            let filtered = data.filter( (el)=> el.categoria == checked.id)
            return filtered
        }

    }

    
    radioButtons.forEach((radioButton)=>{
        radioButton.addEventListener("input", ()=>{
            globalFilter();
        } )
    })

    let inputPrice = document.querySelector("#inputPrice")
    let priceLabel = document.querySelector("#priceLabel")

    // FUNZIONE PREZZO MAGGIORE E MINORE 
    function findMinMaxPrice(){
        let prices = data.map((el)=> el.prezzo)
        let max = Math.max(...prices)
        let min = Math.min(...prices)
        inputPrice.min = min
        inputPrice.max = max
        inputPrice.value = max
        priceLabel.innerHTML = max
    }    
    findMinMaxPrice()

    // FILTRO PER PREZZO 
    function filterByPrice(array){
        let filtered = array.filter(( el )=> el.prezzo <= inputPrice.value);
        return filtered
    }


    inputPrice.addEventListener("input", ()=>{
        priceLabel.innerHTML = inputPrice.value;
        globalFilter();
    })

    // FILTRO PER PAROLA 
    let inputWord = document.querySelector("#inputWord");

    function filterByWord(array){
        let filtered = array.filter( (el)=> el.nome.toLowerCase().includes(inputWord.value.toLowerCase()))
        return filtered
    }

    inputWord.addEventListener( "input", ()=>{
        globalFilter();
    } )

    function globalFilter(){
        let filteredByCategory = filterByCategory()
        let filteredByPrice = filterByPrice(filteredByCategory)
        let filteredByWord = filterByWord(filteredByPrice)
        createCards(filteredByWord)
    }


} )

