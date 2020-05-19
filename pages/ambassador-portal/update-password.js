import React, { Component } from "react";
import { connect } from "react-redux";
// import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
// import Icon from "react-icons-kit";
// import {
//   passwordValidErrMsg,
//   passwordMissingErrMsg,
//   passwordShortErrMsg,
//   passwordMatchErrMsg,
//   confirmPasswordErrMsg,
//   newPasswordSuccessMsg,
//   userNotFound
// } from "../../constants/constantMessage";
// import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";
// import { Modal, ModalHeader } from "reactstrap";
// import waterfall from "async-waterfall";
// import classNames from "classnames";
// import { forgotPasswordAff } from "../../services/api";
import Layout from "../../components/Layouts/Layout";
import * as analytics from "../../analytics/analytics";
class NewUpdatePassword extends Component {
	// constructor(props) {
	//   super(props);
	//   this.handelTextChange = this.handelTextChange.bind(this);
	//   this.submitRegistration = this.submitRegistration.bind(this);
	//   this.toggleModal = this.toggleModal.bind(this);
	//   this.state = {
	//     registration_password: "",
	//     registration_password_err: null,
	//     registration_password_errMsg: "",
	//     registration_confirmPassword: "",
	//     registration_confirmPassword_err: null,
	//     registration_confirmPassword_errMsg: "",
	//     showModal: false,
	//     isLoading: false,
	//     tokanUrl: false,
	//     modalData: {
	//       title: "",
	//       msg: ""
	//     },
	//     focusName: []
	//   };
	// }
	// componentDidMount() {
	//   const { location, history } = this.props;
	//   var url_string = window.location.href;
	//   var url = new URL(url_string);

	//   var token = url.searchParams.get("token");
	//   this.setState({ tokanUrl: token });
	//   if (!token) {
	//     history.push(`/${location.countryCode}/ambassador-portal/login`);
	//     // window.location.href="http://localhost:3000/AF/";
	//   }
	// }

	// setFocus(e) {
	//   const name = e.target.name + "_err";
	//   this.setState(
	//     prevState => ({
	//       focusName: [...prevState.focusName, name]
	//     }),
	//     () => {}
	//   );
	// }
	// unSetFocus(e) {
	//   // unSetFocus //setFocus
	//   const { id } = e.target;

	//   let type = [];
	//   let match = null;

	//   if (e.target.attributes["data-validate"])
	//     type = e.target.attributes["data-validate"].value;
	//   if (e.target.attributes["data-match"])
	//     match = e.target.attributes["data-match"].value;

	//   const name = id + "_err";
	//   this.setState(
	//     prevState => ({
	//       focusName: prevState.focusName.filter(el => el !== name)
	//     }),
	//     () => {
	//       this.fieldVaidation(id, type, match);
	//     }
	//   );
	// }

	// handelTextChange(e) {
	//   const id = e.target.id;
	//   let type = [];
	//   let match = null;
	//   if (e.target.attributes["data-validate"])
	//     type = e.target.attributes["data-validate"].value;
	//   if (e.target.attributes["data-match"])
	//     match = e.target.attributes["data-match"].value;
	//   this.setState(
	//     {
	//       [e.target.id]: e.target.value
	//     },
	//     () => {
	//       this.fieldVaidation(id, type, match);
	//     }
	//   );
	// }
	// toggleModal() {
	//   this.setState(prevState => ({
	//     showModal: !prevState.showModal
	//   }));
	// }
	// submitRegistration(e) {
	//   e.preventDefault();

