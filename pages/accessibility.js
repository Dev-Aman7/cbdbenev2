import { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import * as analytics from "../analytics/analytics";
const Accessibility = () => {
	useEffect(() => {
		analytics.page("accessibility");
	}, []);
	return (
		<Layout headerVersions={["bg-light"]} fixed={true} headerTheme="dark">
			<div className="c-accessibility__page-title">
				<Heading versions={["large"]} parentClass="c-accessibility">
					Website accessibility
				</Heading>
			</div>
			<div className="c-accessibility__content">
				<Heading>Welcome to CBD bené</Heading>
				<div className="container">
					bené LLC, a Delaware limited liability company d/b/a CBD bené
					collectively referred to in this privacy policy as “CBD bené,” the
					“Company” or sometimes “we” or “us” or “our”), operates the website
					located at the URL www.CBDbene.com (together with any other website or
					applications branded as CBD bené (collectively, the “Website”). CBD
					bene is committed to making our website accessible to all our
					customers. We have been making changes to improve website
					accessibility and will continue to monitor and make improvements going
					forward. If you would like to send us feedback about our website,
					please contact us using the email: customerservice@cbdbene.com
				</div>
			</div>
		</Layout>
	);
};

export default Accessibility;
