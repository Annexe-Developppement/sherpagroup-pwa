import React, { useState, useEffect, Component } from 'react';
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
import { gql, useMutation } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QuantityPicker } from 'react-qty-picker';
import { useStyle } from '../../classify';

function Collapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Collapse' : 'Expand'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                Now you can see the hidden content. <br/><br/>
                Click again to hide...
            </div>
        </div>
    </div>
    );
}

class ProjectList extends Component{

    constructor () {
        super()
        this.state = {
            pageData: [],
            name: "React Component reload sample",
            reload: false
        }
    }

    componentDidMount() {
        let pid = this.props.pid;
        let dataURL = "https://sherpagroupav.com/get_projects.php?email="+pid;
        fetch(dataURL)
          .then(res => res.json())
          .then(res => {
            this.setState({
                pageData: res
            })
          });        
    }



    render(){

        const classes = mergeClasses(
            defaultClasses,
            wishlistClasses
        );

        const Select = () => {
            
            return (
              <div class="row">
                
               
                    {this.state.pageData && this.state.pageData.map((e) => {
                    
                    return (
                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className={classes.boxcategory}>
                                
                                <div className={classes.boxlink}>
                                    <a href={"/wishlist?id="+e.category_id}>{e.category_name}</a>
                                </div>
                            </div>
                        </div>
                    );
                
                })}
                    
              </div>
            );
          }; 

        //const classes = useStyle(defaultClasses);

        return(
            <React.Fragment>
                
                <Select/>

            </React.Fragment>
        )
    }
}


class ServiceDetailsEmployeurs extends Component{
    constructor () {
        super()
        this.state = {
            pageData: []
        }
    }

    componentDidMount() {
        let pid = this.props.pid;
        let dataURL = "https://sherpagroupav.com/get_sku.php?id="+pid;
        fetch(dataURL)
          .then(res => res.json())
          .then(res => {
            this.setState({
                pageData: res
            })
          });        
    }

    render(){

        let sku = this.state.pageData.sku && this.state.pageData.sku;
        let image = this.state.pageData.image && this.state.pageData.image;
        let name = this.state.pageData.name && this.state.pageData.name;

        return(
            <React.Fragment>

                <p className="title theme-gradient">{name}</p>
                <img className='img-fluid' src={image} />
                <p className="title theme-gradient">Part # {sku}</p>

            </React.Fragment>
        )
    }
}


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

    const GET_WL_DETAILS = gql`
    query {
        MpBetterWishlistGetCategories(is_items: true) {
            category_id
            category_name
            is_default
            items {
                added_at
                description
                product_id
                qty
                store_id
                wishlist_item_id
            }
        }
    }
    `;

    const ProjectLinks = () => {

        const { data, loading } = useQuery(GET_WL_DETAILS, {
            fetchPolicy: 'network-only',
            variables: {
            }});

        if (loading) {
            return <p>Loading ...</p>
        }

        return (
            
            <div className="row">
              
              {data.MpBetterWishlistGetCategories && data.MpBetterWishlistGetCategories.map((e) => {
                if(e.items.length > 0) {

                return (
                    <>

                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className={classes.boxcategory}>
                            
                            <div className={classes.boxlink}>
                                <a href={"/wishlist?id="+e.category_id}>{e.category_name}</a>
                            </div>
                        </div>
                    </div>
                    
                    </>
                );
                }
              })}
            </div>
          );
      };

    const BWL = () => {

        const { data, loading } = useQuery(GET_WL_DETAILS, {
            fetchPolicy: 'network-only',
            variables: {
            }});

        if (loading) {
            return <p>Loading ...</p>
        }

        return (
            
            <div className="App">
              
              {data.MpBetterWishlistGetCategories && data.MpBetterWishlistGetCategories.map((e) => {
                if(e.items.length > 0) {

                return (
                    <>
                    {/* <span className={classes.add_btn}>Project name: {e.category_name}</span> */}
                    <div className='row'>
                       
                    {e.items.map((s) => {

                        if(e.category_id == wId) {

                        

                        return (
                            
                            <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                <div>
                                <ServiceDetailsEmployeurs pid={s.product_id}/>
                                <QuantityPicker min={1} value={s.qty} width='63%'/>
                                <button
                                    style={{"width":"100%"}}
                                    onClick={() => {
                                        handleAddToCart(
                                            s.product_id
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
                                    <p>&nbsp;</p>
                                </button>
                                </div>
                            </div>
                            
                            
                        );

                    }
                        
                    })}
                    
                  </div>
                  </>
                );
                }
              })}
            </div>
          );
      };

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
                                            
                                            <BWL />
                                            
                                            
                                            
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            defaultClasses.block_dashboard_orders +
                                            ' ' +
                                            wishlistClasses.block_dahsboard_wishlist
                                        }
                                    >
                                       
                                        
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
