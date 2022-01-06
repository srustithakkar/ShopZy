import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from "./_actions/item.action";

function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
          axios.get('https://example.com/getSomething', {
            headers: {
              'Content-Type': 'application/octet-stream' ,
              "x-rapidapi-host":"edamam-food-and-grocery-database.p.rapidapi.com",
              "x-rapidapi-key":"ea08be3fc6msh420291768b58982p13f2c5jsn6915183d2a2e" 
            },
            params : {
              ingr: apple
            }
          })

        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.products);
            return res.products;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;
