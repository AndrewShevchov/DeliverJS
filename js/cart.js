const cart = () =>{

    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart')
    const close = modalCart.querySelector('.close')
    const body = modalCart.querySelector('.modal-body')
    const buttonSend =  modalCart.querySelector('.button-primary')


    const resetCart= () => {
        body.innerHTML=``
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }
        
    const decremetCount = (id) =>{
        const totalPrice = document.querySelector('.modal-pricetag')
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item)=>{
            if (item.id===id){
                item.count = item.count > 0 ? item.count - 1 : 0
            }
             
            return item
        })
        
        localStorage.setItem('cart', JSON.stringify(cartArray))

        const  callcartprise = cartArray.reduce((sum, elem)=> sum - (elem.price * elem.count), 0)
       

        totalPrice.innerText = Math.abs(callcartprise) +" ₽";

        renderItems(cartArray)

    }

    const incrementCount= (id) => {
        const totalPrice = document.querySelector('.modal-pricetag')
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map( (item) =>{
            
            if (item.id === id) {
                item.count++
            }
            return item
        })
        
        localStorage.setItem('cart', JSON.stringify(cartArray))

        const  callcartprise = cartArray.reduce((sum, elem)=> (elem.price * elem.count) + sum, 0)
       

        totalPrice.innerText = callcartprise +" ₽";

        renderItems(cartArray)

    }

    const renderItems = (data)=>{
        body.innerHTML=``

        data.forEach ( ({count,id,name, price}) => {

            
            const cartElement = document.createElement('div')

            cartElement.classList.add('food-row')

            cartElement.innerHTML =`

            
				<span class="food-name">${name}</span>
				<strong class="food-price">${price}₽</strong>
			    <div class="food-counter">
					<button class="counter-button btn-dec " data-index=${id}>-</button>
					<span class="counter">${count}</span>
					<button class="counter-button btn-inc " data-index=${id}>+</button>
				</div>

            `
            body.append(cartElement)
        })
        
    }


    body.addEventListener('click',(element) => {
        element.preventDefault()

       if(element.target.classList.contains('btn-inc'))
       {
        incrementCount(element.target.dataset.index)
       }
       else if(element.target.classList.contains('btn-dec'))
       {
        decremetCount(element.target.dataset.index)
       }
    })

    buttonSend.addEventListener('click', () => {

        const cartArray = localStorage.getItem('cart')

        fetch(`https://jsonplaceholder.typicode.com/posts`,{
            method: 'POST',
            body: cartArray
        })
        .then(response=> {
            if(response.ok){
                resetCart()
            }

        })

    })

    buttonCart.addEventListener('click', () => {

        console.log();

        if(localStorage.getItem('cart'))
        {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }

        modalCart.classList.add('is-open')

    })


    close.addEventListener('click', () => {
        

        modalCart.classList.remove('is-open')
        
        })

    }

    cart()