import axios from "axios";
import apiList from "./apiList";

const addClick = (id, data) =>
	axios.post(apiList.addClick, { id, click: data });

const addPage = (id, data) => axios.post(apiList.addPage, { id, page: data });

const addProduct = (id, data) =>
	axios.post(apiList.addProduct, { id, product: data });

export default {
	addClick,
	addPage,
	addProduct,
};
