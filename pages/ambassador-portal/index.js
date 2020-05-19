import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "../../components/Afilliated/dashboard";
import classNames from "classnames";
import onlyAmbassador from "../../components/hoc/onlyAmbassador";
import Layout from "../../components/Layouts/Layout";
import projectSettings from "../../constants/projectSettings";
import * as analytics from "../../analytics/analytics";

class Affiliate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: "1",
		};
		this.toggle = this.toggle.bind(this);
	}
	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
			});
		}
	}
	componentDidMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		analytics.page("ambassador-portal");
	}

	// <Dashboard countryCode={this.props.countryCode} {...props} />
	render() {
		const { className } = this.props;
		return (
			<Layout headerVersions={["bg-light"]} headerTheme="dark" fixed={true}>
				<script
					src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`}
					async
					defer
				></script>
				<Dashboard
					className={classNames("", {
						[className]: className,
					})}
					history={this.props.history}
				/>
			</Layout>
		);
	}
}
const mapStateToProps = (state) => ({
	location: state.location,
	ambassadoruser: state.ambassadoruser,
});
export default connect(mapStateToProps)(onlyAmbassador(Affiliate));
