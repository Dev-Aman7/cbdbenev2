import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Loader from "../../components/Loader";
import { countryCodeList } from "../../services/extra/allCountryCode";
// import "react-phone-input-2/lib/style.css";
import { AddressForm } from "../../components/address/form";
import Layout from "../../components/Layouts/Layout";
import classNames from "classnames";

import { addAddress } from "../../redux/actions/address";
import { fieldValidation } from "../../services/extra/validations";
import { Card } from "reactstrap";
import { Modal } from "../../components/modal";
import regexReplace from "../../services/helpers/regexReplace";

import MyAccountSidebar from "../../components/MyAccountSidebar";
import msgStrings from "../../constants/msgStrings";
import projectSettings from "../../constants/projectSettings";
// import {
//   // Input,
//   Select
// } from "../form";
import BasicFunction from "../../services/extra/basicFunction";

import * as analytics from "../../analytics/analytics";

const basicFunction = new BasicFunction();
const {
	firstNameMissingErrMsg,
	lastNameMissingErrMsg,
	emailMissingErrMsg,
	emailNotValidErrMsg,
	phoneMissingErrMsg,
	phoneNotValidErrMsg,
	zipValidErrMsg,
	zipMissingErrMsg,
	// orderAdded,
	// orderAddedModalTitle,
	addressAdded,
	addressAddedModalTitle,
	// someThingWrongTryAgain
} = msgStrings;
const { enableCountry } = projectSettings;
class AddAddressForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCountry: "",
			selectedCountry_errMsg: "",
			selectedRegion: null,
			selectedCity: "",
			selectedCity_errMsg: "",
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
			shipping_address_name_02: "",
			shipping_address_name_02_err: null,
			shipping_address_name_02_errMsg: "",
			shipping_address_town: "",
			shipping_address_town_err: null,
			shipping_address_town_errMsg: "",
			shipping_address_type: "",
			shipping_address_typeErr: null,
			shipping__address_typeErrMsg: "",
			modal: false,
			modalData: "",
			addressData: {
				country: false,
				state: false,
				city: false,
				address: false,
				zip: false,
			},
			isSubmitted: false,
			isModal: false,
			countryUSAError: null,
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
		//   // history.push("/" + location.countryCode + "/login");
		// }
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		const countryDialCode = basicFunction.getDialCode(
			countryCodeList,
			location.countryCode
		);
		this.setState({
			shipping_phone_name: countryDialCode,
		});
		analytics.page("account/add-address");
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.address);
		if (this.state.isSubmitted) {
			if (nextProps.address.address) {
				this.setState(
					{
						isModal: true,
					},
					() => {
						this.dismissModal();
						// this.modalTimeout = setTimeout(() => {
						//   this.dismissModal();
						// }, 3000);
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
	validateAddressFields(field, type, isReturn) {
		const { isError, errorMsg } = fieldValidation(this.state[field], type);
		console.log({
			field,
			type,
			isError,
			state: this.state[field],
		});
		this.setState({
			[`${field}Err`]: isError,
			[`${field}ErrMsg`]: errorMsg,
		});
		if (isReturn) return isError;
	}
	submitRegistration(e) {
		e.preventDefault();
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
				type: "required",
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

		const validate = shippingFields.map((el) => {
			return this.validateAddressFields(el.name, el.type, true);
			// return null;
		});
		console.log({
			validate,
		});
		// const checkAll = validate.map(el => {
		//   console.log({
		//     el
		//   })
		//   return this.state[el.name + "Err"];
		// });
		const flag = validate.some((a) => {
			return a !== false;
		});
		console.log({
			flag,
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
			} = this.state;
			const id = new Date().getTime();
			const newAddress = {
				isDefault: false,
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
			this.props.addAddress(
				user._id,
				newAddress,
				this.props.address,
				oldAddresses
			);
		}
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
		const { other, country, state, city, zip } = e;
		console.log({
			e,
		});
		this.setState((prevState) => {
			return {
				shipping_address_name_01: other
					? other
					: prevState.shipping_address_name_01 || "",
				selectedShippingCountry: country
					? country
					: prevState.selectedShippingCountry || "",
				selectedShippingCity: state
					? state
					: prevState.selectedShippingCity || "",
				shipping_address_town: city
					? city
					: prevState.shipping_address_town || "",
				shipping_zip_code: zip ? zip : prevState.shipping_zip_code || "",
			};
		});
		if (other && other.length > 0) {
			this.setState({
				shipping_address_name_01Err: false,
			});
		}
		if (country && country.length > 0) {
			if (enableCountry.includes(country.trim()) || true) {
				this.setState({
					// selectedCountryErr: false,
					countryUSAError: false,
				});
			} else {
				this.setState({
					// selectedCountryErr: false,
					countryUSAError: true,
				});
			}
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

		if (zip && zip.length > 0) {
			this.setState({
				shipping_zip_codeErr: false,
			});
		} else {
			this.setState({
				shipping_zip_codeErr: true,
			});
		}
	}
	render() {
		const {
			// modal,
			// modalData,
			// selectedCountry,
			// selectedShippingCountry,
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
			countryUSAError,
		} = this.state;

		const { className } = this.props;
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
								<div className="col-lg-10">
									<form onSubmit={this.submitRegistration}>
										<Card className="panel-section my-order__panel">
											<div className="my-order__detail">
												<div className="my-order__alert">
													<h3 className="my-order__alert--msg">Your Address</h3>
												</div>
												<div className="billing-address-text p-4 card-title  ">
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
															countryUSAError,
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
                          key: "Home (7am to 9pm delivery)",
                          value: "Home (7am to 9pm delivery)"
                        },
                        {
                          key: "Office/Commercial (10 AM - 5 PM delivery)",
                          value: "Office/Commercial (10 AM - 5 PM delivery)"
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
							heading={addressAddedModalTitle}
							isOpen={isModal}
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
export default connect(mapStateToProps, { addAddress })(AddAddressForm);
