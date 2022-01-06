const InitialValues = {
  products: [{
      itemName: "Banana",
      price: 10
    },
    {
      itemName: "Mango",
      price: 20
    },
    {
      itemName: "WaterMelon",
      price: 10
    },
    {
      itemName: "Blueberry",
      price: 50
    },
    {
      itemName: "Guava",
      price: 10
    },
    {
      itemName: "Coconut",
      price: 30
    },
    {
      itemName: "Sugarcane",
      price: 40
    },
    {
      itemName: "Orange",
      price: 100
    },
  ]
}

export default function productRenderer(state = InitialValues, action) {

  switch (action.type) {

    default:
      return state
  }
}