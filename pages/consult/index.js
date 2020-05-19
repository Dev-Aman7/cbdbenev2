import Layout from "../../components/Layouts/Layout";
import Banner from "../../components/Banner";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions";
import CategoryProducts from "../../components/CategoryProducts";
import categoryList from "../../constants/categoryList";
import Heading from "../../components/Heading";
import ContactFrom from "../../components/forms/ContactForm";
import Button from "../../components/form-components/Button";
import TitleList from "../../components/TItleList";
import Head from "next/head";
import * as analytics from "../../analytics/analytics";
class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeCategory: "Featured",
			allProducts: props.products.products || [],
			products: props.products.featured || [],
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
		analytics.page("consult");
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
		const { activeCategory, products } = this.state;
		return (
			<Layout
				className="c-consult-page"
				title="Consult"
				headerTheme="dark"
				fixed={true}
			>
				<Banner
					image="/images/consult.jpg"
					image2x="/images/contact-banner@2x.jpg"
					heading={
						<span>
							Consult a certified <br />
							doctor about CBD
						</span>
					}
					bottomLogo={true}
					versions={[
						"hf-content",
						"align-left",
						"align-bottom",
						"heading-l-br",
						"btm-logo",
						"content",
						"no-overlay",
						"brand-heading",
					]}
					extraButton={
						<Button
							type="link"
							link="/consult/get-in-touch"
							versions={["outline-brand", "block"]}
						>
							Get in touch
						</Button>
					}
					content={
						<span>
							Get in touch with our doctors who have experience with CBD
						</span>
					}
				></Banner>
				<div className="c-consult-page__container overflow-hidden ">
					<div className="row">
						<div className="col-md-8 col-lg-7 d-flex flex-column ">
							<div className="mt-auto">
								<Heading>
									HOW DOES CBD <br /> CONSULT WORK?
								</Heading>
							</div>
							{/* <p>Please select a topic below related to your inquiry.</p> */}
							<div className="c-consult-page__lists mt-auto mb-auto">
								<TitleList
									serial="1."
									versions={["wide-title", "btm-border"]}
									title="Select a doctor and request an appointment"
								>
									Select a doctor licensed to practice in your state. Schedule
									your appointment and pay for your visit.
								</TitleList>
								<TitleList
									serial="2."
									versions={["wide-title", "btm-border"]}
									title="Prepare for the appointment"
								>
									Enter your medical history privately and securely.
								</TitleList>
								<TitleList
									serial="3."
									versions={["wide-title", "btm-border"]}
									title="Consult online or by phone"
								>
									Visit your doctor online or on the phone to discuss your
									individual needs and how they can be met.
								</TitleList>
							</div>
							<div className="text-md-right mt-4 mb-4">
								<Button
									type="link"
									link="/consult/get-in-touch"
									versions={["outline"]}
								>
									Get Started
								</Button>
							</div>
						</div>
						<div className="col-md-4 offset-lg-1">
							<img
								className="d-block mr-0 ml-auto c-consult-page__img-set"
								src="/images/consult-image.jpg"
							/>
						</div>
					</div>
				</div>
				<div className="c-consult-page__container c-consult-page__container--black">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<Heading versions={["white", "upper"]}>
								Topics you can discuss with the doctor:
							</Heading>
							<ul className="c-consult-page__list">
								<li className="c-consult-page__list-item">
									Can CBD help my specific condition?
								</li>
								<li className="c-consult-page__list-item">
									Topicals vs. Edibles vs. Oil drops: which CBD products should
									I buy?
								</li>
								<li className="c-consult-page__list-item">
									What are the potential interactions with supplements or
									prescription medications?
								</li>
								<li className="c-consult-page__list-item">
									What is my recommended CBD dosage?
								</li>
								<li className="c-consult-page__list-item">
									Have you prescribed CBD before and what were the results?
								</li>
								<li className="c-consult-page__list-item">
									What are the Side Effects?
								</li>
								<li className="c-consult-page__list-item">
									What are the different options available for taking CBD?
								</li>
							</ul>
							<div className="c-consult-page__button-wrapper">
								<Button
									type="link"
									link="/consult/get-in-touch"
									versions={["outline-brand", "block"]}
								>
									Get in touch
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.products,
});
Contact.defaultProps = {
	products: {},
};
export default connect(mapStateToProps, { getProducts })(Contact);
