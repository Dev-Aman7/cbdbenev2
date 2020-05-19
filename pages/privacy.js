import { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import MainForm from "./details";

import * as analytics from "../analytics/analytics";

const privacy = () => {
	useEffect(() => {
		analytics.page("privacy");
	}, []);
	return (
		<Layout headerVersions={["bg-light"]} headerTheme="dark">
			<div className="c-privacy__page-title c-privacy__mt-85">
				<Heading versions={["large"]} parentClass="c-privacy">
					PRIVACY AND COOKIES POLICY
				</Heading>
			</div>
			{/* <MainForm/> */}
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
				<Heading>Introduction of Policy</Heading>
				<div className="container">
					This online privacy policy (“Privacy Policy”) explains CBDbené’s
					privacy practices for the CBDbene.com site (together with its pages
					and features, “Site”) and mobile software application (together with
					its pages and features, “App”). This Privacy Policy explains how we
					collect, use, disclose and manage information that you provide to us
					on the Site or App, as well as how we care for your privacy and
					protect such information. This Privacy Policy applies to you and any
					person helping you visit, access, register with or use the Site or
					creates an Account, or otherwise provides any personal, company,
					financial or other information to us. When you access or use the site
					or App, or otherwise provide any information to us, you agree to this
					privacy policy. If you do not agree with our policies and practices,
					your choice is not to use our services. By accessing or using our
					services, you agree to this privacy policy, or to any changes we may
					subsequently make to this privacy policy. When you create, register or
					log into an account through the Site or the App, you are automatically
					accepting and agreeing to the most-recent version of this Privacy
					Policy, as well as the Site’s and the App’s Terms and Conditions. The
					Site may contain links to other sites. This Privacy Policy does not
					apply to information collected on such third party sites and we are
					not responsible for the privacy practices of such third parties or the
					content of their sites.
				</div>
				<Heading>Users Under the Age of 18</Heading>
				<div className="container">
					The Site is intended for use by adults. Neither the Site nor the App
					is designed or intended to attract, and is not directed to, children
					under eighteen (18) years of age. No one under age 18 may provide any
					information to or on the Website, and no one under the age of 21 may
					register on the Website. We do not knowingly collect personal
					information from users under 18. If you are under 18, do not use or
					provide any information on the Website, or on or through any of its
					features, use any of the interactive or public comment features of the
					Website or provide any information about yourself to us, including
					your name, address, telephone number, email address, or any user name.
					If you are under the age of 21, you may not register with the Website,
					and thus may not make any purchases or access educational services
					through the Website. If we learn we have collected or received
					personal information from a child under 18 without verification of
					parental consent, we will will use reasonable efforts to refrain from
					further using such personal information or maintaining it in
					retrievable form. If you believe we might have any information from or
					about a child under the age of 18, please contact us at
					privacy@cbdbene.com.
				</div>
				<Heading>Categories of Information Collected</Heading>
				<div className="container">
					We may collect personal and non-personal information about you through
					the Site and/or the App. Information Collected through the Site and/or
					the App might include:
					<ul>
						<li>
							Name (first, last and/or middle) and username, Home contact
							information (e.g., billing and shipping addresses, email address,
							telephone number, fax number), date of birth, items purchased,
							password, zip/postal code or country, gender, date of birth,
							electronic signature, hobbies, interests.
						</li>
						<li>Photographic or video image to the extent provided by you.</li>
						<li>
							Medical history, including the results of any questionnaires,
							surveys, information requests, interviews, or other documentary,
							text, video, or audio interactions related to the provision of
							health services.
						</li>
						<li>
							Service provider name and the date, time and content of any
							messages sent from you to us;
						</li>
						<li>
							Internet connection, the equipment you use to access our Site and
							usage details;
						</li>
						<li>Credit/debit card and other billing information;</li>
						<li>Information regarding uses of the services; and</li>
						<li>
							Other information that is automatically collected or that you
							choose to provide in any way, shape or form.
						</li>
					</ul>
					Other Information Collected From Your Mobile Device might include:
					<ul>
						<li>Mobile device ID information;</li>
						<li>Geolocation;</li>
						<li>Name associated with your mobile device;</li>
						<li>Telephone number associated with your mobile device;</li>
						<li>
							With your express consent, your contacts and/or contact
							information (e.g., names, telephone numbers, addresses, email
							addresses, photos) stored on your mobile device; and/or
						</li>
						<li>
							With your express consent, information about third-party software
							applications on your mobile device.
						</li>
					</ul>
				</div>
				<Heading>Use of Information Collected</Heading>
				<div className="container">
					We may use the information we collect from you in a variety of ways,
					such as, for example, to:
					<ul>
						<li>
							Facilitate your use of the Site, the App and/or their respective
							products and/or services;
						</li>
						<li>
							Send you communications like, for example, administrative emails,
							answers to your questions and updates about the Site and/or the
							App;
						</li>
						<li>Process your payments;</li>
						<li>
							Provide information and offers including information about
							third-party businesses, products and services by letter, email,
							text, telephone or other forms of communication;
						</li>
						<li>
							Improve the Site, the App content, features and/or services;
						</li>
						<li>
							Improve the products, services, marketing and promotional efforts
							of CBDbené;
						</li>
						<li>
							Create new products, services, marketing and promotions for
							CBDbené;
						</li>
						<li>Market the businesses, products and/or services of CBDbené;</li>
						<li>
							Help personalize user experiences with the Site, the App and/or
							their respective products and/or services;
						</li>
						<li>Analyze traffic to and through the Site and/or the App;</li>
						<li>
							Analyze user behavior and activity on or through the Site and/or
							the App;
						</li>
						<li>
							Conduct research and measurement activities for purposes of
							product and service research and development, advertising claim
							substantiation, market research, and other activities related to
							the Site, the App and/or their respective products and/or
							services;
						</li>
						<li>
							Monitor the activities of you and others on or through the Site
							and/or the App;
						</li>
						<li>Place and track orders for products on your behalf;</li>
					</ul>
					While we do not currently use third party services that display
					customized content and advertising provided by us, we may do so in the
					future. We may also use the information for statistical and/or
					marketing purposes, to improve our technologies, to provide
					information about our company and to deliver advertising and
					promotional information from our partners and third party vendors. We
					may add your information to our databases to contact you through
					future e-mails, postal mailings and SMS text-messaging regarding site
					updates, upcoming events, new products and services and/or the status
					of orders placed online. We reserve the right to release information
					to law enforcement or other governmental officials as we, in our sole
					discretion, deem necessary to comply with applicable law.
				</div>
				<Heading versions={["large"]}>Use of Web Technologies</Heading>
				<p>
					bené might use various tracking, data aggregation and/or data analysis
					technologies, including, for example, the following:
				</p>

				<Heading>Cookies</Heading>
				<div className="container">
					A cookie is a small data file stored stored on the browser or device
					you use to view a website or message. They may help store user
					preferences and activity, and may allow a website to recognize a
					particular browser or device. There are several types of cookies,
					including, for example, browser cookies, session cookies, and
					persistent cookies. Cookies may record information you access on one
					page of a website to simplify subsequent interaction with that
					website, or to help streamline your transactions on related pages of
					that website. Most major browsers are set up so that they will
					initially accept cookies, but you might be able to adjust your
					browser’s or device’s preferences to issue you an alert when a cookie
					is downloaded, or to block, reject, disable, delete or manage the use
					of some or all cookies on your browser or device. A session ID cookie
					expires when a browser is closed. A persistent cookie remains on your
					hard drive for an extended period of time. Persistent cookies also
					enable us to track and target the interests of our users to enhance
					the experience on the Site. If you reject cookies, you may still use
					the Site but your ability to use some areas of the Site may be
					limited.
				</div>
				<Heading>Flash cookies</Heading>
				<div className="container">
					Flash cookies are cookies written using Adobe Flash, and which may be
					permanently stored on your device. Like regular cookies, Flash cookies
					may help store user preferences and activity, and may allow a website
					to recognize a particular browser or device. Flash cookies are not
					managed by the same browser settings that are used for regular
					cookies.
				</div>
				<Heading>Web beacons</Heading>
				<div className="container">
					Web beacons are pieces of code embedded in a website or email to
					monitor your activity on the website or your opening of the email, and
					which can pass along information such as the IP address of the
					computer or device you use to view the website or open the email, the
					URL page on which the web beacon is located, the type of browser that
					was used to access the website, and previously set cookie values. Web
					beacons are sometimes used to collect advertising data, such as
					counting page views, promotion views or advertising responses.
					Disabling your computer’s, device’s or browser’s cookies may prevent
					some web beacons from tracking or recording certain information about
					your activities.
				</div>
				<Heading>Scripts</Heading>
				<div className="container">
					Web beacons are pieces of code embedded in a website or email to
					monitor your activity on the website or your opening of the email, and
					which can pass along information such as the IP address of the
					computer or device you use to view the website or open the email, the
					URL page on which the web beacon is located, the type of browser that
					was used to access the website, and previously set cookie values. Web
					beacons are sometimes used to collect advertising data, such as
					counting page views, promotion views or advertising responses.
					Disabling your computer’s, device’s or browser’s cookies may prevent
					some web beacons from tracking or recording certain information about
					your activities.
				</div>
				<Heading>Analytic tools</Heading>
				<div className="container">
					Analytic tools are sometimes offered by third parties, and which
					track, measure and/or generate information about a website’s or
					program’s traffic, sales, audience and similar information, and which
					may be used for various reasons, such as, for example, statistical
					research, marketing research, and content ratings research, and
					conversion tracking. Examples of the analytic tools and services which
					bené might use include Google Analytics. bené may also use other
					third-party analytic tools and services. We use this information to
					analyze trends, to administer the Site, to track the movements of
					users around the Site and to gather demographic information about our
					user base as a whole. Please be advised that if you choose to block,
					reject, disable, delete or change the management settings for any or
					all of the aforementioned technologies and/or other tracking, data
					aggregation and data analysis technologies, then certain areas of the
					Site and/or the App might not function properly.
				</div>
				<Heading>Security</Heading>
				<div className="container">
					We implement security measures to help protect the personal
					information we collect by using industry recognized security
					safeguards such as site monitoring, secured networks and servers,
					firewalls and encryption. When we ask for sensitive information, we
					protect it through the use of encryption during transmission, by using
					secure socket layer (SSL) technology. Regardless of the foregoing,
					please observe that “perfect” or “100%” security does not exist on the
					Internet. Therefore, your access and use of the Site and/or the App,
					and your opening of any communications sent through or as a function
					of the Site and/or the App, are done at your own risk. You are
					responsible for protecting against unauthorized access to your
					password and to your computer/mobile device. We ask you not to share
					your password with anyone. To help maintain the security of your
					personal information, bené asks that you please notify it immediately
					of any unauthorized visit, access or use of the Site and/or the App,
					or the loss or unauthorized use of your user access information for
					the Site and/or the App (e.g., username or password).
				</div>
				<Heading>Communications</Heading>
				<div className="container">
					Based upon the personally identifiable information that you provide to
					us, we may send you a welcome e-mail. We will also communicate with
					you in response to your inquiries, to provide any services you
					request, to provide newsletters or other updates that you request and
					to manage your Account. In addition, when you register an Account with
					us, you may choose to consent to our contacting you by e-mail and to
					receiving our e-mail subscriptions, e-mails and advertorial e-mails
					from us. If, at any time, you no longer want us to contact you by
					e-mail and/or receive our e-mail subscriptions, e-mails and
					advertorial e-mails, you may opt out of these functions by changing
					the preferences in your Account. You can contact customer service by
					e-mail at the contact information listed below to assist you with any
					such changes to your Account.
				</div>
				<Heading>Third Party Ad Server Networks</Heading>
				<div className="container">
					Our Site may use third parties such as network advertisers to serve
					advertisements on our Site and may use traffic measurement services to
					analyze traffic on our Site. Our Site’s third party ad network
					providers, the advertisers, the sponsors and/or traffic measurement
					services may themselves set and access their own cookies and other
					technologies on your computer and track certain behavioral information
					regarding users of your computer via an IP address or other device
					identifier. Third party cookies, web beacons and other third party
					technologies are governed by each third party’s specific privacy
					policy, not this one.
				</div>
				<Heading>
					To opt out of third-party tracking on our Site use the following tools
				</Heading>
				<div className="container">
					ou may opt out of the Ad Tech Network by clicking
					http://www.youronlinechoices.com/opt-out-interface. If you would like
					to opt out of having interest-based information collected during your
					visits to our Site or other sites, both the National Advertising
					Initiative (the “NAI”) and the Digital Advertising Alliance (the
					“DAA”) offer opt out tools to assist you in managing your choices.
					Clickhttp://www.networkadvertising.org/choices/ to visit the NAI opt
					out page and clickhttp://www.aboutads.info/choices/ for the DAA opt
					out page. You may wish to visit
					http://www.networkadvertising.org/understanding-online-advertising/ to
					learn more about interest-based advertising and your choices regarding
					having this information used by third parties and your “opt out”
					choices. Opting out through the DAA or the NAI only means that those
					DAA or NAI members will no longer be able to deliver targeted content
					and/or ads to you, which will affect our Site as well as other
					unaffiliated sites, but does not mean you will no longer receive any
					targeted content and/or ads. Also, if your browsers are configured to
					reject cookies when you visit these opt out pages, or you subsequently
					erase your cookies, use a different computer or change web browsers,
					your opt out choices may not, or may no longer, be effective.
				</div>
				<Heading>Opting Out</Heading>
				<div className="container">
					If you want to be removed from our marketing list and do not want us
					to send you e-mail, postal mail or other messages about our products
					and services, you can opt out. To do so, please send an e-mail
					tounsubscribe@cbdbene.com, with the word “REMOVE” in the subject line.
				</div>
				<Heading>Your California Privacy Rights</Heading>
				<div className="container">
					California Civil Code Section 1798.83 permits California residents to
					request certain information regarding our disclosure of such
					residents’ personal information to third parties for such third
					parties’ direct marketing purposes. To make such a request, please
					e-mail us at privacy@cbdbene.com.
				</div>
				<Heading>Privacy Policy Updates</Heading>
				<div className="container">
					We reserve the right to change this Privacy Policy at any time, so
					please review it on a regular basis. Any changes made to this Privacy
					Policy will be posted here. The date stamp at the top of the page
					represents the last day this Privacy Policy was updated. If you have
					questions about this Privacy Policy, you can contact us at
					privacy@cbdbene.com. By maintaining an Account with us, or by using or
					accessing any services provided by us or the Site, you will be deemed
					to have agreed to and accepted this Privacy Policy.
				</div>
				<Heading>Manage Accurate Information</Heading>
				<div className="container">
					If your personally identifiable information changes, or if you no
					longer choose to use our services or the Site, you can contact
					customer service by e-mail to assist you with changes to your Account.
					To the extent your Account closes or becomes inactive, we will
					continue to protect your information as described in this Privacy
					Policy. You may request at any time that bené provide you with an
					opportunity to review and change your personal information collected
					through the Site or the App or to no longer use your personal
					information to provide you with any products or services. Please
					submit any such request (“Request Concerning Personal Information”) By
					email: Privacy@cbdbene.com, with a subject line of “Your Personal
					Information.” For each Request Concerning Personal Information, please
					state “Your Personal Information” in the email or letter subject line,
					and clearly state the the nature of your request and your name, street
					address, city, state, zip code and email address. CBDbené is not
					responsible for any Request Concerning Personal Information that is
					incomplete, incorrectly labeled, or incorrectly sent. You are solely
					responsible for the accuracy and content of your personal information,
					and for keeping your personal information current and correct.
					Further, bené does not respond to “do not track” (DNT) signals.
					Finally, as explained further above, bené does not authorize third
					parties to collect your personal information when you use the Site or
					the App, except as expressly stated in this Privacy Policy. To the
					fullest extent permitted by law, bené is not responsible for, and you
					hereby release bené from any and all liability which may arise from,
					such third parties’ unauthorized collection of your personal
					information
				</div>
				<Heading>Severability</Heading>
				<div className="container">
					If any term or condition of this Privacy Policy is deemed invalid or
					unenforceable by a court of law with binding authority, then the
					remaining Terms and Conditions shall not be affected, and the court
					shall reform the invalidated or unenforceable term or condition to the
					maximum extent permitted under the law and consistent with the intent
					of this Privacy Policy.
				</div>
				<Heading>International Users</Heading>
				<div className="container">
					bené is based in the United States, with our servers and offices
					headquartered in the United States. Please be aware that information
					you provide to us or that we obtain as a result of your use of the
					Site, an Account, or any services provided by us may be processed and
					transferred to, and be subject to the laws of, the United States. The
					privacy and data protection laws in the United States may not be
					equivalent to similar laws in your country of residence. By using the
					Site or an Account, or by providing us with your information, you
					consent to the collection, transfer, storage and processing of
					information to and within the Untied States. If our cookies or other
					software detects IP addresses located in a country outside the United
					States, we reserve the right to deny access to any and all of our
					services.
				</div>
				<Heading>Contact Us</Heading>
				<div className="container">
					If you have any questions or suggestions about this Privacy Policy,
					the Site or the App please contact us by e-mail: privacy@cbdbene.com
				</div>
			</div>
		</Layout>
	);
};

export default privacy;
