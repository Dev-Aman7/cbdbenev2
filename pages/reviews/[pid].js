import Layout from "../../components/Layouts/Layout";
import Banner from "../../components/Banner";
import { connect } from "react-redux";
// import Button from "../../components/form-components/Button";
import apiList from "../../services/apis/apiList";
// import ScrollAnimation from "react-animate-on-scroll";
// import Fade from "react-reveal/Fade";
import moment from "moment";
import ProductRating from "../../components/ProductRating";
import fetch from "isomorphic-unfetch";
import * as analytics from "../../analytics/analytics";
class Home extends React.Component {
	static async getInitialProps({ query }) {
		const res = await fetch(apiList.getReviews + query.pid);
		const reviews = await res.json();
		return {
			reviews: reviews.reviews,
		};
	}
	componentDidMount = () => {
		analytics.page("reviews/pid");
	};
	render() {
		const { reviews } = this.props;
		return (
			<Layout title="bené" headerTheme="dark" fixed={true}>
				<div className="reviews">
					<div className="reviews__heading">
						<div className="reviews__wrap">
							<h1 className="reviews__wrap--text">
								<span className="reviews__wrap--xl">bene</span> reviews
							</h1>
						</div>
						<div className="reviews__icon">
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
				<ProductRating reviews={reviews} />

				<section className="rating">
					{/* <div className="container rating__wrapper">
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
          </div> */}
					{reviews.map((review, key) => (
						<ReviewItem review={review} key={key} />
					))}
				</section>
			</Layout>
		);
	}
}
const ReviewItem = ({ review }) => (
	<div className="container rating__wrapper">
		<div className="rating__star">
			<h5 className="rating__star--name">
				{review.userid ? review.userid.email.split("@")[0] : "Guest"}
			</h5>
		</div>
		<div className="rating__text">
			<h5 className="rating__text--name">{review.title}</h5>
			<p className="rating__text--msg">{review.content}</p>
		</div>
		<div className="rating__date">
			<p className="rating__date--msg">
				{moment(review.createdOn).format("DD MMMM YYYY")}
			</p>
		</div>
	</div>
);
export default connect(
	(state) => ({
		state,
	}),
	{}
)(Home);
