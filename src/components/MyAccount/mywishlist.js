import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Link, resourceUrl, Redirect } from 'src/drivers';
import defaultClasses from './myAccount.css';
import wishlistClasses from './mywishlist.css';
import searchClasses from '../SearchPage/searchPage.css';
import Sidebar from './sidebar.js';
import accountClasses from './accountinformation.css';
import {
    useWishlist,
    useDeleteFromWishlist
} from '../../peregrine/lib/talons/MyAccount/useDashboard';
import WishListQuery from '../../queries/getWishlist.graphql';
import REMOVE_FROM_WISHLIST_MUTATION from '../../queries/removeFromWishlist.graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { useCategoryAddToCart } from '../../peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import Quantity from './wishlistQuantity.js';
import WishlistSkelton from './WishlistSkeleton.js';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useToasts } from '@magento/peregrine';
import { FormattedMessage } from 'react-intl';
import { useGetScopeCache } from '../../peregrine/lib/talons/Home/useHome';
import ADD_SIMPLE_MUTATION from '../../queries/addSimpleProductsToCart.graphql';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import { Title } from '@magento/venia-ui/lib/components/Head';

const MyWishList = props => {
    const [, { addToast }] = useToasts();
    const classes = mergeClasses(
        defaultClasses,
        props.classes,
        wishlistClasses
    );
    const [removeMsg, setRemoveMsg] = useState(false);
    const wishlistProps = useWishlist({
        query: WishListQuery
    });

    const deleteData = useDeleteFromWishlist({
        query: REMOVE_FROM_WISHLIST_MUTATION,
        customerQuery: GET_CUSTOMER_QUERY
    });
    const { handleRemoveItem, removing, removeResponse } = deleteData;
    const catProps = useCategoryAddToCart({
        addSimpleProductToCartMutation: ADD_SIMPLE_MUTATION,
        createCartMutation: CREATE_CART_MUTATION,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY
    });
    const { handleAddToCart } = catProps;
    let productUrlSuffix = '';

    const { config } = useGetScopeCache();
    if (config.product_url_suffix && config.product_url_suffix != 'null') {
        productUrlSuffix = config.product_url_suffix;
    }
    const {
        handleSetQuantity,
        quantity,
        data,
        isSignedIn,
        loading,
        refetch
    } = wishlistProps;

    const remove = async id => {
        await handleRemoveItem({ product_id: id });
        setRemoveMsg(true);
    };

    const queryParameters = new URLSearchParams(window.location.search)
    const wId = queryParameters.get("id");

    var qt2 = 100;

    useEffect(() => {
        if (
            removeMsg &&
            removeResponse &&
            removeResponse.removeFromWishlist &&
            removeResponse.removeFromWishlist.success
        ) {
            addToast({
                type: 'info',
                message: removeResponse.removeFromWishlist.message,
                dismissable: true,
                timeout: 10000
            });
            refetch();
        }
    }, [addToast, removeMsg, removeResponse, refetch]);
    if (!isSignedIn) {
        return <Redirect to="/" />;
    }
    if (!loading) {
        return (
            <div className={defaultClasses.columns}>
                <Title>{`My WishList - ${STORE_NAME}`}</Title>
                {removing && (
                    <div className={accountClasses.indicator_loader}>
                        <LoadingIndicator />
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div
                                className={
                                    defaultClasses.column +
                                    ' ' +
                                    defaultClasses.main
                                }
                            >
                                <div className={defaultClasses.account_sideBar}>
                                    <Sidebar history={props.history} />
                                </div>
                                <div
                                    className={
                                        defaultClasses.account_contentBar
                                    }
                                >
                                    <div
                                        className={
                                            defaultClasses.page_title_wrapper
                                        }
                                    >
                                        <h1
                                            className={
                                                defaultClasses.page_title
                                            }
                                        >
                                            <span
                                                className={defaultClasses.base}
                                            >
                                                <FormattedMessage
                                                    id={'myWishlist.page_title'}
                                                    defaultMessage={
                                                        'My projects'
                                                    }
                                                />
                                            </span>
                                        </h1>
                                        <div className={
                                            defaultClasses.block_dashboard_orders +
                                            ' ' +
                                            wishlistClasses.block_dahsboard_wishlist
                                        }>
                                            <p>Please choose a project below or create a new one</p> 
                                            {/* <select className={classes.project_dropdown}>
                                                <option value="14851" selected="selected">Hello</option>
                                                <option value="newproject">Create a new project</option>
                                            </select> */}
                                            <div className='row'>
                                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                                    <a href="/wishlist?id=x1">
                                                        <span
                                                            className={
                                                                classes.add_btn
                                                            }
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    'myWishlist.moveToCartBtn'
                                                                }
                                                                defaultMessage={
                                                                    'Project X1'
                                                                }
                                                            />
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                                    <a href="/wishlist?id=x2">
                                                        <span
                                                            className={
                                                                classes.add_btn
                                                            }
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    'myWishlist.moveToCartBtn'
                                                                }
                                                                defaultMessage={
                                                                    'Project X2'
                                                                }
                                                            />
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                                    <a href="/wishlist?id=x1">
                                                        <span
                                                            className={
                                                                classes.add_btn
                                                            }
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    'myWishlist.moveToCartBtn'
                                                                }
                                                                defaultMessage={
                                                                    'Project X1'
                                                                }
                                                            />
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                                    <a href="/wishlist?id=x1">
                                                        <span
                                                            className={
                                                                classes.add_btn
                                                            }
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    'myWishlist.moveToCartBtn'
                                                                }
                                                                defaultMessage={
                                                                    'Project X1'
                                                                }
                                                            />
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            defaultClasses.block_dashboard_orders +
                                            ' ' +
                                            wishlistClasses.block_dahsboard_wishlist
                                        }
                                    >
                                        {typeof data != 'undefined' && (
                                            <div
                                                className={
                                                    classes.products_wrapper
                                                }
                                            >
                                                {data.map((val, index) => {
                                                    if(val.description==wId) {
                                                    return (

                                                        <div>
                                                            <div className='row'>

                                                            <div className='col-lg-2 col-md-6 col-sm-6 col-xs-12 about-us'>
                                                                <div
                                                                        className={
                                                                            classes.product_img
                                                                        }
                                                                    >
                                                                    <Link
                                                                        to={resourceUrl(
                                                                            val
                                                                                .product[
                                                                                'url_key'
                                                                            ] +
                                                                                productUrlSuffix
                                                                        )}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                val
                                                                                    .product
                                                                                    .small_image
                                                                                    .url
                                                                            }
                                                                            alt="smallimage"
                                                                            className={
                                                                                'img-fluid'
                                                                            }
                                                                        />
                                                                    </Link>
                                                                    {val.description}
                                                                    {val.qty}
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 about-us'>
                                                            <div
                                                                    className={
                                                                        classes.product_details
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            classes.product_name
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={resourceUrl(
                                                                                val
                                                                                    .product[
                                                                                    'url_key'
                                                                                ] +
                                                                                    productUrlSuffix
                                                                            )}
                                                                        >
                                                                            {
                                                                                val
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                    <span
                                                                        className={
                                                                            classes.price_label
                                                                        }
                                                                    >
                                                                        ${' '}
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            classes.price
                                                                        }
                                                                    >
                                                                        {
                                                                            val
                                                                                .product
                                                                                .price
                                                                                .regularPrice
                                                                                .amount
                                                                                .value
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.wishlist_quantity
                                                                    }
                                                                >
                                                                    <Quantity
                                                                        initialValue={
                                                                            18
                                                                        }
                                                                        onValueChange={value =>
                                                                            handleSetQuantity(
                                                                                value,
                                                                                val
                                                                                    .product
                                                                                    .sku
                                                                            )
                                                                        }
                                                                    />
                                                                    <span
                                                                        className={
                                                                            classes.delete_icon
                                                                        }
                                                                    >
                                                                        <button
                                                                            id={
                                                                                val
                                                                                    .product
                                                                                    .id
                                                                            }
                                                                            onClick={() =>
                                                                                remove(
                                                                                    val
                                                                                        .product
                                                                                        .id
                                                                                )
                                                                            }
                                                                        >
                                                                            <span
                                                                                className={
                                                                                    classes.delete_text
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faTrashAlt
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 about-us'>
                                                            <div
                                                                    
                                                                >
                                                                    <div
                                                                        className={
                                                                            classes.add_btn_wrap
                                                                        }
                                                                    >
                                                                        {val
                                                                            .product
                                                                            .__typename ==
                                                                            'SimpleProduct' && (
                                                                            <button
                                                                                onClick={() => {
                                                                                    handleAddToCart(
                                                                                        val.product
                                                                                    );
                                                                                    alert('Product moved to cart');
                                                                                    /*remove(
                                                                                        val
                                                                                            .product
                                                                                            .id
                                                                                    );*/
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    className={
                                                                                        classes.add_btn
                                                                                    }
                                                                                >
                                                                                    <FormattedMessage
                                                                                        id={
                                                                                            'myWishlist.moveToCartBtn'
                                                                                        }
                                                                                        defaultMessage={
                                                                                            'Move to cart'
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </button>
                                                                        )}
                                                                        {val
                                                                            .product
                                                                            .__typename !=
                                                                            'SimpleProduct' && (
                                                                            <Link
                                                                                to={resourceUrl(
                                                                                    val
                                                                                        .product[
                                                                                        'url_key'
                                                                                    ] +
                                                                                        productUrlSuffix
                                                                                )}
                                                                                className={
                                                                                    classes.add_btn
                                                                                }
                                                                            >
                                                                                <FormattedMessage
                                                                                    id={
                                                                                        'myWishlist.moveToCartBtn'
                                                                                    }
                                                                                    defaultMessage={
                                                                                        'Move to cart 2'
                                                                                    }
                                                                                />
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            </div>
                                                        
                                                        </div>
                                                    );
                                                    }
                                                })}
                                                {data.length == 0 && (
                                                    <div
                                                        className={
                                                            searchClasses.noResult
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                searchClasses.noResult_icon
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faExclamationTriangle
                                                                }
                                                            />
                                                        </span>
                                                        <span
                                                            className={
                                                                'ml-2' +
                                                                ' ' +
                                                                searchClasses.noResult_text
                                                            }
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    'myWishlist.noResult_text'
                                                                }
                                                                defaultMessage={
                                                                    'You have no items saved in your projects.'
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {typeof data == 'undefined' && (
                                            <div
                                                className={
                                                    searchClasses.noResult
                                                }
                                            >
                                                <span
                                                    className={
                                                        searchClasses.noResult_icon
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faExclamationTriangle
                                                        }
                                                    />
                                                </span>
                                                <span
                                                    className={
                                                        'ml-2' +
                                                        ' ' +
                                                        searchClasses.noResult_text
                                                    }
                                                >
                                                    <FormattedMessage
                                                        id={
                                                            'myWishlist.noResult_text'
                                                        }
                                                        defaultMessage={
                                                            'You have no items saved in your projects.'
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={defaultClasses.columns}>
                <Title>{`My projects - ${STORE_NAME}`}</Title>
                {removing && (
                    <div className={accountClasses.indicator_loader}>
                        <LoadingIndicator />
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div
                                className={
                                    defaultClasses.column +
                                    ' ' +
                                    defaultClasses.main
                                }
                            >
                                <div className={defaultClasses.account_sideBar}>
                                    <Sidebar history={props.history} />
                                </div>
                                <div
                                    className={
                                        defaultClasses.account_contentBar
                                    }
                                >
                                    <div
                                        className={
                                            defaultClasses.page_title_wrapper
                                        }
                                    >
                                        <h1
                                            className={
                                                defaultClasses.page_title
                                            }
                                        >
                                            <span
                                                className={defaultClasses.base}
                                            >
                                                <FormattedMessage
                                                    id={'myWishlist.page_title'}
                                                    defaultMessage={
                                                        'My projects'
                                                    }
                                                />
                                            </span>
                                        </h1>
                                    </div>
                                    <div>
                                        <WishlistSkelton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyWishList;

MyWishList.propTypes = {
    classes: shape({
        actions: string,
        root: string,
        subtitle: string,
        title: string,
        user: string
    })
};
