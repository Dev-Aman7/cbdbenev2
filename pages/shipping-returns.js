import { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import MainForm from "./details";

import * as analytics from "../analytics/analytics";

const privacy = () => {
	useEffect(() => {
		analytics.page("shipping-returns");
	}, []);
	return (
		<Layout headerVersions={["bg-light"]} headerTheme="dark">
			<div className="c-privacy__page-title c-privacy__mt-85">
				<Heading versions={["large"]} parentClass="c-privacy">
					SHIPPING & RETURNS
				</Heading>
			</div>
			{/* <MainForm/> */}
			<div className="c-privacy__content">
				<Heading>When will I receive my order?</Heading>
				<div className="container">
					<p>
						Our packages are assembled by hand and processed within 24 to 48
						hours. Any order placed on a weekend will be shipped the next
						business day. Business days are Monday through Friday. Orders placed
						around the holidays may experience delays. The shipping transit
						times listed at checkout do not include assembly/processing time.
					</p>
					<p>
						Once your order is shipped you will receive an email link to track
						your shipment.
					</p>
				</div>
				<Heading>What are my shipping options?</Heading>
				<div className="container">
					<p>We offer three shipping options within the U.S.</p>
					<ul>
						<li>Free standard shipping on all orders over $50 in the US.</li>
						<li>Expedited (3-5 business days after processing)</li>
						<li>Express (2 business days after processing)</li>
					</ul>
					<p>We offer International Shipping via UPS</p>
					<ul>
						<li>
							International shipments (approximately 7-10 days after processing)
						</li>
					</ul>
				</div>
				<Heading>Where do you ship?</Heading>
				<div className="container">
					<p>
						We ship to all 50 states in the U.S. as well as internationally to
						most countries. All custom duties, import taxes or fees, if
						assessed, at your country are your responsibility. We strictly
						follow all regulations regarding the shipment of our products within
						the U.S. and abroad. If you any specific questions about shipment to
						your country, please contact us at{" "}
						<a href="mailto:help@cbdbene.com">help@cbdbene.com</a>.
					</p>
				</div>
				<Heading>How do I track your order?</Heading>
				<div className="container">
					<p>
						Once an order is placed a notification email is sent to your email
						address. Please verify your email address is correct or check your
						SPAM folder if you did not receive a notification. It may take 1- 2
						full business days to process the order (before it is actually
						shipped) and to generate a tracking code. The order can be tracked
						on the carrier’s website with the tracking code.
					</p>
					<p>
						Orders placed on our website may be delivered by one of several
						different carriers and shipping methods, although the main carrier
						is UPS.
					</p>
				</div>
				<Heading>Finding Your Order Status</Heading>
				<div className="container">
					<p>
						Once your order leaves our warehouse, it is handled by a carrier
						(such as FedEx or UPS) that provides tracking information until your
						order is delivered. You will receive e-mail notifications about the
						status of your order. You can also signin to “My Orders”
						at www.cbdbene.com anytime. We store information about your recent
						order (including tracking information) as well as past orders.
					</p>
					<p>
						*Tracking information may not be available for up 1- 2 business days
						after an item has shipped from our warehouse.
					</p>
					<p>
						Email us at <a href="mailto:sales@cbdbene.com">sales@cbdbene.com</a>
						  if you have any questions about your order.
					</p>
				</div>
				<Heading versions={["large"]}>Can I store my shipping address?</Heading>
				<p>
					Yes, please visit the “My Profile” section to update your shipping
					addresses. Make sure to hit save once add or edit your shipping
					address. If you signed up for a subscription, you can also update your
					default shipping address in the “My Subscription” section.
				</p>
				<Heading>Return Policy</Heading>
				<div className="container">
					<p>
						Unopened and unused product can be returned within 60 days of
						receiving it, please see our Returns Process below.
					</p>
					<ol>
						<li>
							Email us at 
							<a href="mailto:sales@cbdbene.com">sales@cbdbene.com </a> to alert
							us that you will be returning your UNOPENED product within the 60
							days and request the Return Shipping Address.
						</li>
						<li>
							Once you have shipped your product back to us – please also email
							the tracking number to{" "}
							<a href="mailto:sales@cbdbene.com">sales@cbdbene.com</a> so we can
							keep an eye out for it.
						</li>
						<li>
							Once we receive your package and we can confirm it’s condition, we
							will issue you a refund for the product(s) and email you a
							confirmation. Please allow 7-10 days for the refund to post to
							your statement.
						</li>
					</ol>
					<p>
						*If you have any questions regarding our return policy please{" "}
						<a href="mailto:email help@cbdbene.com">email help@cbdbene.com</a>
					</p>
					<p>
						Bene will only accept returns and refunds from purchases made on
						cbbbene.com. Bene will not accept returns from a purchase made in a
						retail store.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default privacy;
