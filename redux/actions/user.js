import { SET_USER, UNSET_USER, SET_CART } from "./type";
import { getUserDetails } from "../../services/apis/user";
// // import { initialCart } from "../components";

export const setUser = (user, cart = null) => (dispatch) => {
	// console.log({ user });
	if (user._id) {
		console.log({
			user,
		});
		getUserDetails(user._id).then((res) => {
			console.log({ res });
			console.log("get user detail");
			localStorage.setItem("id", res.data.user._id);
			if (res.data.status && res.data.user) {
				//   dispatch(getUserMeta(res.data.user._id, cart));
				const payload = {
					...res.data.user.userid,
					userMetaId: res.data.user._id,
					userMetaObj: res.data.user,
					userObj: res.data.user.userid,
				};
				dispatch({
					type: SET_USER,
					payload,
				});
				if (cart) {
					setCartApi({
						usermetaid: res.data.user._id,
						cart: cart,
					});
				} else if (res.data.user.cart) {
					// dispatch({
					//   type: SET_CART,
					//   payload: res.data.user.cart
					// });
				}
			}
		});
	} else {
		dispatch({
			type: SET_USER,
			payload: user,
		});
	}
};
// export const updateUserMeta = userId => {
//   // console.log("get user id ", { userId });

//   return dispatch => {
//     console.log({
//       dispatch
//     });
//   };
// };
// export const getUserMetaNoCart = user => {
//   // console.log({
//   //   user
//   // });
//   return dispatch => {
//     console.log("user meta start fetching");
//     getSingleUserApi(user)
//       .then(res => res.json())
//       .then(res => {
//         if (res.user && res.user._id) {
//           console.log("user meta found", res);
//           dispatch({
//             type: SET_USER,
//             payload: {
//               ...res.user.userid,
//               userMetaId: res.user._id,
//               userMetaObj: res.user
//             }
//           });
//         }
//       });
//   };
// };
// export const getUserMeta = (user, cart = null) => dispatch => {
//   getSingleUserApi(user)
//     .then(res => res.json())
//     .then(res => {
//       if (res.user && res.user._id) {
//         dispatch({
//           type: SET_USER,
//           payload: {
//             ...res.user.userid,
//             userMetaId: res.user._id,
//             userMetaObj: res.user
//           }
//         });
//       }
//       if (cart && res.user && res.user._id) {
//         setCartApi({
//           usermetaid: res.user._id,
//           cart: cart
//         });
//       } else if (res.user && res.user.cart) {
//         dispatch({
//           type: SET_CART,
//           payload: res.user.cart
//         });
//       }
//     });
// };
export const unsetUser = () => {
	localStorage.removeItem("id");
	return {
		type: UNSET_USER,
		payload: {},
	};
};
