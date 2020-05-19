import React, { Component } from "react";
import Router, { withRouter } from "next/router";
import UserDetails from "../../components/consult-tabs/UserDetails";
import PersonalDetails from "../../components/consult-tabs/PersonalDetails";
import Success from "../../components/consult-tabs/Success";
import Layout from "../../components/Layouts/Layout";
import Loader from "../../components/Loader";
import { connect } from "react-redux";
import { showRegBar, hideRegBar } from "../../redux/actions";

import Scheduling from "../../components/consult-tabs/Scheduling";
import IntakeDetails from "../../components/consult-tabs/intakeDetails";
import { Tabs } from "antd";
import { unsetCurrentAppointment } from "../../redux/actions";

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}
import * as analytics from "../../analytics/analytics";
class MainForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: props.user._id ? 2 : 1,
			name: "",
			name_err: "",
			gender: "male",
			firstName: "",
			lastName: "",
			email: "",
			dob: "",
			country: "",
			state: "",
			phoneNumber: "",
			zipCode: "",
			weight: "",
			age: "",
			notes: "",
			weight_err: "",
			age_err: "",
			notes_err: "",
			scheduling: 15,
			allergies: "",
			allergies_err: "",
			currentCondition: "",
			currentCondition_err: "",
		};
	}

	componentDidMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		console.info({
			props: this.props,
		});
		if (this.props.isPersist && !this.props.user._id) {
			this.props.showRegBar();
		}
		if (this.props.isPersist && !this.props.currentAppointment) {
			Router.push("/consult/get-in-touch");
		}
		analytics.page("consult/details");
	}

	componentDidUpdate(prevProps) {
		if (this.props.isPersist !== prevProps.isPersist) {
			this.props.showRegBar();
		}
		if (this.props.user !== prevProps.user) {
			this.setState({
				step: this.props.user._id ? 2 : 1,
			});
		}
	}
	componentWillUnmount() {
		this.props.unsetCurrentAppointment();
	}

	nextStep = (values = []) => {
		const { step } = this.state;
		const isValid = values.every((el) => el && el.trim() !== "");
		if (isValid) {
			this.setState({
				step: step + 1,
			});
		}
	};

	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1,
		});
	};
	detailNext = () => {
		const { weight, age, notes } = this.state;
		const fields = this.validateDetails();
		const allValid = Object.values(fields).every((el) => el === "");
		console.log({
			fields,
		});
		this.setState({
			...fields,
		});
		if (allValid) {
			this.nextStep();
		}
	};
	intakeNext = () => {
		const { allergies, currentCondition } = this.state;
		const fields = this.validateIntake();
		const allValid = Object.values(fields).every((el) => el === "");
		console.log({
			fields,
		});
		this.setState({
			...fields,
		});
		if (allValid) {
			this.nextStep();
		}
	};
	validateDetails = () => {
		const { weight, age, notes, name } = this.state;
		const name_err = name.trim() !== "" ? "" : "Please enter name";
		const weight_err =
			weight.trim() !== ""
				? isNaN(weight)
					? "Please enter only number"
					: ""
				: "Please enter weight";
		const age_err =
			age.trim() !== ""
				? isNaN(age)
					? "Please enter only number"
					: ""
				: "Please enter age";
		const notes_err = notes.trim() !== "" ? "" : "Please enter notes";
		return {
			weight_err,
			age_err,
			notes_err,
			name_err,
		};
	};
	validateIntake = () => {
		const { allergies, currentCondition } = this.state;
		const allergies_err =
			allergies.trim() !== "" ? "" : "Please enter allergies";
		const currentCondition_err =
			currentCondition.trim() !== "" ? "" : "Please enter current condition";
		return {
			allergies_err,
			currentCondition_err,
		};
	};
	handleChange = (input) => (event) => {
		this.setState({
			[input]: event.target.value,
			[`${input}_err`]: "",
		});
	};
	radioChange = (ev, name) => {
		const { value } = ev.target;
		console.log({
			value,
			name,
		});
		this.setState({
			[name]: value,
		});
	};
	render() {
		const { step } = this.state;
		console.log({ step });
		const { isPersist } = this.props;
		const {
			name,
			name_err,
			gender,
			firstName,
			lastName,
			phoneNumber,
			zipCode,
			state,
			weight,
			weight_err,
			age,
			age_err,
			notes,
			notes_err,
			scheduling,
			allergies,
			allergies_err,
			currentCondition,
			currentCondition_err,
		} = this.state;
		const values = {
			name,
			name_err,
			gender,
			firstName,
			lastName,
			phoneNumber,
			zipCode,
			state,
			weight,
			weight_err,
			age,
			age_err,
			notes,
			notes_err,
			scheduling,
			allergies,
			allergies_err,
			currentCondition,
			currentCondition_err,
		};
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				{!isPersist && <Loader />}
				<Tabs
					className="c-consultTabs"
					activeKey={step.toString()}
					defaultActiveKey={step}
					onChange={callback}
				>
					<TabPane tab="Login" key="1">
						<div className="c-privacy__page-title">
							<UserDetails
								nextStep={this.nextStep}
								handleChange={this.handleChange}
								values={values}
							/>
						</div>
					</TabPane>
					<TabPane tab="Personal Details" key="2">
						<div className="c-privacy__page-title" />
						<PersonalDetails
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							radioChange={this.radioChange}
							values={values}
						/>
					</TabPane>
					<TabPane tab="Scheduling" key="3">
						<Scheduling
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							radioChange={this.radioChange}
							values={values}
						/>
					</TabPane>
					<TabPane tab="Intake Details" key="4">
						<IntakeDetails
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</TabPane>
					<TabPane tab="Confirmation" key="5">
						<Success
							prevStep={this.prevStep}
							nextStep={() => {
								console.log({
									state: this.state,
								});
							}}
							values={values}
						/>
					</TabPane>
				</Tabs>
			</Layout>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user,
	currentAppointment: state.appointment.currentAppointment,
});
const mapActionsToProps = {
	showRegBar,
	hideRegBar,
	unsetCurrentAppointment,
};
export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(MainForm));
