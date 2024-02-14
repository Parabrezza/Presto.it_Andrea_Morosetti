//NAVBAR EVENTO SCROLL
let navbar = document.querySelector(".navbar")


window.addEventListener("scroll", ()=>{

      if (window.scrollY >= 0){
        navbar.classList.add("nav-custom")
    } else {
        navbar.classList.remove("nav-custom")
    }
}) 

//CHIAMATE ASINCRONE - set interval () 

let numUtenti = document.querySelector("#numUtenti")
let numProdotti = document.querySelector("#numProdotti")
let numMessaggi = document.querySelector("#numMessaggi")

function creazioneNumeri(numeroFinale, element, frequenza){
    let counter = 0

    let intervalloNumeri = setInterval( ()=>{
        if(counter < numeroFinale){
            counter++
            element.innerHTML = counter;

        } else {
            clearInterval(intervalloNumeri)
        }
    }, frequenza ) 
}

creazioneNumeri(100, numUtenti, 100)
creazioneNumeri(500, numProdotti, 50)
creazioneNumeri(1000, numMessaggi, 20)


//  INTERSECTION OBSERVER
let primoBox = document.querySelector("#primoBox")

let isIntersecato = false;

let observer = new IntersectionObserver( (entries)=>{
    entries.forEach( (entry)=>{
        if(entry.isIntersecting && isIntersecato == false){
            creazioneNumeri(100, numUtenti, 100)
            creazioneNumeri(500, numProdotti, 50)
            creazioneNumeri(1000, numMessaggi, 20)
            isIntersecato = true;
            setTimeout(() => {
                isIntersecato = false;
            }, 5000);

        }
    } )
} )


observer.observe(primoBox);

//ULTIMI ANNUNCI    

let ultimiAnnunciWrapper = document.querySelector("#ultimiAnnunciWrapper")

let annunci = [
    {name: "Carro armato di piazza Tienanmen", categoria: "Accessorio", prezzo: 20000, img: "https://picsum.photos/204/150"},
    {name: "Katana", categoria: "Accessori", prezzo: 500, img: "https://picsum.photos/200/150"},
    {name: "Vaso Ming", categoria: "Arredamento", prezzo: 700, img: "https://picsum.photos/201/150"},
    {name: "Statua di terracotta", categoria: "Arredamento", prezzo: 650, img: "https://picsum.photos/202/150"},
    {name: "Statua di Buddha", categoria: "Arredamento", prezzo: 350, img: "https://picsum.photos/203/150"},
    {name: "Miniatura pagoda", categoria: "Arredamento", prezzo: 150, img: "https://picsum.photos/204/150"},
    {name: "Guzheng", categoria: "Musica", prezzo: 150, img: "https://picsum.photos/204/150"},

]

annunci.forEach( (annuncio, i)=>{
    if(i >= annunci.length - 4 ){
        let colonna = document.createElement("div");
        colonna.classList.add("col-10", "col-md-3", "my-3");
        colonna.innerHTML = `
                        <div class="card position-relative">
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-3">NEW</span>
                            <div class="overflow-hidden card-img-top">
                                <img src="${annuncio.img}" class="card-img-top transition" alt="...">
                            </div>
                            <div class="card-body">
                            <h5 class="card-title text-center">${annuncio.name}</h5>
                            <p class="card-text">Categoria: ${annuncio.categoria}</p>
                            <p class="card-text">Prezzo: ${annuncio.prezzo}</p>
                            <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-danger">Aggiungi al carrello</a>
                            </div>
                            </div>
                        </div>
        `
        ultimiAnnunciWrapper.appendChild(colonna)
    }
  
})

// SWIPER 

const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });