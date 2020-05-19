import Layout from "../../components/Layouts/Layout";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions";
import CategoryProducts from "../../components/CategoryProducts";
import categoryList from "../../constants/categoryList";
import Heading from "../../components/Heading";
import ContactFrom from "../../components/forms/ContactForm";
import { Form, Radio as AntRadio } from "antd";
import Input from "../../components/form-components/Input";
import Button from "../../components/form-components/Button";
import { setForgotPassword } from "../../services/api";
import ErrorBlock from "../../components/ErrorBlock";
import reactComponentDebounce from "react-component-debounce";
import FadeTransition from "../../services/extra/FadeTransition";
import { warning } from "react-icons-kit/fa/";
import Router from "next/router";
import {
	passwordMissingErrMsg,
	confirmPasswordErrMsg,
	userNotFound,
	newPasswordSuccessMsg,
	problemTitle,
} from "../../constants/constantMessage";
const DebounceInput = reactComponentDebounce({
	valuePropName: "value",
	triggerMs: 1000,
})(Input);

import * as analytics from "../../analytics/analytics";
class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeCategory: "Featured",
			allProducts: props.products.products || [],
			products: props.products.featured || [],
			isLoading: false,
			showModal: false,
			modalData: {},
		};
	}
	static getInitialProps = ({ query, res }) => {
		return query;
	};
	componentDidMount() {
		if (this.props.token) {
			// alert(this.props.token)
		}
		analytics.page("forgetpassword");
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log({ values, form: this.props });
				setForgotPassword({
					userid: this.props.token,
					newpassword: values.password,
				})
					.then((res) => {
						const resJson = res.data;
						this.setState({
							isLoading: false,
						});
						if (res.status === 200) {
							console.log({
								resJson,
							});
							if (resJson.success) {
								this.setState({
									showModal: true,
									modalData: {
										title: "Success",
										msg: newPasswordSuccessMsg,
									},
								});
								setTimeout(() => {
									//   window.location.href = "/";
									Router.push("/");
								}, 2000);
							} else if (resJson.message) {
								var msg = "";
								switch (resJson.message) {
									case "No user found":
										msg = userNotFound;
										break;
									case "User not found":
										msg = userNotFound;
										break;
									default:
										msg = userNotFound;
								}
								this.setState({
									showModal: true,
									modalData: {
										title: problemTitle,
										msg: msg,
									},
								});
								// this.autoModalOff();
							}
						} else {
							this.setState({
								isLoading: false,
								showModal: true,
								modalData: {
									title: problemTitle,
									msg: "something wrong",
								},
							});
						}
					})
					.catch((err) => {
						this.setState({
							isLoading: false,
							showModal: true,
							modalData: {
								title: problemTitle,
								msg: "something wrong",
							},
						});
					});
			}
		});
	};
	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};
	render() {
		const {
			activeCategory,
			products,
			isLoading,
			showModal,
			modalData,
		} = this.state;
		const { Item } = Form;
		const { getFieldDecorator } = this.props.form;
		return (
			<Layout className="c-contact" title="Forget Password" headerTheme="dark">
				<div className="c-contact__container forget-password-wrapper">
					<Heading>Set a new password</Heading>

					<FadeTransition unmountOnExit={true} in={showModal}>
						<ErrorBlock
							icon={warning}
							msg={modalData.msg}
							title={modalData.title}
						/>
					</FadeTransition>
					<Form onSubmit={this.onSubmit}>
						<Item>
							{getFieldDecorator("password", {
								rules: [
									{ required: true, message: "Please input password!" },
									{
										min: 5,
										message: "Password must have min 5 character!",
									},
								],
							})(
								<DebounceInput
									versions={["light"]}
									parentClass="c-contact-form"
									type="password"
									label="Password"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator("password2", {
								rules: [
									{ required: true, message: "Please confirm password!" },
									{
										validator: this.compareToFirstPassword,
									},
								],
							})(
								<DebounceInput
									versions={["light"]}
									parentClass="c-contact-form"
									type="password"
									label="Confirm Password"
								/>
							)}
						</Item>
						<Button
							theme="outline"
							type="submit"
							disabled={isLoading}
							versions={["block"]}
						>
							Save
						</Button>
					</Form>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.products,
});
Contact.defaultProps = {
	products: {},
};
export default connect(mapStateToProps, { getProducts })(
	Form.create({ name: "contact" })(Contact)
);
