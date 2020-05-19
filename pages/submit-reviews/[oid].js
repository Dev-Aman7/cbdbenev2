import Layout from "../../components/Layouts/Layout";
import Heading from "../../components/Heading";
import { Rate } from "antd";
import ReactIcon from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md/";
import { connect } from "react-redux";
import Error from "next/error";
import { Form, Radio as AntRadio, Icon } from "antd";
import Input from "../../components/form-components/Input";
import Button from "../../components/form-components/Button";
import Checkbox from "../../components/form-components/Checkbox";
import Loader from "../../components/Loader";
import apiList from "../../services/apis/apiList";
import { addReviews, getOrders, getProductById } from "../../services/api";
import projectSettings from "../../constants/projectSettings";
import { FullModal } from "../../components/modal";
// import Dropdown from '../../components/form-components/Dropdown';
import {
	getProductTitle,
	getProductImage,
	getProductAttributes,
	getVisibleProducts,
	getProductDescription,
} from "../../services/helpers/product";

import * as analytics from "../../analytics/analytics";
// import {Button} from 'antd';
class SubmitReviews extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			isError: false,
			selectedProduct: null,
		};
	}
	static async getInitialProps({ query }) {
		return {
			orderId: query.oid,
		};
	}
	componentDidMount() {
		if (this.props.user && this.props.user._id) {
			this.getOrders(this.props.user.userMetaId);
		}
		analytics.page("submit-reviews/oid");
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			this.getOrders(this.props.user.userMetaId);
		}
	}
	getOrders = (userMetaId) => {
		this.setState({
			isLoading: true,
		});
		getOrders(userMetaId)
			.then((res) => {
				const resJson = res.data;
				if (resJson.status) {
					const { orderId } = this.props;
					let orderid = orderId;
					const orderList = resJson.orders
						.sort(function(a, b) {
							return new Date(b.createdOn) - new Date(a.createdOn);
						})
						.map((el) => ({
							...el,
							products: el.products.filter((el) => !el.reviewed),
						}));
					const order = orderList.find((el) => {
						if (el._id === orderId) {
							return el.products.length > 0;
						}
						return false;
					});
					this.setState(
						{
							orderList,
							order,
							isError: order ? false : true,
							isLoading: false,
							selectedProduct:
								order && order.products.length === 1 ? order.products[0] : null,
						},
						() => {
							console.log({
								order,
								orderList,
							});
							document.body.scrollTop = document.documentElement.scrollTop = 0;
						}
					);
				}
			})
			.catch((err) => {
				this.setState({
					isLoading: false,
				});
				console.log({ err });
			});
	};
	render() {
		const { isLoading, isError, order, selectedProduct } = this.state;
		if (isError) return <Error statusCode="404" />;

		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark">
				{isLoading && <Loader />}
				{order &&
					order.products &&
					order.products.length > 1 &&
					!selectedProduct && <></>}
				<section className="c-submit-r__item">
					<div className="container">
						<div className="row c-submit-r__row">
							<div className="c-submit-r__item-row">
								<div className="c-submit-r__img-wrap">
									<img
										className="img-fluid"
										src={
											selectedProduct &&
											projectSettings.serverUrl +
												getProductImage(selectedProduct)
										}
									/>
								</div>
								<div className="c-submit-r__heading">
									<h3 className="c-submit-r__heading__title">
										{selectedProduct && getProductTitle(selectedProduct)}
									</h3>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="c-submit-r__about">
					<div className="container">
						<div className="row">
							<div className="w-100 mt-auto c-submit-r__about--center">
								<Heading>
									LET'S GET STARTED! <br />
									WHAT DID YOU THINK ABOUT THIS PRODUCT?
								</Heading>
							</div>
						</div>
					</div>
				</section>
				<WrappedNormalLoginForm
					selectedProduct={selectedProduct}
					order={order}
				/>
				<FullModal isOpen={!selectedProduct}>
					<div className="c-submit-r__product-selector">
						<div className="modal__logo-wrapper">
							<a className="c-logo  modal-footer__logo" href="/">
								<img
									src="/images/logo-new.png"
									className="modal__logo-img"
									alt="bené"
								/>
							</a>
							<div className="modal__heading">
								<h2 className="modal__heading-text">Choose a product :-</h2>
							</div>
						</div>
						<div className="modal-dismiss" onClick={this.toggle}>
							<ReactIcon icon={ic_clear} size={"32"} />
						</div>
						<div className="c-susbmit-r__wrapper">
							{order &&
								order.products.map((el, i) => (
									<div className="c-susbmit-r__p-selector-wrap" key={i}>
										<span
											className="c-btn c-btn--outline modal__button"
											onClick={() =>
												this.setState({
													selectedProduct: el,
												})
											}
										>
											{getProductTitle(el)}
										</span>
									</div>
								))}
						</div>
					</div>
				</FullModal>
			</Layout>
		);
	}
}

class NormalLoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
		};
	}
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				this.setState(
					{
						isLoading: true,
					},
					() => {
						const { selectedProduct } = this.props;
						console.log({ selectedProduct });
						const { overall } = values;
						getProductById(
							selectedProduct.productMeta || selectedProduct.comboId
						)
							.then((res) => {
								console.log({ res });
								if (res.data.product_details) {
									const { combo } = res.data.product_details;
									const data = {
										...values,
										effectiveness: overall,
										quality: overall,
										vmoney: overall,
									};
									const review = combo
										? {
												...data,
												comboid: selectedProduct.productId,
										  }
										: {
												...data,
												productmetaid: selectedProduct.productMeta,
												productId: selectedProduct.productId,
												orderid: this.props.order._id,
										  };
									addReviews(review)
										.then((res) => {
											console.log({
												res,
											});
											if (res.data.status) {
												// alert("success")
											}
										})
										.catch((err) => {
											// alert("fail")
											console.log({ err });
										});
								}
							})
							.catch((err) => {
								console.log({
									err,
								});
								// alert("fail")
								this.setState({
									isLoading: false,
								});
							});

						setTimeout(() => {
							this.setState({
								isLoading: false,
							});
						}, 2000);
					}
				);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { isLoading } = this.state;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				{isLoading && <Loader />}
				<section className="c-submit-r__rating">
					<div className="c-submit-r__row row justify-content-center">
						<div className="col-lg-6 text-center ">
							<div className="c-submit-r__rating__wrapper">
								<div className="c-submit-r__rating--name">
									<h3 className="c-submit-r__rating--name__small">
										Overall <br /> rating
									</h3>
								</div>
								<div className="c-submit-r__rating--star">
									<Form.Item>
										{getFieldDecorator("overall", {
											initialValue: 4,
										})(
											<Rate
												style={{ color: "#000" }}
												className="c-product-info__stars"
											/>
										)}
									</Form.Item>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="c-submit-r__rating">
					<div className="c-submit-r__row row justify-content-center">
						<div className="col-lg-6 text-center">
							<div className="c-submit-r__rating__wrapper">
								<div className="c-submit-r__rating--name">
									<h3 className="c-submit-r__rating--name__small">
										I WOULD RECOMMEND
										<br /> THIS PRODUCT
									</h3>
								</div>
								<div className="c-submit-r__rating--star">
									<div className="radio__wrapper">
										<Form.Item>
											{getFieldDecorator("recommend", {
												initialValue: "yes",
											})(
												<AntRadio.Group>
													<AntRadio
														className="c-contact-form__radio b-border-none"
														value="yes"
													>
														<b>Yes</b>
													</AntRadio>
													<AntRadio
														className="c-contact-form__radio b-border-none"
														value="no"
													>
														<b>No</b>
													</AntRadio>
												</AntRadio.Group>
											)}
										</Form.Item>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="s-review__form container ">
					<div className="row justify-content-center">
						<div className="col-md-6 s-review__from-wrapper">
							{/* <Form.Item>
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input
                        parentClass="c-contact-form"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Your Name"
                        versions={["light"]}
                        label="Your Name"
                    />,
                    )}
                </Form.Item> */}

							<Form.Item>
								{getFieldDecorator("title", {
									rules: [
										{ required: true, message: "Please input review title!" },
									],
								})(
									<Input
										prefix={
											<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
										}
										placeholder="Review title"
										versions={["light"]}
										label="Review title"
										parentClass="c-contact-form c-input__input"
									/>
								)}
							</Form.Item>

							<Form.Item>
								{getFieldDecorator("content", {
									rules: [
										{ required: true, message: "Please tell us details!" },
									],
								})(
									<Input
										prefix={
											<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
										}
										versions={["light"]}
										label="Review details"
										parentClass="c-contact-form"
									/>
								)}
							</Form.Item>
						</div>
					</div>
				</div>
				<div className="s-review__form container ">
					<div className="row justify-content-center">
						<div className="col-md-12">
							<h3 className="s-review__from-heading">
								Tell us more about yourself and connect
							</h3>
						</div>
						<div className="col-md-6 s-review__from-wrapper">
							<Form.Item>
								{getFieldDecorator("location", {
									rules: [
										{
											required: true,
											message: "Please tell us where are you from!",
										},
									],
								})(
									<Input
										prefix={
											<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
										}
										placeholder="Review details"
										versions={["light"]}
										label="Where are you from?"
										parentClass="c-contact-form"
									/>
								)}
							</Form.Item>

							<Form.Item>
								{getFieldDecorator("profession", {
									rules: [
										{ required: true, message: "Please tell us who are you !" },
									],
								})(
									<Input
										prefix={
											<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
										}
										versions={["light"]}
										label="Who are you (ex. Yogi)"
										parentClass="c-contact-form"
									/>
								)}
							</Form.Item>

							<Form.Item>
								{getFieldDecorator("age", {
									rules: [
										{ required: true, message: "Please tell us your age!" },
									],
								})(
									<Input
										prefix={
											<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
										}
										versions={["light"]}
										label="How Old Are You?"
										parentClass="c-contact-form"
									/>
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator("notification", {
									valuePropName: "checked",
									initialValue: true,
									// rules: [
									//     {
									//         required: true,
									//         message: 'Please agree the terms and conditions.',
									//         transform: value => (value || undefined),
									//         type: 'boolean',
									//     },
									// ],
								})(
									<Checkbox versions={["gold"]}>
										I agree to receive e-mail notification about my review
									</Checkbox>
								)}
								<Button theme="outline" type="submit" versions={["block"]}>
									Submit
								</Button>
							</Form.Item>
						</div>
					</div>
				</div>
			</Form>
		);
	}
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
	NormalLoginForm
);

// SubmitReviews.getInitialProps = async ({query, res: resMain})=> {
//     const res           = await fetch(apiList.getProductById+query.pid)
//     const productObj    = await res.json()
//     const product       = getVisibleProducts([productObj.product_details])

//     if(product.length && product[0] || productObj.status){
//         return {
//             product: product.length && product[0],
//             query,
//             productObj
//         }
//     }
//     resMain.statusCode = 404
//     return {
//         err: {
//             statusCode : 404
//         }
//     }
// }

const mapStateToProps = (state) => ({
	user: state.user,
});
export default connect(mapStateToProps)(SubmitReviews);
