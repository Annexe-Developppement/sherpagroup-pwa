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
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { gql } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client';

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
        children,
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

    const catId = data && data.category && data.category.id ? data.category.id : 0;

    console.log('minou'+catId);

    const [{ isSignedIn }] = useUserContext();

    // categoryList(filters: {ids: {in: ["56"]}}) {

    const GET_PAGE_SIZE = gql`
    query ($filter: CategoryFilterInput) {
        categoryList(filters: $filter) {
                children_count
                children {
                    id
                    level
                    name
                    path
                    url_path
                    url_key
                    image
                    description
                    manufacturer_link
                }
                }
          }
        `;
        
    
        
    const LinkList = () => {

        let categoryId = catId.toString();

        console.log('categoryId: '+categoryId);

        const { data, loading } = useQuery(GET_PAGE_SIZE, {
            variables: {
                filter: {
                ids: {
                  in: categoryId,
                },
            },
            }});

        if (loading) {
            return <p>Loading tree</p>
        }

        return (
            <div className="App">
              {data.categoryList && data.categoryList.map((e) => {
                return (
                    <div className='row'>
                    {e.children.map((s) => {
                      return (
                        
                          <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                            <div className={classes.boxcategory}>
                                <p>{s.name}</p>
                                {categoryId==42 ? (
                                    <div className={classes.containerImgBox}><a href={"/"+s.url_path}><img className={classes.imgBox} src={s.image}/></a></div>
                                ) : (
                                    <></>
                                )}
                                <div className={classes.boxlink}><a href={"/"+s.url_path}>View products list</a></div>
                                {categoryId==42 && s.manufacturer_link && isSignedIn ? (
                                   <div className={classes.boxlink}><a target="_blank" href={s.manufacturer_link}>Brand website</a></div>
                                ) : (
                                    <></>
                                )}
                                {categoryId==42 && s.description && isSignedIn ? (
                                   <div className={classes.boxlink}><a target="_blank" href={"https://assets.sherpagroupav.com/pdf/"+s.description}>Download specs sheet</a></div>
                                ) : (
                                    <></>
                                )}
                            </div>
                          </div>
                         
                        
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );

        return (
          <div>
            El 
            {/* {dataArray && (
              <>
                 <p>DDD</p>
                {dataArray.children.map((link) => (
                  <p>{link.id}</p>

                  
                ))}
              </>
                )} */}
          </div>
        );
      };
    
    return (
        
        <Fragment>
            <div className={'container'}>
                <Breadcrumbs categoryId={categoryId} />
                <StoreTitle>{categoryName}</StoreTitle>
                <article className={classes.root}>

                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                            <h1 className={classes.title}>
                                <div className={classes.categoryTitle}>
                                    {categoryTitle}
                                </div>
                                <div className={classes.categoryInfo}>
                                    ({categoryResultsHeading})
                                </div>
                            </h1>
                            {isSignedIn && categoryDescription != null ?
                                <p>
                                    <a
                                        className={classes.specsheet}
                                        href={`https://assets.sherpagroupav.com/pdf/${categoryDescription}`}
                                        target="_blank"
                                    >Download specs sheet</a>
                                </p>
                            : ''}
                            
                            
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 text-right'>
                            {banner}
                        </div>
                    </div>
                    <LinkList />
                    
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