	//   const { registration_password } = this.state;
	//   waterfall([
	//     done => {
	//       this.fieldVaidation("registration_password", "required,password");
	//       this.fieldVaidation(
	//         "registration_confirmPassword",
	//         "required,password,repassword",
	//         registration_password
	//       );
	//       return done();
	//     },
	//     done => {
	//       const {
	//         registration_password_err,
	//         registration_confirmPassword_err
	//       } = this.state;
	//       if (!registration_password_err && !registration_confirmPassword_err) {
	//         this.setState({
	//           isLoading: true,
	//           showModal: true
	//         });
	//         forgotPasswordAff({
	//           userid: this.state.tokanUrl,
	//           newpassword: registration_password
	//         })
	//           .then(res => {
	//             const resJson = res.data
	//             this.setState({
	//               isLoading: false
	//             });
	//             if (resJson.success) {
	//               this.setState({
	//                 modalData: {
	//                   title: "Success",
	//                   msg: newPasswordSuccessMsg
	//                 }
	//               });
	//               setTimeout(() => {
	//                 this.setState({
	//                   showModal: false
	//                 });
	//                 this.props.history.push(
	//                   `/${
	//                     this.props.location.countryCode
	//                   }/ambassador-portal/login`
	//                 );
	//               }, 3000);
	//             } else if (resJson.message) {
	//               var msg = "";
	//               switch (resJson.message) {
	//                 case "No user found":
	//                   msg = userNotFound;
	//                   break;
	//                 case "User not found":
	//                   msg = userNotFound;
	//                   break;
	//                 default:
	//                   msg = userNotFound;
	//               }
	//               this.setState({
	//                 modalData: {
	//                   title: "Error",
	//                   msg: msg
	//                 }
	//               });
	//               setTimeout(() => {
	//                 this.setState({
	//                   showModal: false
	//                 });
	//               }, 3000);
	//             }
	//           })
	//           .catch(err => {
	//             this.setState({
	//               isLoading: false
	//             });
	//           });
	//       }
	//     }
	//   ]);
	// }
	// fieldVaidation(field, type, match) {
	//   const typeArr = type.split(",");
	//   if (typeArr.includes("required")) {
	//     if (!isEmpty(this.state[field])) {
	//       this.setState({
	//         [field + "_err"]: false,
	//         [field + "_errMsg"]: ""
	//       });
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: "can't be empty"
	//       });
	//       return;
	//     }
	//   }
	//   if (typeArr.includes("name")) {
	//     if (isAlpha(this.state[field])) {
	//       this.setState({
	//         [field + "_err"]: false,
	//         [field + "_errMsg"]: ""
	//       });
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: "Only Alphabets"
	//       });
	//       return;
	//     }
	//   }
	//   if (typeArr.includes("email")) {
	//     if (isEmail(this.state[field])) {
	//       this.setState({
	//         [field + "_err"]: false,
	//         [field + "_errMsg"]: ""
	//       });
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: "Email Not Valid"
	//       });
	//       return;
	//     }
	//   }
	//   if (typeArr.includes("phone")) {
	//     if (isMobilePhone(this.state[field])) {
	//       this.setState({
	//         [field + "_err"]: false,
	//         [field + "_errMsg"]: ""
	//       });
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: "Not Valid"
	//       });
	//       return;
	//     }
	//   }
	//   if (typeArr.includes("zipcode")) {
	//     // if(isPostalCode(this.state[field])){
	//     if (isNumeric(this.state[field])) {
	//       this.setState({
	//         [field + "_err"]: false,
	//         [field + "_errMsg"]: ""
	//       });
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: "Not Valid"
	//       });
	//       return;
	//     }
	//   }
	//   if (typeArr.includes("password")) {
	//     if (this.state[field].length > 5) {
	//       var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,25}$/;
	//       if (true || reg.test(this.state[field])) {
	//         this.setState({
	//           [field + "_err"]: false,
	//           [field + "_errMsg"]: ""
	//         });
	//       } else {
	//         this.setState({
	//           [field + "_err"]: true,
	//           [field + "_errMsg"]: passwordValidErrMsg
	//         });
	//         return;
	//       }
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: passwordShortErrMsg
	//       });
	//       return;
	//     }
	//   }

	//   if (typeArr.includes("repassword")) {
	//     if (this.state[field] === match) {
	//       this.setState({
	//         [field + "_err"]: false,
	//         [field + "_errMsg"]: ""
	//       });
	//     } else {
	//       this.setState({
	//         [field + "_err"]: true,
	//         [field + "_errMsg"]: passwordMatchErrMsg
	//       });
	//       return;
	//     }
	//   }
	// }
	// render() {
	//   const {
	//     registration_password,
	//     registration_password_err,
	//     registration_password_errMsg,
	//     registration_confirmPassword,
	//     registration_confirmPassword_err,
	//     registration_confirmPassword_errMsg,

