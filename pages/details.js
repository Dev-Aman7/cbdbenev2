import React, { Component } from "react";
import UserDetails from "../components/consult-tabs/UserDetails";
import PersonalDetails from "../components/consult-tabs/PersonalDetails";
import Success from "../components/consult-tabs/Success";
import Layout from "../components/Layouts/Layout";

import Scheduling from "../components/consult-tabs/Scheduling";
import IntakeDetails from "../components/consult-tabs/intakeDetails";
import { Tabs } from "antd";

import * as analytics from "../analytics/analytics";
const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

class MainForm extends Component {
	state = {
		step: 1,
		firstName: "",
		lastName: "",
		email: "",
		dob: "",
		country: "",
		weight: "",
		state: "",
		phoneNumber: "",
		zipCode: "",
	};

	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1,
		});
	};

	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1,
		});
	};

	handleChange = (input) => (event) => {
		this.setState({ [input]: event.target.value });
	};

	componentDidMount = () => {
		analytics.page("details");
	};

	render() {
		const { step } = this.state;
		console.log({ step });
		const {
			firstName,
			lastName,
			phoneNumber,
			zipCode,
			state,
			weight,
			age,
			notes,
		} = this.state;
		const values = {
			firstName,
			lastName,
			phoneNumber,
			zipCode,
			state,
			weight,
			age,
			notes,
		};
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
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
							values={values}
						/>
					</TabPane>
					<TabPane tab="Scheduling" key="3">
						<Scheduling
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
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
						<Success values={values} />
					</TabPane>
				</Tabs>
			</Layout>
		);
	}
}

export default MainForm;
