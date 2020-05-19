import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import InfiniteScroll from "react-infinite-scroller";

import Header from "../../components/blog/Header/Header";
import MainSection from "../../components/blog/MainSection/MainSection";
import Layout from "../../components/Layouts/Layout";
import Article from "../../components/blog/Article";

import * as actionCreators from "../../redux/actions/blog";
import * as analytics from "../../analytics/analytics";
let prev = 0;
let more = true;
class BlogPage extends React.Component {
	state = {
		toggle: false,
	};
	articleClickHandler = (index) => {
		console.log("i got aclick");
		console.log(index);
		this.props.getArticle(index);
		this.setState({
			toggle: true,
		});
	};
	navClickHandler = (tag) => {
		this.props.get(0, tag);
		console.log("i got aclick in nav");
		console.log(tag);
	};
	backHandler = () => {
		console.log("back clicked");
		this.setState({ toggle: !this.state.toggle });
	};

	loadItems = (page) => {
		console.log("loaditems", page);
		this.props
			.get(page, "All")
			.then(() => {
				console.log("ok");
				if (prev !== this.props.article.length) {
					prev = this.props.article.length;
					more = true;
				} else {
					more = false;
				}
			})
			.catch((err) => console.log(err));
	};

	componentDidMount = () => {
		analytics.page("blog");
		console.log("component mounted");
		// const func = this.props.get;
		// func(0, "All")
		// 	.then(() => console.log("ok"))
		// 	.catch((err) => console.log(err));
		this.props
			.get(0, "All")
			.then(() => {
				prev = this.props.article.length;
				console.log("ok", prev);
			})
			.catch((err) => console.log(err));
	};
	hasmoreHandler = () => {
		console.log("hasmore");
	};
	render() {
		const loader = <div>Loading...</div>;
		return (
			<Layout
				title="Home"
				headerTheme="dark"
				homeLogo={false}
				pageClass={"c-home"}
			>
				{this.state.toggle ? (
					<Article
						data={this.props.current}
						navClickHandler={this.navClickHandler}
						backHandler={this.backHandler}
					/>
				) : (
					<>
						<Header />
						<InfiniteScroll
							pageStart={0}
							loadMore={this.loadItems.bind(this)}
							hasMore={more}
							loader={loader}
							threshold={500}
						>
							<MainSection
								articleClickHandler={this.articleClickHandler}
								navClickHandler={this.navClickHandler}
							/>
						</InfiniteScroll>
					</>
				)}
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		article: state.blog.article,
		current: state.blog.current,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		get: (pageNo, tag) => dispatch(actionCreators.get(pageNo, tag)),
		getArticle: (index) => dispatch(actionCreators.getArticle(index)),
		back: () => ({ type: CLEAR }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
