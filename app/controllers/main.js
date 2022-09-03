var spService = new SanPhamService();
var productAmountInCart = Number(document.getElementById("itemsInCart").innerHTML);
var cartContent = [];
function getELE(id) {
  return document.getElementById(id);
}

function getAPI() {
  spService
    .getAPI()
    .then(function (success) {
      showUI(success.data);
      overlayCard(success.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getAPI();
function showUI(arr) {
  var content = "";
  arr.map(function (objectProduct) {
    content += `
        <div class="col-3 mt-5">
            <div class="card cardStyle" >
              <div class="cardImage">
                <img src="${objectProduct.img}" class="card-img-top cardImage" alt="picture" />
              </div>
             
              <div class="card-body">
                <p class="product_Name">${objectProduct.name}</p>
                <p class="product_price">${objectProduct.price}</p>
              </div>
              <div class="btnCard">
                <button class="btn btn-success btnBuyNow">Buy now</button>
                <button onclick = "addToCart('${objectProduct.id}')" class="btn btn-success btnAddToCart">Add to cart</button>
              </div>
              <div class="card_overlay">
                
              </div>
            </div>
          </div>
        `;
  });
  getELE("productItemsAll").innerHTML = content;
}
function overlayCard(arr) {
  var overlayEle = document.querySelectorAll(".card_overlay");

  arr.map(function (objectProduct, idx) {
    var url = objectProduct.img;
    overlayEle[idx].style.background = "url(' " + url + " ') ";
    overlayEle[idx].style.backgroundSize = "120%";
    overlayEle[idx].style.backgroundRepeat = "no-repeat";
    overlayEle[idx].style.backgroundPosition = "center";
  });
}
function phoneCategory() {
  spService
    .getAPI()
    .then(function (success) {
      var productArr = success.data;
      var seachArray = [];
      var seachKey = getELE("selectProduct").value;
      if (seachKey === "0") {
        showUI(productArr);
        overlayCard(productArr);
      } else if (seachKey === "1") {
        productArr.map(function (objectProduct) {
          if (objectProduct.type.toLowerCase() === "samsung")
            seachArray.push(objectProduct);
        });
        showUI(seachArray);
        overlayCard(seachArray);
      } else {
        productArr.map(function (objectProduct) {
          if (objectProduct.type.toLowerCase() === "iphone")
            seachArray.push(objectProduct);
        });
        showUI(seachArray);
        overlayCard(seachArray);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
function addToCart(id) {
  document.querySelector(".cart_amount").innerHTML = `${++productAmountInCart}`;
  document.querySelector(".cart_amount").style.display = "block";
  spService
    .getProduct(id)
    .then(function (success) {
      var objectPhone = success.data;
      if (cartContent.length == 0) {
        var cartItem = new CartItem(objectPhone, 1);
        cartContent.push(cartItem);
      } else {
        var isExist = false;
        cartContent.some(function (objectPhone) {
          if (objectPhone.objectSP.id === id) {
            isExist = true;
          }
        });
        if (isExist) {
          var viTri = -1;
          cartContent.map(function (objectPhone, index) {
            if (objectPhone.objectSP.id == id) viTri = index;
          });
          cartContent[viTri].amountSP = ++cartContent[viTri].amountSP;
         
        } else {
          var cartItem = new CartItem(objectPhone, 1);
          cartContent.push(cartItem);
         
        }
      }
      var tongPrice = sumPrice();
      
      renderCart(tongPrice) ; 
      document.querySelector(".sumPrice").style.display = "block" ; 
      setLocalStorage(cartContent) ; 
    })
    .catch(function (error) {
      console.log(error);
    });
}
function sumPrice() {
  var sum = 0;
  cartContent.map(function (objectPhone) {
    var price = Number(objectPhone.objectSP.price.replace("$", ""));
    sum += price * objectPhone.amountSP;
  });
  return sum;
}
function renderCart(tongPrice) {
  var content = "";
  cartContent.map(function (objectPhone) {
    content += `
       
        <tr class="ml-4">
              <div class="productCart_container d-flex justify-content-between text-left ">
                  <p style="font-size: 20px;" class="productName m-0 font-weight-bold w-50">${objectPhone.objectSP.name}<p>
                  <p class="productPrice m-0">${objectPhone.objectSP.price}</p>
              </div>
              <div class="productCart_control my-3 d-flex justify-content-between">
                  <p class="productAmount m-0 mb-4 text-left">
                  <button onclick = " decreaseProductCart(${objectPhone.objectSP.id})" class="btn btn-primary" id="btnDecreaseProductCart">
                      <i class="fa-solid fa-minus"></i>
                  </button>
                  <span id="productAmount">${objectPhone.amountSP}</span>
                  <button onclick = "increaseProductCart(${objectPhone.objectSP.id})" class="btn btn-primary" id="btnIncreaseProductCart">
                      <i class="fa-solid fa-plus"></i>
                  </button>
                  </p>
                  <button onclick = "removeProductFromCart(${objectPhone.objectSP.id})" class="btn btn-danger h-50" id="btnRemoveProduct">
                      <i class="fa-solid fa-trash"></i>
                  </button>
        </div>
            
    </tr>
        `;
  });
  getELE("cartItems").innerHTML = content ; 
  getELE("sumPrict").innerHTML = `${tongPrice} $` ; 
}
function clearCart() {
  if(cartContent.length == 0){
    getELE("cartItems").innerHTML = `<h3>Giỏ hàng trống !</h3>` ; 
      setTimeout(function(){
      getELE("cartItems").innerHTML = "" ; 
      },2000)
  }else {
    document.querySelector(".cart_amount").innerHTML = "0";
    document.querySelector(".cart_amount").style.display = "none";
    document.querySelector(".sumPrice").style.display = "none" ; 
    cartContent = [] ; 
    setLocalStorage(cartContent) ; 
    renderCart(0) ;
  }
    

  }
getELE("btnClearCart").onclick = clearCart;

function setLocalStorage(arr) {
    localStorage.setItem("Cart List" , JSON.stringify(arr)) ; 
}
// GET LOCAL STORAGE
function getLocalStorage() {
  // get all products from api then save them in an array
    var listOfProduct = [] ; 
    spService.getAPI().then((success)=>{
      // real data
      listOfProduct = [...success.data] ; 
      console.log(listOfProduct) ;
      
      if(localStorage.getItem("Cart List") != null){
        cartContent = JSON.parse(localStorage.getItem("Cart List")) ; 
        console.log(cartContent) ; // data stored in local
        for(let i = 0 ; i < cartContent.length; i++ ){
          var id = cartContent[i].objectSP.id ; // id cua sp hien tai
          // var spInCart =  cartContent[i] ; 
          listOfProduct.some((phone)=>{
            if( phone.id == cartContent[i].objectSP.id ) cartContent[i].objectSP = {...phone}
          }) 
        }
        console.log(cartContent) ; 







        
         var tongPrice = sumPrice() ; 
         renderCart(tongPrice) ; 
         document.querySelector(".sumPrice").style.display = "block" ;
         
    }else {
        cartContent = [] ; 
        document.querySelector(".sumPrice").style.display = "none" ;
       
    }
    if(cartContent.length == 0){
      document.querySelector(".cart_amount").style.display = "none" ; 
    }else{
          var productAmountInCart = 0 ; 
          cartContent.forEach((product)=>{
          productAmountInCart += product.amountSP ; 
          });
          document.querySelector(".cart_amount").innerHTML = productAmountInCart ; 
          document.querySelector(".cart_amount").style.display = "block" ;
    }








    }).catch((err)=>{
      console.log(err) ; 
    }) ; 

}
getLocalStorage() ; 
function removeProductFromCart(id) {
    var viTri = -1  ;
    cartContent.map(function(objectProduct , index){
      if(objectProduct.objectSP.id == id) viTri = index ; 
    })
  //  var isCartEmpty = cartContent.every((product)=> {
  //     return product.amountSP == 0 ; 
  //  })
  //  if(isCartEmpty){
  //   document.querySelector(".cart_amount").innerHTML = 0 ; 
  //   document.querySelector(".cart_amount").style.display = "none" ;
  //     clearCart() ; 
  //   var tongTien = sumPrice() ; 
  //   renderCart(tongTien) ; 
  //   setLocalStorage(cartContent) ; 
  //  }else{
   
  //   var productAmountInCart = 0 ; 
  //   cartContent.forEach((product)=>{
  //     productAmountInCart += product.amountSP ; 
  //   });
  //   document.querySelector(".cart_amount").innerHTML = productAmountInCart ; 
  //   document.querySelector(".cart_amount").style.display = "block" ;
  //             if(viTri > -1){
  //                     cartContent.splice(viTri , 1) ; 
  //                   var tongTien = sumPrice() ; 
  //                   renderCart(tongTien) ; 
  //                   setLocalStorage(cartContent) ; 
  //             }else {
  //                    alert("Lỗi cmnr !") ; 
  //             }
  //  }
    

    // if(viTri > -1){
    //   cartContent.splice(viTri , 1) ; 
    // var tongTien = sumPrice() ; 
    // renderCart(tongTien) ; 
    // setLocalStorage(cartContent) ; 
    // }else {
    //   alert("Lỗi cmnr !") ; 
    // }
    if(cartContent.length == 1){
      clearCart() ; 

    }else{
      if(viTri > -1){
          cartContent.splice(viTri , 1) ; 
          var tongTien = sumPrice() ; 
          var productAmountInCart = 0 ; 
          cartContent.forEach((product)=>{
          productAmountInCart += product.amountSP ; 
          });
          document.querySelector(".cart_amount").innerHTML = productAmountInCart ; 
          document.querySelector(".cart_amount").style.display = "block" ;
          renderCart(tongTien) ; 
          setLocalStorage(cartContent) ; 
      }else {
          alert("Lỗi cmnr !") ; 
      }
    }   
}
function increaseProductCart(id) {
  var viTri = -1 ; 
  cartContent.map(function(objectProduct , index){
    if(objectProduct.objectSP.id == id) viTri = index ; 
  })
  var amountNow = cartContent[viTri].amountSP ; 
  amountNow = ++amountNow ; 
  cartContent[viTri].amountSP = amountNow ;
  getELE("productAmount").innerHTML = cartContent[viTri].amountSP ; 
  var tongTien = sumPrice() ;
   
  var productAmountInCart = 0 ; 
  cartContent.forEach((product)=>{
    productAmountInCart += product.amountSP ; 
  });
  document.querySelector(".cart_amount").innerHTML = productAmountInCart ; 
  document.querySelector(".cart_amount").style.display = "block" ; 
  renderCart(tongTien)  ; 
  setLocalStorage(cartContent) ;
}
function decreaseProductCart(id) {
  var viTri = -1 ; 
  cartContent.map(function(objectProduct , index){
    if(objectProduct.objectSP.id == id) viTri = index ; 
  })
  var amountNow = cartContent[viTri].amountSP ; 
  amountNow = --amountNow ; 
  if(amountNow <= 0 ){
    cartContent.splice(viTri , 1) ; 
    var tongTienDecrease = sumPrice() ; 
    renderCart(tongTienDecrease) ; 
    
  }else{
    cartContent[viTri].amountSP = amountNow ; 
    getELE("productAmount").innerHTML = cartContent[viTri].amountSP ; 
    var tongTien = sumPrice() ; 
  }
 
  
  
  var productAmountInCart = 0 ; 
  var isCartEmpty = cartContent.every((product)=>{
        return product.amountSP <= 0 ;
  })
  console.log(isCartEmpty) ; 
  if(isCartEmpty){
    clearCart() ; 
    document.querySelector(".cart_amount").innerHTML = productAmountInCart ; 
    document.querySelector(".cart_amount").style.display = "none" ;
    setLocalStorage(cartContent) ; 
  }else {
      cartContent.forEach((product)=>{
      productAmountInCart += product.amountSP ; 
    });
    document.querySelector(".cart_amount").innerHTML = productAmountInCart ; 
    document.querySelector(".cart_amount").style.display = "block" ; 
    renderCart(tongTien)  ; 
    setLocalStorage(cartContent) ; 
  }
  
  
}
