var spService = new SanPhamService();
var productAmountInCart = 0;
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
                <p class="screenProduct">${objectProduct.screen}</p>
                <p class="backCam">Back Camera : ${objectProduct.backCamera}</p>
                <p class="frontCam">Front Camera : ${objectProduct.frontCamera}</p>
                <p class="descProduct">${objectProduct.desc}</p>
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
    getELE("cartItems").innerHTML = `<h3>Đã chọn mua đâu mà đòi clear</h3>` ; 
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
function getLocalStorage() {
    if(localStorage.getItem("Cart List") != null){
        cartContent = JSON.parse(localStorage.getItem("Cart List")) ; 
         var tongPrice = sumPrice() ; 
         renderCart(tongPrice) ; 
         document.querySelector(".sumPrice").style.display = "block" ;
    }else {
        cartContent = [] ; 
        document.querySelector(".sumPrice").style.display = "none" ;
    }
}
getLocalStorage() ; 
function removeProductFromCart(id) {
    var viTri = -1  ;
    cartContent.map(function(objectProduct , index){
      if(objectProduct.objectSP.id == id) viTri = index ; 
    })
    if(viTri > -1){
      cartContent.splice(viTri , 1) ; 
    var tongTien = sumPrice() ; 
    renderCart(tongTien) ; 
    setLocalStorage(cartContent) ; 
    }else {
      alert("Lỗi cmnr !") ; 
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
  cartContent[viTri].amountSP = amountNow ; 
  getELE("productAmount").innerHTML = cartContent[viTri].amountSP ; 
  var tongTien = sumPrice() ; 
  renderCart(tongTien)  ; 
  setLocalStorage(cartContent) ; 
}

