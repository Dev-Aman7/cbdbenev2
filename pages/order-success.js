import { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import Link from "next/link";
import * as analytics from "../analytics/analytics";
const orderSuccess = (props) => {
	useEffect(() => {
		analytics.page("order-success");
	}, []);
	console.log({
		props,
	});
	return (
		<Layout headerVersion={["bg--light"]} headerTheme="dark">
			<div className="o-success">
				<div className="o-success__main o-success__main--center">
					<Heading versions={["large", "upper"]} parentClass="c-privacy">
						Thank you <br /> for your order
					</Heading>
					<Heading
						versions={["small", "upper", "gold"]}
						parentClass="mt-3 c-privacy "
					>
						Order Number: 101020300212
					</Heading>
					<p className="o-success__descp mt-3">
						The order information will be sent via e-mail to manish@example.com{" "}
					</p>
				</div>

				<div className="o-success__btn-wrap w-30 m-auto ">
					<Link href="/">
						<a className="c-btn c-btn--block c-btn--outline">
							Continue shopping
						</a>
					</Link>
				</div>
			</div>
		</Layout>
	);
};
orderSuccess.getInitialProps = async ({ query }) => {
	if (query.order) {
		return {
			order: query.order,
		};
	} else {
		return null;
	}
};
export default orderSuccess;
