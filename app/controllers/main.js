var spService = new SanPhamService();
// var btnAddToCart ;
var productAmountInCart = 0;
// khởi tạo 1 giỏ hàng ko có gì bên trong :D
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
      // sau khi tai dc du lieu len UI thi lay tat ca cac btn
      // btnAddToCart = document.querySelectorAll(".btnAddToCart") ;
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
// search by select
function phoneCategory() {
  // dùng get method để lấy tất cả dữ liệu ra và gán vào 1 mảng
  spService
    .getAPI()
    .then(function (success) {
      // console.log(success) ;
      var productArr = success.data;
      // console.log(productArr);
      // sau khi lay dc mang gia tri  , tao mot mang moi rong de chua cac object can search va show len UI
      var seachArray = [];
      // dung map de duyet mang , neu phan tu nao cua mang thoa man thi push object do vao trong mang
      var seachKey = getELE("selectProduct").value;
      // console.log(seachKey) ;
      if (seachKey === "0") {
        // nếu user muốn xem tất cả sản phẩm thì showUI mảng lấy đc từ API
        showUI(productArr);
        overlayCard(productArr);
      } else if (seachKey === "1") {
        // nếu người dùng muốn xem các sản phẩm của Samsung
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
      // console.log("seachArray" , seachArray) ;
    })
    .catch(function (error) {
      console.log(error);
    });
}
function addToCart(id) {
  document.querySelector(".cart_amount").innerHTML = `${++productAmountInCart}`;
  document.querySelector(".cart_amount").style.display = "block";
  // truyền id vào hàm addToCart(id) để dùng axios get object có id tương về
  // kiểm tra trong mảng cartContent đã có sản phẩm có id tương ứng hay chưa , nếu chưa có thì push object có id tương ứng cùng với amout là 1 (nếu đã có thì ko push nữa mà tăng amount của object có id tương ứng lên 1 đơn vị)
  
  spService
    .getProduct(id)
    .then(function (success) {
      // lấy thành công được data để chuẩn bị kiểm tra và push vào mảng
      var objectPhone = success.data;
      // kiểm tra mảng giỏ hàng rỗng hay ko , nếu rỗng thì object vào
      if (cartContent.length == 0) {
        var cartItem = new CartItem(objectPhone, 1);
        cartContent.push(cartItem);
      } else {
        // nếu trong giỏ hàng đã có sản phẩm , kiểm tra xem đã có sản phẩm có id tương ứng hay chưa , nếu chưa có thì push vào với amount là 1 , nếu có rồi thì tăng amount lên 1 đơn vị
        var isExist = false;
        cartContent.some(function (objectPhone) {
          if (objectPhone.objectSP.id === id) {
            isExist = true;
          }
        });
        
        // nếu isExist true => sản phẩm đã tồn tại trong giỏ hàng do đó không push nữa mac chỉ tăng amount lên 1 đơn vị
        if (isExist) {
          // tăng amount lên 1 đơn vị
          // trước khi tăng cần tìm xem sản phẩm đó nằm ở vị trí nào trong mảng
          var viTri = -1;
          cartContent.map(function (objectPhone, index) {
            if (objectPhone.objectSP.id == id) viTri = index;
          });
          // var cartItem = new CartItem(objectPhone , 1) ;
          // cartContent.push(cartItem) ;
          cartContent[viTri].amountSP = ++cartContent[viTri].amountSP;
         
        } else {
          // push vào mảng với amount là 1
          var cartItem = new CartItem(objectPhone, 1);
          cartContent.push(cartItem);
         
        }
      }
      // tính tổng tiền
      var tongPrice = sumPrice();
      
      // 12h51-8/15/2022 đã xong tính tổng và cartContent
      // tiếp theo là show lên cart
      renderCart(tongPrice) ; 
      document.querySelector(".sumPrice").style.display = "block" ; 
      setLocalStorage(cartContent) ; 
    })
    .catch(function (error) {
      console.log(error);
    });
}
// khi nguoi dung nhan vao clear thi set productAmount ve 0


// var myObject = {
//     age : "23" ,
//     name : "Son"
// }
// var contentObject = {
//     object : myObject,
//     number : "1"
// }
// console.log(contentObject) ;
// console.log(contentObject.object) ;
// console.log(contentObject.object.age) ;
// console.log(contentObject.object.name) ;
function sumPrice() {
  var sum = 0;
  cartContent.map(function (objectPhone) {
    var price = Number(objectPhone.objectSP.price.replace("$", ""));
    sum += price * objectPhone.amountSP;
  });
  return sum;
}
// var price = "10.99$" ;
// price = Number(price.replace("$" , ""));

// console.log(price, typeof(price)) ;
function renderCart(tongPrice) {
  // đầu tiền là đưa các giá trị như tên sản phẩm , giá sản phẩm , số lượng sản phẩm lên UI
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
    getELE("cartItems").innerHTML = `<h3>Đã chọn mua cđg đâu mà đòi clear</h3>` ; 
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




// next store in local
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
// xóa sản phẩm khỏi giỏ hàng
function removeProductFromCart(id) {
    /**
     * B1 : Truyền id vào trong hàm remove
     * B2 : dựa vào id tìm xem vị trí của sản phẩm có id tương ứng nằm ở index nào trong mảng cartContent
     * B3 : dùng hàm splice() để xóa phần tử có idx tương ứng 
     * B4 : gọi hàm renderCart để show lại giỏ hàng , tính lại giá tiền và set lại localStorage
     */
    var viTri = -1  ;
    cartContent.map(function(objectProduct , index){
      if(objectProduct.objectSP.id == id) viTri = index ; 
    })
    // console.log("viTri" , viTri) ; 
    if(viTri > -1){
      cartContent.splice(viTri , 1) ; 
    var tongTien = sumPrice() ; 
    renderCart(tongTien) ; 
    setLocalStorage(cartContent) ; 
    }else {
      alert("Lỗi cmnr !") ; 
    }
    
}
// tăng số lương sản phẩm trong giỏ hàng lên 1 
function increaseProductCart(id) {
  var viTri = -1 ; 
  cartContent.map(function(objectProduct , index){
    if(objectProduct.objectSP.id == id) viTri = index ; 
  })
  // lấy amount hiện tại của sản phầm và tăng lên 1
  var amountNow = cartContent[viTri].amountSP ; 
  console.log(amountNow) ; 
  amountNow = ++amountNow ; 
  cartContent[viTri].amountSP = amountNow ; 
  // console.log(cartContent[viTri].amountSP) ; 
  // sau khi tăng được số lương sản phẩm thì sẽ hiện thì số lượng lên giao diện và tính lại giá tiền và hiện thị lên giao diện và setlocal
  getELE("productAmount").innerHTML = cartContent[viTri].amountSP ; 
  // tính tiền
  var tongTien = sumPrice() ; 
  // renderCart
  renderCart(tongTien)  ; 
  // set local
  setLocalStorage(cartContent) ; 


}
function decreaseProductCart(id) {
  var viTri = -1 ; 
  cartContent.map(function(objectProduct , index){
    if(objectProduct.objectSP.id == id) viTri = index ; 
  })
  var amountNow = cartContent[viTri].amountSP ; 
  console.log(amountNow) ; 
  amountNow = --amountNow ; 
  cartContent[viTri].amountSP = amountNow ; 
  
  getELE("productAmount").innerHTML = cartContent[viTri].amountSP ; 
  // tính tiền
  var tongTien = sumPrice() ; 
  // renderCart
  renderCart(tongTien)  ; 
  // set local
  setLocalStorage(cartContent) ; 
}

