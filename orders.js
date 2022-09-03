export const orders = []

const getNewOrderId = () => {
	let highestOrderId = 0
	if (orders.length > 0) {
      highestOrderId = orders.sort((a, b) => b.id - a.id)[0].id
	}
	return highestOrderId + 1
}

export const addNewOrder = (order) => {
   const newId = getNewOrderId();
   order.id = newId;
   orders.push(order);
   document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getOrders = () => {
   const copyOrder = orders.map(x =>{return {...x}})
   return copyOrder
}