import classNames from "classnames";
import Button from "./form-components/Button";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions/cart";
import { directAddToCart, getProductTitle } from "../services/helpers/product";
import Link from "next/link";
import { showCartBar } from "../redux/actions/drawers";

import * as analytics from "../analytics/analytics";
const ProductCard = ({
	versions,
	parentClass,
	image,
	title,
	subTitle,
	price,
	addToCart,
	product,
	showCartBar,
}) => {
	const componentClass = `c-product-card`;
	const versionClass = versions
		.map((el) => `${componentClass}--${el}`)
		.join(" ");
	const parent = `${parentClass}__${componentClass.replace("c-", "")}`;
	const className = classNames(componentClass, {
		[versionClass]: versions,
		[parent]: parentClass,
	});
	const addToCartFn = (product) => {
		if (product) {
			addToCart(directAddToCart(product));
			showCartBar();
		}
	};
	const CardUpper = () => (
		<div onClick={() => analytics.click(product)}>
			<div className={`${componentClass}__img-wrapper`}>
				<img className={`${componentClass}__img`} src={image} alt={title} />
			</div>
			<div className={`${componentClass}__info`}>
				<p className={`${componentClass}__title`}>{title}</p>
				<p className={`${componentClass}__sub-title`}>{subTitle}</p>
			</div>
		</div>
	);
	return (
		<div className={className}>
			{product && product._id ? (
				<Link href={`/shop/${getProductTitle(product).replace(/ /g, "-")}`}>
					<a className={`${componentClass}__overlay-link`}>
						<CardUpper />
					</a>
				</Link>
			) : (
				<CardUpper />
			)}
			<div className={`${componentClass}__btn-wrapper`}>
				{price && <p className={`${componentClass}__price`}>${price}</p>}
				<Button
					onClick={() => {
						addToCartFn(product);
						analytics.addProduct(product);
					}}
					parentClass={componentClass}
					theme="brand"
				>
					Add to Cart
				</Button>
			</div>
		</div>
	);
};
ProductCard.defaultProps = {
	versions: [],
};
export default connect(null, { addToCart, showCartBar })(ProductCard);
