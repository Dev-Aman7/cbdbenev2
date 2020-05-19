import { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";

import * as analytics from "../analytics/analytics";
const privacy = () => {
	useEffect(() => {
		analytics.page("websiteaccessibility");
	}, []);
	return (
		<Layout headerVersions={["bg-light"]} headerTheme="dark">
			<div className="c-privacy__page-title">
				<Heading versions={["large"]} parentClass="c-privacy">
					PRIVACY AND COOKIES POLICY
				</Heading>
			</div>
			<div className="c-privacy__content">
				<Heading>Welcome to CBD bené</Heading>
				<div className="container">
					bené LLC, a Delaware limited liability company d/b/a CBDbené
					collectively referred to in this privacy policy as “CBDbene,” the
					“Company” or sometimes “we” or “us” or “our”), operates the site
					located at the URL www.CBDbene.com (together with any other site or
					applications branded as bené (collectively, the “Site”). bené respects
					your privacy rights and is committed to protecting the information we
					collect from you online.
				</div>
			</div>
		</Layout>
	);
};

export default privacy;