	//     modalData,
	//     showModal,
	//     isLoading,
	//     focusName
	//   } = this.state;
	//   const { className } = this.props;
	//   return (
	//     <Layout headerVersions={[ 'bg-light' ]} headerTheme="dark" fixed={true}>
	//     <div
	//       className={classNames("", {
	//         [className]: className
	//       })}
	//     >
	//       <div className="container">
	//         <div className="row justify-content-center Regular">
	//           <div className="col-lg-5  p-md-5 p-3 col-md-6 register">
	//             <h3 className="text-center text-uppercase">Set New Password</h3>

	//             <div className="inside-form Larger ">
	//               <form onSubmit={this.submitRegistration}>
	//                 <div
	//                   className={classNames("has-input", {
	//                     "has-error":
	//                       registration_password_err &&
	//                       !focusName.includes("registration_password_err")
	//                   })}
	//                 >
	//                   <label>Password:</label>
	//                   <input
	//                     id="registration_password"
	//                     name="registration_password"
	//                     value={registration_password}
	//                     onChange={this.handelTextChange}
	//                     type="password"
	//                     data-validate={["password", "required"]}
	//                     onFocus={e => this.setFocus(e)}
	//                     onBlur={e => this.unSetFocus(e)}
	//                   />
	//                   {registration_password_err &&
	//                     !focusName.includes("registration_password_err") && (
	//                       <p className="error">
	//                         {registration_password_errMsg &&
	//                         registration_password_errMsg === "can't be empty"
	//                           ? passwordMissingErrMsg
	//                           : registration_password_errMsg}
	//                       </p>
	//                     )}
	//                 </div>
	//                 <div
	//                   className={classNames("has-input", {
	//                     "has-error":
	//                       registration_confirmPassword_err &&
	//                       !focusName.includes("registration_confirmPassword_err")
	//                   })}
	//                 >
	//                   <label>Confirm Password:</label>
	//                   <input
	//                     id="registration_confirmPassword"
	//                     name="registration_confirmPassword"
	//                     value={registration_confirmPassword}
	//                     onChange={this.handelTextChange}
	//                     type="password"
	//                     onFocus={e => this.setFocus(e)}
	//                     onBlur={e => this.unSetFocus(e)}
	//                     data-validate={["repassword", "required"]}
	//                     data-match={registration_password}
	//                   />
	//                   {registration_confirmPassword_err &&
	//                     !focusName.includes(
	//                       "registration_confirmPassword_err"
	//                     ) && (
	//                       <p className="error">
	//                         {registration_confirmPassword_errMsg &&
	//                         registration_confirmPassword_errMsg ===
	//                           "can't be empty"
	//                           ? confirmPasswordErrMsg
	//                           : registration_confirmPassword_errMsg}
	//                       </p>
	//                     )}
	//                 </div>
	//                 <div>
	//                   <button type="submit" className="btn w-100 btn-main">
	//                     Update
	//                   </button>
	//                 </div>
	//               </form>
	//             </div>
	//           </div>
	//         </div>
	//       </div>
	//       <Modal
	//         isOpen={showModal}
	//         toggle={this.toggleModal}
	//         className={"full-modal"}
	//       >
	//         <ModalHeader toggle={this.toggleModal}>{modalData.title}</ModalHeader>
	//         <div className="Modal-body center-modal">
	//           <div className="modal-inner">
	//             {isLoading && <div className="loader" />}
	//             {!isLoading && (
	//               <div className="modal-content">
	//                 {modalData.title === "Error" ? (
	//                   <div style={{ color: "#EF233C", textAlign: "center" }}>
	//                     <Icon
	//                       className="popup-alert-icon"
	//                       size={64}
	//                       icon={ic_error_outline}
	//                     />
	//                   </div>
	//                 ) : (
	//                   <Icon
	//                     className="popup-alert-icon"
	//                     size={64}
	//                     icon={ic_done}
	//                   />
	//                 )}
	//                 <p className="text-center title-80 p-3">{modalData.msg}</p>
	//               </div>
	//             )}
	//           </div>
	//         </div>
	//       </Modal>
	//     </div></Layout>
	//   );
	// }
	render() {
		return <div></div>;
	}
}

const mapStateToProps = (state) => ({
	location: state.location,
});
export default connect(mapStateToProps)(NewUpdatePassword);
