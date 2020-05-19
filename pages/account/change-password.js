import React, { Component } from "react";
import { connect } from "react-redux";
// import { Helmet } from "react-helmet";
import MyAccountSidebar from "../../components/MyAccountSidebar";

import classNames from "classnames";
import Layout from "../../components/Layouts/Layout";
import {
	Card,
	CardBody,
	// CardSubtitle,
	Spinner,
	Collapse,
} from "reactstrap";
import { getUserDetails } from "../../services/api";
// import ProfileUpdate from "../ProfileUpdate";
import ProfileUpdatePassword from "../../components/ProfileUpdatePassword";

import * as analytics from "../../analytics/analytics";

class ChangePassword extends Component {
	constructor() {
		super();
		this.state = {
			userDetailsRes: {},
			isLoading: true,
		};
	}

	componentDidMount() {
		const { user, history, location } = this.props;
		// if (!user._id) {
		//   history.push("/" + location.countryCode + "/login");
		// }
		if (user._id) {
			this.getUserDetails(user._id);
			this.setState({
				userDetailsLocal: user,
			});
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		analytics.page("account/change-password");
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			const { user } = this.props;
			if (user._id) {
				this.getUserDetails(user._id);
				this.setState({
					userDetailsLocal: user,
				});
			}
		}
	}

	getUserDetails = (_id) => {
		getUserDetails(_id)
			.then((res) => {
				const rep = res.data;
				if (rep.user) {
					this.setState(
						{
							userDetailsRes: rep.user,
							isLoading: false,
						},
						() => {
							document.body.scrollTop = document.documentElement.scrollTop = 0;
						}
					);
				} else {
					this.setState({
						isLoading: false,
					});
				}
			})
			.catch((error) => {
				console.log({
					error,
				});

				this.setState({
					isLoading: false,
				});
			});
	};
	render() {
		const { user, countryCode, className } = this.props;
		// if (!user._id) this.props.history.push(`/${countryCode}/login`);

		// return <div></div>
		const { userDetailsRes, isLoading } = this.state;
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<div
					className={classNames("my-order", {
						[className]: className,
					})}
				>
					<div className="container-fluid">
						<div className="my-order__heading">
							<h3>Change Password</h3>
						</div>
					</div>
					<div className="my-order__wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-2 ">
									<MyAccountSidebar activeLink="changePassword" />
								</div>
								<div className="col-lg-10 ">
									{isLoading && (
										<div className="p-5 text-center">
											<Spinner color="dark" />
										</div>
									)}
									{!isLoading && (
										<div>
											<Card className="panel-section my-order__panel ">
												{/* <Alert color="dark">YOUR PERSONAL DETAILS</Alert> */}
												<CardBody className="a-cp__card-body">
													<Collapse isOpen={true}>
														<ProfileUpdatePassword
															userDetailsRes={userDetailsRes}
															noTitle={true}
														/>
													</Collapse>
												</CardBody>
											</Card>
										</div>
									)}
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
	countryCode: state.location.countryCode,
});
export default connect(mapStateToProps)(ChangePassword);
