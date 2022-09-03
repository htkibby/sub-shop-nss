import {addNewOrder, getOrders} from './orders.js'

document.addEventListener("stateChanged", event => {
  displayOrders()
})

document.getElementById("app").innerHTML = `
<h1>Bob's Sub Shop</h1>
<div>
  <h3>Please make your Sub Sandwhich</h3>
  <div class="subForm">
    <div class="bread">
      <p>Pick your bread</p>
      <label for="wheatbread">Wheat</label>
      <input id="wheatbread" name="bread" type="radio" value="Wheat"/>
      <label for="whitebread">White</label>
      <input id="whitebread" name="bread" type="radio" value="Whitebread" />
      <label for="herbsandcheese">Herbs and Cheese</label>
      <input id="herbsandcheese" name="bread" type="radio" value="Herbs and Cheese" />
      </div>
    <div class="toasted">
      <p>Do you want it Toasted or not Toasted?</p>
      <label for="nottoasted">Not Toasted</label>
      <input id="nottoasted" name="toast" type="radio" value="Not Toasted" checked="true"/>
      <label for="toasted">Toasted</label>
      <input id="toasted" name="toast" type="radio" value="Toasted" />
      </div>
    <div class="protein">
      <p>Pick your Protein</p>
      <label for="ham">Ham</label>
      <input id="ham" name="protein" type="radio" value="Ham" />
      <label for="pepperoni">Pepperoni</label>
      <input id="pepperoni" name="protein" type="radio" value="Pepperoni" />
      <label for="turkey">Turkey</label>
      <input id="turkey" name="protein" type="radio" value="Turkey" />
      </div>
      <div class="toppings">
        <p>Pick your Toppings (Select all that apply)</p>
        <ul>
          <li>
            <input id="Cheese" name="toppings" type="checkbox" value="Cheese" />
            <label for="Cheese">Cheese</label>
          </li>
          <li>
            <input id="Lettuce" name="toppings" type="checkbox" value="Lettuce" />
            <label for="Lettuce">Lettuce</label>
          </li>
          <li>
            <input id="Tomato" name="toppings" type="checkbox" value="Tomato" />
            <label for="Tomato">Tomato</label>
          </li>
          <li>
            <input id="Mayonnaise" name="toppings" type="checkbox" value="Mayonnaise" />
            <label for="Mayonnaise">Mayonnaise</label>
          </li>
          <li>
            <input id="Onions" name="toppings" type="checkbox" value="Onions" />
            <label for="Onions">Onions</label>
          </li>
          <li>
            <input id="Mustard" name="toppings" type="checkbox" value="Mustard" />
            <label for="Mustard">Mustard</label>
          </li>
        </ul>
    </div>
    <div class="extras">
      <label for="specialInstructions">Notes/Special Instructions</label>
      <div>
        <textarea id="specialInstructions"></textArea>
      </div>
    </div>
    <div>
      <button id="submitOrder">Order Sandwhich</button>
    </div>
  </div>
  <h3>Orders</h3>
  <div id="orders"></div>
</div>
`;



const displayOrders = () => {
  const orders = getOrders()
  let displayedOrders = ''
  const displayOrderHTML = document.getElementById('currentOrders')
  for (const data of orders) {
    displayedOrders += `<ul>`
    displayedOrders += `<li>Order#: ${data.id}</li>`
    displayedOrders += `<li>Bread: ${data.bread}</li>`
    displayedOrders += `<li>Toasted: ${data.toasted}</li>`
    displayedOrders += `<li>Protein: ${data.protein}</li>`
    displayedOrders += `<li>Toppings: ${data.toppings}</li>`
    displayedOrders += `<li>Special Instructions: ${data.instructions}</li>`
    displayedOrders += `</ul>`
  }
  displayOrderHTML.innerHTML = displayedOrders
  return displayOrderHTML
}

const toppingsLimit = () => {
  const checks = document.querySelectorAll("input[name=toppings]");
  const noMoreThanThree = () => {
    const checkedToppings = document.querySelectorAll("input[name=toppings]:checked");
    if (checkedToppings.length >= 4){
      alert("No more than 3 toppings!")
      return false
    }
  }
  noMoreThanThree()
  for (let i = 0; i < checks.length; i ++) {
    checks[i].onclick = noMoreThanThree
  }
}

document.addEventListener("click", e=> {
  if (e.target.id === "submitOrder"){
    const nothingSelected = () => {
      if (document.querySelector("input[name=bread]").checked === false || document.querySelector("input[name=protein]").checked === false || document.querySelector("input[name=toppings]").checked === false) {
        alert("Please fill out all fields to make an order.")
        return false
      } else {
        displayOrders()
      }
        const bread = document.querySelector("input[name=bread]:checked")?.value;
        const protein = document.querySelector("input[name=protein]:checked")?.value;
        const toppingsElements = document.querySelectorAll("input[name=toppings]:checked");
        const toasted = document.querySelector("input[name=toast]:checked")?.value;
        const toppingsArray = []
        const toppings = toppingsElements.forEach(toppingElement=> {
          toppingsArray.push(toppingElement.value)
        });
        const instructions = document.getElementById('specialInstructions')?.value
        const order = {
          bread: bread,
          protein: protein,
          toasted: toasted,
          toppings: toppingsArray,
          instructions: instructions
        }
      addNewOrder(order)
    }
      nothingSelected()
    }
})

toppingsLimit()