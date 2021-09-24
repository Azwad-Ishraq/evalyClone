const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => displayData(data))
}

loadProducts();

const displayData = data => {
    const allProductsDiv = document.getElementById('all-products');
    const allProducts = data;
    for (const product of allProducts) {
        // console.log(product)
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
        <img src="${product.image}" alt="">
                   <h2>${product.title}</h2>

                   <div class="product-item-text">
                    <h4>Category: <span>${product.category}</span></h4>
                    <p><i class="fas fa-star"></i><span>${product.rating.rate}</span></p>
                    <h3>$ <span>${product.price}</span></h3>
                    <span>
        <button onclick="showDetails(${product.id})" class="btn details-btn">Details</button>
        <button onclick="addToCart(${product.id})" class="btn cart-btn">Add to Cart</button>
        </span>
                   </div>
        `


        allProductsDiv.appendChild(productDiv);
    }
}
const modal = document.getElementById('modal');






const showDetails = (id) =>{
    const title = document.getElementById('modal-title')
    const img = document.getElementById('modal-img')
    const cata = document.getElementById('modal-cata')
    const desc = document.getElementById('modal-desc')
    const price = document.getElementById('modal-price')
    const rate = document.getElementById('modal-rate')
    modal.classList.add('modal-active');
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>{
               
                
                
                title.innerText = json.title;
                img.src = json.image;
                cata.innerText = 'Category: ' + json.category;
                desc.innerText = json.description;
                price.innerText = "$" + json.price;
                rate.innerText = json.rating.rate;
                
            })
    
}


const closeModal = () =>{
   
    modal.classList.remove('modal-active');
}





const sliderPhotos = ['images/slider images/1.jfif','images/slider images/2.jfif','images/slider images/3.jfif','images/slider images/4.jfif'];
const sliderImgTag = document.getElementById('slider-img');
let count = 0;

const sliderNext = () =>{
    count ++;
    if(count>= sliderPhotos.length){
        count =0;
        sliderImgTag.src = sliderPhotos[count];
    }else{
        sliderImgTag.src = sliderPhotos[count];

    }

}

const sliderPrev = () =>{
    count --;
    if(count< 0){
        count = sliderPhotos.length -1;
        sliderImgTag.src = sliderPhotos[count];
    }else{
        sliderImgTag.src = sliderPhotos[count];

    }

}



const autoSlider = () => {
    setInterval(()=>{
        count ++;
        if(count>= sliderPhotos.length){
            count =0;
            sliderImgTag.src = sliderPhotos[count];
        }else{
            sliderImgTag.src = sliderPhotos[count];
        }
    },2000)
}

autoSlider();


const userCart = [];
// const cartUl = document.getElementById('cart-ul');

const addToCart = id =>{
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=> {
                const addedProduct = {
                    title: json.title,
                    price: json.price
                }
                userCart.push(addedProduct);
                console.log(userCart)
                
                
            });


}




const closeCartModal = () => {
    cartModal.classList.remove('modal-active');
    
}

const cartModal = document.getElementById('cart-modal');
const cartModalBody = document.getElementById('cart-modal-body');
const cartUl = document.createElement('ul');
const showCart = () =>{
    
    cartUl.textContent='';
    cartUl.classList.add('cart-ul');
    cartModalBody.appendChild(cartUl)
   cartModal.classList.add('modal-active');
   let totalAmnt = 0;
   const total = document.createElement('li');
   total.innerText = `$ ${totalAmnt};`
   
   
   
   for(const cartItem of userCart){
       const li = document.createElement('li');
       li.innerHTML = `
       <span>${cartItem.title}</span> <span>$${cartItem.price}</span>
       `
       console.log(cartItem.price)
       totalAmnt +=  cartItem.price;
        total.innerText = `Total: $ ${totalAmnt}`;
    //    totalAmnt = totalAmnt.toFixed(2);
       cartUl.prepend(li);
       cartUl.appendChild(total)
   }

}

const showCata = () =>{
    const catas = document.getElementById('catas');
    catas.classList.toggle('catas-active')
}






