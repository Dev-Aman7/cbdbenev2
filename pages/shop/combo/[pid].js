import { useEffect } from "react";
import Layout from "../../../components/Layouts/Layout";
import ProductInfo from "../../../components/ProductInfo";
import { getProductById } from "../../../services/api";
import HImgSection from "../../../components/HImgSection";
import {
	getProductImage,
	getProductAttributes,
	getVisibleProducts,
	getProductDescription,
} from "../../../services/helpers/product";
import Heading from "../../../components/Heading";
import TitleList from "../../../components/TItleList";
// import Tabs from '../components/Tabs'
import ProductDetailsTab from "../../../components/ProductDetailsTab";
import ProductSlider from "../../../components/ProductSlider";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";
import projectSettings from "../../../constants/projectSettings";
const product = {
	title: "CBD Isolate 500 mg",
};

import * as analytics from "../../../analytics/analytics";

const Product = ({ product, ...props }) => {
	useEffect(() => {
		analytics.page("shop/combo/pid");
	}, []);

	const router = useRouter();
	const { pid } = router.query;

	const state = {
		productDetails: null,
		productList: [
			{
				title: "title",
				subTitle: "sub title",
				image: "/images/oil.png",
			},
			{
				title: "lorem",
				subTitle: "sub title",
				image: "/images/capsule-img.png",
			},
			{
				title: "ipsum",
				subTitle: "sub title",
				image: "/images/cbd-oil.png",
			},
		],
	};

	const { productList } = state;
	console.log({
		props: props,
		pid,
		router,
	});

	const productAttr = getProductAttributes(product);
	const image = getProductImage(product, "sectionB") || "/images/cbd-oil.png";
	const productImage = getProductImage(product)
		? projectSettings.serverUrl + getProductImage(product)
		: "/images/cbd-oil.png";
	return (
		<Layout headerTheme="dark">
			<ProductInfo
				product={product}
				productAttr={productAttr.filter((el, i) => i < 2)}
				image={productImage}
			></ProductInfo>
			<HImgSection version={["full"]} image={projectSettings.filePath + image}>
				<div>
					<Heading>{getProductDescription(product)}</Heading>
				</div>
				<div className="c-product-single__list">
					{productAttr.map((el, i) => {
						if (i < 2) return null;
						return (
							<TitleList
								parentClass="c-product-single"
								key={i}
								title={el.title}
							>
								{el.description}
							</TitleList>
						);
					})}
				</div>
			</HImgSection>
			<div className="c-product-single__details-wrapper">
				<ProductDetailsTab product={product} parentClass="c-product-single" />
			</div>
			<div className="c-product-single__related-section">
				<div className="row">
					<div className="col-md-6">
						<Heading versions={["default", "upper"]}>Acompany with</Heading>
					</div>
					<div className="col-md-6">
						<Heading subHeading={true} versions={["default", "lft-br"]}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud.
						</Heading>
					</div>
					<div className="col-12">
						<ProductSlider
							parentClass="c-product-single"
							products={productList}
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};
Product.getInitialProps = async ({ query }) => {
	const { baseUrl } = projectSettings;
	const res = await fetch(baseUrl + "/products/api/getbyid/" + query.pid);
	const productObj = await res.json();
	const product = getVisibleProducts([productObj.product_details]);
	return {
		product: product.length && product[0],
		productObj,
	};
};
export default connect((state) => state)(Product);
