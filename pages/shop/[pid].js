import Layout from "../../components/Layouts/Layout";
import ProductInfo from "../../components/ProductInfo";
import { getProductById } from "../../services/api";
import { useEffect, useState } from "react";
import HImgSection from "../../components/HImgSection";
import {
	getProductImage,
	getProductAttributes,
	getVisibleProducts,
	getProductDescription,
} from "../../services/helpers/product";
import Heading from "../../components/Heading";
import TitleList from "../../components/TItleList";
// import Tabs from '../components/Tabs'
import ProductDetailsTab from "../../components/ProductDetailsTab";
import ProductSlider from "../../components/ProductSlider";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";
import projectSettings from "../../constants/projectSettings";
import apiList from "../../services/apis/apiList";
import Error from "next/error";
const product = {
	title: "CBD Isolate 500 mg",
};
import * as analytics from "../../analytics/analytics";

const Product = ({ product, allProducts, ...props }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		setIsScrolled(true);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, isScrolled);

	useEffect(() => {
		analytics.page("shop/pid");
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
	const productAttr = getProductAttributes(product, allProducts);
	const image = getProductImage(product, "sectionB"); //|| "/images/cbd-oil.png"
	const productImage = getProductImage(product)
		? projectSettings.serverUrl + getProductImage(product)
		: "/images/cbd-oil.png";
	if (props.err) {
		return <Error {...props.err} />;
	}
	return (
		<Layout headerTheme="dark" fixed={true}>
			<ProductInfo
				product={product}
				reviews={props.reviews}
				productAttr={productAttr.filter((el, i) =>
					product.combo ? i < 2 : i < 1
				)}
				image={productImage}
			></ProductInfo>
			<HImgSection
				parentClass={"c-product-single"}
				version={["full"]}
				image={projectSettings.filePath + image}
			>
				<div>
					<Heading>{getProductDescription(product)}</Heading>
				</div>
				<div className="c-product-single__list">
					{productAttr.map((el, i) => {
						if (product.combo ? i < 2 : i < 1) return null;
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
				<ProductDetailsTab
					product={product}
					reviews={props.reviews}
					allProducts={allProducts}
					parentClass="c-product-single"
				/>
			</div>
			<div className="c-product-single__related-section">
				<div className="row">
					<div className="col-md-6">
						<Heading versions={["default", "upper", "weight-500"]}>
							Accompany with
						</Heading>
					</div>
					<div className="col-md-6">
						<Heading
							subHeading={true}
							versions={["default", "lft-br"]}
						></Heading>
					</div>
					<div className="col-12">
						<ProductSlider
							parentClass="c-product-single"
							products={allProducts}
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};
Product.getInitialProps = async ({ query, res: resMain }) => {
	// const {
	//     baseUrl
	// } = projectSettings
	let product = null;
	const res = await fetch(apiList.getProductByName + query.pid);
	// const res           = await fetch(apiList.getProductById+query.pid)
	const productObj = await res.json();

	if (!productObj.product_details) {
		const res = await fetch(apiList.getProductById + query.pid);
		const productObj = await res.json();
		product = getVisibleProducts([productObj.product_details]);
	} else {
		product = getVisibleProducts([productObj.product_details]);
	}

	const reviewRes = await fetch(apiList.getReviews + query.pid);
	const reviews = await reviewRes.json();

	const allRes = await fetch(apiList.getAllProducts);
	const allProductObj = await allRes.json();
	const allProducts = getVisibleProducts(allProductObj.products).filter(
		(el) => el._id !== query.pid
	);
	if (product.length && product[0] && productObj.status) {
		return {
			res,
			product: product.length && product[0],
			productObj,
			allProducts,
			allProductObj,
			reviews: reviews.reviews,
		};
	}
	resMain.statusCode = 404;
	return {
		err: {
			statusCode: 404,
		},
	};
};
export default connect((state) => ({
	cart: state.cart,
	user: state.user,
}))(Product);
