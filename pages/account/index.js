import React, { Component } from "react";
import Router from "next/router";
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Alert,
	Table,
	// Badge,
	Modal,
	ModalBody,
	// ModalFooter,
	ButtonGroup,
	ModalHeader,
	// Collapse
} from "reactstrap";
import Link from "next/link";
import onlyLogin from "../../components/hoc/onlyLogin";
import classNames from "classnames";
import { connect } from "react-redux";
// import { Helmet } from "react-helmet";
import msgStrings from "../../constants/msgStrings";
import Layout from "../../components/Layouts/Layout";

import { FullModal } from "../../components/modal";
import { addToCart } from "../../redux/actions/cart";
import { showCartBar } from "../../redux/actions/drawers";
import { variablePriceSet } from "../../services/extra/cartHealpers";
import { getProductTitle } from "../../services/helpers/product";
import {
	getProductDetailApi,
	getUserDetails,
	getOrders,
	getProductById,
} from "../../services/api";

// import { eye } from "react-icons-kit/fa";
import Icon from "react-icons-kit";
import BasicFunction from "../../services/extra/basicFunction";
import * as analytics from "../../analytics/analytics";
// import {
//   // getOrderList,
//   getOrderByUser,
//   orderDelete
// } from "../../services/api";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import Loader from "../../components/Loader";
// import { Lodar, } from "../";
// import { FullModal } from "../modal";
import OrderReview from "./orderReview";
import {
	ic_error_outline,
	// ic_remove_shopping_cart
} from "react-icons-kit/md";
import { addSlugToProduct } from "../../services/extra";
import projectSettings from "../../constants/projectSettings";
const basicFunction = new BasicFunction();
class MyAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderList: "",
			loginUserId: "",
			orderSingle: "",
			conformShow: false,
			conformSucess: false,
			conformFail: false,
			ConformClose: false,
			failShow: false,
			deleteOrderId: null,
			SpinnerToggle: true,
			reorderDetails: "",
			openReviewPid: null,
		};
		this.toggle = this.toggle.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);
		this.sweetAlert = this.sweetAlert.bind(this);
		this.reorder = this.reorder.bind(this);
	}
	componentDidMount() {
		const { user, history, location } = this.props;
		analytics.page("account");
		if (!user._id) {
			if (history) history.push("/" + location.countryCode + "/login");
		}
		if (user._id) {
			this.setState({
				loginUserId: user._id,
			});
		}
		getOrders(this.props.user.userMetaId)
			.then((res) => {
				const resJson = res.data;
				if (resJson.status) {
					const orderList = resJson.orders.sort(function(a, b) {
						return new Date(b.createdOn) - new Date(a.createdOn);
					});
					this.setState(
						{
							orderList: orderList.map((el) => ({
								...el,
								products: el.products.map((el) => addSlugToProduct(el)),
							})),
							SpinnerToggle: false,
						},
						() => {
							document.body.scrollTop = document.documentElement.scrollTop = 0;
						}
					);
				}
			})
			.catch((err) => {
				console.log({ err });
			});
	}
	componentDidUpdate(prevProps) {
		console.log({
			props: this.props,
		});
		if (prevProps.user !== this.props.user && this.props.user._id) {
			console.log({
				userProps: this.props.user,
			});
			getUserDetails(this.props.user._id).then((res) => {
				if (res && res.data && res.data.user) {
					const userMetaId = res.data.user._id;
					this.setState(
						{
							userMetaId,
						},
						() => {
							getOrders(userMetaId)
								.then((res) => {
									const resJson = res.data;
									if (resJson.status) {
										const orderList = resJson.orders.sort(function(a, b) {
											return new Date(b.createdOn) - new Date(a.createdOn);
										});
										this.setState(
											{
												orderList: orderList.map((el) => ({
													...el,
													products: el.products.map((el) =>
														addSlugToProduct(el)
													),
												})),
												SpinnerToggle: false,
											},
											() => {
												document.body.scrollTop = document.documentElement.scrollTop = 0;
											}
										);
									}
								})
								.catch((err) => {
									console.log({ err });
								});
						}
					);
				}
			});
		}
	}
	componentWillUnmount() {
		if (this.dismissTimeout) clearTimeout(this.dismissTimeout);
	}
	toggle(order = "") {
		this.setState({
			modal: true,
			orderSingle: order,
		});
	}
	toggle2(order = "") {
		this.setState({
			modal: false,
		});
	}
	openReviewCollapse = (openReviewPid) => {
		this.setState((prevState) => ({
			openReviewPid:
				openReviewPid === prevState.openReviewPid ? null : openReviewPid,
		}));
	};
	dismissReviewModal = () => {
		if (this.dismissReviewModal) clearTimeout(this.dismissReviewModal);

		this.openReviewCollapse(null);
	};
	sweetAlert(type) {
		switch (type) {
			case "openFirst":
				this.setState({
					conformShow: true,
				});
				break;
			case "openSecond":
				if (this.state.deleteOrderId) {
					const id = this.state.deleteOrderId;
					this.setState({
						SpinnerToggle: true,
					});
					orderDelete({ id })
						.then((res) => {
							const resJson = res.data;
							if (resJson.status) {
								this.setState({
									conformShow: false,
									conformSucess: true,
									deleteOrderId: null,
								});
							}
							getOrders(this.props.user.userMetaId)
								.then((res) => {
									resJson = res.data;
									if (resJson.status) {
										const revArr = resJson.orders;
										revArr.sort(function(a, b) {
											return new Date(b.createdOn) - new Date(a.createdOn);
										});
										// revArr.sort((a,b) => a.orderdate - b.orderdate);
										this.setState({
											orderList: revArr.map((el) => ({
												...el,
												products: el.products.map((el) => addSlugToProduct(el)),
											})),
											SpinnerToggle: false,
										});
									}
								})
								.catch((err) => {});
						})
						.catch((err) => {});
				}
				this.setState({
					conformShow: false,
					conformSucess: true,
				});
				break;
			case "closeFirst":
				this.setState({
					conformShow: false,
					conformSucess: false,
				});
				break;
			case "closeSecond":
				this.setState({
					conformSucess: false,
					conformShow: false,
				});
				break;
			case "openThird":
				this.setState({
					failShow: true,
					conformShow: false,
				});
				break;
			case "closeThird":
				this.setState({
					failShow: false,
				});
				break;
			default:
				break;
		}
	}

	deleteOrder(orderId) {
		this.setState({
			deleteOrderId: orderId,
		});
		this.sweetAlert("openFirst");
	}
	getEstimateTotal() {}
	getCouponCodeDiscountTotal() {}

	reorder(order) {
		this.setState({
			SpinnerToggle: true,
		});
		order.products.map((itm, index) => {
			console.log({
				itm,
			});
			getProductById(itm.productMeta || itm.comboId)
				.then((res) => {
					const resJson = res.data;
					console.log({
						resJson,
					});
					if (resJson.product_details.producttype === "variable") {
						const product = resJson.product_details;
						var productItem = { ...product };
						productItem.qty = itm.qty;
						resJson.product_details.attributes.map((key, index) => {
							const attribute = key.names;

							const labelValue = {
								label: itm.attribute[attribute],
								value: itm.attribute[attribute],
							};
							productItem = { ...productItem, [attribute]: labelValue };
							return null;
						});
						console.log({
							productItem,
						});
						this.props.addToCart(variablePriceSet(productItem));
						this.props.showCartBar();
					} else {
						const product = resJson.product_details;
						productItem = { ...product };
						productItem.qty = itm.qty;
						console.log({
							productItem,
						});
						this.props.addToCart(variablePriceSet(productItem));
						this.props.showCartBar();
					}
				})
				.catch((err) => {});
			return null;
		});
	}

	render() {
		const {
			cancelOrder,
			myOrderPageFooterDetails,
			warningText,
			productDetailModalTitle,
			projectName,
		} = msgStrings;
		const { invoiceUrl } = projectSettings;
		var countVal = 0;
		const { location, className } = this.props;
		const { openReviewPid } = this.state;
		this.state.orderList &&
			this.state.orderList.map((order, i) => {
				console.log({
					orderId: order.userId,
					loginUserId: this.state.loginUserId,
				});
				return order.userId === this.state.loginUserId ? (countVal = 1) : "";
			});

		var serNo = 0;
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<div
					className={classNames("my-order", {
						[className]: className,
					})}
				>
					{/* <Helmet>
          <title>{projectName} | My Account</title>
        </Helmet> */}
					{/* {this.state.SpinnerToggle && <Loader />} */}
					<div className="container-fluid">
						<div className="my-order__heading">
							<h3>My order</h3>
						</div>
					</div>
					<div className="my-order__wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-2 ">
									<MyAccountSidebar activeLink="MY ACCOUNT" />
								</div>
								<div className="col-lg-10 ">
									<Card className="panel-section my-order__panel">
										<CardBody className="my-order__card-body">
											<div className="my-order__detail">
												<div className="my-order__alert">
													<Alert color="dark" className="my-order__alert--msg">
														Recent Purchases
													</Alert>
												</div>
												<CardTitle>
													<div className="panel-section__descp">
														{this.state.orderList &&
														this.state.orderList.length > 0 ? (
															<Table className="new-res-table my-order__table">
																<thead className="my-order__thead">
																	<tr>
																		<th>S.No.</th>
																		<th>Product Name</th>
																		<th>Price</th>
																		<th>Date</th>
																		<th>Status</th>
																		<th>Action</th>
																	</tr>
																</thead>
																<tbody>
																	{this.state.orderList.map(
																		(order, i) => {
																			const unReviewed =
																				order.products &&
																				order.products.filter(
																					(el) => !el.reviewed
																				).length;
																			console.log({
																				unReviewed,
																				order,
																			});
																			return (
																				// order.userid === this.state.loginUserId ? (
																				<tr key={i} className="my-order__t-row">
																					<th
																						className="sr-number my-order__t-head my-order__table--sno"
																						scope="row"
																					>
																						{(serNo = serNo + 1)}
																					</th>
																					<td
																						data-label="Name"
																						className="my-order__t-col my-order__table--name"
																					>
																						{order.products.map((pro, i) => {
																							const link = `/shop/${pro.title.replace(
																								/ /g,
																								"-"
																							)}`;
																							return (
																								<p>
																									<Link key={i} href={link}>
																										<a className="my-order__t-link">
																											{pro.title}
																										</a>
																									</Link>
																								</p>
																							);
																						})}
																					</td>
																					<td
																						data-label="Price"
																						className="inline-data my-order__t-col my-order__table--price"
																					>
																						{basicFunction.currancyAddWithNumber(
																							order.grandTotal
																						)}
																					</td>
																					<td
																						data-label="Date"
																						className="inline-data my-order__t-col my-order__table--date"
																					>
																						{basicFunction.dateTimeInMonthName(
																							order.createdOn
																						)}{" "}
																					</td>
																					<td
																						data-label="Status"
																						className="inline-data text-capitalize my-order__t-col my-order__table--status"
																					>
																						{order.deleted !== "true"
																							? // <Badge className="btn9">
																							  order.status
																							: // </Badge>
																							  // <Badge className="btn6">
																							  order.deleted
																						// </Badge>
																						}
																					</td>
																					<td
																						data-label="Action"
																						className="my-order__t-col my-order__table--action"
																					>
																						<ButtonGroup>
																							<Button
																								className="btn9 my-order__t-btn"
																								onClick={() =>
																									this.toggle(order)
																								}
																							>
																								{/* <Icon icon={eye} /> */}
																								View
																							</Button>
																							<span
																								style={{ minWidth: "2px" }}
																							/>
																							{/* {order.deleted !== "true" ? (
                                          <Button
                                            className="btn6 pl-3 pr-3"
                                            onClick={() =>
                                              this.deleteOrder(order._id)
                                            }
                                          >
                                            {" "}
                                            <Icon
                                              icon={ic_remove_shopping_cart}
                                            />
                                          </Button>
                                        ) : (
                                          ""
                                        )} */}
																							<Button
																								className="btn9 my-order__t-btn"
																								onClick={() =>
																									this.reorder(order)
																								}
																							>
																								Reorder
																							</Button>
																							<span
																								style={{ minWidth: "2px" }}
																							/>
																							<Button
																								target="_blank"
																								className="btn9 my-order__t-btn"
																								// to={}
																								onClick={() => {
																									window.open(
																										`${invoiceUrl}${order._id}.pdf`
																									);
																								}}
																							>
																								{/* <Icon icon={eye} /> */}
																								Invoice
																							</Button>
																						</ButtonGroup>
																						<div className="pt-3 my-order__t-note">
																							{unReviewed && (
																								<Link
																									href={`/submit-reviews/${order._id}`}
																								>
																									<span className="cursor-pointer hover-text-line">
																										Write a product review
																									</span>
																								</Link>
																							)}

																							<FullModal
																								toggle={this.dismissReviewModal}
																								isOpen={
																									openReviewPid === order._id
																								}
																							>
																								<OrderReview
																									onSuccess={() => {
																										this.dismissTimeout = setTimeout(
																											() => {
																												this.dismissReviewModal();
																											},
																											1500
																										);
																									}}
																									order={order}
																								/>
																							</FullModal>
																						</div>
																					</td>
																				</tr>
																			);
																		}
																		// ) : null
																	)}
																</tbody>
															</Table>
														) : (
															<h3 className="my-order__msg-title">
																You currently don't have any purchases.
															</h3>
														)}
													</div>
												</CardTitle>
											</div>
											<CardSubtitle className="my-order__subtitle">
												From here you can:
												{myOrderPageFooterDetails &&
												myOrderPageFooterDetails.length > 0 ? (
													<ul className="myAccount-recent-parchase-ul my-order__list-wrap ">
														{myOrderPageFooterDetails.map((det, i) => (
															<li className="my-order__listing" key={i}>
																{det.details}
															</li>
														))}
													</ul>
												) : (
													""
												)}
											</CardSubtitle>

											<Link href={"/shop"}>
												<a className="btn or-btn btn-outline-shopping btn-icon c-btn c-btn--outline my-order__shopping">
													Start Shopping
												</a>
											</Link>
										</CardBody>
									</Card>
								</div>
							</div>
						</div>
					</div>
					<div>
						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle2}
							className={this.props.className + " order-view-modal full-modal"}
						>
							<ModalHeader toggle={this.toggle2}>
								{productDetailModalTitle}
							</ModalHeader>
							<ModalBody className="center-modal p-0">
								<div className="modal-inner">
									<Table className="new-res-table">
										<thead>
											<tr>
												<th>Product Name</th>
												<th>Price</th>
												<th>Quantity</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
											{this.state.orderSingle &&
											this.state.orderSingle.products.length > 0
												? this.state.orderSingle.products.map((itm, i) => {
														console.log({
															itm,
															orderSingle: this.state.orderSingle,
														});
														return (
															<tr key={i} className="table__repeated-row">
																<td data-label="Title"> {itm.title}</td>
																<td data-label="Rate" className="inline-data">
																	{" "}
																	{basicFunction.currancyAddWithNumber(
																		parseFloat(itm.unitPrice)
																	)}
																</td>
																<td
																	data-label="Quantity"
																	className="inline-data"
																>
																	{" "}
																	{itm.qty}
																</td>
																<td data-label="Price" className="inline-data">
																	{itm.subscribed ? (
																		<div>
																			<strike>
																				{basicFunction.currancyAddWithNumber(
																					itm.unitPrice * itm.qty
																				)}
																			</strike>
																			<br />
																			<span>
																				{basicFunction.currancyAddWithNumber(
																					itm.unitPrice * itm.qty -
																						basicFunction.getParchantage(
																							itm.subscribedDiscountPersent,
																							itm.unitPrice * itm.qty
																						)
																				)}
																			</span>
																		</div>
																	) : (
																		basicFunction.currancyAddWithNumber(
																			itm.subTotal
																		)
																	)}
																</td>
															</tr>
														);
												  })
												: ""}

											<br />
											<br />
											<tr className="order-view-bottom">
												<td className="hide-in-res" colSpan="3">
													Sub Total
												</td>
												<td data-label="Sub Total" className="inline-data">
													{basicFunction.currancyAddWithNumber(
														this.state.orderSingle.wholeSubtotal || 0
													)}
												</td>
											</tr>
											<tr className="order-view-bottom">
												<td className="hide-in-res" colSpan="3">
													Shipping Charge
												</td>
												<td
													data-label="Shipping Charge"
													className="inline-data"
												>
													{basicFunction.currancyAddWithNumber(
														this.state.orderSingle.shippingCharge || 0
													)}
												</td>
											</tr>
											<tr className="order-view-bottom">
												<td className="hide-in-res" colSpan="3">
													Estimated Tax
												</td>
												<td data-label="Estimated Tax" className="inline-data">
													{basicFunction.currancyAddWithNumber(
														basicFunction.getParchantage(
															parseFloat(this.state.orderSingle.countryTax),
															this.state.orderSingle.wholeSubtotal +
																this.state.orderSingle.shippingcharge
														) ||
															(this.state.orderSingle.taxAmount &&
																this.state.orderSingle.taxAmount.toFixed(2)) ||
															0
													)}
												</td>
											</tr>
											{this.state.orderSingle.couponDisc ? (
												<tr className="order-view-bottom">
													<td className="hide-in-res" colSpan="3">
														Coupon discount ({" "}
														{this.state.orderSingle.couponDisc}
														%)
													</td>
													<td
														data-label="Coupon discount"
														className="inline-data"
													>
														-{" "}
														{basicFunction.currancyAddWithNumber(
															basicFunction.getParchantage(
																parseFloat(this.state.orderSingle.couponDisc),
																this.state.orderSingle.wholeSubtotal
															) || 0
														)}
													</td>
												</tr>
											) : (
												""
											)}

											<tr className="order-view-bottom">
												<td className="hide-in-res" colSpan="3">
													Grand Total
												</td>
												<td data-label="Grand Total" className="inline-data">
													{basicFunction.currancyAddWithNumber(
														this.state.orderSingle.grandTotal
													)}
												</td>
											</tr>
											{/* <tr>
                      <td className="hide-in-res" colSpan="3">
                        Payment Method
                      </td>
                      <td data-label="Payment Method" className="inline-data">
                        {this.state.orderSingle.paymentMethod}
                      </td>
                    </tr> */}
										</tbody>
									</Table>

									{this.state.orderSingle.userdetails ? (
										<div>
											<h4>
												<b>User Details</b>
											</h4>
											{this.state.orderSingle.userdetails.firstname ? (
												<h5>
													<b>Name : </b>
													{this.state.orderSingle.userdetails.firstname}{" "}
													{this.state.orderSingle.userdetails.lastname}
												</h5>
											) : (
												""
											)}
											{this.state.orderSingle.userdetails.email ? (
												<h5>
													<b>Email : </b>
													{this.state.orderSingle.userdetails.email}{" "}
												</h5>
											) : (
												""
											)}
											{this.state.orderSingle.userdetails.phonenumber ? (
												<h5>
													<b>Phone : </b>
													{this.state.orderSingle.userdetails.phonenumber}{" "}
												</h5>
											) : (
												""
											)}
											<hr />
											{this.state.orderSingle.userdetails.shippingaddress ? (
												<p>
													<b>Shipping Address: </b>
													{this.state.orderSingle.userdetails.shippingaddress}
												</p>
											) : (
												""
											)}
											{this.state.orderSingle.userdetails.billingaddress ? (
												<p>
													<b>Billing Address: </b>
													{this.state.orderSingle.userdetails.billingaddress}
												</p>
											) : (
												""
											)}
										</div>
									) : (
										""
									)}
									{/* <hr /> */}
								</div>
							</ModalBody>
							{/* <ModalFooter>
              <Button color="secondary" onClick={this.toggle2}>
                Close
              </Button>
            </ModalFooter> */}
						</Modal>
					</div>

					<div>
						<Modal
							isOpen={this.state.conformShow}
							toggle={() => this.sweetAlert("openThird")}
							className={"full-modal"}
						>
							<ModalHeader toggle={() => this.sweetAlert("openThird")}>
								{warningText}
							</ModalHeader>
							<div className="Modal-body center-modal">
								<div className="modal-inner">
									<div className="modal-content p-3">
										<Icon
											icon={ic_error_outline}
											className="text-center"
											size="64"
										/>
										<br />
										<p className="text-center title-80">{cancelOrder}</p>
										<div className="row">
											<div className="col-md-6 ">
												<button
													className=" btn btn-info btn6 mx-auto"
													onClick={() => this.sweetAlert("openSecond")}
												>
													Yes, Cancel it!
												</button>
											</div>
											<div className="col-md-6">
												<button
													className="btn btn-info btn7 mx-auto"
													onClick={() => this.sweetAlert("openThird")}
												>
													No
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	location: state.location,
});
export default connect(mapStateToProps, { addToCart, showCartBar })(
	onlyLogin(MyAccount)
);
