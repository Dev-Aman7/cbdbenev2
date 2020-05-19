import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Loader from "../../components/Loader";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import { getUserDetails } from "../../services/api";
import { getAddress } from "../../redux/actions/address";
import SingleAddress from "../../components/address/singleAddress";
import classNames from "classnames";

import Layout from "../../components/Layouts/Layout";
import * as analytics from "../../analytics/analytics";
import {
	Card,
	CardBody,
	CardSubtitle,
	// CardTitle
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ic_library_add } from "react-icons-kit/md/ic_library_add";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/ikons/plus";
class ListAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SpinnerToggle: false,
		};
	}
	componentDidMount() {
		const {
			user: { _id: id },
			history,
			location,
		} = this.props;
		// if (!id) {
		//   history.push("/" + location.countryCode + "/login");
		// }
		if (id) {
			this.getuserDetails(id);
			this.props.getAddress(id);
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		analytics.page("account/address");
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			this.getuserDetails(this.props.user._id);
			this.props.getAddress(this.props.user._id);
		}
	}
	updateChckBoxafteruserUpdate() {
		const { user } = this.props;
		this.getuserDetails(user._id);
	}
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
			location,
			address: { address },
			className,
		} = this.props;
		console.log({ address });
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
							<h3>My Account</h3>
						</div>
					</div>
					<div className="my-order__wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-2 ">
									<MyAccountSidebar activeLink="PAYMENT METHOD" />
								</div>
								<div className="col-lg-10 ">
									<Card className="panel-section my-order__panel">
										<CardBody className="my-order__card-body">
											<div className="my-order__detail">
												<div className="my-order__alert pr-5">
													<h3 className="my-order__alert--msg">
														Your Addresses
													</h3>
												</div>
												<TransitionGroup className="row card-title">
													{address &&
														address.map((el, key) => (
															<CSSTransition
																key={key}
																timeout={300}
																classNames="transition-item3"
															>
																<SingleAddress
																	history={this.props.history}
																	address={el}
																/>
															</CSSTransition>
														))}
												</TransitionGroup>
											</div>
											<CardSubtitle className="my-order__subtitle">
												<CSSTransition
													timeout={300}
													className="my-order__transition-item3 col-md-12 mb-3"
												>
													<Card className="panel-section my-order__panel h-100">
														<CardBody className="my-order__card-body">
															<div className="h-100 d-flex my-order__add-item ">
																<h4 className="my-order__add-sm">
																	Add Address
																</h4>
																<Link href={"/account/add-address"}>
																	<a>
																		<center>
																			<Icon
																				style={{ color: "#cfa564" }}
																				size={14}
																				icon={plus}
																			/>
																		</center>
																	</a>
																</Link>
															</div>
														</CardBody>
													</Card>
												</CSSTransition>
											</CardSubtitle>
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
	address: state.address,
});
export default connect(mapStateToProps, {
	getAddress,
})(ListAddress);
