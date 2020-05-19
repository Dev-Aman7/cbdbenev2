import apis from "../services/apis/analytics";
import localStorage from "localStorage";
import axios from "axios";
const id = localStorage.getItem("id");
export const page = (page) => {
	axios.post("http://localhost:4000/analytics/page/add", {
		id: id,
		pageName: "Abc",
	});
	console.log("i was called here ", page);
};

export const click = (click) => {
	console.log("i got a click", click);
	axios.post("http://localhost:4000/analytics/click/add", {
		id: id,
		click: { _id: "1212154", title: "something" },
	});
};

export const addProduct = (product) => {
	console.log("I got a product", product);
	axios.post("http://localhost:4000/analytics/product/add", {
		id: id,
		product: [{ productId: product._id, productName: product.title }],
	});
};
