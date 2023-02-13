import React, { Fragment, Suspense, useMemo, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { array, number, shape, string } from 'prop-types';
import { useCategoryContent } from '../../peregrine/lib/talons/RootComponents/Category';
import { useMobile } from '../../peregrine/lib/talons/Mobile/useMobile';
import { useStyle } from '../../classify';
import Breadcrumbs from '../../components/Breadcrumbs';
import FilterModalOpenButton, {
    FilterModalOpenButtonShimmer
} from '../../components/FilterModalOpenButton';
import { FilterSidebarShimmer } from '../../components/FilterSidebar';
import Gallery, { GalleryShimmer } from '../../components/Gallery';
import { StoreTitle } from '../../components/Head';
import Pagination from '../../components/Pagination';
import ProductSort, { ProductSortShimmer } from '../../components/ProductSort';
import RichContent from '../../components/RichContent';
import Shimmer from '../../components/Shimmer';
import defaultClasses from './category.css';
import NoProductsFound from './NoProductsFound';
import { useFeaturedProducts } from '../../peregrine/lib/talons/FeaturedProduct/useFeaturedProduct';
import FeaturedQuery from '../../queries/featuredProducts.graphql';
import { useDashboard } from '../../peregrine/lib/talons/MyAccount/useDashboard';
import axios from "axios";

/*axios.get(`https://gatsby-wp-demo.pixel-united.com/en/wp-json/wp/v2/pages/30`)
    .then(response => {
        
        console.log(response.data);
    }) */
/*
    constructor () {
        super()
        this.state = {
            pageData: {}
        }
        this.openModal = this.openModal.bind(this)
    }

    componentDidMount() { 

        axios.get(`https://gatsby-wp-demo.pixel-united.com/en/wp-json/wp/v2/pages/30`)
            .then(response => {
                const pageData = response.data;
                console.log(response.data);
                this.setState({ pageData });
            })


        }   */

/*        
const url = 'https://sherpagroupav.com/rest/default/V1/categories/42'
const [result, setResult] = useState(null)

const config = {
    headers:{
        'authorization': 'Bearer 6afmh44jvrkc1pg19j4x0s2pb6ejmhpe'
    }
  };

useEffect(() => {
    axios.get(url,config)
    .then((response)=>{
    setResult(response.data)
    // axios returns API response body in .data
    })
}, []) */

/*const pageData = [];
const url = 'https://sherpagroupav.com/rest/default/V1/categories/42'
const [results, setResults] = useState(null)

const config = {
    headers:{
        'authorization': 'Bearer 6afmh44jvrkc1pg19j4x0s2pb6ejmhpe'
    }
  };*/

/*const getAPIresults = async () => {
    await axios.get(url,config)
        .then((response)=>{
            console.log(response);
            setResults(response);
          })
          .catch((error)=>{
            console.log(error)
          })    
}*/
/*
axios({
    method: 'get',
    url: 'https://sherpagroupav.com/rest/default/V1/categories/42',
    responseType: 'text/json',
    timeout: 1000,
    headers: {'authorization': 'Bearer 6afmh44jvrkc1pg19j4x0s2pb6ejmhpe'}
    })
    .then(function (response) {
       
        console.log('Result: '+(response.data));
        
    })
    .catch(function(err) {
        console.log('Erreur: '+err.message);
    })
    .finally(
        function() {
            console.log('finally');
        }
    ) */

//const pageData = data && data.category && data.category.id ? data.category.id : 0;

const FilterModal = React.lazy(() => import('../../components/FilterModal'));
const FilterSidebar = React.lazy(() =>
    import('../../components/FilterSidebar')
);
const SliderProduct = React.lazy(() => import('./sliderProduct'));

const CategoryContent = props => {
    const { mobileView } = useMobile();
    const {
        categoryId,
        data,
        isLoading,
        pageControl,
        sortProps,
        pageSize
    } = props;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        pageSize
    });

    const {
        categoryName,
        categoryDescription,
        filters,
        items,
        totalCount,
        totalPagesFromData
    } = talonProps;

    const featuredProps = useFeaturedProducts({
        query: FeaturedQuery,
        category_id: categoryId
    });

    const { featuredProduct, loading } = featuredProps;

    const classes = useStyle(defaultClasses, props.classes);

    const shouldShowFilterButtons = filters && filters.length;
    const shouldShowFilterShimmer = filters === null;

    // If there are no products we can hide the sort button.
    const shouldShowSortButtons = totalPagesFromData;
    const shouldShowSortShimmer = !totalPagesFromData && isLoading;

    const maybeFilterButtons = shouldShowFilterButtons ? (
        <FilterModalOpenButton filters={filters} />
    ) : shouldShowFilterShimmer ? (
        <FilterModalOpenButtonShimmer />
    ) : null;

    const filtersModal = shouldShowFilterButtons ? (
        <FilterModal filters={filters} />
    ) : null;

    const sidebar = shouldShowFilterButtons ? (
        <FilterSidebar filters={filters} />
    ) : shouldShowFilterShimmer ? (
        <FilterSidebarShimmer />
    ) : null;

    const maybeSortButton = shouldShowSortButtons ? (
        <ProductSort sortProps={sortProps} />
    ) : shouldShowSortShimmer ? (
        <ProductSortShimmer />
    ) : null;

    // const maybeSortContainer = shouldShowSortButtons ? (
    //     <SortedByContainer currentSort={currentSort} />
    // ) : shouldShowSortShimmer ? (
    //     <SortedByContainerShimmer />
    // ) : null;

    const categoryResultsHeading =
        totalCount > 0 ? (
            <FormattedMessage
                id={'categoryContent.resultCount'}
                values={{
                    count: totalCount
                }}
                defaultMessage={'{count} Results'}
            />
        ) : isLoading ? (
            <Shimmer width={5} />
        ) : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription} />
    ) : null;

    const content = useMemo(() => {
        if (!totalPagesFromData && !isLoading) {
            return <NoProductsFound categoryId={categoryId} />;
        }

        const gallery = totalPagesFromData ? (
            <Gallery items={items} />
        ) : (
            <GalleryShimmer items={items} />
        );
        console.log(totalPagesFromData);
        const pagination = totalPagesFromData ? (
            <Pagination pageControl={pageControl} />
        ) : null;

        return (
            <Fragment>
                {!loading && featuredProduct && (
                    <Suspense fallback={''}>
                        <SliderProduct
                            featuredData={featuredProduct}
                            classes={classes}
                        />
                    </Suspense>
                )}
                <section className={classes.gallery}>{gallery}</section>
                <div className={classes.pagination}>{pagination}</div>
            </Fragment>
        );
    }, [
        categoryId,
        classes,
        featuredProduct,
        isLoading,
        items,
        loading,
        pageControl,
        totalPagesFromData
    ]);

    const categoryTitle = categoryName ? categoryName : <Shimmer width={5} />;
    const banner =
        data && data.category && data.category.image ? (
            <img
                alt="categoryBanner"
                src={data.category.image}
                className={'img-fluid' + ' ' + classes.categoyrpage_banner}
            />
        ) : (
            ''
        );

    //const catId = data && data.category && data.category.id ? data.category.id : 0;

    const catId = 42;

    return (
        
        <Fragment>
            <div className={'container'}>
                <Breadcrumbs categoryId={categoryId} />
                <StoreTitle>{categoryName}</StoreTitle>
                <article className={classes.root}>
                    {banner}

                    <div className={classes.categoryHeader}>
                        <h1 className={classes.title}>
                            <div className={classes.categoryTitle}>
                                {categoryTitle}
                            </div>
                            <div className={classes.categoryInfo}>
                                ({categoryResultsHeading})
                            </div>
                        </h1>
                        {categoryDescriptionElement}
                    </div>
                    
                    
                    <div className={classes.contentWrapper}>
                        {!mobileView && (
                            <div className={classes.sidebar}>
                                {maybeSortButton}
                                <Suspense fallback={<FilterSidebarShimmer />}>
                                    {sidebar}
                                </Suspense>
                            </div>
                        )}
                        <div className={classes.categoryContent}>
                            {!mobileView && (
                                <div>
                                    <div className={classes.headerButtons}>
                                        {maybeFilterButtons}
                                        {/* {maybeSortButton} */}
                                    </div>
                                    {/* {maybeSortContainer} */}
                                </div>
                            )}
                            {mobileView && (
                                <div className={classes.mobile_headerButtons}>
                                    <div
                                        className={
                                            classes.mobile_headerButtons_inner
                                        }
                                    >
                                        {maybeFilterButtons}
                                        <div
                                            className={classes.sort_btn_mobile}
                                        >
                                            {maybeSortButton}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {content}
                            <Suspense fallback={null}>{filtersModal}</Suspense>
                        </div>
                    </div>
                   
                </article>
            </div>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        gallery: string,
        pagination: string,
        root: string,
        categoryHeader: string,
        title: string,
        categoryTitle: string,
        sidebar: string,
        categoryContent: string,
        heading: string,
        categoryInfo: string,
        headerButtons: string
    }),
    // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array,
    pageSize: number
};
