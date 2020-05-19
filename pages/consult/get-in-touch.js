import Layout from "../../components/Layouts/Layout";
import Banner from "../../components/Banner";
import Router from "next/router";
import { connect } from "react-redux";
import CategoryProducts from "../../components/CategoryProducts";
import categoryList from "../../constants/categoryList";
import Heading from "../../components/Heading";
import ContactFrom from "../../components/forms/ContactForm";
import Button from "../../components/form-components/Button";
import TitleList from "../../components/TItleList";
import { getDoctors } from "../../services/api";
import apiList from "../../services/apis/apiList";
import fetch from "isomorphic-fetch";
import DrCardLong from "../../components/doctors/DrCardLong";
import { getName } from "../../services/helpers/DoctorHelpers";
import doctorData from "../../public/api/beneGetDoctor.json";
import { setCurrentAppointment } from "../../redux/actions";
import * as analytics from "../../analytics/analytics";
class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// activeCategory: "Featured",
			// allProducts: props.products.products || [],
			// products: props.products.featured || []
		};
	}
	// static getInitialProps = async () => {
	//     const res = await fetch(apiList.getDoctors)
	//     const doctors = await res.json()
	//     return {
	//         doctors: doctors.data.filter((e, i )=> i < 2 )
	//     }
	// }
	componentDidMount() {
		console.log({
			props: this.props,
			doctorData,
		});

		analytics.page("consult/get-in-touch");
	}
	componentDidUpdate(prevProps) {
		// console.log({
		//   currentAppointment: this.props.currentAppointment
		// });
		if (prevProps.currentAppointment !== this.props.currentAppointment) {
			if (this.props.currentAppointment) {
				Router.push("/consult/details");
			}
		}
	}
	onAppointment = (appointment, evt, doctor) => {
		console.log({
			evt,
			Router,
			appointment,
			doctor,
		});
		const { appointments, ...rest } = doctor;
		if (appointment) {
			this.props.setCurrentAppointment({
				...appointment,
				doctorName: getName(doctor),
				doctor: {
					...rest,
				},
			});
		}
	};
	render() {
		// const {
		//   activeCategory, products
		// } = this.state
		const { doctors } = this.props;
		return (
			<Layout
				className="c-consult-page"
				title="Consult"
				headerTheme="dark"
				fixed={true}
			>
				<Banner
					image="/images/consult.jpg"
					image2x="/images/contact-banner@2x.jpg"
					heading={
						<span>
							Consult a certified <br />
							doctor about CBD
						</span>
					}
					bottomLogo={true}
					parentClass="c-consult-page"
					versions={[
						"hf-content",
						"align-left",
						"align-bottom",
						"heading-l-br",
						"btm-logo",
						"content",
						"no-overlay",
						"brand-heading",
					]}
					// extraButton={
					//   <Button versions={["outline", "block"]}>
					//     Get in touch
					//   </Button>
					// }
					content={
						<span>
							Get in touch with our doctors who have experience with CBD
						</span>
					}
				></Banner>
				<div className="c-consult-page__container overflow-hidden ">
					<div className="row">
						<div className="col-md-6">
							<Heading parentClass="c-consult-page">Our Doctors</Heading>
						</div>
						<div className="col-md-6">
							<Heading subHeading={true} parentClass="c-consult-page">
								Select a doctor licensed to practice in your state. Schedule
								your appointment and pay for your visit.
							</Heading>
						</div>
						<div className="col-12">
							<div className="container c-consult-page__dr-card-wrapper">
								{doctors.map((doctor, key) => {
									const { picture } = doctor;
									const image = picture.length > 0 ? picture[0] : "";
									return (
										<DrCardLong
											onAppointment={(appointment, evt) =>
												this.onAppointment(appointment, evt, doctor)
											}
											doctor={doctor}
											image={image}
											key={key}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="c-consult-page__container c-consult-page__container--white c-consult-page__container--not-full">
					<div className="col-12 d-flex flex-column ">
						<div className="mt-auto">
							<Heading
								parentClass="c-consult-page"
								versions={["center", "large"]}
							>
								Doctors you can trust
							</Heading>
							<br />
							<br />
						</div>
						<div className="c-consult-page__lists c-consult-page__lists--trust mt-auto mb-auto">
							<div className="container">
								<div className="row justify-content-center">
									<div className="col-md-6 col-lg-5">
										<TitleList
											versions={["break-title", "title-underline"]}
											parentClass="c-consult-page"
											title="Professional"
										>
											Visit a doctor, counselor, psychiatrist or dermatologist
											by mobile app, video or phone.
										</TitleList>
									</div>
									<div className="col-md-6 col-lg-5">
										<TitleList
											versions={["break-title", "title-underline"]}
											parentClass="c-consult-page"
											title="Accessible"
										>
											Speak to a medical professional easily via the web or
											phone.
										</TitleList>
									</div>
									<div className="col-md-6 col-lg-5">
										<TitleList
											versions={["break-title", "title-underline"]}
											parentClass="c-consult-page"
											title="Experienced"
										>
											Our doctors have an average of{" "}
											<b>15 years of experience.</b>
										</TitleList>
									</div>
									<div className="col-md-6 col-lg-5">
										<TitleList
											versions={["break-title", "title-underline"]}
											parentClass="c-consult-page"
											title="Affordable"
										>
											Our consult costs only <b>$49.00.</b>
										</TitleList>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="c-consult-page__container c-consult-page__container--black c-consult-page__container--not-full">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<Heading
								versions={["gold", "upper", "very-large"]}
								parentClass="c-consult-page"
							>
								All of our providers are verified for medical licensure, work
								history and education.
							</Heading>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	currentAppointment: state.appointment.currentAppointment,
});
Contact.defaultProps = {
	doctors: [...doctorData.data],
};
export default connect(mapStateToProps, {
	setCurrentAppointment,
})(Contact);
