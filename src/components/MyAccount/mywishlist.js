import React, { Suspense, useState, useEffect, Component } from 'react';
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
import { ChevronDown as ArrowDown, X as ArrowUp } from 'react-feather';
import Icon from '../Icon';

const Banner = React.lazy(() => import('../CedHome/banner'));
const categoryBannerIdentifierHome = 'projects_instructions';
let showCategoryBanners = true;

class ProjectName extends Component{
    constructor () {
        super()
        this.state = {
            pageData: []
        }
    }

    componentDidMount() {
        let cid = this.props.cid;
        let dataURL = "https://sherpagroupav.com/get_projectname.php?cid="+cid;
        fetch(dataURL)
          .then(res => res.json())
          .then(res => {
            this.setState({
                pageData: res
            })
          });        
    }

    render(){

        let projectname = this.state.pageData.pname && this.state.pageData.pname;
        return(
            <React.Fragment>
                - <span id='widn'>{projectname}</span>
            </React.Fragment>
        )
    }
}

const titleIcon = <Icon src={ArrowUp} size={24} />;

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

    const queryParameters = new URLSearchParams(window.location.search)

    const wId = queryParameters.get("id");

    console.log('WID '+wId);
  
    const remove = async id => {
        await handleRemoveItem({ product_id: id });
        setRemoveMsg(true);
    };

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
            window.location.reload(false);
            //refetch();
        }
    }, [addToast, removeMsg, removeResponse, refetch]);

    const TOGGLE_LIKED_PHOTO = gql`
            mutation($category_name: String!) {
                MpBetterWishlistCreateCategory(input: { category_name: $category_name }) {
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
    
    
            function AddTodo(uid) {
    
                let input;
    
                let selectId = uid;
    
                const [addTodo, { data, loading, error }] = useMutation(TOGGLE_LIKED_PHOTO);
                const [selectValue, setSelectValue] = React.useState("");
                if (data) { 

                    
    
                    
    
                }
                if (loading) return 'Submitting...';
                if (error) return `Submission error! ${error.message}`;
        
                return (
                  <div>
                    
                        <input className={classes.input_rename} type='text' ref={node => {input = node;}} placeholder={'New project name'}/>
                        <input type='hidden' value={selectId} />
                        <button className={classes.rename_project} onClick={e => {
                        e.preventDefault();
                        addTodo({ variables: { category_name: input.value } });
                        input.value = '';
                        
                        window.alert('New project created.');
                        setSelectValue(999);
                        window.location.reload();
                        
                      }}>Create new project</button> 
             
                    
                  </div>
                );
              }

    const REMOVE_PROJECT = gql`
    mutation($category_id: String!) {
        MpBetterWishlistDeleteCategory(input: { category_id: $category_id })
    }
    `;

    function DeleteProject({cid}) {

        const [removeProject, { data, loading, error }] = useMutation(REMOVE_PROJECT);
      
        if (loading) return (<button type="" className={classes.add_to_project}>DELETING PROJECT</button>);
        if (error) return `Submission error! ${error.message}`;

        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                removeProject({ variables: { category_id: cid} });
                window.alert('Project deleted.');
                window.location.href="/wishlist";
              }}
            > 
            <button type="submit" className={classes.add_to_project}> Delete project</button>
            </form>
          </div>
          
        );
      }

      function ArchiveProject({cid}) {

        const [archiveeProject, { data, loading, error }] = useMutation(RENAME_PROJECT);
      
        if (loading) return (<button type="" className={classes.add_to_project}>ARCHIVING PROJECT</button>);
        if (error) return `Archive error! ${error.message}`;

        function returnVal() {
            var e = document.getElementById("widn");
            var value = e.innerHTML;
            return value;
        }
        
        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                console.log('PIN '+returnVal());
                archiveeProject({ variables: { category_name: "ARCHIVE - "+returnVal() , category_id: wId} });
                window.alert('Project archived.');
                window.location.href="/wishlist";
              }}
            > 
            <button type="submit" className={classes.add_to_project}> Archive project</button>
            </form>
          </div>
          
        );
      }

      function MoveProjectToCart({cid}) {

        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                var items = document.querySelectorAll('.activeProject .active_item'+wId);
                for (var i = 0; i < items.length; i++) {
                    items[i].click(); 
                }
                
                window.alert('Project added to cart.');
              }}
            > 
            <button type="submit" className={classes.add_to_project}> Move Project to Cart</button>
            </form>
          </div>
          
        );
      }

      const RENAME_PROJECT = gql`
      mutation($category_id: String!, $category_name: String!) {
        MpBetterWishlistEditCategory(
              input: { category_id: $category_id, category_name: $category_name }
          )
          {
            category_id
            category_name
            is_default
        }
      }
      `;

      function RenameProject({cid}) {

          const [addTodo, { data, loading, error }] = useMutation(RENAME_PROJECT);
      
          if (loading) return (<button type="" className={classes.add_to_project}>RENAMING PROJECT</button>);
          if (error) return `Submission error! ${error.message}`;

          function returnVal(sid) {
              var e = document.getElementById("wid"+sid);
              var value = e.value;
              return value;
          }
          
          return (
          <div>
              <form
              onSubmit={e => {
                  e.preventDefault();
                  addTodo({ variables: { category_name: returnVal(wId) , category_id: wId} });
                  window.alert('Project renamed.');
                  window.location.reload(false);
                  
              }}
              > 
              <input type='text' id={"wid"+wId} className={classes.input_rename} placeholder={'New name'}/>
              <button type="submit" className={classes.rename_project}>Rename project</button>
              </form>
          </div>
          
          );
      }


    if (!isSignedIn) {
        return <Redirect to="/" />;
    }
    if (!loading) {
        return (
            <div className={defaultClasses.columns}>
                <Title>{`My Projects`}</Title>
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
                                                        'Project'
                                                    }
                                                /> <ProjectName cid={wId} />
                                            </span>
                                            
                                        </h1>
                                    </div>
                                    {wId !== undefined && wId !== null && (
                                        <>
                                        <MoveProjectToCart/>
                                        </>
                                    )}
                                    <div
                                        className={
                                            defaultClasses.block_dashboard_orders +
                                            ' ' +
                                            wishlistClasses.block_dahsboard_wishlist
                                        }
                                    >
                                        {typeof data != 'undefined' && (
                                            <>
                                            
                                            <div
                                                className={
                                                    classes.products_wrapper
                                                }
                                            >
                                               
                                                {data.map((val, index) => {

                                                    var currentProduct = val.product;

                                                    function belongToProject(pid,cid) {

                                                        let dataURL = "https://sherpagroupav.com/get_belongs.php?pid="+pid+"&cid="+cid;
                                                        fetch(dataURL)
                                                        .then(res => res.json())
                                                        .then(res => {
                                                            if(res.display==1) {
                                                                document.getElementById("t"+pid).style.display="block";
                                                                var element = document.getElementById("t"+pid);
                                                                element.classList.add("activeProject");
                                                            } else {
                                                                
                                                            }
                                                        });    

                                                        return 1;

                                                    }

                                                    if(belongToProject(val.product.id,wId)) {

                                                        return (
                                                            <>
                                                           
                                                            <div
                                                                key={index}
                                                                className={
                                                                    classes.product_tiles
                                                                }
                                                                id={"t"+val.product.id}
                                                            >
                                                                
                                                                <div
                                                                    className={
                                                                        classes.inner
                                                                    }
                                                                >
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
                                                                    </div>
    
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
                                                                                    .value.toFixed(2)
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
                                                                                quantity
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
                                                                    <div
                                                                        className={
                                                                            classes.actions_wrapper
                                                                        }
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
                                                                                    className={'active_item'+wId}
                                                                                    onClick={() => {
                                                                                        handleAddToCart(
                                                                                            val.product
                                                                                        );
                                                                                       
                                                                                        //window.alert("Product moved to cart.");
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
                                                                                            'Move to cart'
                                                                                        }
                                                                                    />
                                                                                </Link>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                        );

                                                    } else {
                                                        return (<></>)
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
                                                                    'You have no items saved in wishlist.'
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            </>
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
                                                            'You have no items saved in wishlist.'
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        )}
                                       
                                       
                                       {wId == undefined && (
                                        <>
                                            <Suspense fallback={''}>
                                                <Banner
                                                    identifier={categoryBannerIdentifierHome}
                                                    showBanner={showCategoryBanners}
                                                />
                                            </Suspense>
                                            <AddTodo uid={wId}/>
                                        </>
                                        )}
                                        
                                    </div>
                                    {wId !== undefined && wId !== null && (
                                        <>
                                        <AddTodo uid={wId}/>
                                        <RenameProject cid={wId} />
                                        <ArchiveProject cid={wId} />
                                        <DeleteProject cid={wId} />
                                        
                                        </>
                                    )}
                                   
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
                <Title>{`My Projects - ${STORE_NAME}`}</Title>
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
                                                        'My Projects (loading)'
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
