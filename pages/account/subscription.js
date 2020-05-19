import React, { Component } from "react";
import { Card, CardBody, CardTitle, Alert, Table } from "reactstrap";
import { connect } from "react-redux";
import Link from "next/link";
import classNames from "classnames";
import BasicFunction from "../../services/extra/basicFunction";

import { Select } from "antd";
import { FullModal } from "../../components/modal";
import { ModalHeader } from "reactstrap";
import Layout from "../../components/Layouts/Layout";
import {
	// subscriptionGetApi,
	getOrders,
	getUserDetails,
	authorizeSubscriptionCancel,
	authorizeChargeProfile,
	authorizeSubscriptionProfile,
} from "../../services/api";
import { Button, ButtonGroup } from "reactstrap";
import MyAccountSidebar from "../../components/MyAccountSidebar";

import Loader from "../../components/Loader";
import { addSlugToProduct } from "../../services/extra";
import { getCards } from "../../redux/actions";
import msgStrings from "../../constants/msgStrings";
import moment from "moment";
import * as analytics from "../../analytics/analytics";

const basicFunction = new BasicFunction();
const { Option } = Select;
class MySubscription extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subscriptionList: "",
			loginUserId: "",
			SpinnerToggle: true,
			modifyId: null,
			selectedSubs: null,
			subsDurationModified: "6",
			isModalMsg: false,
		};
	}
	componentDidMount() {
		const { user, history, location } = this.props;
		// if (!user._id) {
		//   history.push("/" + location.countryCode + "/login");
		// }
		analytics.page("account/subscription");
		if (user._id) {
			// let userid = user._id;
			if (user.userMetaId) {
				this.props.getCards(user._id);
				getOrders(user.userMetaId)
					.then((res) => {
						const resJson = res.data;
						if (resJson.status) {
							const orderList = resJson.orders.sort(function(a, b) {
								return new Date(b.createdOn) - new Date(a.createdOn);
							});
							const orderList2 = orderList.map((el) =>
								el.products.map((elx) => ({
									...addSlugToProduct(elx),
									orderId: el._id,
									oldOrder: el,
								}))
							);
							const productList = flatten(orderList2);
							const subscriptionList = productList.filter(
								(el) => el.isSubscribed && !el.subscriptionFailed
							);
							this.setState(
								{
									subscriptionList,
									SpinnerToggle: false,
								},
								() => {
									console.log({
										subscriptionList,
										orderList2,
										productList,
									});
									document.body.scrollTop = document.documentElement.scrollTop = 0;
								}
							);
						} else {
							this.setState(
								{
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

						this.setState(
							{
								SpinnerToggle: false,
							},
							() => {
								document.body.scrollTop = document.documentElement.scrollTop = 0;
							}
						);
					});
			} else {
				getUserDetails(user._id).then((resRaw) => {
					const res = resRaw.data;
					if (res.user && res.user._id) {
						this.props.getCards(user._id);
						getOrders(user.userMetaId)
							.then((res) => {
								const resJson = res.data;
								if (resJson.status) {
									const orderList = resJson.orders.sort(function(a, b) {
										return new Date(b.createdOn) - new Date(a.createdOn);
									});
									const orderList2 = orderList.map((el) =>
										el.products.map((elx) => ({
											...addSlugToProduct(elx),
											orderId: el._id,
											oldOrder: el,
										}))
									);
									const productList = flatten(orderList2);
									const subscriptionList = productList.filter(
										(el) => el.isSubscribed && !el.subscriptionFailed
									);
									this.setState(
										{
											subscriptionList,
											SpinnerToggle: false,
										},
										() => {
											document.body.scrollTop = document.documentElement.scrollTop = 0;
										}
									);
								} else {
									this.setState(
										{
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
								this.setState(
									{
										SpinnerToggle: false,
									},
									() => {
										document.body.scrollTop = document.documentElement.scrollTop = 0;
									}
								);
							});
					}
				});
			}

			// subscriptionGetApi({ userid })
			//   .then(res => res.json())
			//   .then(resJson => {
			//     if (resJson.status) {
			//       this.setState({
			//         subscriptionList: resJson.subscribed,
			//         SpinnerToggle: false
			//       });
			//     }
			//   })
			//   .catch(err => {});

			document.body.scrollTop = document.documentElement.scrollTop = 0;
			this.setState({
				loginUserId: user._id,
			});
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			const { user } = this.props;
			if (user._id) {
				// let userid = user._id;
				if (user.userMetaId) {
					this.props.getCards(user._id);
					getOrders(user.userMetaId)
						.then((res) => {
							const resJson = res.data;
							if (resJson.status) {
								const orderList = resJson.orders.sort(function(a, b) {
									return new Date(b.createdOn) - new Date(a.createdOn);
								});
								const orderList2 = orderList.map((el) =>
									el.products.map((elx) => ({
										...addSlugToProduct(elx),
										orderId: el._id,
										oldOrder: el,
									}))
								);
								const productList = flatten(orderList2);
								const subscriptionList = productList.filter(
									(el) => el.isSubscribed && !el.subscriptionFailed
								);
								this.setState(
									{
										subscriptionList,
										SpinnerToggle: false,
									},
									() => {
										console.log({
											subscriptionList,
											orderList2,
											productList,
										});
										document.body.scrollTop = document.documentElement.scrollTop = 0;
									}
								);
							} else {
								this.setState(
									{
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

							this.setState(
								{
									SpinnerToggle: false,
								},
								() => {
									document.body.scrollTop = document.documentElement.scrollTop = 0;
								}
							);
						});
				} else {
					getUserDetails(user._id).then((resRaw) => {
						const res = resRaw.data;
						if (res.user && res.user._id) {
							getOrders(res.user._id)
								.then((res) => {
									const resJson = res.data;
									if (resJson.status) {
										const orderList = resJson.orders.sort(function(a, b) {
											return new Date(b.createdOn) - new Date(a.createdOn);
										});
										const orderList2 = orderList.map((el) =>
											el.products.map((elx) => ({
												...addSlugToProduct(elx),
												orderId: el._id,
												oldOrder: el,
											}))
										);
										const productList = flatten(orderList2);
										const subscriptionList = productList.filter(
											(el) => el.isSubscribed && !el.subscriptionFailed
										);
										this.setState(
											{
												subscriptionList,
												SpinnerToggle: false,
											},
											() => {
												document.body.scrollTop = document.documentElement.scrollTop = 0;
											}
										);
									} else {
										this.setState(
											{
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
									this.setState(
										{
											SpinnerToggle: false,
										},
										() => {
											document.body.scrollTop = document.documentElement.scrollTop = 0;
										}
									);
								});
						}
					});
				}

				// subscriptionGetApi({ userid })
				//   .then(res => res.json())
				//   .then(resJson => {
				//     if (resJson.status) {
				//       this.setState({
				//         subscriptionList: resJson.subscribed,
				//         SpinnerToggle: false
				//       });
				//     }
				//   })
				//   .catch(err => {});

				document.body.scrollTop = document.documentElement.scrollTop = 0;
				this.setState({
					loginUserId: user._id,
				});
			}
		}
	}

	generateSubsData = (el, details) => {
		const { subsDurationModified } = this.state;
		const customAmount = parseFloat(el.subTotal); // + (Math.random() * 100)
		const {
			billto,
			profileid,
			paymentid,
			cardnumber,
			cardcode,
			expiry,
		} = details;
		console.log({
			details,
		});
		const subsData = {
			amount: parseFloat(customAmount.toFixed(2)),
			name: billto.firstName + billto.lastName,
			schedule: {
				interval: {
					length: "1",
					unit: "months",
				},
				startDate: moment().format("YYYY-MM-DD"),
				totalOccurrences: subsDurationModified || "1",
			},
			billto: {
				firstName: billto.firstName,
				lastName: billto.lastName,
			},
		};
		if (profileid && paymentid) {
			return {
				...subsData,
				profileid,
				paymentid,
			};
		}
		if (cardnumber && cardcode && expiry)
			return {
				...subsData,
				cardnumber,
				cardcode,
				expiry,
			};
	};
	extendSubscription = (data) => {
		// authorizeSubscriptionCancel
		this.setState(
			{
				SpinnerToggle: true,
			},
			() => {
				const { selectedSubs } = this.state;
				const { cards } = this.props;
				console.log({
					selectedSubs,
					cards,
				});
				if (cards && cards.cards) {
					const defaultCard =
						cards.cards.find((card) => card.isDefault) || cards[0];
					if (defaultCard) {
						const firstName =
							(selectedSubs &&
								selectedSubs.oldOrder &&
								selectedSubs.oldOrder.userDetails &&
								selectedSubs.oldOrder.userDetails.firstname) ||
							"no name";
						const lastName =
							(selectedSubs &&
								selectedSubs.oldOrder &&
								selectedSubs.oldOrder.userDetails &&
								selectedSubs.oldOrder.userDetails.lastname) ||
							"no name";
						const { customerProfileId, customerPaymentProfileId } = defaultCard;
						const subscriptionid = selectedSubs.subscriptionId;
						console.log({
							subscriptionid,
							selectedSubs,
						});
						authorizeSubscriptionCancel({
							subscriptionid,
						})
							.then((res) => {
								// console.clear()
								console.log({
									res,
								});
								const resJson = res.data;
								if (resJson.status) {
									const subsData = this.generateSubsData(selectedSubs, {
										billto: {
											firstName,
											lastName,
										},
										profileid: customerProfileId,
										paymentid: customerPaymentProfileId,
									});
									authorizeSubscriptionProfile(subsData)
										.then((reCreateRes) => {
											console.log({
												reCreateRes,
											});
											const newSubsRes = {
												...reCreateRes.data,
											};
											const newSubsPayload = {
												...subsData,
											};
											const oldSubs = {
												...selectedSubs,
											};
											this.setState({
												isModalMsg: true,
												successMessage: "Your Subscription has been updated!",
												errorMessage: null,
												SpinnerToggle: false,
											});
										})
										.catch((err) => {
											console.log({
												err,
											});
											this.setState({
												isModalMsg: true,
												successMessage: null,
												errorMessage: "Subscription Failed",
												SpinnerToggle: false,
											});
										});
								} else {
									this.setState({
										isModalMsg: true,
										successMessage: null,
										errorMessage: resJson.message,
										SpinnerToggle: false,
									});
								}
							})
							.catch((err) => {
								this.setState({
									isModalMsg: true,
									successMessage: null,
									errorMessage: "Subscription Failed",
									SpinnerToggle: false,
								});
							});
					} else {
						this.setState({
							isModalMsg: true,
							successMessage: null,
							errorMessage: "No payment method added!",
							SpinnerToggle: false,
						});
					}
				} else {
					this.setState({
						isModalMsg: true,
						successMessage: null,
						errorMessage: "No payment method added!",
						SpinnerToggle: false,
					});
				}
			}
		);
	};
	dismissModal = () => {
		this.setState({
			modifyId: null,
			selectedSubs: null,
		});
	};
	render() {
		const { location, className } = this.props;
		const { projectName } = msgStrings;
		const {
			modifyId,
			subsDurationModified,
			errorMessage,
			successMessage,
			isModalMsg,
		} = this.state;
		const productLink = (subs) => {
			// if (subs.productmeta) {
			//   if (subs.productmeta._id) {
			//     return (
			//       <Link to={"/" + location.countryCode + "/shop/" + subs.productSlug}>
			//         {subs.productid && subs.productid.producttitle}
			//       </Link>
			//     );
			//   }
			// }

			// if (subs.comboid) {
			//   if (subs.comboid._id) {
			//     return (
			//       <Link to={"/" + location.countryCode + "/shop/" + subs.productSlug}>
			//         {subs.comboid && subs.comboid.title}
			//       </Link>
			//     );
			//   }
			// }
			if (subs.title)
				return (
					<Link href={"/shop/" + subs.title.replace(/ /g, "-")}>
						<a className="my-order__t-link">{subs.title}</a>
					</Link>
				);

			return "-";
		};
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<div
					className={classNames("my-order", {
						[className]: className,
					})}
				>
					{/* <Helmet>
          <title>{projectName} | My Subscriptions</title>
        </Helmet> */}
					{this.state.SpinnerToggle && <Loader />}
					<div className="container-fluid">
						<div className="my-order__heading">
							<h3>My order</h3>
						</div>
					</div>
					<div className="my-order__wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-2 ">
									<MyAccountSidebar activeLink="MY SUBSCRIPTION" />
								</div>
								<div className="col-lg-10 ">
									{/* <h1>Your Subscription</h1> */}
									<br />
									<Card className="panel-section my-order__panel">
										<CardBody>
											<div className="my-order__detail">
												<div className="my-order__alert">
													<Alert color="dark" className="my-order__alert--msg">
														YOUR SUBSCRIPTION
													</Alert>
												</div>
												<CardTitle>
													<div className="table-responsive">
														{this.state.subscriptionList.length > 0 ? (
															<Table className="new-res-table my-order__table">
																<thead className="my-order__thead">
																	<tr>
																		<th>S. No.</th>
																		<th>Subscribed On</th>
																		<th>Duration</th>
																		<th>Product</th>
																	</tr>
																</thead>
																<tbody>
																	{this.state.subscriptionList.map(
																		(subs, index) => {
																			const subsDuration =
																				(subs.subscriptionMeta &&
																					subs.subscriptionMeta.duration) ||
																				0;
																			const subsEnd = moment(
																				subs.createdOn
																			).add(subsDuration, "months");
																			return (
																				<>
																					<tr
																						key={index}
																						className="my-order__t-row"
																					>
																						<th
																							className="sr-number my-order__t-head my-order__table--sno"
																							scope="row"
																						>
																							{index + 1}
																						</th>
																						<td
																							data-label="Product"
																							className="my-order__t-col my-order__table--name "
																						>
																							{productLink(subs)}
																						</td>
																						<td
																							data-label="Price"
																							className="inline-data my-order__t-col my-order__table--price"
																						>
																							$12.34
																						</td>
																						<td
																							className="inline-data my-order__t-col my-order__table--date"
																							data-label="Subscribed On"
																						>
																							{basicFunction.dateTimeInMonthName(
																								subs.createdOn
																							)}
																						</td>

																						<td
																							className="inline-data my-order__t-col my-order__table--date"
																							data-label="Subscribed On"
																						>
																							{subsEnd.format("MMMM DD, YYYY")}
																						</td>
																						<td
																							className="inline-data my-order__t-col my-order__table--status"
																							data-label="Duration"
																						>
																							{subs.subscriptionMeta &&
																								(subs.subscriptionMeta
																									.duration > 1
																									? `${subs.subscriptionMeta.duration} Months`
																									: `${subs.subscriptionMeta.duration} Month`)}
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
																									className="btn9 my-order__t-btn"
																									onClick={() => {
																										this.setState({
																											modifyId: subs._id,
																											selectedSubs: subs,
																											isModalMsg: false,
																										});
																									}}
																								>
																									Modify
																								</Button>
																								<span
																									style={{ minWidth: "2px" }}
																								/>
																							</ButtonGroup>
																						</td>
																						{/* <td>
                                  <a className="btn or-btn btn-light-grey">View</a>
                                </td> */}
																					</tr>
																					<FullModal
																						toggle={this.dismissModal}
																						isOpen={modifyId === subs._id}
																					>
																						<ModalHeader
																							toggle={this.dismissModal}
																						>
																							<div className="modal__logo-wrapper">
																								<a
																									className="c-logo  modal-footer__logo"
																									href="/"
																								>
																									<img
																										src="/images/logo-new.png"
																										className="modal__logo-img"
																										alt="bené"
																									/>
																								</a>
																								<div className="modal__heading">
																									<h2 className="modal__heading-text">
																										Modify Subscription
																									</h2>
																								</div>
																							</div>
																						</ModalHeader>
																						<div className="row mt-4 mb-4">
																							<div className="col-12 pt-5 pb-5 text-center">
																								{isModalMsg ? (
																									<div>
																										{errorMessage
																											? errorMessage
																											: successMessage}
																									</div>
																								) : (
																									<>
																										Extend your subscription for{" "}
																										<Select
																											onChange={(e) =>
																												this.setState({
																													subsDurationModified: e,
																												})
																											}
																											value={
																												subsDurationModified
																											}
																										>
																											<Option value="3">
																												3 Months
																											</Option>
																											<Option value="6">
																												6 Months
																											</Option>
																											<Option value="12">
																												1 Year
																											</Option>
																										</Select>{" "}
																										starting from today{" "}
																										<div className="d-inline-block">
																											<button
																												className="c-btn c-btn--outline modal__button"
																												onClick={
																													this
																														.extendSubscription
																												}
																											>
																												Save
																											</button>
																										</div>
																									</>
																								)}
																							</div>
																							{/* <div className="text-center">
                                      
                                    </div> */}
																						</div>
																					</FullModal>
																				</>
																			);
																		}
																	)}
																</tbody>
															</Table>
														) : (
															<h3 className="my-order__msg-title">
																You currently have not added any items to your
																subscription list.
															</h3>
														)}
													</div>
												</CardTitle>
											</div>
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
				</div>
			</Layout>
		);
	}
}

function flatten(arr) {
	return arr.reduce(function(flat, toFlatten) {
		return flat.concat(
			Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
		);
	}, []);
}
const mapStateToProps = (state) => ({
	user: state.user,
	location: state.location,
	cards: state.cards,
});
export default connect(mapStateToProps, {
	getCards,
})(MySubscription);

// subscription page
// 2nd date static
// prize in table
// action button
