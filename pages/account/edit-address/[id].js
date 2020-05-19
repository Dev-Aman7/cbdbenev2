import React, { Component } from "react";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import Loader from "../../../components/Loader";
import MyAccountSidebar from "../../../components/MyAccountSidebar";
// import { countryCodeList } from "../../constants/allCountryCode";
// import "react-phone-input-2/lib/style.css";
import { AddressForm } from "../../../components/address/form";
import regexReplace from "../../../services/helpers/regexReplace";
import { editAddress, getAddress } from "../../../redux/actions/address";
import { fieldValidation } from "../../../services/extra/validations";
import { Card } from "reactstrap";
import classNames from "classnames";
import { Modal } from "../../../components/modal";
import {
	firstNameMissingErrMsg,
	lastNameMissingErrMsg,
	emailMissingErrMsg,
	emailNotValidErrMsg,
	phoneMissingErrMsg,
	phoneNotValidErrMsg,
	zipValidErrMsg,
	zipMissingErrMsg,
	// addressAddedMsg,
	addressAdded,
	addressAddedModalTitle,
	// someThingWrongTryAgain
} from "../../../constants/constantMessage";
import Layout from "../../../components/Layouts/Layout";
import * as analytics from "../../../analytics/analytics";
// import {
//   // Input,
//   Select
// } from "../form";
// import BasicFunction from "../../services/extra/basicFunction";
// const basicFunction = new BasicFunction();
class EditAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedShippingCountry: "",
			selectedShippingCountry_errMsg: "",
			selectedShippingCity: "",
			selectedShippingCity_err: null,
			selectedShippingCity_errMsg: "",
			sameShipping: true,
			shipping_first_name: "",
			shipping_first_name_err: null,
			shipping_first_name_errMsg: "",
			shipping_last_name: "",
			shipping_last_name_err: null,
			shipping_last_name_errMsg: "",
			shipping_email_name: "",
			shipping_email_name_err: null,
			shipping_email_name_errMsg: "",
			shipping_phone_name: "",
			shipping_phone_name_err: null,
			shipping_phone_name_errMsg: "",
			shipping_address_name_01: "",
			shipping_address_name_01_err: null,
			shipping_address_name_01_errMsg: "",
			shipping_address_town: "",
			shipping_address_town_err: null,
			shipping_address_town_errMsg: "",
			shipping_address_type: "",
			shipping_address_typeErr: null,
			shipping__address_typeErrMsg: "",
			shipping_zip_code: "",
			id: "",
			shipping_zip_codeErr: null,
			shipping_zip_codeErrMsg: "",
			modal: false,
			modalData: "",
			addressData: {
				country: false,
				state: false,
				city: false,
				address: false,
			},
			isSubmitted: false,
			isModal: false,
			isFound: false,
			isFetchedCount: 0,
		};
		this.validateAddressFields = this.validateAddressFields.bind(this);
		this.onAddressChange = this.onAddressChange.bind(this);
		this.onPhoneChange = this.onPhoneChange.bind(this);
		this.shippingaddressautoFill = this.shippingaddressautoFill.bind(this);
		this.submitRegistration = this.submitRegistration.bind(this);
	}
	componentDidMount() {
		const { user, history, location } = this.props;
		// if (!user._id) {
		//   history.push("/" + location.countryCode + "/login");
		// }
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		// const countryDialCode = basicFunction.getDialCode(
		//   countryCodeList,
		//   location.countryCode
		// );
		this.fillAddress();
		analytics.page("account/edit-address");
		// this.setState({
		//   shipping_phone_name: countryDialCode
		// });
	}
	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user && this.props.user._id) {
			this.fillAddress();
		}
	}
	fillAddress = () => {
		if (this.props.address.address) {
			const id = this.props.router.query.id;
			const currentAddress = this.props.address.address.find(
				(el) => el.id.toString() === id
			);
			if (currentAddress) {
				this.setState(
					{
						isFound: true,
						selectedShippingCity: currentAddress.state || "",
						shipping_first_name: currentAddress.firstname || "",
						shipping_last_name: currentAddress.lastname || "",
						shipping_email_name: currentAddress.email || "",
						shipping_phone_name: currentAddress.phone || "",
						shipping_address_name_01: currentAddress.address || "",
						selectedShippingCountry: currentAddress.country || "",
						shipping_address_town: currentAddress.city || "",
						shipping_address_type: currentAddress.addressType || "",
						shipping_zip_code: currentAddress.zip || "",
						id: currentAddress.id,
						addressData: {
							country: currentAddress.country.value || currentAddress.country,
							state: currentAddress.state.value || currentAddress.state,
							city: currentAddress.city,
							address: currentAddress.address,
						},
					},
					() => {
						const {
							shipping_address_name_01,
							selectedShippingCountry,
							selectedShippingCity,
							shipping_address_town,
						} = this.state;
						if (
							shipping_address_name_01 &&
							shipping_address_name_01.length > 0
						) {
							this.setState({
								shipping_address_name_01Err: false,
							});
						}
						if (selectedShippingCountry && selectedShippingCountry.length > 0) {
							this.setState({
								selectedShippingCountryErr: false,
							});
						}
						if (selectedShippingCity && selectedShippingCity.length > 0) {
							this.setState({
								selectedShippingCityErr: false,
							});
						}
						if (shipping_address_town && shipping_address_town.length > 0) {
							this.setState({
								shipping_address_townErr: false,
							});
						}
					}
				);
			}
			console.log({
				id,
				currentAddress,
				props: this.props,
			});
		} else {
			this.props.getAddress(this.props.user._id);
		}
	};
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.address);
		if (this.state.isSubmitted) {
			if (nextProps.address.address) {
				this.setState(
					{
						isModal: true,
					},
					() => {
						this.modalTimeout = setTimeout(() => {
							this.dismissModal();
						}, 3000);
					}
				);
			}
		} else {
			if (this.state.isFetchedCount < 10 && !this.state.isFound) {
				this.setState(
					(prevState) => ({
						isFetchedCount: prevState.isFetchedCount + 1,
					}),
					() => {
						this.fillAddress();
					}
				);
			}
		}
	}

	dismissModal = () => {
		const { history, location } = this.props;
		if (this.modalTimeout) {
			clearTimeout(this.modalTimeout);
		}
		this.setState(
			{
				isModal: false,
			},
			() => {
				// history.push(`/${location.countryCode}/my-address`);
				Router.push(`/account/address`);
			}
		);
	};
	toggle = () => {
		const { history, location } = this.props;
		if (this.modalTimeout) {
			clearTimeout(this.modalTimeout);
		}
		this.setState(
			(prevState) => ({
				isModal: !prevState.isModal,
			}),
			() => {
				Router.push(`/account/address`);
			}
		);
	};
	onPhoneChange(value, stateName) {
		this.setState(
			{
				[stateName]: value,
			},
			() => {
				this.validateAddressFields(stateName, "phone");
			}
		);
	}
	validateAddressFields(field, type) {
		const { isError, errorMsg } = fieldValidation(this.state[field], type);
		this.setState({
			[`${field}Err`]: isError,
			[`${field}ErrMsg`]: errorMsg,
		});
	}
	submitRegistration(e) {
		e.preventDefault();
		console.log({
			sate: this.state,
		});
		const shippingFields = [
			{
				name: "shipping_first_name",
				type: "name,required",
			},
			{
				name: "shipping_last_name",
				type: "name,required",
			},
			{
				name: "shipping_email_name",
				type: "email,required",
			},
			{
				name: "shipping_phone_name",
				type: "phone,required",
			},
			{
				name: "shipping_address_name_01",
				type: "required",
			},
			{
				name: "shipping_address_town",
				type: "required",
			},
			{
				name: "shipping_zip_code",
				type: "required, zipcode",
			},
			{
				name: "selectedShippingCountry",
				type: "required",
			},
			{
				name: "selectedShippingCity",
				type: "required",
			},
		];
		// const { sameShipping } = this.state;

		let validate = [];
		validate = [...validate, ...shippingFields];
		validate &&
			validate.map((el) => {
				this.validateAddressFields(el.name, el.type);
				return null;
			});

		const checkAll = validate.map((el) => {
			return this.state[el.name + "Err"];
		});
		const flag = checkAll.some((a) => {
			return a !== false;
		});
		setTimeout(() => {
			const checkAll = validate.map((el) => {
				return this.state[el.name + "Err"];
			});
			const flag = checkAll.some((a) => {
				return a !== false;
			});
			if (!flag) {
				const { user } = this.props;
				const {
					shipping_first_name: firstname,
					shipping_last_name: lastname,
					shipping_email_name: email,
					shipping_zip_code: zip,
					shipping_phone_name: phone,
					shipping_address_name_01: address,
					selectedShippingCountry: country,
					selectedShippingCity: state,
					shipping_address_town: city,
					shipping_address_type: addressType,
					id,
				} = this.state;
				const currentAddress = this.props.address.address.find(
					(el) => el.id.toString() === id.toString()
				);
				const newAddress = {
					isDefault: currentAddress ? currentAddress.isDefault : false,
					firstname,
					lastname,
					email,
					zip,
					phone,
					address,
					country,
					state,
					city,
					addressType,
					id,
				};
				const oldAddresses = this.props.address.address || [];
				this.setState({
					isSubmitted: true,
				});
				this.props.editAddress(
					user._id,
					newAddress,
					this.props.address,
					oldAddresses
				);
			}
		}, 100);
		return flag;
	}
	onAddressChange(e) {
		const { name, value, attributes } = e.target;
		const type = attributes["data-validate"];
		const pattern = attributes["data-pattern"];
		this.setState(
			{
				[name]: pattern
					? value.replace(regexReplace[pattern.value], "")
					: value.trim(),
			},
			() => {
				if (type) if (type.value) this.validateAddressFields(name, type.value);
			}
		);
	}
	shippingaddressautoFill(e) {
		const { other, country, state, city } = e;
		this.setState(
			{
				shipping_address_name_01: other,
				selectedShippingCountry: country,
				selectedShippingCity: state,
				shipping_address_town: city,
			},
			() => {
				if (other && other.length > 0) {
					this.setState({
						shipping_address_name_01Err: false,
					});
				}
				if (country && country.length > 0) {
					this.setState({
						selectedShippingCountryErr: false,
					});
				}
				if (state && state.length > 0) {
					this.setState({
						selectedShippingCityErr: false,
					});
				}
				if (city && city.length > 0) {
					this.setState({
						shipping_address_townErr: false,
					});
				}
			}
		);
	}
	render() {
		const {
			shipping_first_name,
			shipping_first_nameErr,
			shipping_first_nameErrMsg,
			shipping_last_name,
			shipping_last_nameErr,
			shipping_last_nameErrMsg,
			shipping_email_name,
			shipping_email_nameErr,
			shipping_email_nameErrMsg,
			shipping_phone_name,
			shipping_phone_nameErr,
			shipping_phone_nameErrMsg,
			shipping_address_name_01Err,
			shipping_address_townErr,
			shipping_zip_code,
			shipping_zip_codeErr,
			shipping_zip_codeErrMsg,
			addressData,
			selectedShippingCountryErr,
			selectedShippingCityErr,
			// shipping_address_type,
			// shipping_address_typeErr,
			// shipping__address_typeErrMsg,
			isModal,
		} = this.state;
		const { className } = this.props;
		return (
			<Layout>
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
									<form onSubmit={this.submitRegistration}>
										<Card className="panel-section my-order__panel">
											<div className="my-order__detail">
												<div className="my-order__alert">
													<h3 className="my-order__alert--msg">Your Address</h3>
												</div>
												<div className="billing-address-text p-4 card-title flag-none  ">
													<AddressForm
														name={shipping_first_name}
														nameId="shipping_first_name"
														nameErr={shipping_first_nameErr}
														nameErrMsg={
															shipping_first_nameErrMsg === "can't be empty"
																? firstNameMissingErrMsg
																: shipping_first_nameErrMsg
														}
														lastName={shipping_last_name}
														lastNameId="shipping_last_name"
														lastNameErr={shipping_last_nameErr}
														lastNameErrMsg={
															shipping_last_nameErrMsg === "can't be empty"
																? lastNameMissingErrMsg
																: shipping_last_nameErrMsg
														}
														email={shipping_email_name}
														emailId="shipping_email_name"
														emailErr={shipping_email_nameErr}
														emailErrMsg={
															shipping_email_nameErrMsg === "can't be empty"
																? emailMissingErrMsg
																: emailNotValidErrMsg
														}
														zip={shipping_zip_code}
														zipId="shipping_zip_code"
														zipErr={shipping_zip_codeErr}
														zipErrMsg={
															shipping_zip_codeErrMsg === "can't be empty"
																? zipMissingErrMsg
																: zipValidErrMsg
														}
														phone={shipping_phone_name}
														phoneId="shipping_phone_name"
														phoneErr={shipping_phone_nameErr}
														phoneErrMsg={
															shipping_phone_nameErrMsg === "can't be empty"
																? phoneMissingErrMsg
																: phoneNotValidErrMsg
														}
														onPhoneChange={(e) => {
															this.onPhoneChange(e, "shipping_phone_name");
														}}
														onChange={this.onAddressChange}
														onAddressChange={this.shippingaddressautoFill}
														addressData={addressData}
														addressErr={[
															shipping_address_name_01Err,
															shipping_address_townErr,
															selectedShippingCountryErr,
															selectedShippingCityErr,
														]}
													/>
													{/* <h4>Additional Address Details</h4>
                    <p>
                      Preferences are used to plan your delivery. However,
                      shipments can sometimes arrive early or later than
                      planned.
                    </p>

                    <Select
                      name="shipping_address_type"
                      value={shipping_address_type}
                      onChange={this.onAddressChange}
                      dataPattern=""
                      dataValidate={[]}
                      selectOptionValue={[
                        {
                          key: "Home (7 am to 9 pm delivery)",
                          value: "Home (7 am to 9 pm delivery)"
                        },
                        {
                          key: "Office/Commercial (10 am - 5 pm delivery)",
                          value: "Office/Commercial (10 am - 5 pm delivery)"
                        }
                      ]}
                      selectPlaceHolder="Select an Address Type"
                      isError={shipping_address_typeErr}
                      errorMsg={
                        shipping__address_typeErrMsg === "can't be empty"
                          ? shipping__address_typeErrMsg
                          : shipping__address_typeErrMsg
                      }
                      label="Select an Address Type:"
                    /> */}
												</div>
											</div>
											<button
												className="btn or-btn btn-outline-shopping btn-icon c-btn c-btn--outline my-order__shopping mt-5"
												type="submit"
											>
												Submit
											</button>
										</Card>
									</form>
								</div>
							</div>
						</div>
						<Modal
							isOpen={isModal}
							heading={addressAddedModalTitle}
							toggle={this.toggle}
						>
							<div className="col-12 text-center">
								<h3>{addressAdded}</h3>
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
	address: state.address,
});
export default connect(mapStateToProps, { editAddress, getAddress })(
	withRouter(EditAddress)
);
