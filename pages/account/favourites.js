import React, { Component } from "react";
import Icon from "react-icons-kit";
// import { Helmet } from "react-helmet";
import { trash, shoppingCart } from "react-icons-kit/fa";
import { connect } from "react-redux";
// import { filePath, encodeUrlFn } from "../../constants/Constants";
import projectSettings from "../../constants/projectSettings.js";
import { getProductTitle } from "../../services/helpers/product";
import classNames from "classnames";
import {
	favouritesAlreadyProductIntoCartMessage,
	addToCartMessage,
	projectName,
} from "../../constants/constantMessage";
import {
	Card,
	CardBody,
	CardTitle,
	Alert,
	Table,
	ButtonGroup,
	Button,
	// Modal
} from "reactstrap";
import {
	setFav,
	addToCart,
	setWishList,
	toggleCartBar,
} from "../../redux/actions";
import { Modal } from "../../components/modal";
import { variablePriceSet } from "../../services/extra/cartHealpers";
import {
	getWishList,
	deleteWishList,
	getProductById,
} from "../../services/api";
import Layout from "../../components/Layouts/Layout";
import Link from "next/link";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import Loader from "../../components/Loader";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
const { filePath } = projectSettings;
import * as analytics from "../../analytics/analytics";
class Favourites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: "",
			wishList: "",
			err: false,
			errMsg: "",
			visible: false,
			SpinnerToggle: true,
			showModal: false,
			isLoading: false,
			modalData: {
				title: "",
				msg: "",
			},
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.deleteWishList = this.deleteWishList.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
		// this.getWishlist = this.getWishlist.bind(this);
		this.addToCart = this.addToCart.bind(this);
	}
	componentDidMount() {
		const { user, location, history } = this.props;
		// if (!user._id) {
		//   history.push("/" + location.countryCode + "/favourites");
		// }
		if (user._id) {
			this.setState({
				user_id: user._id,
			});
			this.getWishlist();
		}
		analytics.page("account/favourites");
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			const { user } = this.props;
			if (user._id) {
				this.setState({
					user_id: user._id,
				});
				this.getWishlist();
			}
		}
	}
	toggleModal() {
		this.setState((prevState) => ({
			showModal: !prevState.showModal,
		}));
	}

	getWishlist = () => {
		const { user } = this.props;
		if (user._id) {
			const userid = user._id;

			getWishList(userid)
				.then((res) => {
					const resJson = res.data;
					if (resJson.success) {
						const wishList = resJson.wishlist.filter((itm) => {
							if (itm.productid && itm.productmeta._id) return true;
							return false;
						});
						const wishListCombo = resJson.combo.filter((itm) => {
							if (itm.comboid._id) return true;
							return false;
						});

						const wishListBoth = wishList.concat(wishListCombo);

						const items = wishListBoth;

						document.body.scrollTop = document.documentElement.scrollTop = 0;

						const data = items.map((itm) => {
							if (itm.combo) {
								// const productSlug = encodeUrlFn(itm.comboid.title);
								return {
									productid: itm.comboid._id,
									productmeta: itm.comboid._id,
									userid: userid,
									wishListId: itm._id,
									combo: true,
									productDetails: {
										...itm,
										comboid: {
											...itm.comboid,
											//   productSlug: productSlug.toLowerCase()
										},
									},
								};
							} else {
								// const productSlug = encodeUrlFn(itm.productid.producttitle);
								return {
									productid: itm.productid._id,
									productmeta: itm.productmeta._id,
									userid: userid,
									wishListId: itm._id,
									combo: false,
									productDetails: {
										...itm,
										productid: {
											...itm.productid,
											//   productSlug: productSlug.toLowerCase()
										},
									},
								};
							}
						});

						this.setState(
							{
								wishList: data,
								SpinnerToggle: false,
							},
							() => {
								console.log({
									props: this.props,
									setWishList,
								});
								setTimeout(() => {
									this.props.setFav(
										0,
										this.props.cart,
										this.props.user.userMetaId
									);
									this.props.setWishList(data);
								}, 100);
							}
						);
					}
				})
				.catch((err) => {});

			this.setState({
				user_id: user._id,
			});
		}
	};

	addToCart(id, productSlug) {
		var flag = false;
		const {
			location,
			cart,
			history,
			toggleCartBar,
			isCartBarOpen,
		} = this.props;
		cart.items.map((key) => {
			if (key._id === id) {
				flag = true;
			}
			return null;
		});
		if (flag) {
			this.setState(
				{
					isLoading: true,
					// showModal: true,
					modalData: {
						title: "",
						msg: favouritesAlreadyProductIntoCartMessage,
					},
				},
				() => {
					if (!isCartBarOpen) {
						toggleCartBar();
					}
					// setTimeout(() => {
					//   this.setState({
					//     showModal: false
					//   });
					// }, 3000);
				}
			);
		} else {
			getProductById(id)
				.then((res) => {
					const resJson = res.data;
					if (resJson.product_details.producttype === "variable") {
						if (
							resJson.product_details.attributes &&
							resJson.product_details.attributes.length === 1 &&
							resJson.product_details.attributes[0].values.length === 1
						) {
							const { attributes } = resJson.product_details;
							if (attributes) {
								if (attributes.constructor === Array) {
									const variablesArr = attributes
										.filter((el) => el)
										.map((el) => {
											const { values, names } = el;
											if (values) {
												if (values.constructor === Array) {
													if (values.length === 1) {
														return {
															[names]: {
																label: values[0],
																value: values[0],
															},
														};
													}
													return {
														[names]: null,
													};
												}
											}
											return null;
										})
										.filter((el) => el);

									const product = resJson.product_details;
									var productItem = { ...product };
									productItem = { ...productItem, ...variablesArr[0] };
									const qty = 1;
									productItem.qty = qty;
									this.setState(
										{
											isLoading: true,
											// showModal: true,
											modalData: {
												title: "",
												msg: addToCartMessage,
											},
										},
										() => {
											if (!isCartBarOpen) {
												toggleCartBar();
											}
											// setTimeout(() => {
											//   this.setState({
											//     showModal: false
											//   });
											// }, 3000);
										}
									);
									this.props.addToCart(
										variablePriceSet(productItem)
										// this.props.cart,
										// this.props.user.userMetaId
									);
								}
							}
						} else {
							history.push(
								"/shop/" + getProductTitle(productItem).replace(/ /g, "-")
							);
						}
					} else {
						const product = resJson.product_details;
						let productItem = { ...product };
						const qty = { label: 1, value: 1 };
						productItem.qty = qty;
						this.setState(
							{
								isLoading: true,
								// showModal: true,
								modalData: {
									title: "",
									msg: addToCartMessage,
								},
							},
							() => {
								if (!isCartBarOpen) {
									toggleCartBar();
								}
								// setTimeout(() => {
								//   this.setState({
								//     showModal: false
								//   });
								// }, 3000);
							}
						);
						this.props.addToCart(
							variablePriceSet(productItem),
							this.props.cart,
							this.props.user.userMetaId
						);
					}
				})
				.catch((err) => {});
		}
	}

	deleteWishList(ids, itm) {
		this.setState({
			SpinnerToggle: true,
		});

		var wishListArray = [...this.props.wishList];
		const removeIndex = basicFunction.checkProductInWishList(
			wishListArray,
			itm.productid
		);
		if (removeIndex || removeIndex === 0) {
			if (this.props.user._id) {
				var id = wishListArray[removeIndex].wishListId;
				deleteWishList({ id })
					.then((res) => {
						let resJson = res.data;
						if (resJson.success) {
							wishListArray.splice(removeIndex, 1);
							this.props.setWishList(wishListArray);
							this.getWishlist();
						}
					})
					.catch();
			}
		}
		this.setState({
			SpinnerToggle: false,
		});
	}
	onDismiss() {
		this.setState({ visible: false });
	}
	render() {
		const { modalData, showModal, wishList } = this.state;
		const { location, className } = this.props;
		// const {wishList} = this.props;

		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<div
					className={classNames("my-order", {
						[className]: className,
					})}
				>
					{/* <Helmet>
          <title>{projectName} | Favourites</title>
        </Helmet> */}
					{this.state.SpinnerToggle && <Loader />}

					<div className="container-fluid">
						<div className="my-order__heading">
							<h3>Favourites</h3>
						</div>
					</div>

					<div className="my-order__wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-2 ">
									<MyAccountSidebar activeLink="FAVOURITES" />
								</div>
								<div className="col-lg-10">
									<Card className="panel-section my-order__panel">
										<CardBody className="my-order__card-body">
											<div className="my-order__detail">
												<div className="my-order__alert">
													<Alert color="dark" className="my-order__alert--msg">
														YOUR FAVOURITES
													</Alert>
												</div>

												<CardTitle>
													<Alert
														color="info"
														isOpen={this.state.visible}
														toggle={this.onDismiss}
													>
														{this.state.errMsg}
													</Alert>
													<div className="table-responsive middletable">
														{wishList && wishList.length > 0 ? (
															<Table className="new-res-table my-order__table">
																<thead className="my-order__thead">
																	<tr>
																		<th>Product Image</th>
																		<th>Product Name</th>
																		<th>Action</th>
																	</tr>
																</thead>
																<tbody>
																	{wishList.map((itm, index) => {
																		console.log({
																			item: itm,
																		});
																		if (itm.combo) {
																			const {
																				featureimage,
																				title,
																				_id,
																				productSlug,
																			} = itm.productDetails.comboid;
																			console.log({
																				featureimage,
																				title,
																				_id,
																				productSlug,
																			});
																			return (
																				<tr
																					key={index}
																					className="my-order__t-row my-order__t-row--v-bottom"
																				>
																					<td className="my-order__t-col my-order__table--img">
																						{" "}
																						{itm.productDetails.comboid && (
																							<img
																								src={filePath + featureimage}
																								className="favrate-list-image-width"
																								alt="product"
																							/>
																						)}
																					</td>
																					<td className="my-order__t-col my-order__table--name">
																						{" "}
																						{title}{" "}
																					</td>
																					<td className="my-order__t-col my-order__table--action">
																						{_id ? (
																							<div>
																								<Link href={`/shop/`}>
																									<a className="btn9 mobile-remove-btn-padding my-order__t-btn">
																										View
																									</a>
																								</Link>
																								<ButtonGroup>
																									<Button
																										className="btn6 mobile-remove-btn-padding my-order__t-btn"
																										onClick={() =>
																											this.deleteWishList(
																												itm.wishListId,
																												itm
																											)
																										}
																									>
																										{" "}
																										{/* <Icon icon={trash} /> */}
																										Delete
																									</Button>
																									<Button
																										className="btn2 mobile-remove-btn-padding my-order__t-btn"
																										onClick={() => {
																											this.addToCart(
																												itm.productDetails
																													.comboid._id,
																												itm.productDetails
																													.comboid.productSlug
																											);
																										}}
																									>
																										{" "}
																										{/* <Icon icon={shoppingCart} /> */}
																										Buy
																									</Button>
																								</ButtonGroup>
																							</div>
																						) : (
																							""
																						)}
																					</td>
																				</tr>
																			);
																		} else if (false) {
																		}
																		return itm.combo ? (
																			<tr
																				key={index}
																				className="my-order__t-row my-order__t-row--v-bottom"
																			>
																				<td className="my-order__t-col my-order__table--img">
																					{" "}
																					{itm.productDetails.comboid && (
																						<img
																							src={
																								filePath +
																								itm.productDetails.comboid
																									.featureimage
																							}
																							className="favrate-list-image-width"
																							alt="product"
																						/>
																					)}
																				</td>
																				<td className="my-order__t-col my-order__table--name">
																					{itm.productDetails.comboid &&
																						itm.productDetails.comboid.title}
																				</td>
																				<td className="my-order__t-col my-order__table--action">
																					{itm.productDetails.comboid &&
																					itm.productDetails.comboid._id ? (
																						<div>
																							<ButtonGroup>
																								<Link
																									href={
																										"/shop/" +
																										getProductTitle(
																											itm
																										).replace(/ /g, "-")
																									}
																								>
																									<a className="btn9 mobile-remove-btn-padding my-order__t-btn">
																										View
																									</a>
																								</Link>
																								<Button
																									className="btn6 mobile-remove-btn-padding my-order__t-btn"
																									onClick={() =>
																										this.deleteWishList(
																											itm.wishListId,
																											itm
																										)
																									}
																								>
																									{" "}
																									{/* <Icon icon={trash} /> */}
																									Delete
																								</Button>
																								<Button
																									className="btn2 mobile-remove-btn-padding my-order__t-btn"
																									onClick={() =>
																										this.addToCart(
																											itm.productDetails.comboid
																												._id,
																											itm.productDetails.comboid
																												.productSlug
																										)
																									}
																								>
																									{" "}
																									{/* <Icon icon={shoppingCart} /> */}
																									Buy
																								</Button>
																							</ButtonGroup>
																						</div>
																					) : (
																						""
																					)}
																				</td>
																			</tr>
																		) : (
																			<tr
																				key={index}
																				className="my-order__t-row my-order__t-row--v-bottom"
																			>
																				<td className="my-order__t-col my-order__table--img">
																					{itm.productDetails.productid &&
																						itm.productDetails.productid
																							.featurefilepath && (
																							<img
																								src={
																									filePath +
																									itm.productDetails.productid
																										.featurefilepath
																								}
																								className="favrate-list-image-width"
																								alt="product"
																							/>
																						)}
																				</td>
																				<td className="my-order__t-col my-order__table--name">
																					{itm.productid &&
																						itm.productDetails.productid
																							.producttitle}
																				</td>
																				<td className="my-order__t-col my-order__table--action">
																					{itm.productmeta &&
																					itm.productDetails.productmeta._id ? (
																						<div>
																							<ButtonGroup>
																								<Link
																									href={
																										"/shop/" +
																										getProductTitle(
																											itm
																										).replace(/ /g, "-")
																									}
																								>
																									<a className="btn9 btn mobile-remove-btn-padding my-order__t-btn">
																										View
																									</a>
																								</Link>
																								<Button
																									className="btn6 mobile-remove-btn-padding my-order__t-btn"
																									onClick={() =>
																										this.deleteWishList(
																											itm._id,
																											itm
																										)
																									}
																								>
																									{" "}
																									{/* <Icon icon={trash} />
																									 */}
																									Delete
																								</Button>
																								<Button
																									className="btn2 mobile-remove-btn-padding my-order__t-btn"
																									onClick={() =>
																										this.addToCart(
																											itm.productDetails
																												.productmeta._id,
																											itm.productDetails
																												.productSlug
																										)
																									}
																								>
																									{" "}
																									{/* <Icon icon={shoppingCart} /> */}
																									Buy
																								</Button>
																							</ButtonGroup>
																						</div>
																					) : (
																						""
																					)}
																				</td>
																			</tr>
																		);
																	})}
																</tbody>
															</Table>
														) : (
															<h3>You currently don't have any favourites.</h3>
														)}
													</div>
												</CardTitle>
											</div>

											<Link href={"/shop"}>
												<a className="mt-5 btn or-btn btn-outline-shopping btn-icon c-btn c-btn--outline my-order__shopping">
													Start Shopping
												</a>
											</Link>
										</CardBody>
									</Card>
								</div>
							</div>
						</div>
					</div>
					<Modal
						isOpen={showModal}
						heading={modalData.title}
						toggle={this.toggleModal}
					>
						{/* <p className="text-center MCItemCarouselIntro-title">
            {modalData.title}
          </p> */}
						<p className="text-center title-80 p-3">{modalData.msg}</p>
					</Modal>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart,
	location: state.location,
	wishList: state.wishList,
	isCartBarOpen: state.drawers.isCartOpen,
});
export default connect(mapStateToProps, {
	setFav,
	addToCart,
	setWishList,
	toggleCartBar,
})(Favourites);
