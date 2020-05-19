import { withRedux } from "../redux";
import React, { useState } from "react";
import Layout from "../components/Layouts/Layout";
import Banner from "../components/Banner";
import LRSection from "../components/LRSection";
import HHSection from "../components/HHSection";
import CategoryProducts from "../components/CategoryProducts";
import categoryList from "../constants/categoryList";
import { getProducts } from "../redux/actions";
import { connect } from "react-redux";
import Button from "../components/form-components/Button";
import { getAllCombos } from "../services/api";
import BundleProducts from "../components/BundleProducts";
import ScrollAnimation from "react-animate-on-scroll";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { Collapse } from "reactstrap";
import { home as homeData } from "../site-content/index";
import parse from "html-react-parser";
import { Carousel } from "react-bootstrap";
import { adminUrl, imageUrl } from "../constants/projectSettings";
import Axios from "axios";

import * as analytics from "../analytics/analytics";
// import Head from 'next/head'
// import Nav from '../components/nav'
// import Header from '../components/Header'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeCategory: "Featured",
			allProducts: props.products.products || [],
			products: props.products.featured || [],
			combos: [],
			isLrSection: false,
			isWillness: false,
			homeData: {
				banner: {
					title: "",
					content: "",
					btnText: "",
				},
				categorySlider: {
					title: "",
				},
				thirdSection: {
					bigTitle: "",
					title: "",
					content: "",
					btnText: "",
				},
				bundlesSlider: {
					title: "",
					subTitle: "",
					btnText: "",
				},
				fifthSection: {
					title: "",
					content: "",
					btnText: "",
				},
			},
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.products.products !== prevState.allProducts) {
			console.log({
				allProducts: nextProps.products.products,
			});
			return {
				allProducts: nextProps.products.products,
			};
		} else return null;
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.products.products !== this.props.products.products) {
			this.changeCategory({ title: this.state.activeCategory });
		}
	}

	componentDidMount() {
		console.log("Comp mounted");
		analytics.page("index");
		Axios.get(`${adminUrl}/Home/get`)
			.then((result) => {
				console.log("Result got md", result);
				this.setState({
					homeData: result.data.data,
				});
			})
			.catch((err) => console.log(err));

		this.props.getProducts();
		getAllCombos().then((res) => {
			console.log({
				res,
			});
			if (res.data && res.data.combos) {
				this.setState({
					combos: res.data.combos,
				});
			}
		});
	}
	changeCategory = (activeCategory) => {
		const { products } = this.props;
		console.log({
			activeCategory,
			products,
		});
		if (activeCategory.title === "Featured") {
			this.setState({
				products: products.featured,
				activeCategory: activeCategory.title,
			});
		} else if (activeCategory.title === "All") {
			this.setState({
				products: products.products,
				activeCategory: activeCategory.title,
			});
		} else {
			const activeCategoryArr =
				products.categories.find(
					(el) => el.category.categorytitle === activeCategory.title
				) || {};
			this.setState({
				products: activeCategoryArr.products,
				activeCategory: activeCategory.title,
			});
		}
	};
	render() {
		let nextIcon = <span className="glyphicon glyphicon-glass"></span>;
		let prevIcon = <span className="glyphicon glyphicon-glass"></span>;
		const {
			activeCategory,
			products,
			combos,
			isLrSection,
			isWillness,
		} = this.state;
		// const {
		//   products
		// } = this.props
		console.log({
			props: this.props,
			products,
		});
		const {
			banner: {
				title: bannerTitle,
				content: bannerContent,
				btnText: bannerBtnText,
			},
			categorySlider: { title: categoryTitle },
			thirdSection: {
				bigTitle: thirdBirTitle,
				title: thirdTitle,
				content: thirdContent,
				btnText: thirdBtnText,
			},
			bundlesSlider: {
				title: bundlesTitle,
				subTitle: bundlesSubTitle,
				btnText: bundlesBtnText,
			},
			fifthSection: {
				title: fifthTitle,
				content: fifthContent,
				btnText: fifthBtnText,
			},
		} = this.state.homeData;

		return (
			<Layout
				title="Home"
				headerTheme="dark"
				homeLogo={false}
				pageClass={"c-home"}
				// headerVersions={["fixed"]}
			>
				<Carousel>
					<Carousel.Item>
						<div>
							<Banner
								image={`${imageUrl}/Banner-Image-1.png`}
								mobileImage={`${imageUrl}/Banner-Image-1.png`}
								versions={["brand-heading"]}
								// heading={<span><span style={{fontSize: "1.3em"}}>bené</span> fits <br />your life</span>}
								heading={parse(bannerTitle)}
								// content={<span>In our own quest to enhance total balance and <br />reduce stress, we set out to understand, what is CBD.</span>}
								content={parse(bannerContent)}
							>
								<Button
									parentClass="c-home"
									type="link"
									link="/shop"
									theme={"outline-brand"}
								>
									{bannerBtnText}
								</Button>
							</Banner>
						</div>
					</Carousel.Item>
					<Carousel.Item>
						<div>
							<Banner
								image={`${imageUrl}/Banner-Image-2.png`}
								mobileImage={`${imageUrl}/Banner-Image-2.png`}
								versions={["brand-heading"]}
								// heading={<span><span style={{fontSize: "1.3em"}}>bené</span> fits <br />your life</span>}
								heading={parse(bannerTitle)}
								// content={<span>In our own quest to enhance total balance and <br />reduce stress, we set out to understand, what is CBD.</span>}
								content={parse(bannerContent)}
							>
								<Button
									parentClass="c-home"
									type="link"
									link="/shop"
									theme={"outline-brand"}
								>
									{parse(bannerBtnText)}
								</Button>
							</Banner>
						</div>
					</Carousel.Item>
				</Carousel>
				{products && products.length > 0 && (
					<Fade>
						<CategoryProducts
							bg="light-2"
							categoryList={categoryList}
							activeCategory={activeCategory}
							onCategoryChange={this.changeCategory}
							products={products}
							heading={parse(categoryTitle)}
						/>
					</Fade>
				)}
				<Fade>
					<LRSection
						heading={parse(thirdBirTitle)}
						subHeading={parse(thirdTitle)}
						linkText={parse(thirdBtnText)}
						onLinkClick={() => {
							this.setState((prevState) => ({
								isLrSection: !prevState.isLrSection,
							}));
						}}
						// Link="/"
						image={`${imageUrl}/Bundle-Image.png`}
					>
						<div className="c-less-more">
							<div className="c-less-more__less">{parse(thirdContent)}</div>
							<Collapse isOpen={isLrSection}>
								<div className="c-less-more__whole">
									<div className="c-less-more__whole-inner">
										{parse(thirdContent)}
									</div>
								</div>
							</Collapse>
						</div>
					</LRSection>
				</Fade>
				<Fade>
					<HHSection
						heading={parse(bundlesTitle)}
						subHeading={parse(bundlesSubTitle)}
						linkText={parse(bundlesBtnText)}
						link="/shop"
						bg="light-2"
						// images={[
						//   "/images/cbd-group.png",
						//   "/images/oil-group.png"
						// ]}
					>
						<BundleProducts
							versions={["no-padding", "h-auto"]}
							bg="bggrey"
							products={combos}
						/>
					</HHSection>
				</Fade>
				<section className="wellness">
					<div className="wellness__heading">
						<h3 className="wellness__heading--text">{parse(fifthTitle)}</h3>
					</div>
					<div className="wellness-wrapper">
						<div className="wellness-wrapper__img">
							<img
								className="wellness-wrapper__img--img img-fluid"
								src={`${imageUrl}/Consult-Image.png`}
							/>
						</div>
						<div className="wellness-wrapper__desp">
							<div className="c-less-more">
								<div className="c-less-more__less c-less-more__less--large">
									{parse(fifthContent)}
								</div>
								<Fade when={isWillness}>
									<div className="c-less-more__whole">
										<div className="c-less-more__whole-inner  c-less-more__whole-inner--large">
											{parse(fifthContent)}
										</div>
									</div>
								</Fade>
							</div>

							{/* <p className="wellness-wrapper__desp--text">
                Today we're confident that were providing you with the highest quality CBD you can find. Our product line  is a collection, to suit a wide range of tastes and needs. We're dedicated to helping you get the products that suit you,  as well as your pets. That's right, we have CBD products for pets  too.
                </p> */}
							<div className="wellness-wrapper__btn">
								<div className="mt-4 mb-4">
									<Button
										parentClass="c-home"
										type="link"
										versions={["btm-br-light"]}
										onClick={() => {
											this.setState((prevState) => ({
												isWillness: !prevState.isWillness,
											}));
										}}
										theme={["btm-br"]}
									>
										{parse(fifthBtnText)}
									</Button>
								</div>
							</div>
							<div className="willness-img">
								<img
									className="img-fluid"
									src={`${imageUrl}/Wellness-Image-1.png`}
								></img>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}

export default connect((state) => state, { getProducts })(Home);
