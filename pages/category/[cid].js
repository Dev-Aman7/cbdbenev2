import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import HImgSection from "../../components/HImgSection";
import HHSection from "../../components/HHSection";
import BundleProducts from "../../components/BundleProducts";
import Heading from "../../components/Heading";
import Logo from "../../components/Logo";
import apiList from "../../services/apis/apiList";
import ProductCard from "../../components/ProductCard";
import { adminUrl, imageUrl } from "../../constants/projectSettings";
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
import fetch from "isomorphic-unfetch";
// import { category as categoryData } from "../../site-content";
import parse from "html-react-parser";
import * as analytics from "../../analytics/analytics";

const Category = ({ productList, combos, ...props }) => {
	let [categoryData, setCategoryData] = useState({
		category: {
			topicals: {
				bannerTitle: `Ultimate Boon for your Skin.`,
				title: `Experience our topicals`,
				content: `Pamper your skin and provide it with the qualities of premium CBD. Reset your skincare routine and Revive your natural radiance.`,
				bundleTitle: `Curated Bundles for you!`,
				bundleContent: `Give our selected range of bundles a try with our 30-day, money-back guarantee. Gift someone goodness and enjoy premium CBD at an incredible price!`,
			},
			pets: {
				bannerTitle: `Quality CBD for your Four Legged Friend.`,
				title: `Experience our Pets line`,
				content: ` Our Pet products have been crafted to promote overall well-being and provide some extra comfort when your pet needs it. Buy the highest quality organic hemp to promote overall health while also encouraging a healthy appetite for your Pet.`,
				bundleTitle: ` Curated Bundles for you!`,
				bundleContent: ` Give our selected range of bundles a try with our 30-day, money-back guarantee. Gift someone goodness and enjoy premium CBD at an incredible price! `,
			},
			edibles: {
				bannerTitle: `The Taste of Earthly Paradise!`,
				title: `Savour our Edibles `,
				content: ` No matter how old we are, we have to take care of our bodies and hearts. Buy our Edibles which are a treat for your taste buds and your body system as well. Your favorite products with Premium CBD for the happiness of your Body and Heart.`,
				bundleTitle: `Curated Bundles for you!`,
				bundleContent: ` Give our selected range of bundles a try with our 30-day, money-back guarantee. Gift someone goodness and enjoy premium CBD at an incredible price! `,
			},
			capsules: {
				bannerTitle: `Pop, Swallow and Go on!`,
				title: `Experience our Capsules`,
				content: `They are perfect for when you are on the go, as each of these gel caps has been perfectly balanced to give you the correct amount of CBD. CBD capsules, make the most sense as part of your regular daily regimen. While you eat, just add in an extra CBD gel cap to get your cannabidiol serving!`,
				bundleTitle: `Curated Bundles for You!`,
				bundleContent: ` Give our selected range of bundles a try with our 30-day, money-back guarantee. Gift someone goodness and enjoy premium CBD at an incredible price! `,
			},
			oils: {
				bannerTitle: `Reduce and Relieve your Pain!`,
				title: `Experience our Oils`,
				content: ` CBD oil is fast-acting, convenient, and easy to use! Our CBD oil tinctures come in several concentrations to fit your needs and promote overall well-being.`,
				bundleTitle: `Curated Bundles for you!`,
				bundleContent: ` Give our selected range of bundles a try with our 30-day, money-back guarantee. Gift someone goodness and enjoy premium CBD at an incredible price!`,
			},
			bundles: {
				bannerTitle: "",
				title: "",
				content: "",
				bundleTitle: ` Curated Bundles for you! `,
				bundleContent: ` Give our selected range of bundles a try with our 30-day, money-back guarantee. Gift someone goodness and enjoy premium CBD at an incredible price! `,
			},

			default: {
				bannerTitle: "",
				title: "",
				content: "",
				bundleTitle: "",
				bundleContent: "",
			},
		},
	});

	useEffect(() => {
		console.log("UseEffect");
		analytics.page("category/cid");
		Axios.get(`${adminUrl}/Category/get`)
			.then((result) => {
				console.log("Result got md", result);
				setCategoryData({ category: result.data.data });
			})
			.catch((err) => console.log(err));
		return () => {};
	}, []);

	const products = productList.map((el) => {
		console.log({
			price: getBasicPrice(el),
			el,
		});
		return {
			image: el.productImage
				? projectSettings.serverUrl + el.productImage
				: "//via.placeholder.com/300x500",
			title: getProductTitle(el),
			subTitle: getProductShortDesc(el),
			price: getBasicPrice(el),
			...el,
		};
	});
	const currentCategory =
		categoryData[props.category] || categoryData.category.default;

	const bannerTitle = currentCategory.bannerTitle;
	const title = currentCategory.title;
	const content = currentCategory.content;
	const bundleTitle = currentCategory.bundleTitle;
	const bundleContent = currentCategory.bundleContent;
	return (
		<Layout headerVersions={["bg-light"]} fixed={true} headerTheme="dark">
			{/* <Layout headerVersions={["bg-dark"]} className="c-consult-page" title="Category">  */}
			<div className="c-category-page">
				<HImgSection
					parentClass="c-category-page"
					version={["full", "content-bottom"]}
					image={`${imageUrl}/Oil-Page-Image.png`}
				>
					<div>
						<Heading
							parentClass="c-category-page"
							versions={["lft-br", "large", "brand"]}
						>
							{parse(bannerTitle)}
						</Heading>
					</div>
					<br />
					<br />
					<br />
					<div>
						<Logo />
					</div>
				</HImgSection>
				<div className="c-category-page__products-wrapper">
					<div className="c-category-page__row row">
						<div className="col-lg-4 col-md-6 d-flex justify-content-center">
							<div className="c-category-page__heading-wrapper">
								<Heading parentClass="c-category-page" versions={["large"]}>
									{/* Discover
                                    <br />
                                    {`our ${props.category} line`} */}
									{parse(title)}
								</Heading>
								{parse(content)}
								<hr />
							</div>
						</div>
						{products.map((el) => (
							<div key={el._id} className="col-lg-4 col-md-6">
								<ProductCard
									product={el}
									versions={["show-price", "full-height"]}
									title={el.title}
									subTitle={el.subTitle}
									image={el.image}
									price={el.price && el.price.sale_price}
									// onClick={()=>analytics.click()}
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
									{/* TRY THE BUNDLES */}
									{parse(bundleTitle)}
								</Heading>
							</div>
							<div className="col-md-6">
								<Heading
									parentClass="c-category-page"
									subHeading={true}
									versions={["lft-br"]}
								>
									{/* Give our bundles a try with our 60-day, money-back guarantee. The perfect gift. A great way to enjoy premium CBD at an incredible price. All bundles are 20% off. */}
									{parse(bundleContent)}
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
Category.getInitialProps = async ({ query }) => {
	if (query.cid.toLowerCase() === "bundles") {
		const res = await fetch(apiList.getAllCombos);
		const productList = await res.json();
		const visibleProducts = getVisibleProducts(productList.combos);

		return {
			category: query.cid,
			productList: visibleProducts.map((el) => addSlugToProduct(el)),
			combos: [],
		};
	} else {
		const res = await fetch(apiList.getAllProducts);
		const productList = await res.json();
		const visibleProducts = getVisibleProducts(productList.products);

		const comboRes = await fetch(apiList.getAllCombos);
		const comboList = await comboRes.json();
		const visibleCombo = getVisibleProducts(comboList.combos);

		const categoryProduct = visibleProducts.filter((el) => {
			if (el.categoryid) {
				if (el.categoryid.constructor === Array) {
					return el.categoryid.some(
						(elx) =>
							elx.categorytitle &&
							elx.categorytitle.toLowerCase() === query.cid.toLowerCase()
					);
				} else if (el.categoryid.categorytitle) {
					return (
						el.categoryid.categorytitle.toLowerCase() ===
						query.cid.toLowerCase()
					);
				}
			}
			return false;
		});
		return {
			category: query.cid,
			productList: categoryProduct.map((el) => addSlugToProduct(el)),
			combos: visibleCombo.map((el) => addSlugToProduct(el)),
		};
	}
};
export default connect(null)(Category);
