import React, { useState, useEffect, Suspense } from 'react';
import { string, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { useToasts } from '@magento/peregrine';
import Price from '@magento/venia-ui/lib/components/Price';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';
import { useGalleryItem } from '@magento/peregrine/lib/talons/Gallery/useGalleryItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { FormattedMessage, useIntl } from 'react-intl';
import mapProduct from '@magento/venia-ui/lib/util/mapProduct';
import proClasses from '../ProductFullDetail/productFullDetail.css';

import { useStyle } from '../../classify';
import Image from '../Image';
import GalleryItemShimmer from './item.shimmer';
import defaultClasses from './item.css';
import CompareButton from '../Compare/compareButton';
import { useProductFullDetail } from '../../peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import {
    ADD_SIMPLE_CUSTOM_MUTATION,
    ADD_CONFIGURABLE_MUTATION,
    ADD_SIMPLE_MUTATION,
    ADD_BUNDLE_MUTATION
} from '../ProductFullDetail/productFullDetail.gql';

import { useDashboard } from '../../peregrine/lib/talons/MyAccount/useDashboard';



const Wishlist = React.lazy(() => import('../MyWishlist/wishlist'));

// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const GalleryItem = props => {

    function openRegister() {
        document.getElementById('user_account').click();
    }

    const { email } = useDashboard();

    const { handleLinkClick, item } = useGalleryItem(props);
    const { style } = props;

    const [productName, setProductName] = useState('');
    let productUrlSuffix = '';
    if (item && item.url_suffix) {
        productUrlSuffix = item.url_suffix;
    }
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useProductFullDetail({
        addConfigurableProductToCartMutation: ADD_CONFIGURABLE_MUTATION,
        addSimpleProductToCartMutation: ADD_SIMPLE_MUTATION,
        addSimpleCustomMutation: ADD_SIMPLE_CUSTOM_MUTATION,
        addBundleProductToCartMutation: ADD_BUNDLE_MUTATION,
        product: mapProduct(item)
    });
    const { handleAddToCart, success, errorMessage, isAddingItem } = talonProps;
    useEffect(() => {
        if (success && !isAddingItem) {
            addToast({
                type: 'info',
                message:
                    productName +
                    formatMessage({
                        id: 'cart.message',
                        defaultMessage: ' added to the cart.'
                    }),
                dismissable: true,
                timeout: 2000
            });
        }
        if (errorMessage && !isAddingItem) {
            addToast({
                type: 'error',
                message: errorMessage ? errorMessage : 'error',
                dismissable: true,
                timeout: 2000
            });
        }
    }, [
        addToast,
        success,
        errorMessage,
        isAddingItem,
        productName,
        formatMessage
    ]);

    if (!item) {
        return <GalleryItemShimmer classes={classes} />;
    }

    const { name, price_range, small_image, url_key, id, stock_status, product_brand, productbrand, short_description, meta_title} = item;
    const { url: smallImageURL } = small_image;
    const productLink = resourceUrl(`/${url_key}${productUrlSuffix || ''}`);
    let colorSwatchLength = 0;
    let itemElements;
    if (item.configurable_options) {
        item.configurable_options.forEach(configOptions => {
            if (configOptions.attribute_code == 'color') {
                colorSwatchLength = configOptions.values.length;
                itemElements = configOptions.values.map(swatches => {
                    const { label, value_index } = swatches;
                    const finalStyle = Object.assign({}, style, {
                        backgroundColor: label
                    });
                    const element = (
                        <div key={value_index}>
                            <Link
                                to={productLink}
                                className={classes.colors_inner}
                                style={finalStyle}
                            >
                                <FormattedMessage
                                    id={'item.colors_inner'}
                                    defaultMessage={'color name'}
                                />
                            </Link>
                        </div>
                    );
                    return element;
                });
            }
        });
    }

    const customPrice = 0;
    const customPricePercent = 0;

    const final_minimum_price =
    (price_range.minimum_price.final_price.value +
        customPrice +
        customPricePercent * price_range.minimum_price.final_price.value)*1;

    const final_regular_price =
    (price_range.minimum_price.regular_price.value +
        customPrice +
        customPricePercent * price_range.minimum_price.regular_price.value)*1;

    const final_maximum_price =
    price_range.maximum_price.final_price.value +
        customPrice +
        customPricePercent * price_range.maximum_price.final_price.value;

    const final_regular_price_max =
    price_range.maximum_price.regular_price.value +
        customPrice +
        customPricePercent * price_range.maximum_price.regular_price.value; 

    const discount_percent = ((1 - (final_minimum_price/final_regular_price)).toFixed(2)) * 100;

    function openLoginBox() {
        //alert('Henlo');
        document.getElementById('user_account').click();
    }

    return (
        <div className={classes.root} aria-live="polite" aria-busy="false">
            <div className={classes.noo_product_image}>
                {discount_percent != 0 && email && (
                    <div className={classes.priceTag}><b>{discount_percent}% discount</b></div>
                )}
                <Link
                    onClick={handleLinkClick}
                    to={productLink}
                    className={classes.images}
                >
                    <Image
                        alt={name}
                        classes={{
                            image: classes.image,
                            loaded: classes.imageLoaded,
                            notLoaded: classes.imageNotLoaded,
                            root: classes.imageContainer
                        }}
                        height={IMAGE_HEIGHT}
                        resource={smallImageURL}
                        widths={IMAGE_WIDTHS}
                    />
                </Link>
            </div>
            <div className={classes.noo_details_wrapper}>
                <p className={classes.product_name}>
                    <Link
                        onClick={handleLinkClick}
                        to={productLink}
                        className={classes.name}
                    >
                        <span>{name}</span>
                    </Link>
                </p>

                {/* wishlist section */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Wishlist value={item} />
                </Suspense> 
                <div
                    className={classes.vendor_price_wrap + ' ' + classes.price}
                >
                    {email ? (
                        <div> 
                            
                            <p className={classes.total_available}>Total available: {item.totalavailable}</p>
                            
                            
                            {final_minimum_price != final_regular_price && (
                                <>
                                    <p><b>Special price</b></p>
                                    {item.special_from_date && (
                                        <p>From: {item.special_from_date.slice(0, -8)}</p>
                                    )}
                                    {item.special_to_date && (
                                        <p>To: {item.special_to_date.slice(0, -8)}</p>
                                    )}
                                    <b className={classes.total_available_b}>SHERPA&nbsp;&nbsp;</b>
                                    <span className={classes.productPrice}>
                                        <Price
                                            value={(price_range.maximum_price.final_price.value)*1}
                                            currencyCode={
                                                price_range.maximum_price.regular_price.currency
                                            }
                                        />
                                    </span>
                                    <span
                                        className={
                                            classes.regularprice
                                        }
                                    >
                                        
                                        <Price
                                            currencyCode={
                                                price_range.minimum_price.regular_price.currency
                                            }
                                            value={final_regular_price}
                                        />
                                        
                                    </span>
                                </>
                            )}
                            {final_minimum_price == final_regular_price && (
                                <>
                                    
                                    <b className={classes.total_available_b}>SHERPA&nbsp;&nbsp;</b>
                                    
                                        <Price
                                            value={price_range.maximum_price.final_price.value}
                                            currencyCode={
                                                price_range.maximum_price.regular_price.currency
                                            }
                                        />
                                    
                                </>
                            )}
                            <p>
                                <b className={classes.total_available_b}>MSRP&nbsp;&nbsp;</b>
                                <Price
                                    value={item.msrp_sherpa2}
                                    currencyCode={
                                        price_range.maximum_price.regular_price.currency
                                    }
                                />
                            </p>
                        </div>
                    ) : (
                        <div>
                           
                        </div>
                        
                    )}
                    
                </div>
                
                <div className={defaultClasses.colors_stars_wrap}>
                    <div className={defaultClasses.colors_wrap}>
                        {itemElements}
                    </div>
                    <div>
                        {colorSwatchLength > 3 && (
                            <Link
                                to={productLink}
                                className={classes.extra_colors}
                            >
                                <FormattedMessage
                                    id={'item.extra_colors'}
                                    defaultMessage={'+3'}
                                />
                            </Link>
                        )}
                    </div>
                </div>
                <div
                    className={
                        defaultClasses.add_to_cart_Wrap +
                        ' ' +
                        'position-relative'
                    }
                >
                    {email ? (
                        <div>
                    <div className={classes.add_to_cart_btn}>
                        {item.__typename == 'SimpleProduct' &&
                            stock_status == 'IN_STOCK' &&
                            item.options == null && (
                                
                                    <button
                                        onClick={() => {
                                            setProductName(item.name),
                                                handleAddToCart(item);
                                        }}
                                    >
                                        <FormattedMessage
                                            id={'item.add_to_cart_btn'}
                                            defaultMessage={'Add to cart'}
                                        />
                                    </button>
                                
                            )}
                        {item.__typename == 'SimpleProduct' &&
                            stock_status == 'IN_STOCK' &&
                            item.options !== null && (
                                <Link to={resourceUrl(productLink)}>
                                    <FormattedMessage
                                        id={
                                            'item.add_to_cart_btn_SimpleProduct'
                                        }
                                        defaultMessage={'Add to cart'}
                                    />
                                </Link>
                            )}
                        {item.__typename == 'SimpleProduct' &&
                            stock_status != 'IN_STOCK' && (
                                <Link to={resourceUrl(productLink)}>
                                    <FormattedMessage
                                        id={
                                            'item.add_to_cart_btn_SimpleProduct'
                                        }
                                        defaultMessage={'Add to cart'}
                                    />
                                </Link>
 
                            )}
                        {item.__typename != 'SimpleProduct' && (
                            <Link to={resourceUrl(productLink)}>
                                <FormattedMessage
                                    id={
                                        'item.add_to_cart_btn_ConfigurableProduct'
                                    }
                                    defaultMessage={'Add to cart'}
                                />
                            </Link>
                        )}
                        {isAddingItem && item.name == productName && (
                            <div
                                className={
                                    proClasses.modal +
                                    ' ' +
                                    proClasses.modal_active +
                                    ' ' +
                                    defaultClasses.modal_active +
                                    ' ' +
                                    proClasses.galler_modal_active
                                }
                            >
                                <div className={proClasses.loader_div}>
                                    <div className={proClasses.ball_pulse}>
                                        <div />
                                        <div />
                                        <div />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={classes.add_to_cart_btn}>
                        {item.__typename == 'SimpleProduct' &&
                            stock_status == 'IN_STOCK' &&
                            item.options == null && (
                                <div>
                                    
                                    <button
                                        onClick={() => {
                                            setProductName(item.name),
                                                handleAddToCart(item);
                                        }}
                                    >
                                        <FormattedMessage
                                            id={'item.add_to_cart_btn'}
                                            defaultMessage={'Add to project'}
                                        />
                                    </button>
                                    
                                </div>
                                
                            )}
                        {item.__typename == 'SimpleProduct' &&
                            stock_status == 'IN_STOCK' &&
                            item.options !== null && (
                                <Link to={resourceUrl(productLink)}>
                                    <FormattedMessage
                                        id={
                                            'item.add_to_cart_btn_SimpleProduct'
                                        }
                                        defaultMessage={'Add to cart'}
                                    />
                                </Link>
                            )}
                        {item.__typename == 'SimpleProduct' &&
                            stock_status != 'IN_STOCK' && (
                                <Link to={resourceUrl(productLink)}>
                                    <FormattedMessage
                                        id={
                                            'item.add_to_cart_btn_SimpleProduct'
                                        }
                                        defaultMessage={'Add to cart'}
                                    />
                                </Link>
 
                            )}
                        {item.__typename != 'SimpleProduct' && (
                            <Link to={resourceUrl(productLink)}>
                                <FormattedMessage
                                    id={
                                        'item.add_to_cart_btn_ConfigurableProduct'
                                    }
                                    defaultMessage={'Add to cart'}
                                />
                            </Link>
                        )}
                        {isAddingItem && item.name == productName && (
                            <div
                                className={
                                    proClasses.modal +
                                    ' ' +
                                    proClasses.modal_active +
                                    ' ' +
                                    defaultClasses.modal_active +
                                    ' ' +
                                    proClasses.galler_modal_active
                                }
                            >
                                <div className={proClasses.loader_div}>
                                    <div className={proClasses.ball_pulse}>
                                        <div />
                                        <div />
                                        <div />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                    ) : (
                        <p>&nbsp;</p>
                    )}
                    {/* End custom add to cart */}

                    {/* <CompareButton id={id} /> */}
                </div>

                    {email ? (
                        <div> 
                            
                            <select className={classes.project_dropdown}>
                                <option value="14851" selected="selected">Hello</option>
                                <option value="newproject">Create a new project</option>
                            </select>
                        </div>
                    ) : (
                        <p><a style={{cursor:'pointer'}} onClick={openLoginBox}>Register or create an account</a></p>
                    )}

               
            </div>
        </div>
    );
    
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageLoaded: string,
        imageNotLoaded: string,
        imageContainer: string,
        images: string,
        name: string,
        price: string,
        root: string
    })
    // storeConfig: shape({
    //     magento_wishlist_general_is_enabled: string.isRequired,
    //     product_url_suffix: string.isRequired
    // })
};

export default GalleryItem;
