const menu= () => {

const cardsMenu = document.querySelector('.cards-menu')

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

const addToCart = (cartItem) => {

    const totalPrice = document.querySelector('.modal-pricetag')

    const cartArray = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')):[]

    if(cartArray.some( (item) => item.id === cartItem.id))
    {

       cartArray.map((item =>{
           if(item.id === cartItem.id){
               item.count++
             }

        return item
       }))
    }
    else {cartArray.push(cartItem)}
   
    localStorage.setItem('cart', JSON.stringify(cartArray))
 
    const  callcartprise = cartArray.reduce((sum, elem)=> (elem.price * elem.count) + sum, 0)
    console.log(callcartprise+" ₽")

    totalPrice.innerText = callcartprise +" ₽";

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

        card.querySelector('.button-card-text').addEventListener('click', () => {

            addToCart({ name, price, id, count:1 })

        })
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
}


menu()

