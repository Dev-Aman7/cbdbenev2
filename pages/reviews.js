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
import ProductRating from "../components/ProductRating";

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

		analytics.page("reviews");
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
		const { activeCategory, products, combos } = this.state;
		// const {
		//   products
		// } = this.props
		console.log({
			props: this.props,
			products,
		});
		return (
			<Layout title="bené" fixed={true}>
				<div className="reviews">
					<div className="reviews__heading">
						<div className="reviews__wrap">
							<h1 className="reviews__wrap--text">
								<span className="reviews__wrap--xl">bene</span> reviews
							</h1>
						</div>
						<div clasName="reviews__icon">
							<img className="img-fluid" src="/images/logo-new.png" />
						</div>
					</div>
					<div className="reviews__img">
						<img className="img-fluid" src="/images/reviews-bnr.png" />
					</div>
				</div>

				<section className="write">
					<div className="write__reviews">
						<h3 className="write__reviews--text">
							What our clients think about <br />
							bené and how they rate us
						</h3>
						<a className="write__btn c-btn c-btn--outline " href="#">
							Write a reviews
						</a>
					</div>
				</section>
				<ProductRating />

				<section className="rating">
					<div className="container rating__wrapper">
						<div className="rating__star">
							<h5 className="rating__star--name">Name</h5>
						</div>
						<div className="rating__text">
							<h5 className="rating__text--name">Best product ever!!!</h5>
							<p className="rating__text--msg">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud.
							</p>
						</div>
						<div className="rating__date">
							<p className="rating__date--msg">12 september 2017</p>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}

export default connect((state) => state, { getProducts })(Home);
