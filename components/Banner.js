import Logo from "./Logo";
import classNames from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Banner = ({
	image,
	heading,
	content,
	imgAlt,
	children,
	image2x,
	bottomLogo,
	versions,
	parentClass,
	extraButton,
	mobileImage,
}) => {
	const componentClass = "c-banner";
	const versionClass = versions
		.map((el) => `${componentClass}--${el}`)
		.join(" ");
	const parent = `${parentClass}__${componentClass.replace("c-", "")}`;
	const className = classNames(componentClass, {
		[versionClass]: versions,
		[parent]: parentClass,
	});
	return (
		<div className={className}>
			<div className="c-banner__overlay" />
			{image2x && (
				<LazyLoadImage
					effect="opacity"
					className={classNames("c-banner__bg", {
						"c-banner__bg--desktop": mobileImage,
					})}
					srcSet={`${image2x} 2x, ${image || image2x} 1x`}
					src={image}
					alt={imgAlt ? imgAlt : "banner"}
				/>
			)}
			{!image2x && (
				<LazyLoadImage
					effect="opacity"
					className={classNames("c-banner__bg", {
						"c-banner__bg--desktop": mobileImage,
					})}
					src={image}
					alt={imgAlt ? imgAlt : "banner"}
				/>
			)}
			{mobileImage && (
				<LazyLoadImage
					effect="opacity"
					className="c-banner__bg c-banner__bg--mobile"
					src={mobileImage}
					alt={imgAlt ? imgAlt : "banner"}
				/>
			)}
			<div className="c-banner__content">
				{heading && <div className="c-banner__heading">{heading}</div>}
				{content && <p className="c-banner__text">{content}</p>}
				{children}
				{bottomLogo && <Logo parentClass={componentClass} />}
			</div>
			{extraButton && (
				<div className="c-banner__extra-btn-wrapper">{extraButton}</div>
			)}
		</div>
	);
};
Banner.defaultProps = {
	versions: [],
};
export default Banner;
