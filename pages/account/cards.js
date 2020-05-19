import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import { getUserDetails } from "../../services/api";
import SingleCard from "../../components/cardDetails/SingleCard";
import { Card, CardBody, CardTitle, Collapse } from "reactstrap";
import CardForm from "../../components/cardDetails/CardForm";
import CheckForm from "../../components/cardDetails/CheckForm";
import {
	ic_library_add,
	// ic_add, ic_clear
} from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/ikons/plus";
import { getCards } from "../../redux/actions";
import SingleCheck from "../../components/cardDetails/SingleCheck";
import Layout from "../../components/Layouts/Layout";

import classNames from "classnames";
import * as analytics from "../../analytics/analytics";
class ListCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SpinnerToggle: false,
			addCardForm: false,
			addCheckForm: false,
			isCardVisible: false,
			isChequeVisible: false,
			clearCardForm: false,
		};
		this.toggleAddCardFrom = this.toggleAddCardFrom.bind(this);
	}
	componentDidMount() {
		const { user, history, location } = this.props;
		// if (!user._id) {
		//   history.push("/" + location.countryCode + "/login");
		// }
		if (user._id) {
			this.getuserDetails(user._id);
			this.props.getCards(user._id);
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		analytics.page("account/card");
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			const { user } = this.props;
			this.getuserDetails(user._id);
			this.props.getCards(user._id);
		}
	}
	toggleAddCardFrom() {
		const {
			addCardForm,
			// addCheckForm
		} = this.state;
		this.setState({
			addCardForm: !addCardForm,
			addCheckForm: false,
		});
	}
	toggleAddCheckFrom() {
		const {
			addCheckForm,
			// addCardForm
		} = this.state;
		this.setState({
			addCheckForm: !addCheckForm,
			addCardForm: false,
		});
	}
	toggleCardVisible = () => {
		this.setState((prevState) => ({
			isCardVisible: !prevState.isCardVisible,
		}));
	};
	toggleChequeVisible = () => {
		this.setState((prevState) => ({
			isChequeVisible: !prevState.isChequeVisible,
		}));
	};
	getuserDetails(_id) {
		getUserDetails(_id)
			.then((res) => {
				const rep = res.data;
				if (rep.user) {
					this.setState(
						{
							userDetailsRes: rep.user,
							SpinnerToggle: false,
						},
						() => {
							document.body.scrollTop = document.documentElement.scrollTop = 0;
						}
					);
				} else {
				}
			})
			.catch((error) => {});
	}

	render() {
		const {
			addCardForm,
			addCheckForm,
			isCardVisible,
			isChequeVisible,
		} = this.state;
		const { cards, className } = this.props;
		const myCards = cards.cards && cards.cards.filter((el) => el.creditCard);
		const myCheques = cards.cards && cards.cards.filter((el) => el.bankAccount);
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<div
					className={classNames("my-order", {
						[className]: className,
					})}
				>
					{this.state.SpinnerToggle && <Loader />}
					<div className="container-fluid">
						<div className="my-order__heading">
							<h3 className="">Your Payment Details</h3>
						</div>
					</div>
					<div className="my-order__wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-2 ">
									<MyAccountSidebar activeLink="CARD METHOD" />
								</div>
								<div className="col-lg-10">
									<Card className="panel-section my-order__panel">
										<CardBody className="my-order__card-body">
											<div className="my-order__detail">
												<div className="my-order__alert">
													<h3 className="my-order__alert--msg">
														Recent Purchases
													</h3>
												</div>
												<CardTitle>
													<div className="row">
														<div className="col-12">
															{myCards && myCards.length > 0 && (
																<Card
																	// className="panel-section w-100"
																	className="w-100 border-0 "
																>
																	<div className="col-12 pt-3">
																		<div
																			// onClick={this.toggleCardVisible}
																			className="d-flex pb-2 justify-content-between"
																		>
																			<h4 className="">Your Cards</h4>
																			{/* {!isCardVisible && (
                                <Icon size={25} icon={ic_add} />
                              )}
                              {isCardVisible && (
                                <Icon size={25} icon={ic_clear} />
                              )} */}
																		</div>
																	</div>
																	<Collapse isOpen={isCardVisible || true}>
																		{myCards &&
																			myCards.map((el, key) => (
																				<SingleCard
																					card={el}
																					defaultCard={false}
																				/>
																			))}
																	</Collapse>
																</Card>
															)}
															{myCheques && myCheques.length > 0 && (
																<Card
																	// className="panel-section w-100"
																	className="w-100 border-0"
																>
																	<div className="col-12 pt-3">
																		<div
																			// onClick={this.toggleChequeVisible}
																			className="d-flex pb-2 justify-content-between"
																		>
																			<h4 className="">
																				Your Checking Accounts
																			</h4>
																			{/* {!isChequeVisible && (
                                <Icon size={25} icon={ic_add} />
                              )}
                              {isChequeVisible && (
                                <Icon size={25} icon={ic_clear} />
                              )} */}
																		</div>
																	</div>
																	<Collapse isOpen={isChequeVisible || true}>
																		{myCheques &&
																			myCheques.map((el, key) => (
																				<SingleCheck
																					card={el}
																					key={key}
																					defaultCard={false}
																				/>
																			))}
																	</Collapse>
																</Card>
															)}
														</div>
													</div>
												</CardTitle>

												<div className="col-md-8 offset-2 mb-3 mt-5">
													<Card className="panel-section border-0 ">
														<CardBody>
															<div className="row">
																<div className="col-md-12 col-sm-12">
																	<div
																		className="cursor-pointer d-flex my-order__add-item"
																		onClick={() => this.toggleAddCardFrom()}
																	>
																		<h4 className="my-order__add-sm  text-center">
																			Add Card
																		</h4>
																		<center>
																			<Icon size={14} icon={plus} />
																		</center>
																	</div>
																</div>
																<div className="col-md-12 col-sm-12">
																	<div
																		className="cursor-pointer d-flex my-order__add-item mt-3"
																		onClick={() => this.toggleAddCheckFrom()}
																	>
																		<h4 className="my-order__add-sm  text-center">
																			Add Checking Account
																		</h4>
																		<center>
																			<Icon size={14} icon={plus} />
																		</center>
																	</div>
																</div>
															</div>
															<Collapse
																onExited={() => {
																	this.setState(
																		{
																			clearCardForm: true,
																		},
																		() => {
																			this.setState({
																				clearCardForm: false,
																			});
																		}
																	);
																}}
																isOpen={addCardForm}
															>
																<CardForm
																	onSubmitSuccess={() => {
																		this.setState({
																			addCardForm: false,
																		});
																	}}
																	clearOnSuccess={true}
																	cardDetail=""
																/>
															</Collapse>
															<Collapse isOpen={addCheckForm}>
																<CheckForm
																	onSubmitSuccess={() => {
																		this.setState({
																			addCheckForm: false,
																		});
																	}}
																	clearOnSuccess={true}
																	cardDetail=""
																/>
															</Collapse>
														</CardBody>
													</Card>
												</div>
											</div>
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

const mapStateToProps = (state) => ({
	user: state.user,
	location: state.location,
	cards: state.cards,
});
export default connect(mapStateToProps, { getCards })(ListCard);
