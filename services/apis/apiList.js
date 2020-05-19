import projectSettings, { adminUrl } from "../../constants/projectSettings";
const { baseUrl, docMzUrl } = projectSettings;
const apiList = {
	getAllProducts: `${baseUrl}/products/api/all/`,
	getAllCombos: `${baseUrl}/products/api/combos/all/`,
	getProductById: `${baseUrl}/products/api/getbyid/`,
	getProductByName: `${baseUrl}/products/api/getbyname/`,

	getReviews: `${baseUrl}/review/getall/`,
	addReviews: `${baseUrl}/review/add/`,

	addToWishList: `${baseUrl}/wishlist/api/add/`,
	getWishList: `${baseUrl}/wishlist/api/byuser/`,
	deleteWishList: `${baseUrl}/wishlist/api/delete/`,

	userRegistration: `${baseUrl}/users/api/register/`,
	userLogin: `${baseUrl}/users/api/login/`,
	updateUserDetails: `${baseUrl}/users/api/profile/`,
	getUserDetails: `${baseUrl}/users/api/profile/`,
	updateUserPassword: `${baseUrl}/users/api/profile/password/`,
	forgotPassword: `${baseUrl}/users/api/forgetpassword/`,

	contact: `${baseUrl}/contact-us/`,

	getShippingRates: `${baseUrl}/ship/shipment/`,
	confirmShipment: `${baseUrl}/ship/confirm/`,

	getTaxValue: `${baseUrl}/getinfo/gettax/`,

	authorizeCharge: `${baseUrl}/authorize/charge/`,
	authorizeChargeProfile: `${baseUrl}/authorize/chargeprofile/`,
	authorizeChargeBank: `${baseUrl}/authorize/charge/bank/`,
	authorizeSubscription: `${baseUrl}/authorize/create/subscription/`,
	authorizeSubscriptionProfile: `${baseUrl}/authorize/create/subscription/profile/`,
	authorizeSubscriptionBank: `${baseUrl}/authorize/create/subscription/bank/`,
	authorizeSubscriptionBank: `${baseUrl}/authorize/create/subscription/bank/`,
	authorizeSubscriptionCancel: `${baseUrl}/authorize/cancel/subscription/`,
	authorizeAddCard: `${baseUrl}/authorize/addcard/`,
	authorizeSaveCard: `${baseUrl}/authorize/savecard/`,
	authorizeDeleteCard: `${baseUrl}/authorize/deletecard/`,

	placeOrder: `${baseUrl}/order/add/`,
	placeOrderNew: `${baseUrl}/order/process/order/`,
	allOrderList: `${baseUrl}/order/getorders/`,
	orderList: `${baseUrl}/order/api/getbyuser/`,

	getAllCreatives: `${baseUrl}/ambassador-portal/creatives/api/all/`,
	getAmbassadorDetails: `${baseUrl}/ambassador-portal/stats/`,
	updateAff: `${baseUrl}/ambassador-portal/update/`,
	ambassadorPortalLogin: `${baseUrl}/ambassador-portal/login/`,
	ambassadorPortalRegistration: `${baseUrl}/ambassador-portal/register/`,
	addAmbassador: `${baseUrl}/ambassador-portal/add/url/`,
	forgotPasswordAff: `${baseUrl}/ambassador-portal/forgetpassword/`,

	// doc mz
	getDoctors: `${docMzUrl}/doctors/get`,
	getDoctorById: `${docMzUrl}/doctors/getdoc/`,

	//blog
	getBlogs: `${adminUrl}/Blog/get/tag`,

	//analytics
	addPage: `${baseUrl}/analytics/page/add`,
	addProduct: `${baseUrl}/analytics/product/add`,
	addClick: `${baseUrl}/analytics/click/add`,
};
export default apiList;
