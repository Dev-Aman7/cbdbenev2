import { useState, useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import HHSection from "../../components/HHSection";
import BundleProducts from "../../components/BundleProducts";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
import apiList from "../../services/apis/apiList";
import ProductCard from "../../components/ProductCard";
import { adminUrl } from "../../constants/projectSettings";
import Axios from "axios";
import {
	getProductImage,
	getProductTitle,
	getProductShortDesc,
	getBasicPrice,
	addSlugToProduct,
	getVisibleProducts,
} from "../../services/helpers/product";
import projectSettings from "../../constants/projectSettings";
import SearchBox from "../../components/form-components/SearchBox";
import fetch from "isomorphic-unfetch";
import { Collapse } from "reactstrap";
import { Icon } from "antd";
// import { shop as shopData } from '../../site-content'
import parse from "html-react-parser";

import * as analytics from "../../analytics/analytics";

const Shop = ({ productList, combos, ...props }) => {
	const [shopData, setShopData] = useState({
		title: "",
		bundleTitle: "",
		bundleSubTitle: "",
	});

	const [searchValue, setSearchValue] = useState("");
	const [isFilter, setIsFilter] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState("");

	useEffect(() => {
		analytics.page("shop");
	}, []);
	useEffect(() => {
		console.log("UseEffect");
		Axios.get(`${adminUrl}/Shop/get`)
			.then((result) => {
				console.log("Result got md", result);
				setShopData(result.data.data.shop);
			})
			.catch((err) => console.log(err));
		return () => {};
	}, []);
	const productsRow = productList.map((el) => {
		console.log({
			price: getBasicPrice(el),
			el,
		});
		return {
			...el,
			image: el.productImage
				? projectSettings.serverUrl + el.productImage
				: "//via.placeholder.com/300x500",
			title: getProductTitle(el),
			subTitle: getProductShortDesc(el),
			price: getBasicPrice(el),
		};
	});
	const applySearch = (products) =>
		products.filter((el) => {
			if (searchValue === "") return true;
			return el.title.toLowerCase().includes(searchValue.toLowerCase());
		});
	const [products, setProducts] = useState([...productsRow]);
	const onSearchChange = (e) => {
		const { value } = e.target;
		setSearchValue(value);
	};
	const filterProducts = (key) => {
		setSelectedFilters(key);
		switch (key) {
			case "featured":
				const featuredProducts = products.filter((product) => product.featured);
				const restProducts = products.filter((product) => !product.featured);
				setProducts([...featuredProducts, ...restProducts]);
				break;
			case "l2h":
				setProducts(
					products.sort(
						(a, b) =>
							parseFloat(a.price.sale_price) - parseFloat(b.price.sale_price)
					)
				);
				break;
			case "h2l":
				setProducts(
					products.sort(
						(a, b) =>
							parseFloat(b.price.sale_price) - parseFloat(a.price.sale_price)
					)
				);
				break;
			default:
				// setProducts(products)
				break;
		}
	};
	return (
		<Layout headerVersions={["bg-dark"]} headerTheme="dark">
			<div className="c-shop-page">
				<div className="container-fluid">
					<div className="c-shop-page__row c-shop-page__row--light-bg row">
						<div className="col-md-6">
							<Heading versions={["lft-br"]} parentClass="c-shop-page">
								{parse(shopData.title)}
							</Heading>
						</div>
						<div className="col-md-6 mt-5 mt-md-0">
							<div className="c-shop-page__filter-box">
								<SearchBox
									onChange={onSearchChange}
									value={searchValue}
									parentClass="c-shop-page"
								/>
								<div className="c-shop-page__filter">
									<div
										className="c-shop-page__filter-heading"
										onClick={() => {
											setIsFilter(!isFilter);
										}}
									>
										sort by <Icon type={isFilter ? "minus" : "plus"} />
									</div>
									<Collapse isOpen={isFilter}>
										<div className="c-shop-page__filter-container">
											<FilterItem
												isActive={selectedFilters === "featured"}
												onClick={() => {
													filterProducts("featured");
												}}
											>
												featured
											</FilterItem>
											<FilterItem
												isActive={selectedFilters === "l2h"}
												onClick={() => {
													filterProducts("l2h");
												}}
											>
												price low to high
											</FilterItem>
											<FilterItem
												isActive={selectedFilters === "h2l"}
												onClick={() => {
													filterProducts("h2l");
												}}
											>
												price high to low
											</FilterItem>
										</div>
									</Collapse>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="c-shop-page__products-wrapper">
					<div className="c-shop-page__row row">
						{applySearch(products).map((el) => (
							<div key={el._id} className="col-lg-4 col-md-6">
								<ProductCard
									product={el}
									versions={["show-price", "full-height"]}
									title={el.title}
									subTitle={el.subTitle}
									image={el.image}
									price={el.price && el.price.sale_price}
								/>
							</div>
						))}
					</div>
				</div>
				{combos && combos.length > 1 && (
					<div className="c-category-page__combos-wrapper">
						<div className="c-category-page__row row">
							<div className="col-md-6 col-lg-4 offset-lg-1 mb-md-0 mb-3">
								<Heading parentClass="c-category-page" versions={["large"]}>
									{parse(shopData.bundleTitle)}
								</Heading>
							</div>
							<div className="col-md-6">
								<Heading
									parentClass="c-category-page"
									subHeading={true}
									versions={["lft-br"]}
								>
									{parse(shopData.bundleSubTitle)}
								</Heading>
							</div>
							<div className="col-12">
								{/* <BundleProducts versions={["no-padding", "h-auto"]} bg="bggrey" products={combos} />  */}
								<BundleProducts
									versions={["no-padding", "h-auto"]}
									products={combos}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};
const FilterItem = ({ isActive, onClick, children }) => (
	<div
		className={classNames("c-shop-page__filter-item", {
			"c-shop-page__filter-item--active": isActive,
		})}
		onClick={onClick}
	>
		{children}
	</div>
);
Shop.getInitialProps = async ({ query }) => {
	const res = await fetch(apiList.getAllProducts);
	const productList = await res.json();
	const visibleProducts = getVisibleProducts(productList.products);

	const comboRes = await fetch(apiList.getAllCombos);
	const comboList = await comboRes.json();
	const visibleCombo = getVisibleProducts(comboList.combos);

	return {
		category: query.cid,
		productList: visibleProducts.map((el) => addSlugToProduct(el)),
		combos: visibleCombo.map((el) => addSlugToProduct(el)),
	};
};
export default connect(null)(Shop);
