import Link from "next/link";
import { connect } from "react-redux";
import FadeTransition from "../components/FadeTransition";
import classNames from "classnames";
import LearnCollapsePlus from "../components/learn/LearnCollapsePlus";
import LearnCollapse from "../components/learn/LearnCollapse";
import Layout from "../components/Layouts/Layout";

import * as analytics from "../analytics/analytics";

class Learn extends React.Component {
	constructor() {
		super();
		this.state = {
			openedCollapse: "1",
			isVisible: true,
			contentId: "1_1",
			innerCollapse: "1",
		};
	}
	componentDidMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		this.prevScroll = window.scrollY;
		const url_string = window.location.href;
		const url = new URL(url_string);
		const id = url.searchParams.get("id");
		const col = url.searchParams.get("col") || "1";
		const { openedCollapse } = this.state;
		if (id && id !== "" && openedCollapse !== id) {
			this.setState({
				openedCollapse: id,
				contentId: `${id}_${col}`,
				innerCollapse: col,
			});
		}
		window.addEventListener("scroll", this.handleScroll);

		analytics.page("learn");
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	handleScroll = () => {
		const scrollUp = this.prevScroll > window.scrollY;
		const { wrapper, leftScrolls, rightScrolls } = this.refs;

		const windowScrollTop = window.scrollY;
		const wrapperHeight = wrapper.clientHeight;
		const wrapperOffsetTop = wrapper.offsetTop;

		const leftScrollsHeight = leftScrolls.clientHeight;
		const leftScrollsWidth = leftScrolls.clientWidth;
		const leftScrollsOffsetTop = leftScrolls.offsetTop;

		const rightScrollsHeight = rightScrolls.clientHeight;
		const rightScrollsOffsetTop = rightScrolls.offsetTop;

		const headerHeight = 120;
		const windowWidth = window.innerWidth;
		// console.log({
		//   windowScrollTop,
		//   wrapperHeight,
		//   wrapperOffsetTop,
		//   leftScrollsHeight,
		//   leftScrollsOffsetTop,
		//   rightScrollsHeight,
		//   rightScrollsOffsetTop,
		//   leftScrolls
		// });
		const rH = wrapperHeight + wrapperOffsetTop - leftScrollsHeight;
		// console.log({
		//   rH,
		//   wS: windowScrollTop
		// });
		if (scrollUp || true) {
			if (rightScrollsHeight > leftScrollsHeight) {
				if (
					windowScrollTop + headerHeight >= leftScrollsOffsetTop &&
					windowWidth > 991
				) {
					if (
						windowScrollTop + headerHeight >=
						rightScrollsOffsetTop + rightScrollsHeight
					) {
						const diffTop =
							windowScrollTop - leftScrollsOffsetTop + headerHeight;
						leftScrolls.style.position = "absolute";
						leftScrolls.style.top = `${diffTop}px`;
						rightScrolls.style.marginLeft = `${leftScrollsWidth}px`;
					} else {
						const diffTop = rH - headerHeight;
						if (rH < windowScrollTop + (headerHeight - 5)) {
							leftScrolls.style.top = `${diffTop + headerHeight}px`;
							leftScrolls.style.position = "absolute";
						} else {
							leftScrolls.style.top = `${headerHeight}px`;
							leftScrolls.style.position = "fixed";
						}
						rightScrolls.style.marginLeft = `${leftScrollsWidth}px`;
						leftScrolls.style.width = `${leftScrollsWidth}px`;
					}
				} else {
					console.log("else+");
					leftScrolls.style.position = "";
					leftScrolls.style.top = "";
					rightScrolls.style.marginLeft = "";
					leftScrolls.style.width = "";
				}
			} else {
				leftScrolls.style.width = "";
				leftScrolls.style.position = "";
				leftScrolls.style.top = "";
				rightScrolls.style.marginLeft = "";
			}
		}
		// else{
		//   // const headerHeight = 10
		//   if(rightScrollsHeight > leftScrollsHeight){
		//     if((windowScrollTop + (headerHeight - 1)) >= leftScrollsOffsetTop){
		//       if((windowScrollTop + headerHeight) >= (rightScrollsOffsetTop + rightScrollsHeight)){
		//         const diffTop = (windowScrollTop - leftScrollsOffsetTop) + headerHeight
		//         leftScrolls.style.position = "absolute"
		//         leftScrolls.style.top = `${diffTop}px`
		//         rightScrolls.style.marginLeft = `${leftScrollsWidth}px`
		//       }else{
		//         leftScrolls.style.position = "fixed"
		//         leftScrolls.style.top = `${headerHeight}px`
		//         rightScrolls.style.marginLeft = `${leftScrollsWidth}px`
		//         leftScrolls.style.width = `${leftScrollsWidth}px`
		//       }

		//     }else{
		//       console.log("else+")
		//       leftScrolls.style.position = ""
		//       leftScrolls.style.top = ""
		//       rightScrolls.style.marginLeft = ""
		//     }
		//   }
		// }

		this.prevScroll = window.scrollY;
	};
	changeCollapse = (id) => {
		this.setState((prevState) => ({
			openedCollapse: id === prevState.openedCollapse ? null : id,
		}));
	};
	changeContent = (contentId) => {
		if (this.timeOut1) {
			clearTimeout(this.timeOut1);
		}
		if (this.timeOut2) {
			clearTimeout(this.timeOut2);
		}
		this.setState(
			{
				isVisible: false,
			},
			() => {
				this.timeOut1 = setTimeout(() => {
					this.setState(
						{
							contentId,
						},
						() => {
							setTimeout(() => {
								this.timeOut2 = this.setState({
									isVisible: true,
								});
							}, 300);
						}
					);
				}, 400);
			}
		);
	};
	changeInnerCollapse = (id) => {
		this.setState((prevState) => ({
			innerCollapse: id === prevState.innerCollapse ? null : id,
		}));
	};
	getHeading = (contentId, data) => {
		if (contentId) {
			const ids = contentId.split("_");
			const perticularEl = data.find((el) => el.id === ids[0]);
			if (perticularEl && perticularEl.subMenus) {
				const heading = perticularEl.subMenus.find((el) => el.id === ids[1]);
				if (heading && heading.title) {
					return heading.title;
				}
			}
		}
		return null;
	};
	render() {
		const { className } = this.props;
		const { openedCollapse, isVisible, innerCollapse, contentId } = this.state;
		const learnData = [
			{
				title: "Everything about CBD",
				id: "1",
				subMenus: [
					{
						title: "What is CBD",
						id: "1",
					},
					{
						title: "Endocannabinoid System",
						id: "2",
					},
					{
						title: "CBD benefits",
						id: "3",
					},
					{
						title: "CBD vs THC",
						id: "4",
					},
					{
						title: "Legality",
						id: "5",
					},
					{
						title: "Extraction",
						id: "6",
					},
					{
						title: "Dosage",
						id: "7",
					},
					{
						title: "CBD for Seniors",
						id: "8",
					},
					{
						title: "CBD for Pets",
						id: "9",
					},
				],
			},
			{
				title: "About our Products",
				id: "2",
				subMenus: [
					{
						title: "Quality of Products",
						id: "1",
					},
					{
						title: "Label Claims",
						id: "2",
					},
					{
						title: "Suggested Use",
						id: "3",
					},
					{
						title: "Common forms of CBD",
						id: "4",
					},
					{
						title: "Bioavailability",
						id: "5",
					},
					{
						title: " CBD oil",
						id: "6",
					},
					{
						title: "CBD Isolate",
						id: "7",
					},
					{
						title: "Hemp Seed Oil",
						id: "9",
					},
					{
						title: "MCT Coconut oil",
						id: "10",
					},
					{
						title: "Our CBD products are not psychoactive!",
						id: "11",
					},
					{
						title: "CBD capsules",
						id: "12",
					},
					{
						title: "Topical CBD Products",
						id: "13",
					},

					// {
					//   title: "Effects of CBD",
					//   id: "14"
					// }
				],
			},
			{
				title: "Orders FAQ",
				id: "3",
				subMenus: [
					{
						title: "Ordering Online ",
						id: "1",
					},
					{
						title: "View Order Status",
						id: "2",
					},
					{
						title: "Cancelling Orders",
						id: "3",
					},
					{
						title: "Order History",
						id: "4",
					},
					{
						title: "International Orders",
						id: "5",
					},
					{
						title: "Payment",
						id: "6",
					},
					{
						title: "Problem with your Order",
						id: "7",
					},
					{
						title: "Account",
						id: "8",
					},
					{
						title: "How do I return a product?",
						id: "9",
					},
					{
						title: "Late Returns",
						id: "10",
					},
					{
						title: "Products Not Eligible for Return",
						id: "11",
					},
					{
						title: "Receiving a Refund",
						id: "12",
					},
					{
						title: "Subscription order",
						id: "13",
					},
				],
			},
			{
				title: "Shipping FAQ",
				id: "4",
				subMenus: [
					{
						title: "Shipping Policy ",
						id: "1",
					},
					{
						title: "Shipping options",
						id: "2",
					},
					{
						title: "Shipping fees",
						id: "3",
					},
					{
						title: "Taxes",
						id: "4",
					},
					{
						title: "Where do you ship?",
						id: "5",
					},
					{
						title: "Do you ship to an APO/FPO/DPO address or a Military base?",
						id: "6",
					},
					{
						title:
							"What if my order status is ‘delivered’ and i have not received my package?",
						id: "7",
					},
					{
						title: "Can I store my shipping address?",
						id: "8",
					},
				],
			},
			{
				title: "Consult",
				id: "5",
				subMenus: [
					{
						title: "What is Consult?",
						id: "1",
					},
					{
						title: "Request an Appointment",
						id: "2",
					},
					{
						title: "Payment",
						id: "3",
					},
					{
						title: "Before the Actual Appointment",
						id: "4",
					},
					{
						title: "CBD questions",
						id: "5",
					},
					{
						title: "Video Consult",
						id: "6",
					},
					{
						title: "Follow up Consult",
						id: "7",
					},
				],
			},
		];
		const learnSubData = {
			"1_1": (
				<div>
					<p>
						CBD, or Cannabidiol, is one of the compounds found in the Cannabis
						plant which the plant naturally produces. The other well-known
						compound is tetrahydrocannabinol (THC). THC and CBD are both
						Cannabinoids, occurring naturally in the cannabis plant. Hemp and
						Marijuana are two very different strains of the cannabis plant.
						However, CBD (cannabidiol) does not produce any intoxicating or
						“high” effects, meaning users can experience its benefits without
						disconcerting feelings of lethargy or dysphoria.{" "}
					</p>

					<LearnCollapsePlus
						title="Where does our CBD come from?"
						onClick={() => {
							this.changeInnerCollapse("1_1_1");
						}}
						isOpen={innerCollapse === "1_1_1"}
					>
						CBD can be extracted from marijuana flowers or from hemp leaves.
						But, just to be clear, our CBD comes from solely from the Hemp plant
						ONLY as hemp plants produce more CBD and contain less than 0.3% THC.
						This single difference is what distinguishes hemp from marijuana.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Is CBD psychoactive?"
						onClick={() => {
							this.changeInnerCollapse("1_1_2");
						}}
						isOpen={innerCollapse === "1_1_2"}
					>
						In contrast to THC, which is known for its psychoactive qualities,
						CBD is the ingredient that expressly does not produce a high. In
						fact, CBD provides many benefits that are commonly sought after, for
						a variety of healing and soothing purposes.
					</LearnCollapsePlus>
				</div>
			),
			"1_2": (
				<div>
					<p>
						Your body produces its own Cannabinoids. Seriously. It does.
						<br />
						Cannabinoids are chemical compounds. They are produced naturally in
						the human body and also found in plants such as hemp and marijuana.
					</p>
					<p>
						The human body produces Endocannabinoids (endo means ‘within’, as in
						within the body), just like cannabis and some other plants produce
						phytocannabinoids (<em>Phyto</em> – meaning ‘plant’). Our body also
						has receptors called CB1 and CB2 designed specifically to recognize
						and respond to our endogenous cannabinoids.
					</p>
					<LearnCollapsePlus
						title="Why is it even called the Endocannabinoid System?"
						onClick={() => {
							this.changeInnerCollapse("1_2_1");
						}}
						isOpen={innerCollapse === "1_2_1"}
					>
						For starters, it has way too many syllables. But it’s similar to how
						research on morphine led to the discovery of endogenous
						morphine-like chemicals, which we know as endorphins (‘endo’
						meaning). And our bodies have endogenous cannabinoids and
						cannabinoid receptors. So, it was named the Endocannabinoid System,
						or ECS, which is a network of receptors throughout the body that
						interact with cannabinoids.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="How does the ECS work?"
						onClick={() => {
							this.changeInnerCollapse("1_2_2");
						}}
						isOpen={innerCollapse === "1_2_2"}
					>
						The human body's ECS is responsible for maintaining balance and
						essential regulatory functions like sleep, mood, and memory. The ECS
						relies on the natural production of endogenous cannabinoids in order
						to function properly. Sometimes we need to supplement our endogenous
						cannabinoids with cannabinoids from external sources, such as CBD.
						When you ingest CBD, it stimulates the ECS which in turn helps to
						restore balance and maintain homeostasis.
					</LearnCollapsePlus>
				</div>
			),
			"1_3": (
				<div>
					<p>
						CBD or cannabidiol is gaining popularity in the health and wellness
						world thanks to its wonderful qualities. It Regulates homeostasis
						which is essentially the stable balance between interdependent
						elements, especially as maintained by physiological processes.
					</p>
					<p>
						Your body has a biological system called the endocannabinoid system
						which is responsible for regulating the functions of sleep, mood,
						and memory. CBD works by attaching to the receptors in this system
						and positively impacting these essential functions.
					</p>

					<LearnCollapsePlus
						title="Can CBD put you in the right mood?"
						onClick={() => {
							this.changeInnerCollapse("1_3_1");
						}}
						isOpen={innerCollapse === "1_3_1"}
					>
						By interacting with the receptors involved in regulating our mood,
						CBD can greatly contribute to how your mind perceives its current
						situation, and can have a significant impact on how you feel!
					</LearnCollapsePlus>
				</div>
			),
			"1_4": (
				<div>
					<p>
						There is CBD from hemp and there is CBD from marijuana. bené’s CBD
						is strictly from hemp.
					</p>
					<p>
						Marijuana and hemp are both members of the cannabis family but Hemp
						is a form of cannabis (sativa). Like cousins, they do share some
						characteristics. However, they are not the same thing.
					</p>

					<p>
						The difference being- The amount of psychoactive
						Tetrahydrocannabinol (THC) each plant produces. Hemp contains no
						more than 0.3 percent THC. Marijuana contains up to 30 percent THC.
						And that’s a huge difference.
					</p>
					<p>
						Marijuana can get you really high, while hemp has such a low amount
						of THC, that it would be is impossible to get high off it. This
						means bene CBD will not get you high.
					</p>
					<p>
						Because hemp has no psychoactive effects, the law has no problem
						with it. It’s legal.
					</p>
					<LearnCollapsePlus
						title="So, is CBD legal?"
						onClick={() => {
							this.changeInnerCollapse("1_4_1");
						}}
						isOpen={innerCollapse === "1_4_1"}
					>
						If we’re talking about hemp-derived CBD, then the answer is yes.
						Now, the keyword here is “hemp-derived.” Because CBD from hemp has
						no psychoactive effects, the purchase, sale, or possession of hemp
						CBD products are completely legal in all 50 states in the US.
						Because hemp is sometimes confused with the marijuana plant, there
						is still some stigma towards hemp-derived CBD, but from a legal
						perspective, hemp-derived CBD is completely legal and benefits from
						enjoys the rights of any other legal product.
					</LearnCollapsePlus>
				</div>
			),
			"1_5": (
				<div>
					<p>
						Our CBD is hemp-derived only! That being said, the legal status of
						CBD is not cut and dry. The Farm Bill has made CBD federally legal,
						but there are a few states that beg to differ.
					</p>

					<p>
						In some states, marijuana-derived CBD is completely legal, while in
						others, it is completely illegal. Each state has its own
						CBD-specific laws. While this political indifference has caused a
						ton of confusion for consumers, there are a handful of states where
						hemp-derived and marijuana-derived CBD are completely legal, which
						just might lead to a nationwide shift for CBD legality overall.
					</p>
					<LearnCollapsePlus
						title="Has anyone been busted for carrying CBD? "
						onClick={() => {
							this.changeInnerCollapse("1_5_1");
						}}
						isOpen={innerCollapse === "1_5_1"}
					>
						Most issues have concerned the CBD manufacturing companies. As for
						individual consumers, it is highly unlikely that law enforcement
						would even bother to ask that person to take a drug test. Law
						enforcement agencies are focused on the manufacturers of CBD and are
						unlikely to bother individual customers. CBD usage is not considered
						drug usage. In any case, only extremely high doses of CBD (over
						1000+ mg a day on a frequent basis) would give a positive result. A
						modest amount of CBD won't change how you walk, talk, drive, or
						solve differential equations. For specific questions you can always
						consult our doctors.
					</LearnCollapsePlus>
					{/* <LearnCollapsePlus
            title="Has anyone been busted for carrying CBD? "
            onClick={() => {
              this.changeInnerCollapse("1_5_1");
            }}
            isOpen={innerCollapse === "1_5_1"}
          >
To be considered legal in the US, CBD products must be derived from industrial hemp which contains less than .3% THC, or “trace amounts.” These trace amounts generally aren't enough THC to show up on a basic drug test, but it is not impossible. To have a significant amount of THC in your system, you would have to consume an EXTREMELY large dose- potentially over 30–40 times the suggested daily dosage. Usually CBD never shows up on a drug test however, Drug tests vary as to what compounds are being analyzed, so we are unable to make any claims or guarantees regarding use of our products and drug tests.

          </LearnCollapsePlus> */}
				</div>
			),
			"1_6": (
				<div>
					<p>
						CBD is extracted from flowers, leaves, and the stalk of the hemp
						plant using solvents such as CO2, Ethanol and Olive Oil. During the
						extraction process, CBD is mixed with carrier oil such as hemp seed
						oil or coconut oil. We extract CBD by keeping the THC content in the
						extraction far lower than 0.3%. Hence, the resulting CBD oil is
						legal in all 50 states in the U.S.
					</p>
					<LearnCollapsePlus
						title="Is your hemp high-quality?"
						onClick={() => {
							this.changeInnerCollapse("1_6_1");
						}}
						isOpen={innerCollapse === "1_6_1"}
					>
						Our Hemp growing conditions are safe and administered to ensure
						you’re getting a clean, and safe product. The growing conditions of
						the soil, overall environment, and extraction methods is monitored
						sincerely as hemp is known to absorb toxic spills, pesticides, and
						other dangerous chemicals that you don’t want to be ingesting.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="CO2 extraction  "
						onClick={() => {
							this.changeInnerCollapse("1_6_2");
						}}
						isOpen={innerCollapse === "1_6_2"}
					>
						Supercritical CO2 extraction is the most advanced extraction
						technique resulting in a safe, clean and high-quality CBD Oil.
						Solid, pressurized CO2 (dry ice) is pumped through the hemp
						extracting the oil. CO2 extraction prevents thermal degradation and
						helps retain more terpenes and cannabinoids in the oil. The result
						is a high-quality, full spectrum CBD oil.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Ethanol extraction "
						onClick={() => {
							this.changeInnerCollapse("1_6_3");
						}}
						isOpen={innerCollapse === "1_6_3"}
					>
						Ethanol solvent is run through the hemp plant material stripping it
						of the cannabinoids. Ethanol liquid is then evaporated. This
						extraction method destroys some of the beneficial cannabinoids and
						chlorophyll which may have health benefits. While Ethanol extraction
						is faster and less expensive the resulting CBD Oil is of lower
						quality when compared to CO2 extraction.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Olive oil extraction"
						onClick={() => {
							this.changeInnerCollapse("1_6_4");
						}}
						isOpen={innerCollapse === "1_6_4"}
					>
						Olive oil extraction requires that the raw hemp plant is first
						heated (decarboxylated). Then, the olive oil is added and the
						mixture further heated to extract the cannabinoids. Olive oil cannot
						be evaporated away after the extraction. This process is simple and
						inexpensive, but the infused olive oil is highly perishable and thus
						impractical for commercial CBD producers.
					</LearnCollapsePlus>
				</div>
			),
			"1_7": (
				<div>
					<p>
						Dosing is highly personalized and depends on age, weight, and many
						other factors and one should experiment with finding their own
						dosage that suits them best. Whether ingesting oils or capsules,
						using a skin cream or edible items, the general guideline are to
						start with a low amount, gauge the effects and go slowly. Simply
						put, don’t go diving into the deep end. CBD dosing experiments have
						shown that small doses of CBD have a moderately ‘active’ effect,
						which means that a modest amount of CBD is better for focus than a
						higher amount. Interestingly, large dosages can have a slightly
						sedative effect. More research is needed to show exactly what the
						optimal dosage for anti-anxiety and antidepressant effects is.
						<LearnCollapsePlus
							title="Correct dosage of CBD?"
							onClick={() => {
								this.changeInnerCollapse("1_7_1");
							}}
							isOpen={innerCollapse === "1_7_1"}
						>
							With CBD, some people may find relief with 20 mg twice a day,
							while others felt better with 200mg of CBD four times a day or
							even higher. To identify the proper dosage, start low and slow and
							keep adjusting. If you are new to CBD, try dosing at 10 mg one or
							two times a day to maintain relief. Increase the dosage to 15 mg
							or 20 mg twice or three times a day and monitor any changes in
							your body. Experienced cannabis users can however start at a
							higher dose, like 25 mg, and adjust from there.
						</LearnCollapsePlus>
					</p>
				</div>
			),
			"1_8": (
				<div>
					<p>
						It’s totally okay to experiment with our hemp-derived CBD. But
						because of the confusion between CBD and THC, there’s a big ol' gray
						area to contend with. THC is in high quantities in marijuana only,
						and CBD is abundant in hemp. Some of our older consumers had to be
						schooled on the distinct difference between hemp-derived CBD and
						pot. There’s no THC in our products and it is not pot! THC causes
						euphoria and other mind-altering effects, CBD doesn't. Not even a
						little bit.
					</p>
				</div>
			),
			"1_9": (
				<div>
					<p>
						Typically, dogs prefer their CBD in the form of a chew. Cats and
						small dogs might react best if their CBD is administered in the form
						of drops of oil, one at a time. We recommend oil drops for animals
						who are ill and may have eating/feeding issues.
					</p>

					<p>
						Just as we advise with humans, start small. Remember, drops should
						be ingested one at a time, so you can observe how your pet reacts.
					</p>
				</div>
			),

			"2_1": (
				<div>
					<p>
						Quality is fundamental to everything we do. We want to ensure our
						CBD products have the best quality. Quality shows up in our
						processes, our conversations and our product. We focus on three key
						areas: Potency, Effectiveness, and Safety of our CBD products.
					</p>

					<LearnCollapsePlus
						title="How do I know that these are Quality Products?
            "
						onClick={() => {
							this.changeInnerCollapse("2_1_1");
						}}
						isOpen={innerCollapse === "2_1_1"}
					>
						<ul>
							<li>
								All of our CBD products undergo rigorous testing to ensure their
								purity and potency.{" "}
							</li>
							<li>
								Our CBD Oil is extracted from organically grown hemp, and
								thoroughly tested to ensure there are no contamination concerns.
							</li>
							<li>
								We hire independent labs, to validate and verify our internal
								results. Each test ensures our product meets the strictest
								quality standards. All of our products have certificates of
								analysis and potency reports available for review.
							</li>
							<li>
								Beyond that, the oils are designed to be highly
								bioavailable—including the nano-emulsified forms of CBD oil so
								that you get the maximum benefits.
							</li>
						</ul>
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Does the product contain toxins such as mercury, lead, pcbs, or dioxin?
            "
						onClick={() => {
							this.changeInnerCollapse("2_1_2");
						}}
						isOpen={innerCollapse === "2_1_2"}
					>
						Every product goes through extensive testing to ensure its safety.
						For example, every batch of our product is tested for more than 100
						pesticides, heavy metals, and polychlorinated biphenyls (PCBs),
						dioxins, furans, and dioxin-like PCBs. All products are tested for
						heavy metals and for microbial contamination.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="What do you test?
            "
						onClick={() => {
							this.changeInnerCollapse("2_1_3");
						}}
						isOpen={innerCollapse === "2_1_3"}
					>
						Our products undergo several tests:
						<br />
						<br />
						<ul>
							<li>Tests for CBD potency</li>
							<li>
								Tests for other potency of other beneficial cannabinoids,
								flavonoids, and terpenes
							</li>
							<li>
								Tests for impurities such as Pesticides /Heavy Metals /Solvents
							</li>
							<li>Tests for THC</li>
						</ul>
						<br />
						<br />
						These tests ensure our product meets the strictest quality
						standards. They are entirely GMO-free, manufactured in a first-class
						facility and has received independent certifications for Good
						Manufacturing Practices ( GMP).
					</LearnCollapsePlus>
				</div>
			),

			"2_2": (
				<div>
					<LearnCollapsePlus
						title="Is CBD suitable for vegans?
            "
						onClick={() => {
							this.changeInnerCollapse("2_2_1");
						}}
						isOpen={innerCollapse === "2_2_1"}
					>
						Most of our CBD products, especially the CBD Oils and the CBD
						Isolates are suitable for Vegans. The CBD softgel capsules contain
						some animal-derived nutrients: the gelatine shell is derived from
						bovine and are not meant for vegans.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Are these CBD products NON-GMO?
            "
						onClick={() => {
							this.changeInnerCollapse("2_2_2");
						}}
						isOpen={innerCollapse === "2_2_2"}
					>
						Yes, everything in the products is entirely non-GMO.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Are these CBD products gluten-free?
            "
						onClick={() => {
							this.changeInnerCollapse("2_2_3");
						}}
						isOpen={innerCollapse === "2_2_3"}
					>
						Most of our CBD products is entirely gluten-free. However, there are
						some exceptions such as the CBD Dog Chews, Equine CBD Pellets and
						the Pet CBD Pellets that do have gluten.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Are these CBD products FDA approved?
            "
						onClick={() => {
							this.changeInnerCollapse("2_2_4");
						}}
						isOpen={innerCollapse === "2_2_4"}
					>
						No
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Are these CBD products dairy, nut, and soy-free?
            "
						onClick={() => {
							this.changeInnerCollapse("2_2_5");
						}}
						isOpen={innerCollapse === "2_2_5"}
					>
						Most of our CBD products are formulated without dairy, nuts, or soy.
						However, CBD Chocolate does have dairy, nuts and soy.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Are these CBD products organic?
            "
						onClick={() => {
							this.changeInnerCollapse("2_2_6");
						}}
						isOpen={innerCollapse === "2_2_6"}
					>
						While the hemp plants used for extraction of CBD are not
						certified-organic, they are organically grown. In addition, they
						have passed extensive quality-control processes, including testing
						for contaminants and adulterants.
					</LearnCollapsePlus>
				</div>
			),

			"2_3": (
				<div>
					<LearnCollapsePlus
						title="Should i take CBD with food?
            "
						onClick={() => {
							this.changeInnerCollapse("2_3_1");
						}}
						isOpen={innerCollapse === "2_3_1"}
					>
						While you don’t have to, it is generally recommended to take the CBD
						products (i.e., at breakfast, with lunch, etc.). You can optimize
						absorption by taking them with food.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Can i take this product with my prescription medications?
            "
						onClick={() => {
							this.changeInnerCollapse("2_3_2");
						}}
						isOpen={innerCollapse === "2_3_2"}
					>
						We would recommend you to ask your doctor or book a Consult with our
						CBD doctor.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="How and where should i store my cbd products?
            "
						onClick={() => {
							this.changeInnerCollapse("2_3_3");
						}}
						isOpen={innerCollapse === "2_3_3"}
					>
						Keep them in a cool, dry place, away from excessive heat, moisture,
						light and direct sunlight.
					</LearnCollapsePlus>
				</div>
			),

			"2_4": (
				<div>
					<h3>Common Forms of CBD</h3>
					<ul>
						<li>Oil tinctures or Oil drops</li>
						<li>Topical creams</li>
						<li>Capsules or softgel</li>
						<li>Edible treats like gummies, coffee and chocolate</li>
						<li>Pellets or Chews for Pets</li>
					</ul>
				</div>
			),

			"2_5": (
				<div>
					<p>
						Bioavailability refers to the amount of the CBD that actually gets
						into your bloodstream compared to the total CBD ingested / applied.
					</p>

					<p>Bioavailability of our products</p>

					<ul>
						<li>
							Edible treats like CBD Chocolate or CBD gummies have to go through
							your digestive tract before CBD gets into your bloodstream. This
							takes a bit longer than the CBD Oil tinctures.
						</li>

						<li>
							When you take CBD Oil sublingually (meaning under the tongue)
							you’re absorbing it directly into your bloodstream. This works
							faster and give you quicker results than letting your digestive
							system process it.
						</li>

						<li>
							A CBD Cream gets absorbed via the skin. It can quickly relieve
							sore muscles if you apply on the affected area.{" "}
						</li>
					</ul>
				</div>
			),

			"2_6": (
				<div>
					<p>
						CBD oil is made by extraction from the hemp plant and mixing it with
						a carrier oil that is often hemp seed oil or coconut oil.
					</p>
					<p>All of our CBD Oil have the following attributes:</p>
					<ul>
						<li>THC-free or 0.0% THC.</li>
						<li>Highest hemp extract cannabinoid potency</li>
						<li>Includes several cannabinoids & terpenes</li>
						<li>Includes Omega 3 & 6 naturally found in the hemp plant</li>
						<li>Pesticide free/Heavy Metals Free/Solvents free</li>
						<li>Produced in a ISO-9001:2015 certified facility</li>
						<li>Made in the USA</li>
						<li>Made from organically grown hemp</li>
					</ul>

					<LearnCollapsePlus
						title="How should I take CBD oil drops?"
						onClick={() => {
							this.changeInnerCollapse("2_6_1");
						}}
						isOpen={innerCollapse === "2_6_1"}
					>
						The key to taking CBD oil drops is to start out one drop at a time.
						And just as importantly, CBD Oil must be taken under the tongue and
						held there for 30 to 60 seconds. Why? Sublingual dosing is the
						fastest way for the active ingredients to absorb into the tiny blood
						vessels under the tongue. The capillaries under the tongue help
						carry the CBD oil into our bloodstream within 10-15 minutes. CBD in
						edibles and capsules can take about 45 minutes. Because of the high
						rate of absorption, this means that sublingual dosing is also the
						most cost-effective way to take CBD.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="What is Full spectrum CBD oil?"
						onClick={() => {
							this.changeInnerCollapse("2_6_2");
						}}
						isOpen={innerCollapse === "2_6_2"}
					>
						A true, quality full spectrum CBD oil has all of the terpenes,
						vitamins, minerals and flavonoids of stems and stalks of the hemp
						plant. Full spectrum CBD oil is believed to have the entourage
						effect, where each plant compound works more effectively together
						than by themselves. Our Full spectrum CBD oil contains 0.0% THC and
						is also commonly known as Broad Spectrum CBD Oil. Note: Shake your
						bottle briskly before each use. It is usual for full spectrum CBD
						oil to separate.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="What is Broad spectrum CBD oil?"
						onClick={() => {
							this.changeInnerCollapse("2_6_3");
						}}
						isOpen={innerCollapse === "2_6_3"}
					>
						Broad spectrum CBD oil is similar to Full spectrum CBD oil ( also
						contains all of the terpenes, vitamins, minerals and flavonoids of
						stems and stalks of the hemp plant) except it contains zero THC or
						0.0% THC. Since our CBD Oil contains 0.0% THC it can be referred to
						as Broad Spectrum CBD Oil or Full spectrum CBD oil{" "}
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="What flavors of CBD oil do you offer?"
						onClick={() => {
							this.changeInnerCollapse("2_6_4");
						}}
						isOpen={innerCollapse === "2_6_4"}
					>
						Our CBD oil has 2 flavours to choose from: Mint or Natural (link to
						the specific ‘Products’ page).
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="How can you use CBD oil?"
						onClick={() => {
							this.changeInnerCollapse("2_6_5");
						}}
						isOpen={innerCollapse === "2_6_5"}
					>
						CBD oil can be added to foods and beverages in addition to being
						taken sublingually. Many people use a microdosing technique to find
						their personal dosage and adjust it as needed over time. You may
						find it helpful to use a journal to log your results. Keep track of
						how much you’ve taken, how you feel before dosing and at several
						time intervals afterward, and any changes in symptoms that you
						notice.
					</LearnCollapsePlus>
				</div>
			),

			"2_7": (
				<div>
					<p>
						CBD isolate contains 99+ percent CBD (essentially a purified form of
						CBD). It does not contain plant terpenes or any other plant
						compounds. CBD Isolate is flavorless and odourless because it
						doesn’t have the natural / plant flavour of CBD Oil. It’s to add to
						baked goods, beverages or sauces where you don’t want the CBD
						flavor.{" "}
					</p>

					<p>All of our CBD Isolate have the following attributes:</p>
					<ul>
						<li>THC-free or 0.0% THC.</li>
						<li>Highest hemp extract cannabinoid potency</li>
						<li>Pesticide free/Heavy Metals Free/Solvents free</li>
						<li>Produced in a ISO-9001:2015 certified facility</li>
						<li>Made in the USA</li>
						<li>Made from organically grown hemp</li>
					</ul>
				</div>
			),

			"2_8": (
				<div>
					<p>
						Medium-chain triglyceride (MCT) oil contains medium-length chains of
						fats called triglycerides. MCT oil is usually extracted from coconut
						oil. MCT Coconut oil has many health benefits because the body
						processes these shorter length fats easily.
					</p>
					<p>What are the benefits of MCT Coconut oil?</p>
					<p>MCT Coconut oil is well known to:</p>
					<ul>
						<li>Support weight loss by making you feel full</li>
						<li>Help energy burning and ketone production</li>
						<li>Improve your gut.</li>
					</ul>
					<p>
						Additionally, MCT Coconut oil does not have a plant taste, so it’s
						great for those who don’t care for the ‘hemp’ taste in Hemp Seed
						Oil.
					</p>
				</div>
			),

			"2_9": (
				<div>
					<p>
						THC has known psychoactive qualities sought by recreational users to
						provide a ‘high’. Our products contain pure hemp-extracted CBD and
						are completely free from THC. So, you’ll be able to get all the
						benefits without experiencing the “high” associated with THC use.
					</p>
					<LearnCollapsePlus
						title="Does your CBD oil contain THC?"
						onClick={() => {
							this.changeInnerCollapse("2_9_1");
						}}
						isOpen={innerCollapse === "2_9_1"}
					>
						Our CBD Oil contains 0.0% THC or absolutely no THC. If fact, our
						products are rigorously tested to ensure we are THC free.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="How is THC removed from the CBD oil?"
						onClick={() => {
							this.changeInnerCollapse("2_9_1");
						}}
						isOpen={innerCollapse === "2_9_1"}
					>
						After the CBD oil is extracted from organically grown hemp, it is
						filtered via a chromatography media that takes away all the THC from
						the CBD Oil. The resulting oil is rich in all the beneficial
						cannabinoids except the THC.
					</LearnCollapsePlus>
				</div>
			),

			"2_10": (
				<div>
					<p>
						Medium-chain triglyceride (MCT) oil contains medium-length chains of
						fats called triglycerides. MCT oil is usually extracted from coconut
						oil. MCT Coconut oil has many health benefits because the body
						processes these shorter length fats easily.
					</p>

					<LearnCollapsePlus
						title="What are the benefits of MCT Coconut oil?"
						onClick={() => {
							this.changeInnerCollapse("2_10_1");
						}}
						isOpen={innerCollapse === "2_10_1"}
					>
						MCT Coconut oil is well known to:
						<ul>
							<li>support weight loss by making you feel full</li>
							<li>help energy burning and ketone production</li>
							<li>improve your gut.</li>
						</ul>
						Additionally, MCT Coconut oil does not have a plant taste, so it’s
						great for those who don’t care for the ‘hemp’ taste in Hemp Seed
						Oil.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Are all your CBD Products legal to use?"
						onClick={() => {
							this.changeInnerCollapse("2_10_2");
						}}
						isOpen={innerCollapse === "2_10_2"}
					>
						Yes, all our CBD products have by 0.0% THC and thus, are completely
						legal.
					</LearnCollapsePlus>
				</div>
			),

			"2_11": (
				<div>
					<p>
						CBD Capsules are for customers who prefer the convenience of
						swallowing their dose. It could be an issue of taste, a concern
						about precision, or a matter of convenience, such as taking it daily
						with your morning ritual. It’s a familiar delivery system for many
						of our customers.
					</p>
					<LearnCollapsePlus
						title="      
How should I take CBD softgel capsules? 

            "
						onClick={() => {
							this.changeInnerCollapse("2_11_1");
						}}
						isOpen={innerCollapse === "2_11_1"}
					>
						Swallow them with ease! Remember, ingesting CBD in a capsule form
						takes as long as 45 minutes to take effect. For some people, this is
						beneficial in terms of timing. Note: Gel capsules contain CBD oil
						inside a gelatin softgel which cannot be opened or divided, whereas
						a regular capsule can be pulled apart into two pieces exposing the
						CBD oil.
					</LearnCollapsePlus>
				</div>
			),

			"2_12": (
				<div>
					<p>
						When CBD infused creams and gels are applied to your skin, the CBD
						has a positive impact because of the various properties of CBD. Our
						CBD Topicals contain many nourishing botanicals as well that are
						beneficial for your skin health.
						<LearnCollapsePlus
							title="How should I apply CBD topicals?"
							onClick={() => {
								this.changeInnerCollapse("2_12_1");
							}}
							isOpen={innerCollapse === "2_12_1"}
						>
							Apply a small amount of the CBD creams on your body to see how you
							feel. Gradually increase the application amount over time.
						</LearnCollapsePlus>
					</p>
				</div>
			),
			"2_13": (
				<div>
					<p>
						When CBD infused creams and gels are applied to your skin, the CBD
						has a positive impact because of the various properties of CBD. Our
						CBD Topicals contain many nourishing botanicals as well that are
						beneficial for your skin health.
					</p>
					<LearnCollapsePlus
						title="How should I apply CBD topicals? "
						onClick={() => {
							this.changeInnerCollapse("2_13_1");
						}}
						isOpen={innerCollapse === "2_13_1"}
					>
						Apply a small amount of the CBD creams on your body to see how you
						feel. Gradually increase the application amount over time.
					</LearnCollapsePlus>
					{/* <LearnCollapsePlus
            title="Who should I ask some specific questions I have on CBD and my medical conditions? 
            "
            onClick={() => {
              this.changeInnerCollapse("2_13_2");
            }}
            isOpen={innerCollapse === "2_13_2"}
          >
            Discuss your dosing needs and your health conditions with a doctor
            who is experienced with CBD dosing. Book a consult with one of our
            certified CBD Doctors for an online video chat to guide you.
          </LearnCollapsePlus>
          <LearnCollapsePlus
            title="How does your quality of CBD products compare to the cheaper products?
            "
            onClick={() => {
              this.changeInnerCollapse("2_13_3");
            }}
            isOpen={innerCollapse === "2_13_3"}
          >
            The quality of CBD Oil is extremely important. Quite often you will
            find low-quality CBD Oil products being sold that just don’t have
            the required strength. Some products sold online may not even list
            the amount of CBD per serving or may just offer very low strengths
            of CBD. If a CBD Product lists only “Cannabinoids” you won’t know
            how much CBD is part of the Cannabinoids. If “Hemp Oil” is the major
            ingredient then it has absolutely no CBD in it. Look for products
            that have Quality reports to assure you of the quality and strength
            of the products. All our products have a detailed Certificate of
            Quality that identifies our product, the batch number and the date
            of manufacture. It also lists all the active and inactive
            ingredients in our product. Every ingredient listed in the product
            is tested for its potency.
          </LearnCollapsePlus> */}
				</div>
			),

			"3_1": (
				<div>
					<p>
						You can place an order online on our site. Simply select your
						product(s), and click add to cart. Create a login to register your
						information for future purchases, or checkout as a guest.
					</p>
					<LearnCollapsePlus
						title="Why should I order online?"
						onClick={() => {
							this.changeInnerCollapse("3_1_1");
						}}
						isOpen={innerCollapse === "3_1_1"}
					>
						<ul>
							<li>Its fast –one-page check-out to help you order quickly.</li>
							<li>
								Its available 24/7–receive a confirmation as soon as your order;
								check the status of your order easily.
							</li>
							<li>
								Easy re-ordering – you can save your details for future
								purchases.
							</li>
						</ul>
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="What do I need to checkout my order?"
						onClick={() => {
							this.changeInnerCollapse("3_1_2");
						}}
						isOpen={innerCollapse === "3_1_2"}
					>
						After adding the product(s) to the cart, on checkout you will need
						the following information:
						<ul>
							<li>
								Payment information – debit/credit cards and e-checks / online
								U.S. Bank transfers (for the US only).
							</li>
							<li>
								Contact information including Shipping and billing addresses
							</li>
							<li>Phone number </li>
							<li>Email address</li>
						</ul>
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="What currency are your prices listed in?"
						onClick={() => {
							this.changeInnerCollapse("3_1_3");
						}}
						isOpen={innerCollapse === "3_1_3"}
					>
						All prices are quoted in USD. If you are unable to see pricing
						information, you are located in a country that bené does not ship.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Do you offer discounts if we buy in bulk?"
						onClick={() => {
							this.changeInnerCollapse("3_1_4");
						}}
						isOpen={innerCollapse === "3_1_4"}
					>
						Email us at sales@cbdbene.com with a list of the products you wish
						to buy or use the{" "}
						<Link href={`/contact`}>
							<a>Contact Us</a>
						</Link>{" "}
						page
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="How do I contact customer service about a question I have?"
						onClick={() => {
							this.changeInnerCollapse("3_1_5");
						}}
						isOpen={innerCollapse === "3_1_5"}
					>
						Email us at{" "}
						<a href="mailto:customerservice@cbdbene.com">
							customerservice@cbdbene.com
						</a>{" "}
						or use the{" "}
						<Link href={`/contact`}>
							<a>Contact Us</a>
						</Link>{" "}
						page
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Can I get an invoice for my order?"
						onClick={() => {
							this.changeInnerCollapse("3_1_6");
						}}
						isOpen={innerCollapse === "3_1_6"}
					>
						Yes, you can retrieve an invoice for your order anytime by visiting
						the{" "}
						<Link href={`/account`}>
							<a>my orders </a>
						</Link>{" "}
						under the{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						menu.
					</LearnCollapsePlus>
				</div>
			),

			"3_2": (
				<div>
					Check the progress of your order by tracking it{" "}
					<a href="https://cbdbene.com/track-my-order">here.</a>
					<LearnCollapsePlus
						title="Where is my order right now?"
						onClick={() => {
							this.changeInnerCollapse("3_2_2");
						}}
						isOpen={innerCollapse === "3_2_2"}
					>
						Once you've placed you order, you will receive a confirmation email
						with a tracking number. Use the tracking number to track your order
						on the shipper/carrier’s (such as FedEx or UPS) website. Tracking
						information may not be available for up 1- 2 business days after an
						item has shipped from our warehouse. You can also track your order
						in the{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						section.
					</LearnCollapsePlus>
					{/* <LearnCollapsePlus
            title="When will I receive my order?"
            onClick={() => {
              this.changeInnerCollapse("3_2_3");
            }}
            isOpen={innerCollapse === "3_2_3"}
          >
            Our packages are assembled by hand and processed within 1- 2
            business days after payment has processed. Any order placed on a
            weekend will be shipped the next business day. Business days are
            Monday through Friday. Orders placed around the holidays may
            experience delays. Once your order is shipped you will receive a
            confirmation email with a link to track your shipment and check the
            estimated delivery date.{" "}
          </LearnCollapsePlus> */}
					<LearnCollapsePlus
						title="How do I know you have received my order?"
						onClick={() => {
							this.changeInnerCollapse("3_2_4");
						}}
						isOpen={innerCollapse === "3_2_4"}
					>
						Once you've placed you order, you will receive an email confirmation
						with your order number. You will receive a second email after we
						ship your order.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Will I receive a confirmation email when I place my order?"
						onClick={() => {
							this.changeInnerCollapse("3_2_5");
						}}
						isOpen={innerCollapse === "3_2_5"}
					>
						Once you have placed an order you will receive a confirmation email.
						To ensure that your confirmation email doesn’t end up in your
						Junk/Spam folder please add sales@cbdbene.com to your contacts. If
						you have not received your order confirmation email please contact
						us.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Why does my ‘Order Status’ say ‘Processed’?"
						onClick={() => {
							this.changeInnerCollapse("3_2_6");
						}}
						isOpen={innerCollapse === "3_2_6"}
					>
						When you view your order information you will see an order status
						such as:
						<ul>
							<li>
								Processed: Your order has been received and paid for. We will
								send you an email when your order has shipped.
							</li>
							<li>
								Shipped: Your order has been processed and sent to the carrier
								(such as FedEx or UPS). You are now able to track your order.
							</li>
							<li>Delivered: We have successfully delivered your order.</li>
							<li>Returned: Your order has been returned at your request.</li>
						</ul>
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="What is the difference between a processed order and a shipped order?"
						onClick={() => {
							this.changeInnerCollapse("3_2_7");
						}}
						isOpen={innerCollapse === "3_2_7"}
					>
						A Processed order is an order that has been confirmed, paid for and
						needs to be shipped. Shipped order is an order that has been
						confirmed, paid and shipped to the customer. You can track only
						after an order has been shipped.
					</LearnCollapsePlus>
				</div>
			),

			"3_3": (
				<div>
					<p>
						As soon as you place your order, it gets processed right away.
						Regrettably, we are unable to cancel it. We are sorry for any
						inconvenience this may cause. You can create another order and
						return any unwanted items.
					</p>
					<LearnCollapsePlus
						title="Can i change my order?"
						onClick={() => {
							this.changeInnerCollapse("3_3_1");
						}}
						isOpen={innerCollapse === "3_3_1"}
					>
						We start processing your order as soon as we receive it. Once you
						place your order, you cannot cancel or change it. It would be best
						to place a new order and return the unwanted items back to us. To
						have us return your order visit the{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						section.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="What should I do if I receive an incorrect or damaged item?"
						onClick={() => {
							this.changeInnerCollapse("3_3_2");
						}}
						isOpen={innerCollapse === "3_3_2"}
					>
						We're sorry to hear that you've received a damaged item. Please
						email us, as soon as you can, with the following info:
						<ul>
							<li>Name</li>
							<li>Order number</li>
							<li>Damaged product name</li>
							<li>Picture of the damaged product</li>
						</ul>
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Can I exchange an item?"
						onClick={() => {
							this.changeInnerCollapse("3_3_3");
						}}
						isOpen={innerCollapse === "3_3_3"}
					>
						Unfortunately, we can’t exchange products. Simply return your
						item(s) and reorder. Your refund will be processed once we've
						received your unwanted items. You can return your order by visiting
						the{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						section.
					</LearnCollapsePlus>
				</div>
			),

			"3_4": (
				<div>
					<p>
						Log in to{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						and select “
						<Link href={`/account`}>
							<a>my orders </a>
						</Link>
						” to view a complete list of orders. We store information about your
						recent order (including tracking information) as well as past
						orders.{" "}
					</p>
					<LearnCollapsePlus
						title="How can I reorder previously ordered items?"
						onClick={() => {
							this.changeInnerCollapse("3_4_1");
						}}
						isOpen={innerCollapse === "3_4_1"}
					>
						Select any of your previous orders, then click Reorder to add all
						the products from this order into your shopping cart.
					</LearnCollapsePlus>
				</div>
			),

			"3_5": (
				<div>
					<LearnCollapsePlus
						title="Do you ship internationally?
            "
						onClick={() => {
							this.changeInnerCollapse("3_5_1");
						}}
						isOpen={innerCollapse === "3_5_1"}
					>
						We ship internationally to most countries where CBD can be shipped.
						We are continuously expanding our international presence. If you any
						specific questions about shipment to your country, please contact us
						at help@cbdbene.com.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Do i have to pay customs charges on my order?"
						onClick={() => {
							this.changeInnerCollapse("3_5_2");
						}}
						isOpen={innerCollapse === "3_5_2"}
					>
						Unfortunately, we don’t advise on customs duties for international
						shipments. The customs duties are applied based on the shipper and
						the destination country laws and all customs charges is your
						responsibility. For more accurate information, we’d suggest getting
						in touch with your destination country customs office for all the
						charges.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="What if I’m ordering with an international credit card?"
						onClick={() => {
							this.changeInnerCollapse("3_5_3");
						}}
						isOpen={innerCollapse === "3_5_3"}
					>
						The charges to your credit card will reflect the current exchange
						rate from country’s currency to USD. Your credit card company may
						charge international transaction fees. Please check with your credit
						card company prior to placing your order.
					</LearnCollapsePlus>
				</div>
			),

			"3_6": (
				<div>
					<p>
						We accept all major debit/credit cards and for the US only we accept
						e-checks / online U.S. Bank transfers.{" "}
					</p>
					<LearnCollapsePlus
						title="Is it safe to enter my credit card information?
            "
						onClick={() => {
							this.changeInnerCollapse("3_6_1");
						}}
						isOpen={innerCollapse === "3_6_1"}
					>
						You can be assured that shopping with bené is safe! We use
						industry-standard encryption to protect your bank account or credit
						/ debit card details entered in the site. Information passed between
						your computer and our website cannot be read in the event of someone
						else intercepting it. However, email is not a secure method of
						transmitting bank account or credit / debit card details, please do
						NOT send payment information via an email message to us.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Can I store my payment information?
            "
						onClick={() => {
							this.changeInnerCollapse("3_6_2");
						}}
						isOpen={innerCollapse === "3_6_2"}
					>
						Yes. Please visit My Payments section in the{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						menu to update your payment methods. You can add or edit multiple
						payment methods here also ‘Set as Default’ here.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="When will i be charged for my order?"
						onClick={() => {
							this.changeInnerCollapse("3_6_3");
						}}
						isOpen={innerCollapse === "3_6_3"}
					>
						Your card will be charged when we process your order. As soon as you
						place your order, a pre-authorization amount is placed onto your
						credit card but we don’t process the payment until the order has
						been processed.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Why am i paying sales tax?"
						onClick={() => {
							this.changeInnerCollapse("3_6_4");
						}}
						isOpen={innerCollapse === "3_6_4"}
					>
						Depending on the US state to which your order is being shipped, we
						may be required by law to charge sales tax. Tax is estimated at the
						time your place the order and is reflected on your order total.
					</LearnCollapsePlus>
				</div>
			),

			"3_7": (
				<div>
					<LearnCollapsePlus
						title="What if I’m missing a product in my order?"
						onClick={() => {
							this.changeInnerCollapse("3_7_1");
						}}
						isOpen={innerCollapse === "3_7_1"}
					>
						If a particular product or your package is missing or in case of any
						other questions, please contact us at customerservice@cbdbene.com.
						To expedite your request, please include your order number in the
						email.{" "}
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="I emailed customer service about a problem with my order but haven’t heard back yet. Why?"
						onClick={() => {
							this.changeInnerCollapse("3_7_2");
						}}
						isOpen={innerCollapse === "3_7_2"}
					>
						We aim to respond to all inquiries within 24 hours, we’ll get back
						to you as soon as we can.
					</LearnCollapsePlus>
				</div>
			),

			"3_8": (
				<div>
					<p>
						Creating a bené account is free and makes the checkout process
						faster.
					</p>
					<LearnCollapsePlus
						title="Do I need to create an account at cbdbene.com?"
						onClick={() => {
							this.changeInnerCollapse("3_8_1");
						}}
						isOpen={innerCollapse === "3_8_1"}
					>
						You don’t need an account to buy from bene, however creating one
						provides many benefits:
						<ul>
							<li>Checkout faster</li>
							<li>Receive Exclusive Gifts & Offers</li>
							<li>Track orders</li>
							<li>Review Order History and Reorder</li>
							<li>Save to My Favorites</li>
						</ul>
						As a guest, all order updates are sent by email, and you won’t be
						able to track your orders on our site.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="How do I change my password?"
						onClick={() => {
							this.changeInnerCollapse("3_8_2");
						}}
						isOpen={innerCollapse === "3_8_2"}
					>
						Click{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						menu in the navigation bar and click Profile.
						<ol>
							<li>
								On{" "}
								<Link href={`/account`}>
									<a>My Account </a>
								</Link>{" "}
								tab, click on Change Password.
							</li>
							<li>Enter your old password and the new password.</li>
							<li>Click Update.</li>
						</ol>
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="How do I reset a lost or forgotten password?"
						onClick={() => {
							this.changeInnerCollapse("3_8_3");
						}}
						isOpen={innerCollapse === "3_8_3"}
					>
						<p>
							Click “Forgot Your Password?” in the Log in page. Enter your email
							to receive reset instructions.{" "}
						</p>
						<p>
							Note: If our system doesn’t recognize your email address then you
							will have to Log in as a new customer. Otherwise we can reset your
							password and send you a temporary password to your registered
							email.
						</p>

						<ol>
							<li>
								We will send you a temporary password to your registered email.
							</li>
							<li>
								Click{" "}
								<Link href={`/account`}>
									<a>My Account </a>
								</Link>{" "}
								menu in the navigation bar and click Log in.
							</li>
							<li>
								Login with the temporary password received in your email.{" "}
							</li>
							<li>
								On{" "}
								<Link href={`/account`}>
									<a>My Account </a>
								</Link>{" "}
								tab, click on Change Password{" "}
							</li>
							<li>Enter your old (temporary) password and the new password.</li>
							<li>Click Update.</li>
						</ol>
					</LearnCollapsePlus>
				</div>
			),

			"3_9": (
				<div>
					<p>
						All unopened and unused products and products may be returned within
						60 days of receipt.{" "}
					</p>
					<LearnCollapsePlus
						title="How do I return a product?"
						onClick={() => {
							this.changeInnerCollapse("3_9_1");
						}}
						isOpen={innerCollapse === "3_9_1"}
					>
						To return a product, please follow the directions below:
						<ol>
							<li>
								Create an email with the following information on the products
								you would like to return:
								<br />
								<br />
								Your Name: ___________________________Order #:
								______________________ Item Name
								___________________________Quantity ______ Reason Code _____
								Item Name _____ Quantity ______ Reason Code _____ Additional
								Information _______________________________________________
								<br />
								<br />
								[ Enter from the Reason Codes below]
								<br />
								<br />
								<ul>
									<li>A. Product is damaged </li>
									<li>B. Changed my mind </li>
									<li>C. Received incorrect Product</li>
									<li>D. Not what I expected </li>
									<li>E. Ordered by mistake </li>
								</ul>
							</li>
							<br />
							<br />
							<li>
								After we review your email, we will email you the Return
								Shipping Address and a shipping label along with instructions on
								how to return. Carefully pack item(s) to be returned into the
								original packaging, along with a printout of our email. Next,
								print the shipping label and place it on the outside of the
								package, and take the package to a drop-off location. Please
								note that the return label fee is USD$10 for US returns, and $20
								for international returns, which will be deducted from your
								refund. If you would like to use your own return shipping method
								(on US orders only), you may do that as well. Taxes on the
								products you returned will be refunded. Please note that we do
								not refund shipping, handling costs and custom duties.
							</li>
							<br />
							<br />
							<li>
								Once you’ve shipped the product back to us please also email the
								tracking number to returns@cbdbene.com so we can keep an eye out
								for it. Please note that any products that are damaged when we
								receive them are not eligible for refund.
							</li>
						</ol>
					</LearnCollapsePlus>
				</div>
			),

			"3_10": (
				<div>
					<p>
						Any item returned after 60 days of receipt of the product by the
						customer is not eligible for refund.
					</p>
				</div>
			),

			"3_11": (
				<div>
					<p>
						Please note that we do not accept returns of any products that are
						specified as non-returnable in its description, unless they are
						faulty. Any exceptions to this policy will be listed under product
						details on the product page. Any products that are damaged when we
						receive them are not eligible for refund.
					</p>
					<LearnCollapsePlus
						title="What if I received a damaged product?
            "
						onClick={() => {
							this.changeInnerCollapse("3_11_1");
						}}
						isOpen={innerCollapse === "3_11_1"}
					>
						If there is an issue with any product, please let our Customer
						Experience team know by sending an email to customerservice@bene.com
						as soon as possible. We will resolve any problems as quickly as we
						can. Please include as many details as possible.
					</LearnCollapsePlus>
				</div>
			),

			"3_12": (
				<div>
					<p>
						Once we receive your package and we can confirm its condition, we
						will issue you a refund for the product(s) and email you a
						confirmation. Refunds do not include any shipping or handling
						charges, except in the case of faulty or damaged products. If you
						have any questions regarding our return policy please email us at
						returns@cbdbene.com
					</p>
					<LearnCollapsePlus
						title="How can i tell when you have received my return?"
						onClick={() => {
							this.changeInnerCollapse("3_12_1");
						}}
						isOpen={innerCollapse === "3_12_1"}
					>
						A confirmation email will be sent to you as soon as your return has
						been processed.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="How do I receive my refund?
            "
						onClick={() => {
							this.changeInnerCollapse("3_12_2");
						}}
						isOpen={innerCollapse === "3_12_2"}
					>
						Your refund will be credited to your original payment method used
						for the original transaction and will be in the amount of the
						Product price less the return label fee if applicable.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="How many days before I receive my refund?"
						onClick={() => {
							this.changeInnerCollapse("3_12_3");
						}}
						isOpen={innerCollapse === "3_12_3"}
					>
						Please allow 7-10 business days after we receive your package for
						the refund to post to your statement. Some financial institutions
						may require additional time for processing and posting the
						transaction, so the credit may not show up only in the next billing
						cycle. Note: bené will only accept returns and refunds from
						purchases made on cbdbene.com. bene will not accept returns from a
						purchase made in a retail store.
					</LearnCollapsePlus>
				</div>
			),

			"3_13": (
				<div>
					<p>
						A subscription is a convenient way for you to get the products you
						want delivered to you on a regular schedule, every thirty, sixty,
						ninety days, etc. (based on the frequency you choose). Your credit
						card will only be charged when your order ships. Your subscription
						will continue for each subscription period until you cancel. You can
						also change your delivery frequency in our site.{" "}
					</p>
					<LearnCollapsePlus
						title="How do I start a subscription?
            "
						onClick={() => {
							this.changeInnerCollapse("3_13_1");
						}}
						isOpen={innerCollapse === "3_13_1"}
					>
						<ul>
							<li>
								On the Product details page, select "Subscribe and Save 10%"
							</li>
							<li>
								Select the quantity and frequency of delivery, from every month,
								every 2 months, to every 6 months.
							</li>
							<li>
								Select the quantity and frequency of delivery, from every month,
								every 2 months, to every 6 months.
							</li>
							<li>Add to Cart and then Check out with your payment details.</li>
						</ul>
						This completes your subscription order.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="When Will I Get My Order?"
						onClick={() => {
							this.changeInnerCollapse("3_13_2");
						}}
						isOpen={innerCollapse === "3_13_2"}
					>
						Your order will be shipped within 1-2 business days after your
						subscription order is placed. Consequently, your order will be
						shipped every thirty, sixty, ninety days, etc. (based on the
						frequency you choose) after the initial order.{" "}
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="When will my card be charged?"
						onClick={() => {
							this.changeInnerCollapse("3_13_3");
						}}
						isOpen={innerCollapse === "3_13_3"}
					>
						Once your order is placed, we authorize your card. We’ll charge your
						card only when the order ships (within two business days). Your
						credit or debit card will then be charged every thirty, sixty,
						ninety days, etc. (based on the frequency you choose) after the
						initial charge.{" "}
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title={
							<span>
								How do I cancel or modify{" "}
								<Link href={`/my-subscription`}>
									<a>my subscription </a>
								</Link>
								?>
							</span>
						}
						onClick={() => {
							this.changeInnerCollapse("3_13_4");
						}}
						isOpen={innerCollapse === "3_13_4"}
					>
						<ol>
							<li>
								Click{" "}
								<Link href={`/account`}>
									<a>My Account </a>
								</Link>{" "}
								menu in the navigation bar and click{" "}
								<Link href={`/my-subscription`}>
									<a>my subscriptions </a>
								</Link>
								s to view a complete list of all your subscriptions.
							</li>
							<li>
								Select any subscription, then click Cancel to simply cancel the
								subscription from your account.
							</li>
						</ol>
						Any changes you make will be reflected in your next shipment, except
						for changes initiated while an order is in process (i.e., when your
						card has been charged but you have not yet received your shipment).
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="
            How do I modify the frequency for my subscription?
            "
						onClick={() => {
							this.changeInnerCollapse("3_13_5");
						}}
						isOpen={innerCollapse === "3_13_5"}
					>
						<ol>
							<li>
								Click{" "}
								<Link href={`/account`}>
									<a>My Account </a>
								</Link>{" "}
								menu in the navigation bar and click{" "}
								<Link href={`/my-subscription`}>
									<a>my subscriptions </a>
								</Link>
								to view a complete list of all your subscriptions.
							</li>
							<li>
								Select any subscription, then click modify and then select the
								new frequency for your subscription. Now, your subscription will
								be shipped based on the new frequency (every thirty, sixty,
								ninety days, etc.) you selected.{" "}
							</li>
						</ol>
						Any changes you make will be reflected in your next shipment, except
						for changes initiated while an order is in process (i.e., when your
						card has been charged but you have not yet received your shipment).
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Can I change my payment method?"
						onClick={() => {
							this.changeInnerCollapse("3_13_6");
						}}
						isOpen={innerCollapse === "3_13_6"}
					>
						Yes, you can change your payment at any time in your{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						section. If you do not make any changes, the default payment method
						you designated for your first order will be used on all subsequent
						orders.
					</LearnCollapsePlus>

					<LearnCollapsePlus
						title="Do I receive a discount of 10% with every subscription?"
						onClick={() => {
							this.changeInnerCollapse("3_13_7");
						}}
						isOpen={innerCollapse === "3_13_7"}
					>
						With a subscription, you'll receive regular shipments of the
						products at a 10% discount. The discount applied every time is 10%
						off the price on the website.{" "}
					</LearnCollapsePlus>
				</div>
			),

			"4_1": (
				<div>
					<p>
						Orders placed on our website may be delivered by one of several
						different carriers and shipping methods.
					</p>
				</div>
			),
			"4_2": (
				<div>
					We offer three shipping options within the U.S. FREE STANDARD SHIPPING
					with orders of $75 or more.
					<br />
					<br />
					<table className="ship_table">
						<tr>
							<th>Shipping Options within the US</th>
							<th>Time for Delivery</th>
						</tr>
						<tr>
							<td>Standard shipping</td>
							<td>3-5 business days after processing</td>
						</tr>
						<tr>
							<td>Expedited shipping</td>
							<td>2-3 business days after processing</td>
						</tr>
						<tr>
							<td>Express shipping</td>
							<td>1-2 business days after processing</td>
						</tr>
					</table>
					<br />
					We only offer Standard International Shipping via UPS and FedEx.
					<br />
					<br />
					<table className="ship_table">
						<tr>
							<th>Standard International Shipping</th>
							<th>Time for delivery</th>
						</tr>
						<tr>
							<td>Rest of North America (apart from the U.S.) </td>
							<td>Approximately 3-5 days after processing</td>
						</tr>
						<tr>
							<td>Europe</td>
							<td>Approximately 7-10 days after processing</td>
						</tr>
						<tr>
							<td>South America </td>
							<td>Approximately 10-14 days after processing</td>
						</tr>
						<tr>
							<td>Asia </td>
							<td>Approximately 10-14 days after processing</td>
						</tr>
						<tr>
							<td>Oceania </td>
							<td>Approximately 10-14 days after processing</td>
						</tr>
					</table>
				</div>
			),
			"4_3": (
				<div>
					Shipping Fees:
					<br />
					<br />
					<table className="ship_table">
						<tr>
							<th>Shipping Options </th>
							<th>Shipping fee</th>
						</tr>
						<tr>
							<td>Standard shipping</td>
							<td>
								FREE SHIPPING with orders of $75 or more. $4.95 for orders less
								than $75
							</td>
						</tr>
						<tr>
							<td>Expedited shipping</td>
							<td>$15 for UPS 2nd Day Air</td>
						</tr>
						<tr>
							<td>Express shipping</td>
							<td>$20 for UPS Next Day Air</td>
						</tr>
						<tr>
							<td>International shipments</td>
							<td>flat rate of $20</td>
						</tr>
					</table>
					<br />
					<br />
					Please note that international shipping fees do not include taxes or
					duties and customs charges and they may differ depending on your
					region.
					<br />
					<br />
				</div>
			),
			"4_4": (
				<div>
					<p>
						Applicable sales tax will be charged on merchandise total, where
						applicable. Taxes are calculated according to shipping destination
						and itemized value of the order.
					</p>
					<LearnCollapsePlus
						title="How much duty and tax will i have to pay?"
						onClick={() => {
							this.changeInnerCollapse("4_4_1");
						}}
						isOpen={innerCollapse === "4_4_1"}
					>
						We don’t estimate duties and customs charges for the destination
						country. Please note that you will be responsible for all duties,
						taxes and customs charges. If your order is refused in your country,
						you will still be responsible for the product and the charges
						incurred in shipping the package.{" "}
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title=" 
          Can you adjust the value of my order?
           "
						onClick={() => {
							this.changeInnerCollapse("4_4_2");
						}}
						isOpen={innerCollapse === "4_4_2"}
					>
						No. We are required by law to disclose the full value of the order.{" "}
					</LearnCollapsePlus>
				</div>
			),
			"4_5": (
				<div>
					<p>
						We ship to all states in the U.S. except Idaho or South Dakota. We
						also ship internationally to most countries.
					</p>
					<LearnCollapsePlus
						title="Why don’t you ship to Idaho or South Dakota?"
						onClick={() => {
							this.changeInnerCollapse("4_5_1");
						}}
						isOpen={innerCollapse === "4_5_1"}
					>
						We don’t ship to Idaho or South Dakota as their State law prohibits
						possessing or transporting industrial hemp within that state's
						jurisdiction.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title=" 
          Do you ship internationally?
           "
						onClick={() => {
							this.changeInnerCollapse("4_5_2");
						}}
						isOpen={innerCollapse === "4_5_2"}
					>
						We ship internationally to most countries where CBD can be shipped.
						All custom duties, import taxes or fees, if assessed, at your
						country are your responsibility. We strictly follow all regulations
						regarding the shipment of our products within the U.S. and abroad.
						To ensure you are shopping on the correct site for your country,
						find your country in the region selector located at the bottom of
						every page. If you any specific questions about shipment to your
						country, please contact us at help@cbdbene.com.{" "}
					</LearnCollapsePlus>
				</div>
			),
			"4_6": (
				<div>
					<p>
						We do ship to military bases but we need the address formatted in
						the proper military format (link to below which can open in a new
						window or here as #section) for USPS. Please note transit times can
						take up to 4-5 business days.
					</p>
					<LearnCollapsePlus
						title="How should I ship to Military & Diplomatic personnel?"
						onClick={() => {
							this.changeInnerCollapse("4_5_1");
						}}
						isOpen={innerCollapse === "4_5_1"}
					>
						Make sure you include the unit and box numbers, for APO/FPO/DPO
						shipping addresses (when you enter your shipping address). To
						prevent mail from entering foreign mail networks, do not include
						city or country names in APO/FPO/DPO shipping addresses. DPO last
						line address information must contain the DPO designation and the
						appropriate two-letter state abbreviation (AA, AE, or AP), followed
						by the ZIP Code.
						<br />
						<br />
						For Example:-
						<br />
						<br />
						<table className="ship_table">
							<tr>
								<th>Army/Air Post Office (APO) </th>
								<th>Fleet Post Office (FPO)</th>
								<th>Diplomatic Post Office (DPO)</th>
							</tr>
							<tr>
								<td>PFC JOHN DOE PSC 3 BOX 4120 APO AE 09021</td>
								<td>SEAMAN JOSEPH SMITH UNIT 100100 BOX 4120 FPO AP 96691</td>
								<td>JOHN ADAMS UNIT 8400 BOX 0000 DPO AE 09498-0048</td>
							</tr>
						</table>
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title=" 
          Do you ship internationally?
           "
						onClick={() => {
							this.changeInnerCollapse("4_5_2");
						}}
						isOpen={innerCollapse === "4_5_2"}
					>
						We ship internationally to most countries where CBD can be shipped.
						All custom duties, import taxes or fees, if assessed, at your
						country are your responsibility. We strictly follow all regulations
						regarding the shipment of our products within the U.S. and abroad.
						To ensure you are shopping on the correct site for your country,
						find your country in the region selector located at the bottom of
						every page. If you any specific questions about shipment to your
						country, please contact us at help@cbdbene.com.{" "}
					</LearnCollapsePlus>
				</div>
			),
			"4_7": (
				<div>
					<p>
						Please contact us, as soon as you can, so we can look into this
						further.
					</p>
				</div>
			),
			"4_8": (
				<div>
					<p>
						Yes. Please visit My Address section in the{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						menu to update your shipping addresses. You can add or edit multiple
						shipping addresses here and also ‘Set as Default’ here.
					</p>
				</div>
			),
			"5_1": (
				<div>
					<p>
						The Consult section was designed to connect you with a certified
						doctor who can answer any questions you may have about CBD and how
						it relates to your medical condition.{" "}
					</p>

					<LearnCollapsePlus
						title="How does CBD Consult work? "
						onClick={() => {
							this.changeInnerCollapse("5_1_1");
						}}
						isOpen={innerCollapse === "5_1_1"}
					>
						You can browse doctor profiles, view available appointment times,
						and schedule an appointment to Consult with the doctor of your
						choice. On the date of your appointment you will visit your doctor
						online or on the phone to discuss CBD and your individual needs.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Where is Consult available? "
						onClick={() => {
							this.changeInnerCollapse("5_1_2");
						}}
						isOpen={innerCollapse === "5_1_2"}
					>
						Our network of Board-Certified doctors will be provided to you based
						on the state you are located. We make sure that each doctor is fully
						licensed to practice medicine in your state. Currently, Consult is
						available in only a few states of the United States. We are working
						hard to expand our availability across all the 50 U.S. States.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="How much does it cost to use Consult? "
						onClick={() => {
							this.changeInnerCollapse("5_1_3");
						}}
						isOpen={innerCollapse === "5_1_3"}
					>
						You pay a fixed fee of $49 for a Consult with a doctor of your
						choice.
					</LearnCollapsePlus>
				</div>
			),
			"5_2": (
				<div>
					<p>How do I schedule an appointment?</p>
					<p>
						After you’ve selected a doctor on bené’s platform, you can request
						an appointment by following the steps below:{" "}
					</p>
					<ol>
						<li>On a doctor’s listing page, click Make an appointment.</li>
						<p>
							- If you see Instant appointment, the doctor is allowing you to
							Visit with them instantly. Your appointment will be automatically
							confirmed after step 4.
						</p>
						<li>
							Add your payment information, including any coupon code you may
							have.
						</li>
						<li>
							Agree to the policies and terms, including the doctor’s
							cancellation policy and consent forms.
						</li>
						<li>Wait for the doctor’s confirmation. </li>
						<li>
							If your appointment is accepted, you’ll be charged in full for the
							appointment. If the doctor declines the request or doesn’t respond
							within 24 hours, no charge is made and you can make an appointment
							with someone else.
						</li>
					</ol>
					<LearnCollapsePlus
						title="What happens if my appointment request is declined or expires?"
						onClick={() => {
							this.changeInnerCollapse("5_2_1");
						}}
						isOpen={innerCollapse === "5_2_1"}
					>
						If your appointment request is declined by the doctor or expires,
						meaning the doctor didn’t respond within 24 hours, no charge is made
						for the appointment and you’re free to book with another doctor. We
						urge our doctors to keep their calendars up to date and respond to
						requests in a timely manner. But sometimes situations come up that
						prevent them from accepting appointments.
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title=" 
          How much time does a doctor have to respond to my appointment?
           "
						onClick={() => {
							this.changeInnerCollapse("5_2_2");
						}}
						isOpen={innerCollapse === "5_2_2"}
					>
						Doctors have 24 hours to officially accept or decline appointments.
						Most confirm within a few hours. You'll be updated by email about
						the status of your request. More than half of all appointment
						requests are accepted within a few hours of being received. The vast
						majority of doctors reply within 12 hours. If a doctor confirms your
						request, your payment is processed and collected by bené in full. If
						a doctor declines your request or the request expires, we don't
						process your payment.
					</LearnCollapsePlus>
				</div>
			),
			"5_3": (
				<div>
					<p>What methods of payment does bené accept?</p>
					<ol>
						<li>
							Most major credit cards and pre-paid credit cards (Visa,
							MasterCard, Amex, Discover, JCB) as well as many debit cards that
							can be processed as credit
						</li>
						<li>U.S. Bank checking account</li>
					</ol>

					<LearnCollapsePlus
						title="Why is my credit card being charged without a confirmed appointment?"
						onClick={() => {
							this.changeInnerCollapse("5_3_1");
						}}
						isOpen={innerCollapse === "5_3_1"}
					>
						Your payment method may be temporarily authorized for a charge when
						you request an appointment, but this authorization is voided and
						released back to the payment method if your appointment is declined.
						We complete a charge only when an appointment is confirmed.
					</LearnCollapsePlus>
				</div>
			),
			"5_4": (
				<div>
					<p>How do I prepare for my appointment?</p>
					<p>
						Most doctors require that you complete their intake form before your
						appointment, which allows the doctor to get more information about
						your medical condition and needs.
					</p>
					<LearnCollapsePlus
						title="How do I find my appointment?"
						onClick={() => {
							this.changeInnerCollapse("5_4_1");
						}}
						isOpen={innerCollapse === "5_4_1"}
					>
						To find an appointment in your account:
						<ol>
							<li>
								On the website, please go to{" "}
								<Link href={`/account`}>
									<a>My Account </a>
								</Link>{" "}
								section.{" "}
							</li>
							<li>Tap Visits to get your appointment details</li>
						</ol>
						<p>
							Note: Make sure you’re logged into the same bené account you used
							to book the appointment.{" "}
						</p>
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="How do I change or cancel my appointment?
          "
						onClick={() => {
							this.changeInnerCollapse("5_4_2");
						}}
						isOpen={innerCollapse === "5_4_2"}
					>
						To change or cancel an appointment, first locate the appointment on{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						section of CBDbene.com. Select Cancel Visit{" "}
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="What happens if a doctor cancels my appointment?
          "
						onClick={() => {
							this.changeInnerCollapse("5_4_3");
						}}
						isOpen={innerCollapse === "5_4_3"}
					>
						<p>
							While extremely rare, if a doctor needs to cancel an appointment,
							you'll be notified as soon as the cancellation is reported. You’ll
							be refunded in full.
						</p>
						<p>
							We take doctor cancellations very seriously. If your doctor
							cancels, they may receive a fine or their ratings on the site
							would be reduced, outside of accepted exceptions and pending a
							review of their account.
						</p>{" "}
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="What if I need to cancel because of an emergency or unavoidable circumstance?
          "
						onClick={() => {
							this.changeInnerCollapse("5_4_4");
						}}
						isOpen={innerCollapse === "5_4_4"}
					>
						<p>
							You can cancel your appointment and receive a full refund,
							provided that you cancel at least 72 hours before your appointment
							time. If you cancel your appointment after 72 hours the charges
							will be refunded according to our cancellation policy.
						</p>{" "}
					</LearnCollapsePlus>
				</div>
			),
			"5_5": (
				<div>
					<LearnCollapsePlus
						title="What are the most common CBD questions that the doctor can answer?"
						onClick={() => {
							this.changeInnerCollapse("5_5_1");
						}}
						isOpen={innerCollapse === "5_5_1"}
					>
						Our doctors are trained to answer a wide range of questions
						regarding CBD dosing and potential drug interactions.{" "}
					</LearnCollapsePlus>
					<LearnCollapsePlus
						title="Is Consult appropriate for every medical condition?"
						onClick={() => {
							this.changeInnerCollapse("5_5_2");
						}}
						isOpen={innerCollapse === "5_5_2"}
					>
						Consult is not intended to replace your primary care doctor, but
						simply to provide you with access to doctors with expertise in
						Medical Cannabis and CBD. They are well-versed in the medical use of
						CBD and can provide comprehensive guidance regarding CBD dosing and
						potential drug interactions. You should not use Consult if you are
						experiencing a medical emergency. In case of a medical
						life-threatening emergency, you should dial 911 immediately.
					</LearnCollapsePlus>
				</div>
			),
			"5_6": (
				<div>
					<p>
						You can visit the doctor by going to Visits on{" "}
						<Link href={`/account`}>
							<a>My Account </a>
						</Link>{" "}
						menu, find the appointment, and click ‘Virtual waiting room’. You
						will be placed in queue in the virtual waiting room of the doctor.{" "}
					</p>
					<LearnCollapsePlus
						title="Can Consult be accessed on mobile devices?"
						onClick={() => {
							this.changeInnerCollapse("5_6_1");
						}}
						isOpen={innerCollapse === "5_6_1"}
					>
						Yes, you can Consult with a doctor on your mobile or on a computer.{" "}
					</LearnCollapsePlus>{" "}
					<LearnCollapsePlus
						title="Is Consult safe and private?"
						onClick={() => {
							this.changeInnerCollapse("5_6_2");
						}}
						isOpen={innerCollapse === "5_6_2"}
					>
						We take your privacy very seriously. We are bound by The HIPAA
						Privacy Rule to protect your personal health information.{" "}
					</LearnCollapsePlus>{" "}
					<LearnCollapsePlus
						title="What system requirements do I need for Consult videoconferencing?"
						onClick={() => {
							this.changeInnerCollapse("5_6_3");
						}}
						isOpen={innerCollapse === "5_6_3"}
					>
						To use video conferencing, you need:
						<ul>
							<li>Windows®7, Vista, or XP</li>
							<li>A Mac running OSX 10.6 (Snow Leopard) or superior.</li>
							<li>Highspeed internet connection</li>
							<li>A webcam with at least 1.3 megapixels</li>
							<li>
								Microphone (most webcams already have microphone built in)
							</li>
						</ul>
						After you enter the virtual waiting room, you will be able to use a
						simple online simulation to test your configuration and check if you
						are ready for a virtual Consultation.
					</LearnCollapsePlus>
				</div>
			),
			"5_7": (
				<div>
					<LearnCollapsePlus
						title="How do I follow up with my doctor after my initial visit?"
						onClick={() => {
							this.changeInnerCollapse("5_7_1");
						}}
						isOpen={innerCollapse === "5_7_1"}
					>
						You can revisit your doctor again if you have anything you need to
						follow up with them about. Create a new appointment as before.{" "}
					</LearnCollapsePlus>
				</div>
			),
		};
		return (
			<Layout headerTheme="dark" fixed={true}>
				<div
					className={classNames("c-learn-page", {
						[className]: className,
					})}
				>
					<div
						style={
							{
								// paddingTop: "100px"
							}
						}
						className="w-100"
					/>
					<div className="w-100">
						<div ref="wrapper" className="row align-items-start">
							<div ref="leftScrolls" className="pb-5 col-lg-3 ">
								<div className="pr-3 border-right-gold">
									{learnData.map((el, key) => {
										return (
											<LearnCollapse
												isOpen={el.id === openedCollapse}
												title={el.title}
												onClick={() => {
													this.changeCollapse(el.id);
												}}
												key={key}
											>
												{el.subMenus &&
													el.subMenus.map((elx, key) => {
														return (
															<LearnMenuHeading
																key={key}
																onClick={() => {
																	this.changeContent(`${el.id}_${elx.id}`);
																}}
																active={`${el.id}_${elx.id}` === contentId}
																title={elx.title}
															/>
														);
													})}
											</LearnCollapse>
										);
									})}
								</div>
							</div>
							<div ref="rightScrolls" className="col-lg-9">
								<FadeTransition in={isVisible}>
									<div className="pl-lg-5 pt-2 learn-view">
										<div className="pb-3 learn-view-inner">
											<h4>{this.getHeading(contentId, learnData)}</h4>
										</div>
										{learnSubData[contentId]}
									</div>
								</FadeTransition>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	countryCode: state.location.countryCode,
});
export default connect(mapStateToProps)(Learn);

const LearnMenuHeading = (props) => {
	const { title, active, onClick } = props;
	return (
		<p
			onClick={onClick}
			style={{
				fontWeight: active ? 500 : 400,
			}}
			className="cursor-pointer mb-1 p-2 pb-1 learn__collapse"
		>
			{title}
		</p>
	);
};
// import Link from 'next/link'
// import { connect } from "react-redux";
// import FadeTransition from "../components/FadeTransition";
// import classNames from "classnames";
// import LearnCollapsePlus from "../components/learn/LearnCollapsePlus";
// import LearnCollapse from "../components/learn/LearnCollapse";
// import Layout from '../components/Layouts/Layout';

// class Learn extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       openedCollapse: "1",
//       isVisible: true,
//       contentId: "1_1",
//       innerCollapse: "1"
//     };
//   }
//   componentDidMount() {
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
//     this.prevScroll = window.scrollY;
//     const url_string = window.location.href;
//     const url = new URL(url_string);
//     const id = url.searchParams.get("id");
//     const col = url.searchParams.get("col") || "1";
//     const { openedCollapse } = this.state;
//     if (id && id !== "" && openedCollapse !== id) {
//       this.setState({
//         openedCollapse: id,
//         contentId: `${id}_${col}`,
//         innerCollapse: col
//       });
//     }
//     window.addEventListener("scroll", this.handleScroll);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("scroll", this.handleScroll);
//   }
//   handleScroll = () => {
//     const scrollUp = this.prevScroll > window.scrollY;
//     const { wrapper, leftScrolls, rightScrolls } = this.refs;

//     const windowScrollTop = window.scrollY;
//     const wrapperHeight = wrapper.clientHeight;
//     const wrapperOffsetTop = wrapper.offsetTop;

//     const leftScrollsHeight = leftScrolls.clientHeight;
//     const leftScrollsWidth = leftScrolls.clientWidth;
//     const leftScrollsOffsetTop = leftScrolls.offsetTop;

//     const rightScrollsHeight = rightScrolls.clientHeight;
//     const rightScrollsOffsetTop = rightScrolls.offsetTop;

//     const headerHeight = 120;
//     const windowWidth = window.innerWidth;
//     // console.log({
//     //   windowScrollTop,
//     //   wrapperHeight,
//     //   wrapperOffsetTop,
//     //   leftScrollsHeight,
//     //   leftScrollsOffsetTop,
//     //   rightScrollsHeight,
//     //   rightScrollsOffsetTop,
//     //   leftScrolls
//     // });
//     const rH = wrapperHeight + wrapperOffsetTop - leftScrollsHeight;
//     // console.log({
//     //   rH,
//     //   wS: windowScrollTop
//     // });
//     if (scrollUp || true) {
//       if (rightScrollsHeight > leftScrollsHeight) {
//         if (
//           windowScrollTop + headerHeight >= leftScrollsOffsetTop &&
//           windowWidth > 991
//         ) {
//           if (
//             windowScrollTop + headerHeight >=
//             rightScrollsOffsetTop + rightScrollsHeight
//           ) {
//             const diffTop =
//               windowScrollTop - leftScrollsOffsetTop + headerHeight;
//             leftScrolls.style.position = "absolute";
//             leftScrolls.style.top = `${diffTop}px`;
//             rightScrolls.style.marginLeft = `${leftScrollsWidth}px`;
//           } else {
//             const diffTop = rH - headerHeight;
//             if (rH < windowScrollTop + (headerHeight - 5)) {
//               leftScrolls.style.top = `${diffTop + headerHeight}px`;
//               leftScrolls.style.position = "absolute";
//             } else {
//               leftScrolls.style.top = `${headerHeight}px`;
//               leftScrolls.style.position = "fixed";
//             }
//             rightScrolls.style.marginLeft = `${leftScrollsWidth}px`;
//             leftScrolls.style.width = `${leftScrollsWidth}px`;
//           }
//         } else {
//           console.log("else+");
//           leftScrolls.style.position = "";
//           leftScrolls.style.top = "";
//           rightScrolls.style.marginLeft = "";
//           leftScrolls.style.width = "";
//         }
//       } else {
//         leftScrolls.style.width = "";
//         leftScrolls.style.position = "";
//         leftScrolls.style.top = "";
//         rightScrolls.style.marginLeft = "";
//       }
//     }
//     // else{
//     //   // const headerHeight = 10
//     //   if(rightScrollsHeight > leftScrollsHeight){
//     //     if((windowScrollTop + (headerHeight - 1)) >= leftScrollsOffsetTop){
//     //       if((windowScrollTop + headerHeight) >= (rightScrollsOffsetTop + rightScrollsHeight)){
//     //         const diffTop = (windowScrollTop - leftScrollsOffsetTop) + headerHeight
//     //         leftScrolls.style.position = "absolute"
//     //         leftScrolls.style.top = `${diffTop}px`
//     //         rightScrolls.style.marginLeft = `${leftScrollsWidth}px`
//     //       }else{
//     //         leftScrolls.style.position = "fixed"
//     //         leftScrolls.style.top = `${headerHeight}px`
//     //         rightScrolls.style.marginLeft = `${leftScrollsWidth}px`
//     //         leftScrolls.style.width = `${leftScrollsWidth}px`
//     //       }

//     //     }else{
//     //       console.log("else+")
//     //       leftScrolls.style.position = ""
//     //       leftScrolls.style.top = ""
//     //       rightScrolls.style.marginLeft = ""
//     //     }
//     //   }
//     // }

//     this.prevScroll = window.scrollY;
//   };
//   changeCollapse = id => {
//     this.setState(prevState => ({
//       openedCollapse: id === prevState.openedCollapse ? null : id
//     }));
//   };
//   changeContent = contentId => {
//     if (this.timeOut1) {
//       clearTimeout(this.timeOut1);
//     }
//     if (this.timeOut2) {
//       clearTimeout(this.timeOut2);
//     }
//     this.setState(
//       {
//         isVisible: false
//       },
//       () => {
//         this.timeOut1 = setTimeout(() => {
//           this.setState(
//             {
//               contentId
//             },
//             () => {
//               setTimeout(() => {
//                 this.timeOut2 = this.setState({
//                   isVisible: true
//                 });
//               }, 300);
//             }
//           );
//         }, 400);
//       }
//     );
//   };
//   changeInnerCollapse = id => {
//     this.setState(prevState => ({
//       innerCollapse: id === prevState.innerCollapse ? null : id
//     }));
//   };
//   getHeading = (contentId, data) => {
//     if (contentId) {
//       const ids = contentId.split("_");
//       const perticularEl = data.find(el => el.id === ids[0]);
//       if (perticularEl && perticularEl.subMenus) {
//         const heading = perticularEl.subMenus.find(el => el.id === ids[1]);
//         if (heading && heading.title) {
//           return heading.title;
//         }
//       }
//     }
//     return null;
//   };
//   render() {
//     const { className } = this.props;
//     const { openedCollapse, isVisible, innerCollapse, contentId } = this.state;
//     const learnData = [
//       {
//         title: "Everything about CBD",
//         id: "1",
//         subMenus: [
//           {
//             title: "What is CBD",
//             id: "1"
//           },
//           {
//             title: "Endocannabinoid System",
//             id: "2"
//           },
//           {
//             title: "CBD benefits",
//             id: "3"
//           },
//           {
//             title: "CBD vs THC",
//             id: "4"
//           },
//           {
//             title: "Legality",
//             id: "5"
//           },
//           {
//             title: "Extraction",
//             id: "6"
//           },
//           {
//             title: "Dosage",
//             id: "7"
//           },
//           {
//             title: "CBD for Seniors",
//             id: "8"
//           },
//           {
//             title: "CBD for Pets",
//             id: "9"
//           }
//         ]
//       },
//       {
//         title: "About our Products",
//         id: "2",
//         subMenus: [
//           {
//             title: "Quality of our Products",
//             id: "1"
//           },
//           {
//             title: "Label Claims",
//             id: "2"
//           },
//           {
//             title: "Suggested Use",
//             id: "3"
//           },
//           {
//             title: "Common forms of CBD",
//             id: "4"
//           },
//           {
//             title: "Bioavailability",
//             id: "5"
//           },
//           {
//             title: " CBD oil",
//             id: "6"
//           },
//           {
//             title: "CBD Isolate",
//             id: "7"
//           },
//           {
//             title: "Hemp Seed Oil",
//             id: "9"
//           },
//           {
//             title: "MCT Coconut oil",
//             id: "10"
//           },
//           {
//             title: "Our CBD products are not psychoactive!",
//             id: "11"
//           },
//           {
//             title: "CBD capsules",
//             id: "12"
//           },
//           {
//             title: "Topical CBD Products",
//             id: "13"
//           },

//           {
//             title: "Effects of CBD",
//             id: "14"
//           }
//         ]
//       },
//       {
//         title: "Orders FAQ",
//         id: "3",
//         subMenus: [
//           {
//             title: "Ordering Online ",
//             id: "1"
//           },
//           {
//             title: "View Order Status",
//             id: "2"
//           },
//           {
//             title: "Cancelling Orders",
//             id: "3"
//           },
//           {
//             title: "Order History",
//             id: "4"
//           },
//           {
//             title: "International Orders",
//             id: "5"
//           },
//           {
//             title: "Payment",
//             id: "6"
//           },
//           {
//             title: "Problem with your Order",
//             id: "7"
//           },
//           {
//             title: "Account",
//             id: "8"
//           },
//           {
//             title: "How do I return a product?",
//             id: "9"
//           },
//           {
//             title: "Late Returns",
//             id: "10"
//           },
//           {
//             title: "Products Not Eligible for Return",
//             id: "11"
//           },
//           {
//             title: "Receiving a Refund",
//             id: "12"
//           },
//           {
//             title: "Subscription order",
//             id: "13"
//           }
//         ]
//       },
//       {
//         title: "Shipping FAQ",
//         id: "4",
//         subMenus: [
//           {
//             title: "Shipping Policy ",
//             id: "1"
//           },
//           {
//             title: "Shipping options",
//             id: "2"
//           },
//           {
//             title: "Shipping fees",
//             id: "3"
//           },
//           {
//             title: "Taxes",
//             id: "4"
//           },
//           {
//             title: "Where do you ship?",
//             id: "5"
//           },
//           {
//             title: "Do you ship to an APO/FPO/DPO address or a Military base?",
//             id: "6"
//           },
//           {
//             title:
//               "What if my order status is ‘delivered’ and i have not received my package?",
//             id: "7"
//           },
//           {
//             title: "Can I store my shipping address?",
//             id: "8"
//           }
//         ]
//       },
//       {
//         title: "Consult",
//         id: "5",
//         subMenus: [
//           {
//             title: "What is Consult?",
//             id: "1"
//           },
//           {
//             title: "Request an Appointment",
//             id: "2"
//           },
//           {
//             title: "Payment",
//             id: "3"
//           },
//           {
//             title: "Before the Actual Appointment",
//             id: "4"
//           },
//           {
//             title: "CBD questions",
//             id: "5"
//           },
//           {
//             title: "Video Consult",
//             id: "6"
//           },
//           {
//             title: "Follow up Consult",
//             id: "7"
//           }
//         ]
//       }
//     ];
//     const learnSubData = {
//       "1_1": (
//         <div>
//           <p>
//             Cannabinoids are a class of chemical compounds the cannabis plant
//             naturally produces. CBD, or Cannabidiol, is one of the compounds
//             found in the Cannabis plant. The other well-known compound is
//             tetrahydrocannabinol (THC). THC and CBD are both Cannabinoids,
//             occurring naturally in the cannabis plant. Hemp and Marijuana are
//             two very different strains of the cannabis plant.{" "}
//           </p>

//           <LearnCollapsePlus
//             title="Where does our CBD come from?"
//             onClick={() => {
//               this.changeInnerCollapse("1_1_1");
//             }}
//             isOpen={innerCollapse === "1_1_1"}
//           >
//             CBD can be extracted from marijuana flowers or from hemp leaves.
//             While marijuana plants contain high levels of THC, hemp plants
//             produce more CBD and contain less than 0.3% THC. This single
//             difference is what distinguishes hemp from marijuana. So, just to be
//             clear, our CBD comes from the hemp plant ONLY.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Is CBD psychoactive?"
//             onClick={() => {
//               this.changeInnerCollapse("1_1_2");
//             }}
//             isOpen={innerCollapse === "1_1_2"}
//           >
//             In contrast to THC, which is known for its psychoactive qualities,
//             CBD is the ingredient that expressly does not produce a high. In
//             fact, CBD provides many benefits that are commonly sought after, for
//             a variety of healing purposes.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "1_2": (
//         <div>
//           <p>
//             Your body produces its own Cannabinoids. Seriously. It does.
//             <br />
//             Cannabinoids are chemical compounds. They are produced naturally in
//             the human body and also found in plants such as hemp and marijuana.
//           </p>
//           <p>
//             The human body produces Endocannabinoids (endo means ‘within’, as in
//             within the body), just like cannabis and some other plants produce
//             phytocannabinoids (<em>Phyto</em> – meaning ‘plant’). Our body also
//             has receptors called CB1 and CB2 designed specifically to recognize
//             and respond to our endogenous cannabinoids.
//           </p>
//           <LearnCollapsePlus
//             title="Why is it even called the Endocannabinoid System?"
//             onClick={() => {
//               this.changeInnerCollapse("1_2_1");
//             }}
//             isOpen={innerCollapse === "1_2_1"}
//           >
//             Great question, really. For starters, it has way too many syllables.
//             But it’s similar to how research on morphine led to the discovery of
//             endogenous morphine-like chemicals, which we know as endorphins
//             (‘endo’ meaning). And our bodies have endogenous cannabinoids and
//             cannabinoid receptors. So, it was named the Endocannabinoid System,
//             or ECS, which is a network of receptors throughout the body that
//             interact with cannabinoids.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How does the ECS work?"
//             onClick={() => {
//               this.changeInnerCollapse("1_2_2");
//             }}
//             isOpen={innerCollapse === "1_2_2"}
//           >
//             The human body's ECS is responsible for maintaining balance and
//             regulating essential functions like sleep, mood, and memory. The ECS
//             relies on the natural production of endogenous cannabinoids in order
//             to function properly. Sometimes we need to supplement our endogenous
//             cannabinoids with cannabinoids from external sources, such as CBD
//             Cannabidiol. When you ingest CBD, it stimulates the ECS which in
//             turn helps to restore balance and maintain homeostasis.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "1_3": (
//         <div>
//           <p>
//             CBD or cannabidiol is gaining popularity in the health and wellness
//             world thanks to its wonderful qualities. It Regulates homeostasis
//             which is essentially the stable balance between interdependent
//             elements, especially as maintained by physiological processes.
//           </p>
//           <p>
//             Your body has a biological system called the endocannabinoid system
//             which is responsible for regulating the functions of sleep, mood,
//             and memory. CBD works by attaching to the receptors in this system
//             and positively impacting these essential functions.
//           </p>

//           <LearnCollapsePlus
//             title="Can CBD put you in the right mood?"
//             onClick={() => {
//               this.changeInnerCollapse("1_3_1");
//             }}
//             isOpen={innerCollapse === "1_3_1"}
//           >
//             By interacting with the receptors involved in regulating our mood,
//             CBD can greatly contribute to how your mind perceives its current
//             situation, and can have a significant impact on how you feel.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "1_4": (
//         <div>
//           <p>
//             There is CBD from hemp and there is CBD from marijuana. bené’s CBD
//             is strictly from hemp.
//           </p>
//           <p>
//             Hemp is a form of cannabis (sativa). Marijuana and hemp are both
//             members of the cannabis family. Like cousins, they do share some
//             characteristics. However, they are not the same thing.
//           </p>
//           <p> Here’s their biggest difference:</p>
//           <p>
//             The amount of psychoactive Tetrahydrocannabinol (THC) each plant
//             produces. Hemp contains no more than 0.3 percent THC. Marijuana
//             contains up to 30 percent THC. And that’s a big difference.
//             Marijuana can get you really high, while hemp has such a low amount
//             of THC, that it would be is impossible to get high off it.
//           </p>
//           <p>
//             Because hemp has no psychoactive effects, the law has no problem
//             with it. It’s legal.
//           </p>
//           <LearnCollapsePlus
//             title="So, is CBD legal?"
//             onClick={() => {
//               this.changeInnerCollapse("1_4_1");
//             }}
//             isOpen={innerCollapse === "1_4_1"}
//           >
//             If we’re talking about hemp-derived CBD, then the answer is yes.
//             Now, the keyword here is “hemp-derived.” Because CBD from hemp has
//             no psychoactive effects, the purchase, sale, or possession of hemp
//             CBD products are completely legal in all 50 states in the US.
//             Because hemp is sometimes confused with the marijuana plant, there
//             is still some stigma towards hemp-derived CBD, but from a legal
//             perspective, hemp-derived CBD is completely legal and benefits from
//             enjoys the rights of any other legal product.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "1_5": (
//         <div>
//           <p>
//             Our CBD is hemp-derived only! That being said, the legal status of
//             CBD is not cut and dry. The Farm Bill has made CBD federally legal,
//             but there are a few states that beg to differ.
//           </p>

//           <p>
//             In some states, marijuana-derived CBD is completely legal, while in
//             others, it is completely illegal. Each state has its own
//             CBD-specific laws. While this political indifference has caused a
//             ton of confusion for consumers, there are a handful of states where
//             hemp-derived and marijuana-derived CBD are completely legal, which
//             just might lead to a nationwide shift for CBD legality overall.
//           </p>
//           <LearnCollapsePlus
//             title="Has anyone been busted for carrying CBD? "
//             onClick={() => {
//               this.changeInnerCollapse("1_5_1");
//             }}
//             isOpen={innerCollapse === "1_5_1"}
//           >
//             Most issues have concerned the companies manufacturing the CBD. As
//             for individual consumers, it is highly unlikely that law enforcement
//             would even bother to ask that person to take a drug test. And as for
//             drug tests, CBD usage is not considered drug usage. In any case,
//             only extremely high doses of CBD (over 1000+ mg a day on a frequent
//             basis) would give a positive result. -> Law enforcement agencies are
//             focused on the manufacturers of CBD and are unlikely to bother
//             individual customers. CBD usage is not considered drug usage. In any
//             case, only extremely high doses of CBD (over 1000+ mg a day on a
//             frequent basis) would give a positive result. A modest amount of
//             hemp-derived CBD will never change how you walk, talk, drive, and
//             solve differential equations. If you have specific questions
//             concerning this, please click here to talk with a doctor. A little
//             CBD won't change how you walk, talk, drive, or solve differential
//             equations. For specific questions you can always consult our doctors
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "1_6": (
//         <div>
//           <p>
//             CBD is extracted from flowers, leaves, and the stalk of the hemp
//             plant using solvents such as CO2, Ethanol and Olive Oil. During the
//             extraction process, CBD is mixed with a carrier oil such as hemp
//             seed oil or coconut oil. We extract CBD by keeping the THC content
//             in the extraction far lower than 0.3%. Hence, the resulting CBD oil
//             is legal in all 50 states in the U.S.
//           </p>
//           <LearnCollapsePlus
//             title="Is your hemp high-quality?"
//             onClick={() => {
//               this.changeInnerCollapse("1_6_1");
//             }}
//             isOpen={innerCollapse === "1_6_1"}
//           >
//             Hemp growing conditions aren’t federally regulated, which makes it
//             very difficult to know if you’re getting a clean, and safe product.
//             Knowing the growing conditions of the soil, overall environment, and
//             extraction methods is crucial because hemp is known to absorb toxic
//             spills, pesticides, and other dangerous chemicals that you don’t
//             want to be ingesting.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="CO2 extraction  "
//             onClick={() => {
//               this.changeInnerCollapse("1_6_2");
//             }}
//             isOpen={innerCollapse === "1_6_2"}
//           >
//             Supercritical CO2 extraction is the most advanced extraction
//             technique resulting in a safe, clean and high-quality CBD Oil.
//             Solid, pressurized CO2 (dry ice) is pumped through the hemp
//             extracting the oil. CO2 extraction prevents thermal degradation and
//             helps retain more terpenes and cannabinoids in the oil. The result
//             is a high-quality, full spectrum CBD oil.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Ethanol extraction "
//             onClick={() => {
//               this.changeInnerCollapse("1_6_3");
//             }}
//             isOpen={innerCollapse === "1_6_3"}
//           >
//             Ethanol solvent is run through the hemp plant material stripping it
//             of the cannabinoids. Ethanol liquid is then evaporated. This
//             extraction method destroys some of the beneficial cannabinoids and
//             chlorophyll which may have health benefits. While Ethanol extraction
//             is faster and less expensive the resulting CBD Oil is of lower
//             quality when compared to CO2 extraction.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Olive oil extraction"
//             onClick={() => {
//               this.changeInnerCollapse("1_6_4");
//             }}
//             isOpen={innerCollapse === "1_6_4"}
//           >
//             Olive oil extraction requires that the raw hemp plant is first
//             heated (decarboxylated). Then, the olive oil is added and the
//             mixture further heated to extract the cannabinoids. Olive oil cannot
//             be evaporated away after the extraction. This process is simple and
//             inexpensive, but the infused olive oil is highly perishable, and
//             thus impractical for commercial CBD producers.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "1_7": (
//         <div>
//           <p>
//             Dosing is highly personalized and depends on age, weight, and many
//             other factors. Whether ingesting oils or capsules, using a skin
//             cream or edible items, the general guideline is to start with a low
//             amount, gauge the effects and go slowly. Simply put, don’t go diving
//             into the deep end. CBD dosing experiments have shown that small
//             doses of CBD have a moderately ‘active’ effect, which means that a
//             modest amount of CBD is better for focus than a higher amount.
//             Interestingly, large dosages can have a slightly sedative effect.
//             More research is needed to show exactly what is the optimal dosage
//             for anti-anxiety and antidepressant effects. One can also experiment
//             with finding their own dosage that suits them best.
//             <LearnCollapsePlus
//               title="Correct dosage of CBD?"
//               onClick={() => {
//                 this.changeInnerCollapse("1_7_1");
//               }}
//               isOpen={innerCollapse === "1_7_1"}
//             >
//               With CBD, some people may find relief with 20 mg twice a day,
//               while others felt better with 200mg of CBD four times a day or
//               even higher. To identify the proper dosage, start low and slow and
//               keep adjusting. If you are new to CBD, try dosing at 10 mg one or
//               two times a day to maintain relief. Increase the dosage to 15 mg
//               or 20 mg twice or three times a day and monitor any changes in
//               your body. Experienced cannabis users can start at a higher dose,
//               like 25 mg, and adjust from there.
//             </LearnCollapsePlus>
//           </p>
//         </div>
//       ),
//       "1_8": (
//         <div>
//           <p>
//             It’s totally okay to experiment with our hemp-derived CBD. Extracted
//             CBD is a recent discovery, a result of laborious scientific work.
//             CBD is not pot. But because of the confusion between CBD and THC,
//             there’s a big ol' gray area to contend with. THC is in high
//             quantities in marijuana only, and CBD is abundant in hemp. Some of
//             our older consumers had to be schooled on the distinct difference
//             between hemp-derived CBD and pot. There’s no THC in our products.
//             THC causes euphoria and other mind-altering effects, CBD doesn't.
//             Not even a little bit.
//           </p>
//         </div>
//       ),
//       "1_9": (
//         <div>
//           <p>
//             Typically, dogs prefer their CBD in the form of a chew. Cats and
//             small dogs might react best if their CBD is administered in the form
//             of drops of oil, one at a time. We recommend oil drops for animals
//             who are ill and may have eating/feeding issues.
//           </p>

//           <p>
//             Just as we advise with humans, start small. Remember, drops should
//             be ingested one at a time, so you can observe how your pet reacts.
//           </p>
//         </div>
//       ),

//       "2_1": (
//         <div>
//           <p>
//             Quality is fundamental to everything we do. We want to ensure our
//             CBD products have the best quality. Quality shows up in our
//             processes, our conversations and our product. We focus on three key
//             areas: Potency, Effectiveness, and Safety of our CBD products.
//           </p>

//           <LearnCollapsePlus
//             title="How do I know that these are Quality Products?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_1_1");
//             }}
//             isOpen={innerCollapse === "2_1_1"}
//           >
//             <ul>
//               <li>
//                 All of our CBD products undergo rigorous testing to ensure their
//                 purity and potency.{" "}
//               </li>
//               <li>
//                 Our CBD Oil is extracted from organically grown hemp, and
//                 thoroughly tested to ensure there are no contamination concerns.
//               </li>
//               <li>
//                 We hire independent labs, to validate and verify our internal
//                 results. Each test ensures our product meets the strictest
//                 quality standards. All of our products have certificates of
//                 analysis and potency reports available for review.
//               </li>
//               <li>
//                 Beyond that, the oils are designed to be highly
//                 bioavailable—including the nano-emulsified forms of CBD oil so
//                 that you get the maximum benefits.
//               </li>
//             </ul>
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Does the product contain toxins such as mercury, lead, pcbs, or dioxin?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_1_2");
//             }}
//             isOpen={innerCollapse === "2_1_2"}
//           >
//             Every product goes through extensive testing to ensure its safety.
//             For example, every batch of our product is tested for more than 100
//             pesticides, heavy metals, and polychlorinated biphenyls (PCBs),
//             dioxins, furans, and dioxin-like PCBs. All products are tested for
//             heavy metals and for microbial contamination.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="What do you test?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_1_3");
//             }}
//             isOpen={innerCollapse === "2_1_3"}
//           >
//             Our products undergo several tests:
//             <br />
//             <br />
//             <ul>
//               <li>Tests for CBD potency</li>
//               <li>
//                 Tests for other potency of other beneficial cannabinoids,
//                 flavonoids, and terpenes
//               </li>
//               <li>
//                 Tests for impurities such as Pesticides /Heavy Metals /Solvents
//               </li>
//               <li>Tests for THC</li>
//             </ul>
//             <br />
//             <br />
//             These tests ensure our product meets the strictest quality
//             standards. How do I know that these are quality CBD products? They
//             are entirely GMO-free, manufactured in a first-class facility that
//             is has received independent certifications for Good Manufacturing
//             Practices ( GMP). For example, every batch of our oils is tested for
//             more than 200 pesticides, heavy metals, polychlorinated biphenyls
//             (PCBs), dioxins, furans, and dioxin-like PCBs*
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_2": (
//         <div>
//           <LearnCollapsePlus
//             title="Is cbd suitable for vegans?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_2_1");
//             }}
//             isOpen={innerCollapse === "2_2_1"}
//           >
//             Most of our CBD products, especially the CBD Oils and the CBD
//             Isolates are suitable for Vegans. The CBD softgel capsules contain
//             some animal-derived nutrients: the gelatine shell is derived from
//             bovine.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Are these CBD products NON-GMO?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_2_2");
//             }}
//             isOpen={innerCollapse === "2_2_2"}
//           >
//             Yes, everything in the products is entirely non-GMO.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Are these CBD products gluten-free?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_2_3");
//             }}
//             isOpen={innerCollapse === "2_2_3"}
//           >
//             Most of our CBD products is entirely gluten-free. However, there are
//             some exceptions such as the CBD Dog Chews, Equine CBD Pellets and
//             the Pet CBD Pellets that do have gluten.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Are these CBD products FDA approved?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_2_4");
//             }}
//             isOpen={innerCollapse === "2_2_4"}
//           >
//             No
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Are these CBD products dairy-, nut-, and soy-free?

//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_2_5");
//             }}
//             isOpen={innerCollapse === "2_2_5"}
//           >
//             Most of our CBD products are formulated without dairy, nuts, or soy.
//             However, CBD Chocolate does have dairy, nuts and soy.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Are these CBD products organic?

//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_2_6");
//             }}
//             isOpen={innerCollapse === "2_2_6"}
//           >
//             While the hemp plants used for extraction of CBD are not
//             certified-organic, they are organically grown. In addition, they
//             have passed extensive quality-control processes, including testing
//             for contaminants and adulterants.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_3": (
//         <div>
//           <LearnCollapsePlus
//             title="Should i take the product with food?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_3_1");
//             }}
//             isOpen={innerCollapse === "2_3_1"}
//           >
//             While you don’t have to, it is generally recommended to take the CBD
//             products (i.e., at breakfast, with lunch, etc.). You can optimize
//             absorption by taking them with food.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Can i take this product with my prescription medications?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_3_2");
//             }}
//             isOpen={innerCollapse === "2_3_2"}
//           >
//             Ask your doctor. Or book a Consult with our CBD doctor
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="How and where should i store my cbd products?

//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_3_3");
//             }}
//             isOpen={innerCollapse === "2_3_3"}
//           >
//             Keep in a cool, dry place, away from excessive heat, moisture, light
//             and direct sunlight.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_4": (
//         <div>
//           <h3>Common Forms of CBD</h3>
//           <ul>
//             <li>Oil tinctures or Oil drops</li>
//             <li>Topical creams</li>
//             <li>Capsules or softgel</li>
//             <li>Edible treats like gummies, coffee and chocolate</li>
//             <li>Pellets or Chews for Pets</li>
//           </ul>
//         </div>
//       ),

//       "2_5": (
//         <div>
//           <p>
//             Bioavailability refers to the amount of the CBD that actually gets
//             into your bloodstream compared to the total CBD ingested / applied.
//           </p>

//           <p>Can you explain the Bioavailability of your products?</p>

//           <ul>
//             <li>
//               Edible treats like CBD Chocolate or CBD gummies have to go through
//               your digestive tract before CBD gets into your bloodstream. This
//               takes a bit longer than the CBD Oil tinctures.
//             </li>

//             <li>
//               When you take CBD Oil sublingually (meaning under the tongue)
//               you’re absorbing it directly into your bloodstream. This works
//               faster and give you quicker results than letting your digestive
//               system process it.
//             </li>

//             <li>
//               A CBD Cream gets absorbed via the skin. It can quickly relieve
//               sore muscles if you apply on the affected area.{" "}
//             </li>
//           </ul>
//         </div>
//       ),

//       "2_6": (
//         <div>
//           <p>
//             CBD oil is made by extraction from the hemp plant and mixing it with
//             a carrier oil that is often hemp seed oil or coconut oil.
//           </p>
//           <p>All of our CBD Oil have the following attributes:</p>
//           <ul>
//             <li>THC-free or 0.0% THC.</li>
//             <li>Highest hemp extract cannabinoid potency</li>
//             <li>Includes several cannabinoids & terpenes</li>
//             <li>Includes Omega 3 & 6 naturally found in the hemp plant</li>
//             <li>Pesticide free/Heavy Metals Free/Solvents free</li>
//             <li>Produced in a ISO-9001:2015 certified facility</li>
//             <li>Made in the USA</li>
//             <li>Made from organically grown hemp</li>
//           </ul>

//           <LearnCollapsePlus
//             title="How should I take CBD oil drops?"
//             onClick={() => {
//               this.changeInnerCollapse("2_6_1");
//             }}
//             isOpen={innerCollapse === "2_6_1"}
//           >
//             The key to taking CBD oil drops is to start out one drop at a time.
//             And just as importantly, CBD Oil must be taken under the tongue and
//             held there for 30 to 60 seconds. Why? Sublingual dosing is the
//             fastest way for the active ingredients to absorb into the tiny blood
//             vessels under the tongue. The capillaries under the tongue help
//             carry the CBD oil into our bloodstream within 10-15 minutes. CBD in
//             edibles and capsules can take about 45 minutes. Because of the high
//             rate of absorption, this means that sublingual dosing is also the
//             most cost-effective way to take CBD.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="What is Full spectrum CBD oil?"
//             onClick={() => {
//               this.changeInnerCollapse("2_6_2");
//             }}
//             isOpen={innerCollapse === "2_6_2"}
//           >
//             A true, quality full spectrum CBD oil has all of the terpenes,
//             vitamins, minerals and flavonoids of stems and stalks of the hemp
//             plant. Full spectrum CBD oil is believed to have the entourage
//             effect, where each plant compound works more effectively together
//             than by themselves. Our Full spectrum CBD oil contains 0.0% THC and
//             is also commonly known as Broad Spectrum CBD Oil. Note: Shake your
//             bottle briskly before each use. It is usual for full spectrum CBD
//             oil to separate.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="What is Broad spectrum CBD oil?"
//             onClick={() => {
//               this.changeInnerCollapse("2_6_3");
//             }}
//             isOpen={innerCollapse === "2_6_3"}
//           >
//             Broad spectrum CBD oil is similar to Full spectrum CBD oil ( also
//             contains all of the terpenes, vitamins, minerals and flavonoids of
//             stems and stalks of the hemp plant) except it contains zero THC or
//             0.0% THC. Since our CBD Oil contains 0.0% THC it can be referred to
//             as Broad Spectrum CBD Oil or Full spectrum CBD oil{" "}
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="What flavors of CBD oil do you offer?"
//             onClick={() => {
//               this.changeInnerCollapse("2_6_4");
//             }}
//             isOpen={innerCollapse === "2_6_4"}
//           >
//             Our CBD oil has 2 flavours to choose from: Mint or Natural (link to
//             the specific ‘Products’ page).
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="How can you use CBD oil?"
//             onClick={() => {
//               this.changeInnerCollapse("2_6_5");
//             }}
//             isOpen={innerCollapse === "2_6_5"}
//           >
//             CBD oil can be added to foods and beverages in addition to being
//             taken sublingually. Many people use a microdosing technique to find
//             their personal dosage and adjust it as needed over time. You may
//             find it helpful to use a journal to log your results. Keep track of
//             how much you’ve taken, how you feel before dosing and at several
//             time intervals afterward, and any changes in symptoms that you
//             notice.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_7": (
//         <div>
//           <p>
//             CBD isolate contains 99+ percent CBD (essentially a purified form of
//             CBD). It does not contain plant terpenes or any other plant
//             compounds. CBD Isolate is flavorless and odourless because it
//             doesn’t have the natural / plant flavour of CBD Oil. It’s to add to
//             baked goods, beverages or sauces where you don’t want the CBD
//             flavor.{" "}
//           </p>

//           <p>All of our CBD Isolate have the following attributes:</p>
//           <ul>
//             <li>THC-free or 0.0% THC.</li>
//             <li>Highest hemp extract cannabinoid potency</li>
//             <li>Pesticide free/Heavy Metals Free/Solvents free</li>
//             <li>Produced in a ISO-9001:2015 certified facility</li>
//             <li>Made in the USA</li>
//             <li>Made from organically grown hemp</li>
//           </ul>
//         </div>
//       ),

//       "2_8": (
//         <div>
//           <p>
//             Hemp seed oil is normally pressed from only the seeds of the hemp
//             plant (which you can actually buy at the health food store and
//             sprinkle on your cereal, salad, or yogurt for extra protein and
//             nutrients). The seeds themselves have a very low percentage of CBD
//             and almost no THC. Hemp seed oil does not contain the same amount of
//             cannabinoids found in medicinal cannabis oils extracted from the
//             whole plant.
//           </p>
//         </div>
//       ),

//       "2_9": (
//         <div>
//           <p>
//             Medium-chain triglyceride (MCT) oil contains medium-length chains of
//             fats called triglycerides. MCT oil is usually extracted from coconut
//             oil. MCT Coconut oil has many health benefits because the body
//             processes these shorter length fats easily.
//           </p>
//           <LearnCollapsePlus
//             title="What are the benefits of MCT Coconut oil?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_9_1");
//             }}
//             isOpen={innerCollapse === "2_9_1"}
//           >
//             MCT Coconut oil is well known to:
//             <ul>
//               <li>support weight loss by making you feel full</li>
//               <li>help energy burning and ketone production</li>
//               <li>improve your gut.</li>
//             </ul>
//             Additionally, MCT Coconut oil does not have a plant taste, so it’s
//             great for those who don’t care for the ‘hemp’ taste in Hemp Seed
//             Oil.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_10": (
//         <div>
//           <p>
//             THC has known psychoactive qualities sought by recreational users to
//             provide a ‘high’. Our products contain pure hemp-extracted CBD and
//             are completely free from THC. So, you’ll be able to get all the
//             benefits without experiencing the “high” associated with THC use.
//           </p>

//           <LearnCollapsePlus
//             title="Does your CBD oil contain THC?"
//             onClick={() => {
//               this.changeInnerCollapse("2_10_1");
//             }}
//             isOpen={innerCollapse === "2_10_1"}
//           >
//             Our CBD Oil contains 0.0% THC or absolutely no THC. If fact, our
//             products are rigorously tested to ensure we are THC free.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How is THC removed from the CBD oil?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_10_2");
//             }}
//             isOpen={innerCollapse === "2_10_2"}
//           >
//             After the CBD oil is extracted from organically grown hemp, it is
//             filtered via a chromatography media that takes away all the THC from
//             the CBD Oil. The resulting oil is rich in all the beneficial
//             cannabinoids except the THC.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="
//             Are all your CBD Products legal to use?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_10_3");
//             }}
//             isOpen={innerCollapse === "2_10_3"}
//           >
//             Yes, all our CBD products have by 0.0% THC and thus, are completely
//             legal.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_11": (
//         <div>
//           <p>
//             CBD Capsules are for customers who prefer the convenience of
//             swallowing their dose. It could be an issue of taste, a concern
//             about precision, or a matter of convenience, such as taking it daily
//             with your morning ritual. It’s a familiar delivery system for many
//             of our customers.
//           </p>
//           <LearnCollapsePlus
//             title="
// How should I take CBD softgel capsules?

//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_11_1");
//             }}
//             isOpen={innerCollapse === "2_11_1"}
//           >
//             Swallow them with ease! Remember, ingesting CBD in a capsule form
//             takes as long as 45 minutes to take effect. For some people, this is
//             beneficial in terms of timing. Note: Gel capsules contain CBD oil
//             inside a gelatin softgel which cannot be opened or divided, whereas
//             a regular capsule can be pulled apart into two pieces exposing the
//             CBD oil.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "2_12": (
//         <div>
//           <p>
//             When CBD infused creams and gels are applied to your skin, the CBD
//             has a positive impact because of the various properties of CBD. Our
//             CBD Topicals contain many nourishing botanicals as well that are
//             beneficial for your skin health.
//             <LearnCollapsePlus
//               title="How should I apply CBD topicals?"
//               onClick={() => {
//                 this.changeInnerCollapse("2_12_1");
//               }}
//               isOpen={innerCollapse === "2_12_1"}
//             >
//               Apply a small amount of the CBD creams on your body to see how you
//               feel. Gradually increase the application amount over time.
//             </LearnCollapsePlus>
//           </p>
//         </div>
//       ),
//       "2_13": (
//         <div>
//           <p>
//             Our CBD Oil provides your body with cannabinoids, terpenes,
//             flavonoids together with omega-3 fatty acids, vitamins and minerals,
//             all of which have a positive impact on your mind and body.
//           </p>
//           <LearnCollapsePlus
//             title="How much CBD should I take? "
//             onClick={() => {
//               this.changeInnerCollapse("2_13_1");
//             }}
//             isOpen={innerCollapse === "2_13_1"}
//           >
//             It’s essential to combine CBD with healthy lifestyle choices. While
//             CBD dosing advice is not legally allowed it is reasonable to start
//             with a small does (say, a 1 ml of CBD Oil 300 mg twice per day or a
//             10 mg capsule twice per day) and then gradually increase the dose
//             until you find your “sweet spot”. Many people use a microdosing
//             technique to find their personal dosage and adjust it as needed over
//             time. The quantity of CBD that works for one person may be quite
//             different for another. It can depend on a number of factors
//             including age, weight and personal health conditions. If the low
//             dose does not provide any results, try increasing it gradually over
//             a week or two weeks or sometimes a couple of months. You may find it
//             helpful to use a journal to log your results. Keep track of how much
//             you’ve taken, how you feel before dosing and at several time
//             intervals afterward, and any changes in symptoms that you notice.
//             Some people may just require a higher dose and that can be you. The
//             only way to find out is to be patient and continue with the CBD for
//             a little more time. The long-term benefits associated with CBD
//             require appropriate dosing for a minimum of one to two months.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Who should I ask some specific questions I have on CBD and my medical conditions?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_13_2");
//             }}
//             isOpen={innerCollapse === "2_13_2"}
//           >
//             Discuss your dosing needs and your health conditions with a doctor
//             who is experienced with CBD dosing. Book a consult with one of our
//             certified CBD Doctors for an online video chat to guide you.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How does your quality of CBD products compare to the cheaper products?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("2_13_3");
//             }}
//             isOpen={innerCollapse === "2_13_3"}
//           >
//             The quality of CBD Oil is extremely important. Quite often you will
//             find low-quality CBD Oil products being sold that just don’t have
//             the required strength. Some products sold online may not even list
//             the amount of CBD per serving or may just offer very low strengths
//             of CBD. If a CBD Product lists only “Cannabinoids” you won’t know
//             how much CBD is part of the Cannabinoids. If “Hemp Oil” is the major
//             ingredient then it has absolutely no CBD in it. Look for products
//             that have Quality reports to assure you of the quality and strength
//             of the products. All our products have a detailed Certificate of
//             Quality that identifies our product, the batch number and the date
//             of manufacture. It also lists all the active and inactive
//             ingredients in our product. Every ingredient listed in the product
//             is tested for its potency.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_1": (
//         <div>
//           <p>
//             You can place an order online on our site. Simply select your
//             product(s), and click add to cart. Create a login to register your
//             information for future purchases, or checkout as a guest.
//           </p>
//           <LearnCollapsePlus
//             title="Why should I order online?"
//             onClick={() => {
//               this.changeInnerCollapse("3_1_1");
//             }}
//             isOpen={innerCollapse === "3_1_1"}
//           >
//             <ul>
//               <li>Its fast –one-page check-out to help you order quickly.</li>
//               <li>
//                 Its available 24/7–receive a confirmation as soon as your order;
//                 check the status of your order easily.
//               </li>
//               <li>
//                 Easy re-ordering – you can save your details for future
//                 purchases.
//               </li>
//             </ul>
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="What do I need to checkout my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_1_2");
//             }}
//             isOpen={innerCollapse === "3_1_2"}
//           >
//             After adding the product(s) to the cart, on checkout you will need
//             the following information:
//             <ul>
//               <li>
//                 Payment information – debit/credit cards and e-checks / online
//                 U.S. Bank transfers (for the US only).
//               </li>
//               <li>
//                 Contact information including Shipping and billing addresses
//               </li>
//               <li>Phone number </li>
//               <li>Email address</li>
//             </ul>
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="What currency are your prices listed in?"
//             onClick={() => {
//               this.changeInnerCollapse("3_1_3");
//             }}
//             isOpen={innerCollapse === "3_1_3"}
//           >
//             All prices are quoted in USD. If you are unable to see pricing
//             information, you are located in a country that bené does not ship.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Do you offer discounts if we buy in bulk?"
//             onClick={() => {
//               this.changeInnerCollapse("3_1_4");
//             }}
//             isOpen={innerCollapse === "3_1_4"}
//           >
//             Email us at sales@cbdbene.com with a list of the products you wish
//             to buy or use the Contact Us page
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How do I contact customer service about a question I have?"
//             onClick={() => {
//               this.changeInnerCollapse("3_1_5");
//             }}
//             isOpen={innerCollapse === "3_1_5"}
//           >
//             Email us at customerservice@cbdbene.com or use the Contact Us page
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Can I get an invoice for my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_1_6");
//             }}
//             isOpen={innerCollapse === "3_1_6"}
//           >
//             Yes, you can retrieve an invoice for your order anytime by visiting
//             the{" "}
//             <Link href={`/account`}><a>my orders </a></Link>{" "}
//             under the{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             menu.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_2": (
//         <div>
//           Check the progress of your order by tracking it{" "}
//           <a href="https://cbdbene.com/track-my-order">here.</a>
//           <LearnCollapsePlus
//             title="Where is my order right now?"
//             onClick={() => {
//               this.changeInnerCollapse("3_2_2");
//             }}
//             isOpen={innerCollapse === "3_2_2"}
//           >
//             Once you've placed you order, you will receive a confirmation email
//             with a tracking number. Use the tracking number to track your order
//             on the shipper/carrier’s (such as FedEx or UPS) website. Tracking
//             information may not be available for up 1- 2 business days after an
//             item has shipped from our warehouse. You can also track your order
//             in the{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             section.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="When will I receive my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_2_3");
//             }}
//             isOpen={innerCollapse === "3_2_3"}
//           >
//             Our packages are assembled by hand and processed within 1- 2
//             business days after payment has processed. Any order placed on a
//             weekend will be shipped the next business day. Business days are
//             Monday through Friday. Orders placed around the holidays may
//             experience delays. Once your order is shipped you will receive a
//             confirmation email with a link to track your shipment and check the
//             estimated delivery date.{" "}
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How do I know you have received my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_2_4");
//             }}
//             isOpen={innerCollapse === "3_2_4"}
//           >
//             Once you've placed you order, you will receive an email confirmation
//             with your order number. You will receive a second email after we
//             ship your order.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Will I receive a confirmation email when I place my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_2_5");
//             }}
//             isOpen={innerCollapse === "3_2_5"}
//           >
//             Once you have placed an order you will receive a confirmation email.
//             To ensure that your confirmation email doesn’t end up in your
//             Junk/Spam folder please add sales@cbdbene.com to your contacts. If
//             you have not received your order confirmation email please contact
//             us.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Why does my ‘Order Status’ say ‘Processed’?"
//             onClick={() => {
//               this.changeInnerCollapse("3_2_6");
//             }}
//             isOpen={innerCollapse === "3_2_6"}
//           >
//             When you view your order information you will see an order status
//             such as:
//             <ul>
//               <li>
//                 Processed: Your order has been received and paid for. We will
//                 send you an email when your order has shipped.
//               </li>
//               <li>
//                 Shipped: Your order has been processed and sent to the carrier
//                 (such as FedEx or UPS). You are now able to track your order.
//               </li>
//               <li>Delivered: We have successfully delivered your order.</li>
//               <li>Returned: Your order has been returned at your request.</li>
//             </ul>
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="What is the difference between a processed order and a shipped order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_2_7");
//             }}
//             isOpen={innerCollapse === "3_2_7"}
//           >
//             A Processed order is an order that has been confirmed, paid for and
//             needs to be shipped. Shipped order is an order that has been
//             confirmed, paid and shipped to the customer. You can track only
//             after an order has been shipped.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_3": (
//         <div>
//           <p>
//             As soon as you place your order, it gets processed right away.
//             Regrettably, we are unable to cancel it. We are sorry for any
//             inconvenience this may cause. You can create another order and
//             return any unwanted items.
//           </p>
//           <LearnCollapsePlus
//             title="Can i change my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_3_1");
//             }}
//             isOpen={innerCollapse === "3_3_1"}
//           >
//             We start processing your order as soon as we receive it. Once you
//             place your order, you cannot cancel or change it. It would be best
//             to place a new order and return the unwanted items back to us. To
//             have us return your order visit the{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             section.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="What should I do if I receive an incorrect or damaged item?"
//             onClick={() => {
//               this.changeInnerCollapse("3_3_2");
//             }}
//             isOpen={innerCollapse === "3_3_2"}
//           >
//             We're sorry to hear that you've received a damaged item. Please
//             email us, as soon as you can, with the following info:
//             <ul>
//               <li>Name</li>
//               <li>Order number</li>
//               <li>Damaged product name</li>
//               <li>Picture of the damaged product</li>
//             </ul>
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Can I exchange an item?"
//             onClick={() => {
//               this.changeInnerCollapse("3_3_3");
//             }}
//             isOpen={innerCollapse === "3_3_3"}
//           >
//             Unfortunately, we can’t exchange products. Simply return your
//             item(s) and reorder. Your refund will be processed once we've
//             received your unwanted items. You can return your order by visiting
//             the{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             section.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_4": (
//         <div>
//           <p>
//             Log in to{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             and select “
//             <Link href={`/account`}><a>my orders </a></Link>
//             ” to view a complete list of orders. We store information about your
//             recent order (including tracking information) as well as past
//             orders.{" "}
//           </p>
//           <LearnCollapsePlus
//             title="How can I reorder previously ordered items?"
//             onClick={() => {
//               this.changeInnerCollapse("3_4_1");
//             }}
//             isOpen={innerCollapse === "3_4_1"}
//           >
//             Select any of your previous orders, then click Reorder to add all
//             the products from this order into your shopping cart.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_5": (
//         <div>
//           <LearnCollapsePlus
//             title="Do you ship internationally?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_5_1");
//             }}
//             isOpen={innerCollapse === "3_5_1"}
//           >
//             We ship internationally to most countries where CBD can be shipped.
//             We are continuously expanding our international presence. If you any
//             specific questions about shipment to your country, please contact us
//             at help@cbdbene.com.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Do i have to pay customs charges on my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_5_2");
//             }}
//             isOpen={innerCollapse === "3_5_2"}
//           >
//             Unfortunately, we don’t advise on customs duties for international
//             shipments. The customs duties are applied based on the shipper and
//             the destination country laws and all customs charges is your
//             responsibility. For more accurate information, we’d suggest getting
//             in touch with your destination country customs office for all the
//             charges.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="What if I’m ordering with an international credit card?"
//             onClick={() => {
//               this.changeInnerCollapse("3_5_3");
//             }}
//             isOpen={innerCollapse === "3_5_3"}
//           >
//             The charges to your credit card will reflect the current exchange
//             rate from country’s currency to USD. Your credit card company may
//             charge international transaction fees. Please check with your credit
//             card company prior to placing your order.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_6": (
//         <div>
//           <p>
//             We accept all major debit/credit cards and for the US only we accept
//             e-checks / online U.S. Bank transfers.{" "}
//           </p>
//           <LearnCollapsePlus
//             title="Is it safe to enter my credit card information?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_6_1");
//             }}
//             isOpen={innerCollapse === "3_6_1"}
//           >
//             You can be assured that shopping with bené is safe! We use
//             industry-standard encryption to protect your bank account or credit
//             / debit card details entered in the site. Information passed between
//             your computer and our website cannot be read in the event of someone
//             else intercepting it. However, email is not a secure method of
//             transmitting bank account or credit / debit card details, please do
//             NOT send payment information via an email message to us.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Can I store my payment information?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_6_2");
//             }}
//             isOpen={innerCollapse === "3_6_2"}
//           >
//             Yes. Please visit My Payments section in the{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             menu to update your payment methods. You can add or edit multiple
//             payment methods here also ‘Set as Default’ here.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="When will i be charged for my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_6_3");
//             }}
//             isOpen={innerCollapse === "3_6_3"}
//           >
//             Your card will be charged when we process your order. As soon as you
//             place your order, a pre-authorization amount is placed onto your
//             credit card but we don’t process the payment until the order has
//             been processed.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Why am i paying sales tax?"
//             onClick={() => {
//               this.changeInnerCollapse("3_6_4");
//             }}
//             isOpen={innerCollapse === "3_6_4"}
//           >
//             Depending on the US state to which your order is being shipped, we
//             may be required by law to charge sales tax. Tax is estimated at the
//             time your place the order and is reflected on your order total.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_7": (
//         <div>
//           <LearnCollapsePlus
//             title="What if I’m missing a product in my order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_7_1");
//             }}
//             isOpen={innerCollapse === "3_7_1"}
//           >
//             If your package is missing a product or if you have any other
//             questions, please contact us at customerservice@cbdbene.com. To
//             expedite your request, please include your order number in the
//             email.{" "}
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="I emailed customer service about a problem with my order but haven’t heard back yet. Why?"
//             onClick={() => {
//               this.changeInnerCollapse("3_7_2");
//             }}
//             isOpen={innerCollapse === "3_7_2"}
//           >
//             We aim to respond to all inquiries within 24 hours, we’ll get back
//             to you as soon as we can.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_8": (
//         <div>
//           <p>
//             Creating a bené account is free and makes the checkout process
//             faster.
//           </p>
//           <LearnCollapsePlus
//             title="Do I need to create an account at cbdbene.com?"
//             onClick={() => {
//               this.changeInnerCollapse("3_8_1");
//             }}
//             isOpen={innerCollapse === "3_8_1"}
//           >
//             You don’t need an account to buy from bene, however creating one
//             provides many benefits:
//             <ul>
//               <li>Checkout faster</li>
//               <li>Receive Exclusive Gifts & Offers</li>
//               <li>Track orders</li>
//               <li>Review Order History and Reorder</li>
//               <li>Save to My Favorites</li>
//             </ul>
//             As a guest, all order updates are sent by email, and you won’t be
//             able to track your orders on our site.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How do I change my password?"
//             onClick={() => {
//               this.changeInnerCollapse("3_8_2");
//             }}
//             isOpen={innerCollapse === "3_8_2"}
//           >
//             Click{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             menu in the navigation bar and click Profile.
//             <ol>
//               <li>
//                 On{" "}
//                 <Link href={`/account`}>
//                   <a>My Account{" "}</a>
//                 </Link>{" "}
//                 tab, click on Change Password.
//               </li>
//               <li>Enter your old password and the new password.</li>
//               <li>Click Update.</li>
//             </ol>
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="How do I reset a lost or forgotten password?"
//             onClick={() => {
//               this.changeInnerCollapse("3_8_3");
//             }}
//             isOpen={innerCollapse === "3_8_3"}
//           >
//             <p>
//               Click “Forgot Your Password?” in the Log in page. Enter your email
//               to receive reset instructions.{" "}
//             </p>
//             <p>
//               Note: If our system doesn’t recognize your email address then you
//               will have to Log in as a new customer. Otherwise we can reset your
//               password and send you a temporary password to your registered
//               email.
//             </p>

//             <ol>
//               <li>
//                 We will send you a temporary password to your registered email.
//               </li>
//               <li>
//                 Click{" "}
//                 <Link href={`/account`}>
//                   <a>My Account{" "}</a>
//                 </Link>{" "}
//                 menu in the navigation bar and click Log in.
//               </li>
//               <li>
//                 Login with the temporary password received in your email.{" "}
//               </li>
//               <li>
//                 On{" "}
//                 <Link href={`/account`}>
//                   <a>My Account{" "}</a>
//                 </Link>{" "}
//                 tab, click on Change Password{" "}
//               </li>
//               <li>Enter your old (temporary) password and the new password.</li>
//               <li>Click Update.</li>
//             </ol>
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_9": (
//         <div>
//           <p>
//             All unopened and unused products and products may be returned within
//             60 days of receipt.{" "}
//           </p>
//           <LearnCollapsePlus
//             title="How do I return a product?"
//             onClick={() => {
//               this.changeInnerCollapse("3_9_1");
//             }}
//             isOpen={innerCollapse === "3_9_1"}
//           >
//             To return a product, please follow the directions below:
//             <ol>
//               <li>
//                 Create an email with the following information on the products
//                 you would like to return:
//                 <br />
//                 <br />
//                 Your Name: ___________________________Order #:
//                 ______________________ Item Name
//                 ___________________________Quantity ______ Reason Code _____
//                 Item Name _____ Quantity ______ Reason Code _____ Additional
//                 Information _______________________________________________
//                 <br />
//                 <br />
//                 [ Enter from the Reason Codes below]
//                 <br />
//                 <br />
//                 <ul>
//                   <li>A. Product is damaged </li>
//                   <li>B. Changed my mind </li>
//                   <li>C. Received incorrect Product</li>
//                   <li>D. Not what I expected </li>
//                   <li>E. Ordered by mistake </li>
//                 </ul>
//               </li>
//               <br />
//               <br />
//               <li>
//                 After we review your email, we will email you the Return
//                 Shipping Address and a shipping label along with instructions on
//                 how to return. Carefully pack item(s) to be returned into the
//                 original packaging, along with a printout of our email. Next,
//                 print the shipping label and place it on the outside of the
//                 package, and take the package to a drop-off location. Please
//                 note that the return label fee is USD$10 for US returns, and $20
//                 for international returns, which will be deducted from your
//                 refund. If you would like to use your own return shipping method
//                 (on US orders only), you may do that as well. Taxes on the
//                 products you returned will be refunded. Please note that we do
//                 not refund shipping, handling costs and custom duties.
//               </li>
//               <br />
//               <br />
//               <li>
//                 Once you’ve shipped the product back to us please also email the
//                 tracking number to returns@cbdbene.com so we can keep an eye out
//                 for it. Please note that any products that are damaged when we
//                 receive them are not eligible for refund.
//               </li>
//             </ol>
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_10": (
//         <div>
//           <p>
//             Any item returned after 60 days of receipt of the product by the
//             customer is not eligible for refund.
//           </p>
//         </div>
//       ),

//       "3_11": (
//         <div>
//           <p>
//             Please note that we do not accept returns of any products that are
//             specified as non-returnable in its description, unless they are
//             faulty. Any exceptions to this policy will be listed under product
//             details on the product page. Any products that are damaged when we
//             receive them are not eligible for refund.
//           </p>
//           <LearnCollapsePlus
//             title="What if I received a damaged product?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_11_1");
//             }}
//             isOpen={innerCollapse === "3_11_1"}
//           >
//             If there is an issue with any product, please let our Customer
//             Experience team know by sending an email to customerservice@bene.com
//             as soon as possible. We will resolve any problems as quickly as we
//             can. Please include as many details as possible.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_12": (
//         <div>
//           <p>
//             Once we receive your package and we can confirm its condition, we
//             will issue you a refund for the product(s) and email you a
//             confirmation. Refunds do not include any shipping or handling
//             charges, except in the case of faulty or damaged products. If you
//             have any questions regarding our return policy please email us at
//             returns@cbdbene.com
//           </p>
//           <LearnCollapsePlus
//             title="How can i tell when you have received my return?"
//             onClick={() => {
//               this.changeInnerCollapse("3_12_1");
//             }}
//             isOpen={innerCollapse === "3_12_1"}
//           >
//             A confirmation email will be sent to you as soon as your return has
//             been processed.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="How do I receive my refund?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_12_2");
//             }}
//             isOpen={innerCollapse === "3_12_2"}
//           >
//             Your refund will be credited to your original payment method used
//             for the original transaction and will be in the amount of the
//             Product price less the return label fee if applicable.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="How many days before I receive my refund?"
//             onClick={() => {
//               this.changeInnerCollapse("3_12_3");
//             }}
//             isOpen={innerCollapse === "3_12_3"}
//           >
//             Please allow 7-10 business days after we receive your package for
//             the refund to post to your statement. Some financial institutions
//             may require additional time for processing and posting the
//             transaction, so the credit may not show up only in the next billing
//             cycle. Note: bené will only accept returns and refunds from
//             purchases made on cbdbene.com. bene will not accept returns from a
//             purchase made in a retail store.
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "3_13": (
//         <div>
//           <p>
//             A subscription is a convenient way for you to get the products you
//             want delivered to you on a regular schedule, every thirty, sixty,
//             ninety days, etc. (based on the frequency you choose). Your credit
//             card will only be charged when your order ships. Your subscription
//             will continue for each subscription period until you cancel. You can
//             also change your delivery frequency in our site.{" "}
//           </p>
//           <LearnCollapsePlus
//             title="How do I start a subscription?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_13_1");
//             }}
//             isOpen={innerCollapse === "3_13_1"}
//           >
//             <ul>
//               <li>
//                 On the Product details page, select "Subscribe and Save 10%"
//               </li>
//               <li>
//                 Select the quantity and frequency of delivery, from every month,
//                 every 2 months, to every 6 months.
//               </li>
//               <li>
//                 Select the quantity and frequency of delivery, from every month,
//                 every 2 months, to every 6 months.
//               </li>
//               <li>Add to Cart and then Check out with your payment details.</li>
//             </ul>
//             This completes your subscription order.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="When Will I Get My Order?"
//             onClick={() => {
//               this.changeInnerCollapse("3_13_2");
//             }}
//             isOpen={innerCollapse === "3_13_2"}
//           >
//             Your order will be shipped within 1-2 business days after your
//             subscription order is placed. Consequently, your order will be
//             shipped every thirty, sixty, ninety days, etc. (based on the
//             frequency you choose) after the initial order.{" "}
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="When will my card be charged?"
//             onClick={() => {
//               this.changeInnerCollapse("3_13_3");
//             }}
//             isOpen={innerCollapse === "3_13_3"}
//           >
//             Once your order is placed, we authorize your card. We’ll charge your
//             card only when the order ships (within two business days). Your
//             credit or debit card will then be charged every thirty, sixty,
//             ninety days, etc. (based on the frequency you choose) after the
//             initial charge.{" "}
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title={
//               <span>
//                 How do I cancel or modify{" "}
//                 <Link href={`/my-subscription`}>
//                   <a>my subscription{" "}</a>
//                 </Link>
//                 ?>
//               </span>
//             }
//             onClick={() => {
//               this.changeInnerCollapse("3_13_4");
//             }}
//             isOpen={innerCollapse === "3_13_4"}
//           >
//             <ol>
//               <li>
//                 Click{" "}
//                 <Link href={`/account`}>
//                   <a>My Account{" "}</a>
//                 </Link>{" "}
//                 menu in the navigation bar and click{" "}
//                 <Link href={`/my-subscription`}>
//                   <a>my subscriptions{" "}</a>
//                 </Link>
//                 s to view a complete list of all your subscriptions.
//               </li>
//               <li>
//                 Select any subscription, then click Cancel to simply cancel the
//                 subscription from your account.
//               </li>
//             </ol>
//             Any changes you make will be reflected in your next shipment, except
//             for changes initiated while an order is in process (i.e., when your
//             card has been charged but you have not yet received your shipment).
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="
//             How do I modify the frequency for my subscription?
//             "
//             onClick={() => {
//               this.changeInnerCollapse("3_13_5");
//             }}
//             isOpen={innerCollapse === "3_13_5"}
//           >
//             <ol>
//               <li>
//                 Click{" "}
//                 <Link href={`/account`}>
//                   <a>My Account{" "}</a>
//                 </Link>{" "}
//                 menu in the navigation bar and click{" "}
//                 <Link href={`/my-subscription`}>
//                   <a>my subscriptions{" "}</a>
//                 </Link>
//                 s to view a complete list of all your subscriptions.
//               </li>
//               <li>
//                 Select any subscription, then click modify and then select the
//                 new frequency for your subscription. Now, your subscription will
//                 be shipped based on the new frequency (every thirty, sixty,
//                 ninety days, etc.) you selected.{" "}
//               </li>
//             </ol>
//             Any changes you make will be reflected in your next shipment, except
//             for changes initiated while an order is in process (i.e., when your
//             card has been charged but you have not yet received your shipment).
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Can I change my payment method?"
//             onClick={() => {
//               this.changeInnerCollapse("3_13_6");
//             }}
//             isOpen={innerCollapse === "3_13_6"}
//           >
//             Yes, you can change your payment at any time in your{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             section. If you do not make any changes, the default payment method
//             you designated for your first order will be used on all subsequent
//             orders.
//           </LearnCollapsePlus>

//           <LearnCollapsePlus
//             title="Do I receive a discount of 10% with every subscription?"
//             onClick={() => {
//               this.changeInnerCollapse("3_13_7");
//             }}
//             isOpen={innerCollapse === "3_13_7"}
//           >
//             With a subscription, you'll receive regular shipments of the
//             products at a 10% discount. The discount applied every time is 10%
//             off the price on the website.{" "}
//           </LearnCollapsePlus>
//         </div>
//       ),

//       "4_1": (
//         <div>
//           <p>
//             Orders placed on our website may be delivered by one of several
//             different carriers and shipping methods.
//           </p>
//         </div>
//       ),
//       "4_2": (
//         <div>
//           We offer three shipping options within the U.S. FREE STANDARD SHIPPING
//           with orders of $75 or more.
//           <br />
//           <br />
//           <table className="ship_table">
//             <tr>
//               <th>Shipping Options within the US</th>
//               <th>Time for Delivery</th>
//             </tr>
//             <tr>
//               <td>Standard shipping</td>
//               <td>3-5 business days after processing</td>
//             </tr>
//             <tr>
//               <td>Expedited shipping</td>
//               <td>2-3 business days after processing</td>
//             </tr>
//             <tr>
//               <td>Express shipping</td>
//               <td>1-2 business days after processing</td>
//             </tr>
//           </table>
//           <br />
//           We only offer Standard International Shipping via UPS and FedEx.
//           <br />
//           <br />
//           <table className="ship_table">
//             <tr>
//               <th>Standard International Shipping</th>
//               <th>Time for delivery</th>
//             </tr>
//             <tr>
//               <td>Rest of North America (apart from the U.S.) </td>
//               <td>Approximately 3-5 days after processing</td>
//             </tr>
//             <tr>
//               <td>Europe</td>
//               <td>Approximately 7-10 days after processing</td>
//             </tr>
//             <tr>
//               <td>South America </td>
//               <td>Approximately 10-14 days after processing</td>
//             </tr>
//             <tr>
//               <td>Asia </td>
//               <td>Approximately 10-14 days after processing</td>
//             </tr>
//             <tr>
//               <td>Oceania </td>
//               <td>Approximately 10-14 days after processing</td>
//             </tr>
//           </table>
//         </div>
//       ),
//       "4_3": (
//         <div>
//           Shipping Fees:
//           <br />
//           <br />
//           <table className="ship_table">
//             <tr>
//               <th>Shipping Options </th>
//               <th>Shipping fee</th>
//             </tr>
//             <tr>
//               <td>Standard shipping</td>
//               <td>
//                 FREE SHIPPING with orders of $75 or more. $4.95 for orders less
//                 than $75
//               </td>
//             </tr>
//             <tr>
//               <td>Expedited shipping</td>
//               <td>$15 for UPS 2nd Day Air</td>
//             </tr>
//             <tr>
//               <td>Express shipping</td>
//               <td>$20 for UPS Next Day Air</td>
//             </tr>
//             <tr>
//               <td>International shipments</td>
//               <td>flat rate of $20</td>
//             </tr>
//           </table>
//           <br />
//           <br />
//           Please note that international shipping fees do not include taxes or
//           duties and customs charges and they may differ depending on your
//           region.
//           <br />
//           <br />
//         </div>
//       ),
//       "4_4": (
//         <div>
//           <p>
//             Applicable sales tax will be charged on merchandise total, where
//             applicable. Taxes are calculated according to shipping destination
//             and itemized value of the order.
//           </p>
//           <LearnCollapsePlus
//             title="How much duty and tax will i have to pay?"
//             onClick={() => {
//               this.changeInnerCollapse("4_4_1");
//             }}
//             isOpen={innerCollapse === "4_4_1"}
//           >
//             We're don’t estimate duties and customs charges for the destination
//             country. Please note that you will be responsible for all duties,
//             taxes and customs charges. If your order is refused in your country,
//             you will still be responsible for the product and the charges
//             incurred in shipping the package.{" "}
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="
//           Can you adjust the value of my order?
//            "
//             onClick={() => {
//               this.changeInnerCollapse("4_4_2");
//             }}
//             isOpen={innerCollapse === "4_4_2"}
//           >
//             No. We are required by law to disclose the full value of the order.{" "}
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "4_5": (
//         <div>
//           <p>
//             We ship to all states in the U.S. except Idaho or South Dakota. We
//             also ship internationally to most countries.
//           </p>
//           <LearnCollapsePlus
//             title="Why don’t you ship to Idaho or South Dakota?"
//             onClick={() => {
//               this.changeInnerCollapse("4_5_1");
//             }}
//             isOpen={innerCollapse === "4_5_1"}
//           >
//             We don’t ship to Idaho or South Dakota as their State law prohibits
//             possessing or transporting industrial hemp within that state's
//             jurisdiction.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="
//           Do you ship internationally?
//            "
//             onClick={() => {
//               this.changeInnerCollapse("4_5_2");
//             }}
//             isOpen={innerCollapse === "4_5_2"}
//           >
//             We ship internationally to most countries where CBD can be shipped.
//             All custom duties, import taxes or fees, if assessed, at your
//             country are your responsibility. We strictly follow all regulations
//             regarding the shipment of our products within the U.S. and abroad.
//             To ensure you are shopping on the correct site for your country,
//             find your country in the region selector located at the bottom of
//             every page. If you any specific questions about shipment to your
//             country, please contact us at help@cbdbene.com.{" "}
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "4_6": (
//         <div>
//           <p>
//             We do ship to military bases but we need the address formatted in
//             the proper military format (link to below which can open in a new
//             window or here as #section) for USPS. Please note transit times can
//             take up to 4-5 business days.
//           </p>
//           <LearnCollapsePlus
//             title="How should I ship to Military & Diplomatic personnel?"
//             onClick={() => {
//               this.changeInnerCollapse("4_5_1");
//             }}
//             isOpen={innerCollapse === "4_5_1"}
//           >
//             Make sure you include the unit and box numbers, for APO/FPO/DPO
//             shipping addresses (when you enter your shipping address). To
//             prevent mail from entering foreign mail networks, do not include
//             city or country names in APO/FPO/DPO shipping addresses. DPO last
//             line address information must contain the DPO designation and the
//             appropriate two-letter state abbreviation (AA, AE, or AP), followed
//             by the ZIP Code.
//             <br />
//             <br />
//             For Example:-
//             <br />
//             <br />
//             <table className="ship_table">
//               <tr>
//                 <th>Army/Air Post Office (APO) </th>
//                 <th>Fleet Post Office (FPO)</th>
//                 <th>Diplomatic Post Office (DPO)</th>
//               </tr>
//               <tr>
//                 <td>PFC JOHN DOE PSC 3 BOX 4120 APO AE 09021</td>
//                 <td>SEAMAN JOSEPH SMITH UNIT 100100 BOX 4120 FPO AP 96691</td>
//                 <td>JOHN ADAMS UNIT 8400 BOX 0000 DPO AE 09498-0048</td>
//               </tr>
//             </table>
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="
//           Do you ship internationally?
//            "
//             onClick={() => {
//               this.changeInnerCollapse("4_5_2");
//             }}
//             isOpen={innerCollapse === "4_5_2"}
//           >
//             We ship internationally to most countries where CBD can be shipped.
//             All custom duties, import taxes or fees, if assessed, at your
//             country are your responsibility. We strictly follow all regulations
//             regarding the shipment of our products within the U.S. and abroad.
//             To ensure you are shopping on the correct site for your country,
//             find your country in the region selector located at the bottom of
//             every page. If you any specific questions about shipment to your
//             country, please contact us at help@cbdbene.com.{" "}
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "4_7": (
//         <div>
//           <p>
//             Please contact us, as soon as you can, so we can look into this
//             further.
//           </p>
//         </div>
//       ),
//       "4_8": (
//         <div>
//           <p>
//             Yes. Please visit My Address section in the{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             menu to update your shipping addresses. You can add or edit multiple
//             shipping addresses here and also ‘Set as Default’ here.
//           </p>
//         </div>
//       ),
//       "5_1": (
//         <div>
//           <p>
//             The Consult section was designed to connect you with a certified
//             doctor who can answer any questions you may have about CBD and how
//             it relates to your medical condition.{" "}
//           </p>

//           <LearnCollapsePlus
//             title="How does CBD Consult work? "
//             onClick={() => {
//               this.changeInnerCollapse("5_1_1");
//             }}
//             isOpen={innerCollapse === "5_1_1"}
//           >
//             You can browse doctor profiles, view available appointment times,
//             and schedule an appointment to Consult with the doctor of your
//             choice. On the date of your appointment you will visit your doctor
//             online or on the phone to discuss CBD and your individual needs.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Where is Consult available? "
//             onClick={() => {
//               this.changeInnerCollapse("5_1_2");
//             }}
//             isOpen={innerCollapse === "5_1_2"}
//           >
//             Our network of Board-Certified doctors will be provided to you based
//             on the state you are located. We make sure that each doctor is fully
//             licensed to practice medicine in your state. Currently, Consult is
//             available in only a few states of the United States. We are working
//             hard to expand our availability across all the 50 U.S. States.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How much does it cost to use Consult? "
//             onClick={() => {
//               this.changeInnerCollapse("5_1_3");
//             }}
//             isOpen={innerCollapse === "5_1_3"}
//           >
//             You pay a fixed fee of $49 for a Consult with a doctor of your
//             choice.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "5_2": (
//         <div>
//           <p>How do I schedule an appointment?</p>
//           <p>
//             After you’ve selected a doctor on bené’s platform, you can request
//             an appointment by following the steps below:{" "}
//           </p>
//           <ol>
//             <li>On a doctor’s listing page, click Make an appointment.</li>
//             <p>
//               - If you see Instant appointment, the doctor is allowing you to
//               Visit with them instantly. Your appointment will be automatically
//               confirmed after step 4.
//             </p>
//             <li>
//               Add your payment information, including any coupon code you may
//               have.
//             </li>
//             <li>
//               Agree to the policies and terms, including the doctor’s
//               cancellation policy and consent forms.
//             </li>
//             <li>Wait for the doctor’s confirmation. </li>
//             <li>
//               If your appointment is accepted, you’ll be charged in full for the
//               appointment. If the doctor declines the request or doesn’t respond
//               within 24 hours, no charge is made and you can make an appointment
//               with someone else.
//             </li>
//           </ol>
//           <LearnCollapsePlus
//             title="What happens if my appointment request is declined or expires?"
//             onClick={() => {
//               this.changeInnerCollapse("5_2_1");
//             }}
//             isOpen={innerCollapse === "5_2_1"}
//           >
//             If your appointment request is declined by the doctor or expires,
//             meaning the doctor didn’t respond within 24 hours, no charge is made
//             for the appointment and you’re free to book with another doctor. We
//             urge our doctors to keep their calendars up to date and respond to
//             requests in a timely manner. But sometimes situations come up that
//             prevent them from accepting appointments.
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="
//           How much time does a doctor have to respond to my appointment?
//            "
//             onClick={() => {
//               this.changeInnerCollapse("5_2_2");
//             }}
//             isOpen={innerCollapse === "5_2_2"}
//           >
//             Doctors have 24 hours to officially accept or decline appointments.
//             Most confirm within a few hours. You'll be updated by email about
//             the status of your request. More than half of all appointment
//             requests are accepted within a few hours of being received. The vast
//             majority of doctors reply within 12 hours. If a doctor confirms your
//             request, your payment is processed and collected by bené in full. If
//             a doctor declines your request or the request expires, we don't
//             process your payment.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "5_3": (
//         <div>
//           <p>What methods of payment does bené accept?</p>
//           <ol>
//             <li>
//               Most major credit cards and pre-paid credit cards (Visa,
//               MasterCard, Amex, Discover, JCB) as well as many debit cards that
//               can be processed as credit
//             </li>
//             <li>U.S. Bank checking account</li>
//           </ol>

//           <LearnCollapsePlus
//             title="Why is my credit card being charged without a confirmed appointment?"
//             onClick={() => {
//               this.changeInnerCollapse("5_3_1");
//             }}
//             isOpen={innerCollapse === "5_3_1"}
//           >
//             Your payment method may be temporarily authorized for a charge when
//             you request an appointment, but this authorization is voided and
//             released back to the payment method if your appointment is declined.
//             We complete a charge only when an appointment is confirmed.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "5_4": (
//         <div>
//           <p>How do I prepare for my appointment?</p>
//           <p>
//             Most doctors require that you complete their intake form before your
//             appointment, which allows the doctor to get more information about
//             your medical condition and needs.
//           </p>
//           <LearnCollapsePlus
//             title="How do I find my appointment?"
//             onClick={() => {
//               this.changeInnerCollapse("5_4_1");
//             }}
//             isOpen={innerCollapse === "5_4_1"}
//           >
//             To find an appointment in your account:
//             <ol>
//               <li>
//                 On the website, please go to{" "}
//                 <Link href={`/account`}>
//                   <a>My Account{" "}</a>
//                 </Link>{" "}
//                 section.{" "}
//               </li>
//               <li>Tap Visits to get your appointment details</li>
//             </ol>
//             <p>
//               Note: Make sure you’re logged into the same bené account you used
//               to book the appointment.{" "}
//             </p>
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="How do I change or cancel my appointment?
//           "
//             onClick={() => {
//               this.changeInnerCollapse("5_4_2");
//             }}
//             isOpen={innerCollapse === "5_4_2"}
//           >
//             To change or cancel an appointment, first locate the appointment on{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             section of CBDbene.com. Select Cancel Visit{" "}
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="What happens if a doctor cancels my appointment?

//           "
//             onClick={() => {
//               this.changeInnerCollapse("5_4_3");
//             }}
//             isOpen={innerCollapse === "5_4_3"}
//           >
//             <p>
//               While extremely rare, if a doctor needs to cancel an appointment,
//               you'll be notified as soon as the cancellation is reported. You’ll
//               be refunded in full.
//             </p>
//             <p>
//               We take doctor cancellations very seriously. If your doctor
//               cancels, they may receive a fine or their ratings on the site
//               would be reduced, outside of accepted exceptions and pending a
//               review of their account.
//             </p>{" "}
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="What if I need to cancel because of an emergency or unavoidable circumstance?
//           "
//             onClick={() => {
//               this.changeInnerCollapse("5_4_4");
//             }}
//             isOpen={innerCollapse === "5_4_4"}
//           >
//             <p>
//               You can cancel your appointment and receive a full refund,
//               provided that you cancel at least 72 hours before your appointment
//               time. If you cancel your appointment after 72 hours the charges
//               will be refunded according to our cancellation policy.
//             </p>{" "}
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "5_5": (
//         <div>
//           <LearnCollapsePlus
//             title="What are the most common CBD questions that the doctor can answer?"
//             onClick={() => {
//               this.changeInnerCollapse("5_5_1");
//             }}
//             isOpen={innerCollapse === "5_5_1"}
//           >
//             Our doctors are trained to answer a wide range of questions
//             regarding CBD dosing and potential drug interactions.{" "}
//           </LearnCollapsePlus>
//           <LearnCollapsePlus
//             title="Is Consult appropriate for every medical condition?"
//             onClick={() => {
//               this.changeInnerCollapse("5_5_2");
//             }}
//             isOpen={innerCollapse === "5_5_2"}
//           >
//             Consult is not intended to replace your primary care doctor, but
//             simply to provide you with access to doctors with expertise in
//             Medical Cannabis and CBD. They are well-versed in the medical use of
//             CBD and can provide comprehensive guidance regarding CBD dosing and
//             potential drug interactions. You should not use Consult if you are
//             experiencing a medical emergency. In case of a medical
//             life-threatening emergency, you should dial 911 immediately.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "5_6": (
//         <div>
//           <p>
//             You can visit the doctor by going to Visits on{" "}
//             <Link href={`/account`}>
//               <a>My Account{" "}</a>
//             </Link>{" "}
//             menu, find the appointment, and click ‘Virtual waiting room’. You
//             will be placed in queue in the virtual waiting room of the doctor.{" "}
//           </p>
//           <LearnCollapsePlus
//             title="Can Consult be accessed on mobile devices?"
//             onClick={() => {
//               this.changeInnerCollapse("5_6_1");
//             }}
//             isOpen={innerCollapse === "5_6_1"}
//           >
//             Yes, you can Consult with a doctor on your mobile or on a computer.{" "}
//           </LearnCollapsePlus>{" "}
//           <LearnCollapsePlus
//             title="Is Consult safe and private?"
//             onClick={() => {
//               this.changeInnerCollapse("5_6_2");
//             }}
//             isOpen={innerCollapse === "5_6_2"}
//           >
//             We take your privacy very seriously. We are bound by The HIPAA
//             Privacy Rule to protect your personal health information.{" "}
//           </LearnCollapsePlus>{" "}
//           <LearnCollapsePlus
//             title="What system requirements do I need for Consult videoconferencing?"
//             onClick={() => {
//               this.changeInnerCollapse("5_6_3");
//             }}
//             isOpen={innerCollapse === "5_6_3"}
//           >
//             To use video conferencing, you need:
//             <ul>
//               <li>Windows®7, Vista, or XP</li>
//               <li>A Mac running OSX 10.6 (Snow Leopard) or superior.</li>
//               <li>Highspeed internet connection</li>
//               <li>A webcam with at least 1.3 megapixels</li>
//               <li>
//                 Microphone (most webcams already have microphone built in)
//               </li>
//             </ul>
//             After you enter the virtual waiting room, you will be able to use a
//             simple online simulation to test your configuration and check if you
//             are ready for a virtual Consultation.
//           </LearnCollapsePlus>
//         </div>
//       ),
//       "5_7": (
//         <div>
//           <LearnCollapsePlus
//             title="How do I follow up with my doctor after my initial visit?"
//             onClick={() => {
//               this.changeInnerCollapse("5_7_1");
//             }}
//             isOpen={innerCollapse === "5_7_1"}
//           >
//             You can revisit your doctor again if you have anything you need to
//             follow up with them about. Create a new appointment as before.{" "}
//           </LearnCollapsePlus>
//         </div>
//       )
//     };
//     return (

//     <Layout headerTheme="dark" fixed={true}>

//             <div
//             className={classNames("c-learn-page", {
//                 [className]: className
//             })}
//             >
//             <div
//                 style={
//                 {
//                     // paddingTop: "100px"
//                 }
//                 }
//                 className="w-100"
//             />
//             <div className="w-100">
//                 <div ref="wrapper" className="row align-items-start">
//                 <div ref="leftScrolls" className="pb-5 col-lg-3 ">
//                     <div className="pr-3 border-right-gold">
//                     {learnData.map((el, key) => {
//                         return (
//                         <LearnCollapse
//                             isOpen={el.id === openedCollapse}
//                             title={el.title}
//                             onClick={() => {
//                             this.changeCollapse(el.id);
//                             }}
//                             key={key}
//                         >
//                             {el.subMenus &&
//                             el.subMenus.map((elx, key) => {
//                                 return (
//                                 <LearnMenuHeading
//                                     key={key}
//                                     onClick={() => {
//                                     this.changeContent(`${el.id}_${elx.id}`);
//                                     }}
//                                     active={`${el.id}_${elx.id}` === contentId}
//                                     title={elx.title}
//                                 />
//                                 );
//                             })}
//                         </LearnCollapse>
//                         );
//                     })}
//                     </div>
//                 </div>
//                 <div ref="rightScrolls" className="col-lg-9">
//                     <FadeTransition in={isVisible}>
//                     <div className="pl-lg-5 pt-2 learn-view">
//                         <div className="pb-3 learn-view-inner">
//                         <h4>{this.getHeading(contentId, learnData)}</h4>
//                         </div>
//                         {learnSubData[contentId]}
//                     </div>
//                     </FadeTransition>
//                 </div>
//                 </div>
//             </div>
//             </div>

//         </Layout>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   countryCode: state.location.countryCode
// });
// export default connect(mapStateToProps)(Learn);

// const LearnMenuHeading = props => {
//     const { title, active, onClick } = props;
//     return (
//       <p
//         onClick={onClick}
//         style={{
//           fontWeight: active ? 500 : 400
//         }}
//         className="cursor-pointer mb-1 p-2 pb-1 learn__collapse"
//       >
//         {title}
//       </p>
//     );
// };
