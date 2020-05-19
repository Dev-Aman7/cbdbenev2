import { SET_PRODUCTS, SET_PRODUCT, CLEAR_PRODUCT, GET_PRODUCT } from "./type";
import { addSlugToProduct } from "../../services/helpers/product";
import { getAllProducts } from "../../services/apis/products";

// export const setProducts = products => dispatch => {
//   // console.log("asdfasdf", products);
//   const parsedProduct = products.products.map(el => addSlugToProduct(el));
//   // console.log({
//   //   parsedProduct
//   // });
//   dispatch({
//     type: SET_PRODUCTS,
//     payload: {
//       ...products,
//       products: parsedProduct
//     }
//   });
// };
// export const setProduct = product => dispatch => {
//   if (product.productSlug) {
//     dispatch({
//       type: SET_PRODUCT,
//       payload: product
//     });
//   } else {
//     dispatch({
//       type: SET_PRODUCT,
//       payload: addSlugToProduct(product)
//     });
//   }
// };
// export const clearProduct = () => ({
//   type: CLEAR_PRODUCT,
//   payload: null
// });

export const getProducts = () => (dispatch) => {
	getAllProducts()
		.then((res) => {
			console.log("all products are", res.data.products[0].productid);
			if (res.data && res.data.products) {
				dispatch({
					type: SET_PRODUCTS,
					payload: res.data.products.map((el) => addSlugToProduct(el)),
				});
			}
		})
		.catch((err) => {
			console.log({ err });
		});
};
