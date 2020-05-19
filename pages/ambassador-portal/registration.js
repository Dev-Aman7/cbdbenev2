import React, { Component } from "react";
import { connect } from "react-redux";
import { isAlpha, isEmail, isEmpty, isNumeric } from "validator";
import {
	regHeading,
	regMsg,
	firstNameMissingErrMsg,
	lastNameMissingErrMsg,
	emailMissingErrMsg,
	emailNotValidErrMsg,
	phoneMissingErrMsg,
	phoneNotValidErrMsg,
	passwordValidErrMsg,
	passwordMissingErrMsg,
	passwordShortErrMsg,
	confirmPasswordErrMsg,
	passwordMatchErrMsg,
	zipValidErrMsg,
	zipMissingErrMsg,
	projectName,
} from "../../constants/constantMessage";
// import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import { countryCodeList } from "../../constants/allCountryCode";
import classNames from "classnames";
import { ambassadorPortalRegistration } from "../../services/api";
// import { ic_done, ic_error_outline, ic_clear } from "react-icons-kit/md/";
import { warning } from "react-icons-kit/fa/";
// import Icon from "react-icons-kit";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { regExReplace } from "../../constants/Constants";
import BasicFunction from "../../services/extra/basicFunction";
import FadeTransition from "../../services/extra/FadeTransition";
import ErrorBlock from "../../components/ErrorBlock";
import Link from "next/link";
import Layout from "../../components/Layouts/Layout";
import * as analytics from "../../analytics/analytics";

const basicFunction = new BasicFunction();
class Registration extends Component {
	constructor(props) {
		super(props);
		this.handelTextChange = this.handelTextChange.bind(this);
		this.submitRegistration = this.submitRegistration.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handelTextChangePhone = this.handelTextChangePhone.bind(this);
		this.applyPassword = this.applyPassword.bind(this);
		this.onBlurFocus = this.onBlurFocus.bind(this);
		this.state = {
			registration_firstName: "",
			registration_firstName_err: null,
			registration_firstName_errMsg: "",
			registration_lastName: "",
			registration_lastName_err: null,
			registration_lastName_errMsg: "",
			registration_email: "",
			registration_email_err: null,
			registration_email_errMsg: "",
			registration_phone: "",
			registration_phone_err: null,
			registration_phone_errMsg: "",
			registration_password: "",
			registration_password_err: null,
			registration_password_errMsg: "",
			registration_confirmPassword: "",
			registration_confirmPassword_err: null,
			registration_confirmPassword_errMsg: "",
			passWordSuggestions: false,
			registration_profession_err: null,
			registration_profession: "",
			registration_profession_errMsg: "",

			registration_website: "",
			registration_website_err: null,
			registration_website_errMsg: "",

			registration_instagram: "",
			registration_instagram_err: null,
			registration_instagram_errMsg: "",

			registration_facebook: "",
			registration_facebook_err: null,
			registration_facebook_errMsg: "",

			registration_ZipCode: "",
			registration_ZipCode_err: null,
			registration_ZipCode_errMsg: "",

			registration_NetworkSize: "",
			registration_NetworkSize_err: null,
			registration_NetworkSize_errMsg: "",

			registration_wantTo: "",
			registration_wantTo_err: null,
			registration_wantTo_errMsg: "",
			focusName: [],
			checkoutRedirect: false,
			showModal: false,
			isLoading: false,
			modalData: {
				title: "",
				msg: "",
			},
			isRegister: false,
			welcomeMsg: false,
			contryCode:
				props.location.countryCode && props.location.countryCode.toLowerCase(),
		};
	}

	componentDidMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		const countryDialCode = basicFunction.getDialCode(
			countryCodeList,
			this.props.location.countryCode
		);
		this.setState({
			registration_phone: countryDialCode,
		});
		analytics.page("ambassador-porrtal/registration");
	}

	SuggestionPassword() {
		//capitalizeFirstLetter

		const { registration_firstName, registration_lastName } = this.state;
		if (registration_firstName && registration_lastName) {
			if (
				registration_firstName.trim() !== "" &&
				registration_lastName.trim() !== ""
			) {
				const randomNo = Math.round(1000 + Math.random() * 9000);
				const randomNo2 = Math.round(1000 + Math.random() * 9000);

				var passWordSuggestions = {
					pass1:
						basicFunction.capitalizeFirstLetter(
							basicFunction.sliceToNumber(registration_firstName, 3)
						) +
						basicFunction.sliceToNumber(registration_lastName, 3) +
						randomNo,
					pass2:
						basicFunction.capitalizeFirstLetter(
							basicFunction.sliceToNumber(registration_lastName, 3)
						) +
						basicFunction.sliceToNumber(registration_firstName, 3) +
						randomNo2,
				};
				this.setState({
					passWordSuggestions,
				});
			}
		}
	}

	setFocus(e) {
		const name = e.target.name + "_err";
		this.setState(
			(prevState) => ({
				focusName: [...prevState.focusName, name],
			}),
			() => {
				//  console.log("focus",this.state.focusName)
			}
		);
	}
	unSetFocus(e) {
		// unSetFocus //setFocus
		const { id } = e.target;

		let type = [];
		let match = null;

		if (e.target.attributes["data-validate"])
			type = e.target.attributes["data-validate"].value;
		if (e.target.attributes["data-match"])
			match = e.target.attributes["data-match"].value;

		const name = id + "_err";
		this.setState(
			(prevState) => ({
				focusName: prevState.focusName.filter((el) => el !== name),
			}),
			() => {
				this.fieldVaidation(id, type, match);
				//  console.log("blur",this.state.focusName)
			}
		);
	}

	applyPassword(pass) {
		this.setState({
			registration_password: pass,
			registration_confirmPassword: pass,
		});
		this.setState({
			passWordSuggestions: false,
		});
	}

	onBlurFocus() {
		this.fieldVaidation("registration_email", "email");
	}
	handelTextChangePhone(e) {
		if (e) {
			this.setState(
				{
					registration_phone: e,
				},
				() => {
					// this.fieldVaidation("registration_phone", "phone");
				}
			);
		} else {
			this.setState(
				{
					registration_phone: "",
				},
				() => {
					// this.fieldVaidation("registration_phone", "phone");
				}
			);
		}
	}
	handelTextChange(e) {
		const { value, id } = e.target;
		let type = [];
		let match = null;

		if (e.target.attributes["data-validate"])
			type = e.target.attributes["data-validate"].value;
		if (e.target.attributes["data-match"])
			match = e.target.attributes["data-match"].value;

		let pattern = null;

		if (e.target.attributes["data-pattern"])
			pattern = e.target.attributes["data-pattern"].value;

		let newValue = value;

		if (pattern) {
			newValue = value.replace(regExReplace[pattern], "");
		}

		this.setState(
			{
				[e.target.id]: newValue,
			},
			() => {
				this.fieldVaidation(id, type, match);
			}
		);
	}
	toggleModal() {
		this.setState((prevState) => ({
			showModal: !prevState.showModal,
		}));
	}
	submitRegistration(e) {
		e.preventDefault();

		const {
			registration_firstName,
			registration_lastName,
			registration_email,
			registration_phone,
			registration_password,
			registration_confirmPassword,
			registration_website,
			registration_instagram,
			registration_facebook,
			registration_ZipCode,
			registration_wantTo,
			registration_NetworkSize,
			registration_profession,
		} = this.state;
		waterfall([
			(done) => {
				this.fieldVaidation("registration_firstName", "required,name");
				this.fieldVaidation("registration_lastName", "required,name");
				this.fieldVaidation("registration_email", "required,email");
				// this.fieldVaidation("registration_phone", "required,phone");
				this.fieldVaidation("registration_website", "url");
				this.fieldVaidation("registration_instagram", "url");
				this.fieldVaidation("registration_facebook", "url");
				// this.fieldVaidation("registration_profession", "required");
				//this.fieldVaidation("registration_ZipCode", "required,zipcode");
				// this.fieldVaidation("registration_wantTo", "required");
				this.fieldVaidation("registration_password", "required,password");
				this.fieldVaidation(
					"registration_confirmPassword",
					"required,password,repassword",
					registration_password
				);
				return done();
			},
			(done) => {
				const {
					registration_firstName_err,
					registration_lastName_err,
					registration_email_err,
					// registration_phone_err,
					registration_password_err,
					registration_confirmPassword_err,
					// registration_website_err,
					// registration_instagram_err,
					// registration_facebook_err,
					// registration_ZipCode_err,
					// registration_NetworkSize_err,
					// registration_wantTo_err,
					// registration_profession_err
				} = this.state;
				if (
					registration_firstName_err === false &&
					registration_lastName_err === false &&
					registration_email_err === false &&
					// !registration_phone_err &&
					registration_password_err === false &&
					registration_confirmPassword_err === false //&&
					// registration_website_err === false &&
					// registration_instagram_err === false &&
					// registration_facebook_err === false &&
					// registration_ZipCode_err === false &&
					// registration_NetworkSize_err === false &&
					// registration_wantTo_err === false &&
					// registration_profession_err === false
				) {
					this.setState({
						isLoading: true,
						// showModal: true
					});
					ambassadorPortalRegistration({
						email: registration_email,
						firstname: registration_firstName,
						lastname: registration_lastName,
						profession: registration_profession,
						website: registration_website,
						instagram: registration_instagram,
						facebook: registration_facebook,
						zipcode: registration_ZipCode,
						networksize: registration_NetworkSize,
						why: registration_wantTo,
						phonenumber: registration_phone,
						password: registration_password,
						password2: registration_confirmPassword,
					})
						.then((res) => {
							const resJson = res.data;
							this.setState({
								isLoading: false,
							});
							if (resJson.status) {
								this.setState({
									modalData: {
										title: regHeading,
										msg: regMsg,
									},
									isRegister: true,
								});
								document.body.scrollTop = document.documentElement.scrollTop = 0;
								// setTimeout(() => {
								this.setState({
									isLoading: false,
									// showModal: false,
									welcomeMsg: true,
								});
								// }, 3000);
							} else if (resJson.error) {
								this.setState(
									{
										modalData: {
											title: "Error",
											msg: resJson.error,
										},
										showModal: true,
									},
									() => {
										document.body.scrollTop = document.documentElement.scrollTop = 0;
									}
								);
							} else {
								this.setState(
									{
										modalData: {
											title: "Error",
											msg: "Try again ...",
										},
										showModal: true,
									},
									() => {
										document.body.scrollTop = document.documentElement.scrollTop = 0;
									}
								);
							}
						})
						.catch((err) => {
							this.setState(
								{
									isLoading: false,
									modalData: {
										title: "Error",
										msg: "Try again ...",
									},
									showModal: true,
								},
								() => {
									document.body.scrollTop = document.documentElement.scrollTop = 0;
								}
							);
						});
				}
			},
		]);
	}
	fieldVaidation(field, type, match) {
		const typeArr = type.split(",");
		if (typeArr.includes("required")) {
			if (!isEmpty(this.state[field])) {
				this.setState({
					[field + "_err"]: false,
					[field + "_errMsg"]: "",
				});
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: "can't be empty",
				});
				return;
			}
		}
		if (typeArr.includes("name")) {
			if (isAlpha(this.state[field])) {
				this.setState({
					[field + "_err"]: false,
					[field + "_errMsg"]: "",
				});
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: "Only Alphabets",
				});
				return;
			}
		}
		if (typeArr.includes("email")) {
			if (isEmail(this.state[field])) {
				this.setState({
					[field + "_err"]: false,
					[field + "_errMsg"]: "",
				});
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: emailNotValidErrMsg,
				});
				return;
			}
		}
		if (typeArr.includes("phone")) {
			if (isValidPhoneNumber(this.state[field])) {
				this.setState({
					[field + "_err"]: false,
					[field + "_errMsg"]: "",
				});
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: "Phone number is not valid",
				});
				return;
			}
		}
		if (typeArr.includes("zipcode")) {
			// if(isPostalCode(this.state[field])){
			if (isNumeric(this.state[field])) {
				this.setState({
					[field + "_err"]: false,
					[field + "_errMsg"]: "",
				});
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: "Zip Code Not Valid",
				});
				return;
			}
		}

		if (typeArr.includes("password")) {
			if (this.state[field].length > 5) {
				var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,25}$/;
				if (true || reg.test(this.state[field])) {
					this.setState({
						[field + "_err"]: false,
						[field + "_errMsg"]: "",
					});
				} else {
					this.setState({
						[field + "_err"]: true,
						[field + "_errMsg"]: passwordValidErrMsg,
					});
					return;
				}
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: passwordShortErrMsg,
				});
				return;
			}
		}

		if (typeArr.includes("url")) {
			// eslint-disable-next-line no-console
			var regs = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;
			if (!isEmpty(this.state[field])) {
				if (regs.test(this.state[field])) {
					this.setState({
						[field + "_err"]: false,
						[field + "_errMsg"]: "",
					});
				} else {
					this.setState({
						[field + "_err"]: true,
						[field + "_errMsg"]: "Url is not valid",
					});
					return;
				}
			}
		}

		if (typeArr.includes("repassword")) {
			if (this.state[field] === match) {
				this.setState({
					[field + "_err"]: false,
					[field + "_errMsg"]: "",
				});
			} else {
				this.setState({
					[field + "_err"]: true,
					[field + "_errMsg"]: passwordMatchErrMsg,
				});
				return;
			}
		}
	}
	render() {
		const {
			registration_firstName,
			registration_firstName_err,
			registration_firstName_errMsg,
			registration_lastName,
			registration_lastName_err,
			registration_lastName_errMsg,
			registration_email,
			registration_email_err,
			registration_email_errMsg,
			registration_phone,
			registration_phone_err,
			registration_phone_errMsg,
			registration_password,
			registration_password_err,
			registration_password_errMsg,
			registration_confirmPassword,
			registration_confirmPassword_err,
			registration_confirmPassword_errMsg,
			registration_profession_err,
			registration_profession,
			registration_profession_errMsg,
			registration_website,
			registration_website_err,
			registration_website_errMsg,
			registration_instagram,
			registration_instagram_err,
			registration_instagram_errMsg,
			registration_facebook,
			registration_facebook_err,
			registration_facebook_errMsg,
			registration_ZipCode,
			registration_ZipCode_err,
			registration_ZipCode_errMsg,
			registration_NetworkSize,
			registration_NetworkSize_err,
			registration_NetworkSize_errMsg,
			registration_wantTo,
			registration_wantTo_err,
			registration_wantTo_errMsg,
			modalData,
			showModal,
			// isLoading,
			welcomeMsg,
			focusName,
		} = this.state;
		const { className } = this.props;
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<div
					className={classNames("", {
						[className]: className,
					})}
				>
					<div className="container">
						{welcomeMsg ? (
							<div className="row m-10">
								<br />
								<br />
								<div className="col-md-6 text-center offset-md-3">
									<h2 className="title-80 ">
										{projectName} ambassador application
									</h2>
									<p>
										Thank you for your application! We’re thrilled that you want
										to spread the word about {projectName}.
									</p>
									<p>
										Be sure to keep an eye on your email inbox! Once your
										application is approved, you will receive several emails
										regarding your account, and how to get started as a{" "}
										{projectName}
										Ambassador.
									</p>
									<p>
										If have any additional questions or concerns, please email
										<br />
										<a href="mailto:ambassador@cbdbene.com">
											ambassador@cbdbene.com
										</a>{" "}
										.
									</p>
								</div>
							</div>
						) : (
							<div className="row justify-content-center Regular">
								<div className="w-100 mt-4">
									<FadeTransition unmountOnExit={true} in={showModal}>
										<ErrorBlock
											icon={warning}
											msg={modalData.msg}
											title={modalData.title}
										/>
									</FadeTransition>
								</div>
								<div className="p-md-5 p-3 register shadowBoxBackground ambassador-reg-form">
									<h1 className="title-80">AMBASSADOR APPLICATION</h1>
									<br />
									<div className="inside-form Larger ">
										<form onSubmit={this.submitRegistration}>
											<div className="row">
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error": registration_firstName_err,
														})}
													>
														<label>First Name:</label>
														<input
															className="c-input__input"
															id="registration_firstName"
															name="registration_firstName"
															value={registration_firstName}
															onChange={this.handelTextChange}
															type="text"
															data-pattern="name"
															data-validate={["name", "required"]}
															maxLength="20"
														/>
														{registration_firstName_err && (
															<p className="error">
																{registration_firstName_errMsg &&
																registration_firstName_errMsg ===
																	"can't be empty"
																	? firstNameMissingErrMsg
																	: registration_firstName_errMsg}
															</p>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error": registration_lastName_err,
														})}
													>
														<label>Last Name:</label>
														<input
															className="c-input__input"
															id="registration_lastName"
															name="registration_lastName"
															value={registration_lastName}
															onChange={this.handelTextChange}
															type="text"
															data-pattern="name"
															data-validate={["name", "required"]}
															maxLength="20"
														/>
														{registration_lastName_err && (
															<p className="error">
																{registration_lastName_errMsg &&
																registration_lastName_errMsg ===
																	"can't be empty"
																	? lastNameMissingErrMsg
																	: registration_lastName_errMsg}
															</p>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_email_err &&
																!focusName.includes("registration_email_err"),
														})}
													>
														<label>Email:</label>
														<input
															className="c-input__input"
															id="registration_email"
															name="registration_email"
															value={registration_email}
															onChange={this.handelTextChange}
															type="text"
															data-pattern="email"
															data-validate={["email", "required"]}
															maxLength="35"
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
														/>
														{registration_email_err &&
															!focusName.includes("registration_email_err") && (
																<p className="error">
																	{registration_email_errMsg &&
																	registration_email_errMsg === "can't be empty"
																		? emailMissingErrMsg
																		: emailNotValidErrMsg}
																</p>
															)}
													</div>
												</div>
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error": registration_phone_err,
														})}
													>
														<label>Phone Number:</label>

														<ReactPhoneInput
															inputClass="c-input__input"
															containerClass="react-tel-input react-phone"
															id="registration_phone"
															name="registration_phone"
															onChange={this.handelTextChangePhone}
															// data-validate={["phone", "required"]}
															pattern-type="phone"
															value={registration_phone}
														/>
														{registration_phone_err && (
															<p className="error">
																{registration_phone_errMsg &&
																registration_phone_errMsg === "can't be empty"
																	? phoneMissingErrMsg
																	: phoneNotValidErrMsg}
															</p>
														)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error": registration_profession_err,
														})}
													>
														<label>Profession:</label>
														<input
															className="c-input__input"
															id="registration_profession"
															name="registration_profession"
															value={registration_profession}
															onChange={this.handelTextChange}
															type="text"
															data-validate={[]}
															maxLength="30"
														/>
														{registration_profession_err && (
															<p className="error">
																{registration_profession_errMsg &&
																registration_profession_errMsg ===
																	"can't be empty"
																	? "Profession is required"
																	: registration_profession_errMsg}
															</p>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_website_err &&
																!focusName.includes("registration_website_err"),
														})}
													>
														<label>Website:</label>
														<input
															className="c-input__input"
															id="registration_website"
															name="registration_website"
															value={registration_website}
															onChange={this.handelTextChange}
															type="text"
															maxLength="50"
															data-validate={["url"]}
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
														/>
														{registration_website_err &&
															!focusName.includes(
																"registration_website_err"
															) && (
																<p className="error">
																	{registration_website_errMsg &&
																	registration_website_errMsg ===
																		"can't be empty"
																		? "Website Url is required"
																		: registration_website_errMsg}
																</p>
															)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_instagram_err &&
																!focusName.includes(
																	"registration_instagram_err"
																),
														})}
													>
														<label>Instagram:</label>
														<input
															className="c-input__input"
															id="registration_instagram"
															name="registration_instagram"
															value={registration_instagram}
															onChange={this.handelTextChange}
															type="text"
															maxLength="50"
															data-validate={["url"]}
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
														/>
														{registration_instagram_err &&
															!focusName.includes(
																"registration_instagram_err"
															) && (
																<p className="error">
																	{registration_instagram_errMsg &&
																	registration_instagram_errMsg ===
																		"can't be empty"
																		? "Instagram Url is required"
																		: registration_instagram_errMsg}
																</p>
															)}
													</div>
												</div>
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_facebook_err &&
																!focusName.includes(
																	"registration_facebook_err"
																),
														})}
													>
														<label>Facebook:</label>
														<input
															className="c-input__input"
															id="registration_facebook"
															name="registration_facebook"
															value={registration_facebook}
															onChange={this.handelTextChange}
															type="text"
															maxLength="50"
															data-validate={["url"]}
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
														/>
														{registration_facebook_err &&
															!focusName.includes(
																"registration_facebook_err"
															) && (
																<p className="error">
																	{registration_facebook_err &&
																	registration_facebook_errMsg ===
																		"can't be empty"
																		? "Facebook Url is required"
																		: registration_facebook_errMsg}
																</p>
															)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_ZipCode_err &&
																!focusName.includes("registration_ZipCode_err"),
														})}
													>
														<label>Zip Code:</label>
														<input
															className="c-input__input"
															id="registration_ZipCode"
															name="registration_ZipCode"
															value={registration_ZipCode}
															onChange={this.handelTextChange}
															type="text"
															maxLength="10"
															data-validate={["zipcode"]}
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
														/>
														{registration_ZipCode_err &&
															!focusName.includes(
																"registration_ZipCode_err"
															) && (
																<p className="error">
																	{registration_ZipCode_errMsg &&
																	registration_ZipCode_errMsg ===
																		"can't be empty"
																		? zipMissingErrMsg
																		: zipValidErrMsg}
																</p>
															)}
													</div>
												</div>
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error": registration_NetworkSize_err,
														})}
													>
														<label>Network Size:</label>
														<select
															className="c-input__input"
															id="registration_NetworkSize"
															name="registration_NetworkSize"
															value={registration_NetworkSize}
															onChange={this.handelTextChange}
															data-validate={["required"]}
														>
															<option value="">Network Size</option>
															<option value="1-50">1-50</option>
															<option value="51-100">51-100</option>
															<option value="100+">100+</option>
														</select>

														{registration_NetworkSize_err && (
															<p className="error">
																{registration_NetworkSize_errMsg &&
																registration_NetworkSize_errMsg ===
																	"can't be empty"
																	? "Network Size is required"
																	: registration_NetworkSize_errMsg}
															</p>
														)}
													</div>
												</div>
											</div>

											<div
												className={classNames("has-input c-input", {
													"has-error": registration_wantTo_err,
												})}
											>
												<label>Why do you want to be an Ambassador?:</label>
												<input
													className="c-input__input"
													id="registration_wantTo"
													name="registration_wantTo"
													value={registration_wantTo}
													onChange={this.handelTextChange}
													type="text"
													data-validate={[]}
												/>
												{registration_wantTo_err && (
													<p className="error">
														{registration_wantTo_errMsg &&
														registration_wantTo_errMsg === "can't be empty"
															? "This field is required"
															: registration_wantTo_errMsg}
													</p>
												)}
											</div>

											<div className="row">
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_password_err &&
																!focusName.includes(
																	"registration_password_err"
																),
														})}
													>
														<label>Password:</label>
														<input
															className="c-input__input"
															id="registration_password"
															name="registration_password"
															value={registration_password}
															onChange={this.handelTextChange}
															type="password"
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
															data-validate={["password", "required"]}
															// onClick={
															//   ()=>this.SuggestionPassword()
															// }
														/>
														{registration_password_err &&
															!focusName.includes(
																"registration_password_err"
															) && (
																<p className="error">
																	{registration_password_errMsg &&
																	registration_password_errMsg ===
																		"can't be empty"
																		? passwordMissingErrMsg
																		: registration_password_errMsg}
																</p>
															)}
													</div>
												</div>
												<div className="col-md-6">
													<div
														className={classNames("has-input c-input", {
															"has-error":
																registration_confirmPassword_err &&
																!focusName.includes(
																	"registration_confirmPassword_err"
																),
														})}
													>
														<label>Confirm Password:</label>
														<input
															className="c-input__input"
															id="registration_confirmPassword"
															name="registration_confirmPassword"
															value={registration_confirmPassword}
															onChange={this.handelTextChange}
															type="password"
															onFocus={(e) => this.setFocus(e)}
															onBlur={(e) => this.unSetFocus(e)}
															data-validate={["repassword"]}
															data-match={registration_password}
														/>
														{registration_confirmPassword_err &&
															!focusName.includes(
																"registration_confirmPassword_err"
															) && (
																<p className="error">
																	{registration_confirmPassword_errMsg &&
																	registration_confirmPassword_errMsg ===
																		"can't be empty"
																		? confirmPasswordErrMsg
																		: registration_confirmPassword_errMsg}
																</p>
															)}
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-4 offset-md-4">
													<br />
													<br />
													<button
														type="submit"
														className="btn btn-main btn7 w-100 c-btn c-btn--outline"
													>
														Register
													</button>
												</div>
											</div>
										</form>
									</div>
									<div className="row">
										<ul className="login-variation-ul p-0 d-flex w-100 justify-content-between flex-wrap">
											<li className="d-block">
												<Link href={`/ambassador-portal/login`}>
													<a>Login</a>
												</Link>
											</li>
											<li className="d-block">
												<Link href={`/ambassador-portal/forgot-password`}>
													<a>Forgot your password ?</a>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						)}
					</div>
					{/* <Modal
          isOpen={showModal}
          toggle={this.toggleModal}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.toggleModal}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-dismiss" onClick={this.toggleModal}>
              <Icon icon={ic_clear} />
            </div>
            <div className="modal-inner">
              {isLoading && <div className="loader" />}
              {!isLoading && (
                <div className="modal-content">
                  {modalData.title === "Error" ? (
                    <div style={{ color: "#EF233C", textAlign: "center" }}>
                      <Icon
                        className="popup-alert-icon"
                        size={64}
                        icon={ic_error_outline}
                      />
                    </div>
                  ) : (
                    <Icon
                      className="popup-alert-icon"
                      size={64}
                      icon={ic_done}
                    />
                  )}
                  <h3 className="text-center title-80 p-3">{modalData.msg}</h3>
                </div>
              )}
            </div>
          </div>
        </Modal> */}
				</div>
			</Layout>
		);
	}
}
const mapStateToProps = (state) => ({
	location: state.location,
});
export default connect(mapStateToProps)(Registration);
