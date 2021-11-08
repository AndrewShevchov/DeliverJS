const cardsMenu = document.querySelector('.cards-menu')
const sectionHeading = document.querySelector('.section-heading') 

const changeTitle = (restaraunt) =>
{
const restaurantTitle = document.querySelector('.restaurant-title') 
const rating = document.querySelector('.rating') 
const price = document.querySelector('.price') 
const category = document.querySelector('.category') 

 restaurantTitle.textContent=restaraunt.name
 rating.textContent=restaraunt.stars
 price.textContent=restaraunt.price
 category.textContent=restaraunt.kitchen
}



const renderItems = (data)=>{

  data.forEach(({description,id,image,name, price}) => {
      const card = document.createElement('div')

      card.classList.add('card')
    
     card.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
                            <div class="card-text">
                                <div class="card-heading">
                                    <h3 class="card-title card-title-reg">${name}</h3>
                                </div>
            
                                <div class="card-info">
                                    <div class="ingredients">
                                    ${description}
                                    </div>
                                </div>
                               
                                <div class="card-buttons">
                                    <button class="button button-primary button-add-cart">
                                        <span class="button-card-text">В корзину</span>
                                        <span class="button-cart-svg"></span>
                                    </button>
                                    <strong class="card-price-bold">${price}₽</strong>
                                </div>
                            </div>      
        `
        cardsMenu.append(card)
  })
    
}

if (localStorage.getItem('restaraunt')){

const restaraunt = JSON.parse(localStorage.getItem('restaraunt'))

changeTitle(restaraunt)

fetch(`./db/${restaraunt.products}`)
.then((response)=>response.json())
.then((data)=>{
    renderItems(data)
})
.catch((error)=>{
    console.log(error)
})
}
else{
    window.location.href = '/'
}




