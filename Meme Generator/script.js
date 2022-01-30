let form = document.querySelector("#container");
let imageUrl = document.querySelector("#image");
let topTxt= document.querySelector("#toptext");
let btnTxt = document.querySelector("#bottomtext");
let holder = document.querySelector("section");



form.addEventListener("submit", function(e){
e.preventDefault();


let box = document.createElement("div");
box.classList.add("boxHolder"); 
holder.append(box);


let img = document.createElement("IMG");
img.src = imageUrl.value;
img.classList.add("picture");
box.append(img);

let upTxt = document.createElement("text");
upTxt.classList.add("up");
upTxt.innerText = topTxt.value;

let btmTxt = document.createElement("text");
btmTxt.classList.add("down");
btmTxt.innerText = btnTxt.value;

box.append(upTxt, btmTxt);


form.reset();
})


document.addEventListener("click", function(e) {
  if (e.target.tagName === "IMG"){ 
    e.target.parentElement.remove();
  }
});