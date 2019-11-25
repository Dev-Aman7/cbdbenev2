import {useRef} from 'react'
import Heading from './Heading';
import classNames from 'classnames';
import projectSettings from '../constants/projectSettings';
import Flickity from 'react-flickity-component';
import Link from 'next/link';
import SliderLine from './SliderLine';
const CategoryProducts = ({ heading, categoryList, activeCategory, onCategoryChange, products, bg, pp }) => {
    
    const sliderLine = useRef(null)
	const className = classNames('c-category-products', {
		[`c-category-products--${bg}`]: bg
    });
    let left = 0
    const flickityInit = () => {
        setTimeout(() => {
            if(flkty){
                flkty.on("scroll", progress => {
                    if(!isNaN(progress)){
                        let pos = `${progress * 80}%`;
                        sliderLine.current.style.left = pos
                        console.log({
                            sliderLine
                        })
                    }
                });
            }
        }, 200);
    }
    const flResize = () => {
      if(flkty) flkty.resize();
    }
    let flkty = undefined
	return (
		<div className={className}>
			<div className="c-category-products__heading-wrapper">
				<Heading parentClass="c-category-products" versions={[ 'default', 'upper' ]}>
					{heading}
				</Heading>
			</div>
			<div className="c-category-products__list">
                {categoryList.map((el, i) => (
                    <span
                        onClick={() => {
                            onCategoryChange(el);
                        }}
                        className={classNames('c-category-products__list-item', {
                            'c-category-products__list-item--active': activeCategory === el.title
                        })}
                        key={i}
                    >
                        {el.title}
                    </span>
                ))}
			</div>
			<div className="row c-category-products__product-list">
				<Flickity
					options={{
						initialIndex: 0,
						pageDots: false,
						cellAlign: 'left',
                        contain: true,
                        on: {
                            ready: () => {
                              flickityInit();
                            }
                        }
                    }}
                    flickityRef={c => (flkty = c)}
                    disableImagesLoaded={false}
                    reloadOnUpdate={true}
                    className="c-category-products__slider"
				>
                    {products.map((el, i) => (
                        <Link href={`/shop/${el._id}`}>
                            <div key={i} className="col-lg-4 c-category-products__product">
                                <img
                                    src={projectSettings.serverUrl + el.productImage}
                                    alt={el.title}
                                    onLoad={() => {
                                      flResize();
                                    }}
                                    className="c-category-products__img img-fluid"
                                />
                            </div>
                        </Link>
                    ))}
				</Flickity>
                <SliderLine ref={sliderLine} left={left} />
			</div>
		</div>
	);
};

CategoryProducts.defaultProps = {
	categoryList: [],
	products: [],
	activeCategory: '',
	onCategoryChange: () => {}
};

export default CategoryProducts;
