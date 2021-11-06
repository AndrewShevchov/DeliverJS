const restourant = 'food-band'

fetch(`./db/${restourant}.json`)
.then((response)=>response.json())
.then((data)=>{
    renderItems(data)
})
.catch((error)=>{
    console.log(error)
})

const renderItems = (data)=>{
    console.log(data)
    
}
