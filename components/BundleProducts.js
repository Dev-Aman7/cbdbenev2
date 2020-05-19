import { useRef } from "react";
import Heading from "./Heading";
import classNames from "classnames";
import projectSettings from "../constants/projectSettings";
import Flickity from "react-flickity-component";
import Link from "next/link";
import SliderLine from "./SliderLine";
import { getProductImage } from "../services/helpers/product";
import ProductCard from "./ProductCard";

import * as analytics from "../analytics/analytics";

const BundleProducts = ({
	heading,
	subHeading,
	categoryList,
	activeCategory,
	onCategoryChange,
	products,
	bg,
	parentClass,
	versions,
}) => {
	console.log("bundle products");
	const componentClass = `c-category-products`;
	const versionClass = versions
		.map((el) => `${componentClass}--${el}`)
		.join(" ");
	const parent = `${parentClass}__${componentClass.replace("c-", "")}`;
	const className = classNames(componentClass, {
		[versionClass]: versions,
		[parent]: parentClass,
		[`c-category-products--${bg}`]: bg,
	});
	const sliderLine = useRef(null);
	let left = 0;
	const flickityInit = () => {
		setTimeout(() => {
			if (flkty) {
				flkty.on("scroll", (progress) => {
					if (!isNaN(progress)) {
						let pos = `${progress * 80}%`;
						sliderLine.current.style.left = pos;
					}
				});
			}
		}, 200);
	};
	const flResize = () => {
		if (flkty) flkty.resize();
	};
	let flkty = undefined;
	return (
		<div className={className}>
			{(heading || subHeading) && (
				<div className="c-category-products__heading-wrapper">
					{heading && (
						<Heading
							parentClass="c-category-products"
							versions={["default", "upper"]}
						>
							{heading}
						</Heading>
					)}
					{subHeading && (
						<Heading
							subHeading={true}
							parentClass="c-category-products"
							versions={["default", "lft-br"]}
						>
							{subHeading}
						</Heading>
					)}
				</div>
			)}
			<div className="row c-category-products__product-list">
				<Flickity
					options={{
						initialIndex: 0,
						pageDots: false,
						cellAlign: "left",
						contain: true,
						prevNextButtons: true,
						on: {
							ready: () => {
								flickityInit();
							},
						},
					}}
					flickityRef={(c) => (flkty = c)}
					disableImagesLoaded={false}
					reloadOnUpdate={true}
					className="c-category-products__slider"
				>
					{products
						.filter((product) => product.visibilitytype)
						.map((el, i) => {
							return (
								<div key={i} className="col-md-6 c-category-products__product">
									<ProductCard
										product={el}
										versions={["show-price", "full-height"]}
										title={el.title}
										subTitle={el.subTitle}
										image={projectSettings.serverUrl + getProductImage(el)}
										price={el.dsaleprice}
									/>
								</div>
							);
						})}
				</Flickity>
				<SliderLine ref={sliderLine} left={left} />
			</div>
		</div>
	);
};

BundleProducts.defaultProps = {
	categoryList: [],
	versions: [],
	products: [],
	activeCategory: "",
	onCategoryChange: () => {},
};

export default BundleProducts;
