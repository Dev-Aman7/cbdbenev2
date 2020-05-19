import { useEffect } from "react";

import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import Button from "../components/form-components/Button";

import * as analytics from "../analytics/analytics";

const Favourites = (props) => {
	useEffect(() => {
		analytics.page("favourites");
	}, []);
	return (
		<Layout headerVersions={["bg-light"]} headerTheme="dark">
			<div className="c-favourites-page">
				<div className="c-favourites-page__page-title">
					<Heading versions={["transform"]} parentclassName="c-favourites-page">
						My favourites
					</Heading>
				</div>
			</div>

			<section className="c-favourites__item">
				<div className="container">
					<div className="row c-favourites__row">
						<div className="c-favourites__item-row">
							<div className="c-favourites__img-wrap">
								<img className="img-fluid" src="images/cbd-oil.png" />
							</div>
							<div className="c-favourites__heading">
								<h3 className="c-favourites__heading__title">
									CBD ISOLATE 500MG
								</h3>
							</div>
							<div className="c-favourites__action">
								<ul className="c-favourites__action-wrap">
									<li className="c-favourites__action-wrap__list">
										<a
											className="c-favourites__action-wrap__list-link"
											href="#"
										>
											View
										</a>
									</li>
									<li className="c-favourites__action-wrap__list">
										<a
											className="c-favourites__action-wrap__list-link"
											href="#"
										>
											Delete
										</a>
									</li>
									<li className="c-favourites__action-wrap__list">
										<a
											className="c-favourites__action-wrap__list-link"
											href="#"
										>
											Buy
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="c-favourites__button-wrapper">
							<Button versions={["outline", "block"]}>Go Shopping</Button>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};
export default Favourites;
