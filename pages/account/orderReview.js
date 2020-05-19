import React, { Component } from "react";
import { connect } from "react-redux";
// import AddReviews from "./AddReviews";
import FadeTransition from "../../services/extra/FadeTransition";
// import { postReview } from "../../actions";
// import { imagePack } from "../../constants/Constants";
import {
	chooseProducts,
	reviewSuccessMsg,
} from "../../constants/constantMessage";
import Link from "next/link";
import Router from "next/router";
import * as analytics from "../../analytics/analytics";

const postReview = (review, countryCode) => (dispatch) => {
	postReviewApi(review).then((rep) => {
		const res = rep.data;
		if (res.status) {
			dispatch({
				type: REVIEW_POSTED,
				payload: true,
			});
			// getAllProductApi().then(res => res.json())
			//   .then(resJson => {
			//     if (resJson.products) {
			//       setProducts({
			//         products: resJson.products,
			//         countryCode
			//       });
			//       getAllComboApi().then(res => res.json())
			//         .then(resJson1 => {
			//           if (resJson1.combos) {
			//             const products = [...resJson.products, ...resJson1.combos];
			//             setProducts({
			//               products,
			//               countryCode
			//             });
			//           }
			//         })
			//     }else{
			//       getAllComboApi().then(res => res.json())
			//         .then(resJson => {
			//           if (resJson.combos) {
			//             const products = [...resJson.combos];
			//             setProducts({
			//               products,
			//               countryCode
			//             });
			//           }
			//         })
			//     }
			//   })
			//   .catch(err => {
			//     getAllComboApi().then(res => res.json())
			//       .then(resJson => {
			//         if (resJson.combos) {
			//           const products = [...resJson.combos];
			//           setProducts({
			//             products,
			//             countryCode
			//           });
			//         }
			//       })
			//     console.log({
			//       err
			//     })
			//   })
		}
	});
};

class OrderReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedProduct: null,
			isVisible: true,
			isPosted: false,
			isCombo: false,
		};
	}
	componentDidMount() {
		analytics.page("account/order-review");
		const { order } = this.props;
		const list = order && order.products.filter((el) => !el.reviewed);
		if (list.length) {
			Router.push("/");
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedProduct) {
			Router.push("/");
		}
		// if(prevState.selectedProduct !== this.state.selectedProduct){
		//   if(this.state.selectedProduct){
		//     Router.push("/")
		//   }
		// }
	}
	openReview = (pId, isCombo = false) => {
		this.setState(
			{
				isVisible: false,
			},
			() => {
				setTimeout(() => {
					this.setState({
						selectedProduct: pId,
						isVisible: true,
						isCombo,
					});
				}, 400);
			}
		);
	};
	goBack = () => {
		this.setState(
			{
				isVisible: false,
			},
			() => {
				setTimeout(() => {
					this.setState({
						selectedProduct: null,
						isVisible: true,
					});
				}, 400);
			}
		);
	};
	onSubmit = () => {
		const { onSuccess } = this.props;
		this.setState(
			{
				isVisible: false,
			},
			() => {
				setTimeout(() => {
					this.setState({
						isVisible: true,
						isPosted: true,
					});
					if (typeof onSuccess === "function") {
						onSuccess();
					}
				}, 400);
			}
		);
	};
	render() {
		const { order } = this.props;
		const { selectedProduct, isVisible, isPosted } = this.state;
		console.log({});
		const logo = (
			<div className="logo-container pb-4">
				<Link href={`/`}>
					<img
						className="centered-logo"
						src={"/images/logo-new.png"}
						alt="Bené"
					/>
				</Link>
			</div>
		);
		const reviewSuccess = (
			<div className="align-items-center d-flex flex-grow-1 justify-content-center">
				<p className="text-center review-posted title-80">{reviewSuccessMsg}</p>
			</div>
		);
		const list =
			order &&
			order.products
				.filter((el) => !el.reviewed)
				.map((el, ind) => (
					<span
						key={ind}
						className="m-3 Link Link--isBtn cursor-pointer text-center align-items-center justify-content-center"
						onClick={() => {
							this.openReview(
								el.comboId || el.productMeta,
								el.comboId ? true : false
							);
						}}
					>
						{el.title}
					</span>
				));

		// if (list && list === 1)
		//   return (
		//     <FadeTransition
		//       in={isVisible}
		//       className="flex-column align-items-center overflow-auto d-flex h-100 justify-content-center"
		//     >
		//       {logo}
		//       {isPosted && reviewSuccess}
		//       {!isPosted && (
		//         <AddReviews
		//           onSubmit={this.onSubmit}
		//           productId={order.products[0].productMeta}
		//           orderId={order._id}
		//         />
		//       )}
		//     </FadeTransition>
		//   );

		return (
			<FadeTransition
				in={isVisible}
				className="flex-column align-items-center position-relative  d-flex h-100 justify-content-center"
			>
				{logo}
				{selectedProduct && isPosted && reviewSuccess}
				{!selectedProduct && (
					<div
						style={{ flexGrow: 1 }}
						className="d-flex flex-column text-center"
					>
						<div className="text-center w-100 mt-4 fs-3">{chooseProducts}</div>
						<div
							style={{ flexGrow: 1 }}
							className="align-items-center d-flex flex-grow-0 flex-wrap justify-content-center mb-auto mt-auto"
						>
							{list}
						</div>
					</div>
				)}
				{selectedProduct && !isPosted && (
					<span
						className="has-link-border order-review-back-btn"
						onClick={this.goBack}
					>
						go back
					</span>
				)}
				{/* {selectedProduct && !isPosted && (
          <AddReviews
            onSubmit={this.onSubmit}
            productId={selectedProduct}
            isCombo={this.state.isCombo}
            orderId={order._id}
          />
        )} */}
			</FadeTransition>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	location: state.location,
});

export default connect(mapStateToProps, { postReview })(OrderReview);
