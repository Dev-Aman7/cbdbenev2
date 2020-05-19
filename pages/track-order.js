import { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import Link from "next/link";
import { Input } from "antd";

import * as analytics from "../analytics/analytics";

const trackOrder = () => {
	useEffect(() => {
		analytics.page("track-order");
	}, []);
	return (
		<Layout headerVersion={["bg--light"]} headerTheme="dark">
			<div className="track-order">
				<div className="track-order__main track-order__main--center">
					<Heading versions={["large", "upper"]} parentClass="c-privacy">
						Track your order
					</Heading>
					<div className="track-order__id mt-5 mb-4">
						<Input
							className="ant-input c-input__input"
							placeholder="Enter your tracking id"
						/>
					</div>
				</div>

				<div className="track-order__btn-wrap w-30 m-auto ">
					<Link href="/">
						<a className="c-btn c-btn--block c-btn--outline">Submit</a>
					</Link>
				</div>
			</div>
		</Layout>
	);
};
export default trackOrder;
