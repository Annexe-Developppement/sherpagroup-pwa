import React, { useState } from 'react';
import { bool, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useSearchBar } from 'src/peregrine/lib/talons/SearchBar';
import { FormattedMessage } from 'react-intl';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Autocomplete from './autocomplete';
import SearchField from './searchField';
import defaultClasses from './searchBar.css';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { X as ClearIcon } from 'react-feather';

// Import Algolia & Autocomplete Packages 
import { autocomplete, getAlgoliaResults, getAlgoliaFacets } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import algoliasearch from 'algoliasearch';
import { h, Fragment } from 'preact';

// Import the Autocomplete Classic Theme
import '@algolia/autocomplete-theme-classic';

// Instantiate the Algolia search client
const appId = 'latency';
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
const searchClient = algoliasearch(appId, apiKey);

// Create the Query Suggestions plugin 
const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'magento2_prod_default_products',
  getSearchParams({ state }) {
    return { hitsPerPage: state.query ? 3 : 10 };
  },
});

autocomplete({
  container: '#autocomplete', //Define where your search box goes in the DOM
  placeholder: 'Search for products', //Define placeholder text
  openOnFocus: true, //If true, dropdown appears as soon as users focuses the input to display trending searches 
// debug: true, //If true, keeps the panel open when inspecting elements in your browser DevTools
  plugins: [querySuggestionsPlugin], //Add the Query Suggestions plugin
  getSources({ query, state }) { 
    if (!query) {
      return [];
    }

    return [
      {
        sourceId: 'products',        
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'magento2_prod_default_products',
                query,
                params: {            
                  hitsPerPage: 3,                        
                  attributesToSnippet: ['name:10'],
                  snippetEllipsisText: '…',
                },
              },
            ],
          });
        },
        templates: {
          header() {
            return (
              <Fragment>
                <span className="aa-SourceHeaderTitle">Products</span>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            return (
                <ProductItem
                    hit={item}
                    components={components}
              />
            );
          },
          noResults() {
            return 'No products for this query.';
          },
        },
      },
      {
        sourceId: 'productsCategories',
        getItems({ query }) {
          return getAlgoliaFacets({
            searchClient,
            queries: [
              {
                indexName: 'magento2_prod_default_products',
                facet: 'hierarchicalCategories.lvl1',
                params: {
                  facetQuery: query, 
                  maxFacetHits: 2,
                },
              },
            ],
          });
        },
        templates: {
            header() {
                return (
                    <Fragment>
                    <span className="aa-SourceHeaderTitle">Products Categories</span>
                    <div className="aa-SourceHeaderLine" />
                    </Fragment>
                );
            },
            item({ item }) {
                return (
                    <div>{item.label}</div>
                );
            }                
        },
      }
    ];
  }
});

// Add template for Product items
function ProductItem({ hit, components }) {
    return (
      <a href={hit.url} className="aa-ItemLink">
        <div className="aa-ItemContent">
          <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
            <img src={hit.image} alt={hit.name} width="40" height="40" />
          </div>
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Snippet hit={hit} attribute="name" />
            </div>
            <div className="aa-ItemContentDescription">
              From <strong>{hit.brand}</strong> in{' '}
              <strong>{hit.categories[0]}</strong>
            </div>
            {hit.rating > 0 && (
              <div className="aa-ItemContentDescription">
                <div style={{ display: 'flex', gap: 1, color: '#ffc107' }}>
                  {Array.from({ length: 5 }, (_value, index) => {
                    const isFilled = hit.rating >= index + 1;
  
                    return (
                      <svg
                        key={index}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={isFilled ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="aa-ItemContentDescription" style={{ color: '#000' }}>
              <strong>${hit.price.toLocaleString()}</strong>
            </div>
          </div>
        </div>
        <div className="aa-ItemActions">
          <button
            className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
            type="button"
            title="Select"
            style={{ pointerEvents: 'none' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
            </svg>
          </button>
          <button
            className="aa-ItemActionButton"
            type="button"
            title="Add to cart"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 5h-14l1.5-2h11zM21.794 5.392l-2.994-3.992c-0.196-0.261-0.494-0.399-0.8-0.4h-12c-0.326 0-0.616 0.156-0.8 0.4l-2.994 3.992c-0.043 0.056-0.081 0.117-0.111 0.182-0.065 0.137-0.096 0.283-0.095 0.426v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.219-0.071-0.422-0.189-0.585-0.004-0.005-0.007-0.010-0.011-0.015zM4 7h16v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM15 10c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121c0-0.552-0.448-1-1-1s-1 0.448-1 1c0 1.38 0.561 2.632 1.464 3.536s2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536c0-0.552-0.448-1-1-1s-1 0.448-1 1z" />
            </svg>
          </button>
        </div>
      </a>
    );
}

const clearIcon = <Icon src={ClearIcon} size={24} />;

function Iframe(props) {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}

const iframe = '<iframe height="265" style="width: 100%;" scrolling="no" title="fx." src="//codepen.io/ycw/embed/JqwbQw/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen <a href="https://codepen.io/ycw/pen/JqwbQw/">fx.</a> by ycw(<a href="https://codepen.io/ycw">@ycw</a>) on <a href="https://codepen.io">CodePen</a>.</iframe>';

const SearchBar = props => {
    const { isOpen, handleSearchTriggerClick } = props;
    const [triggerSearch, setTriggerSearch] = useState(false);
    const talonProps = useSearchBar();
    const {
        containerRef,
        expanded,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        setExpanded,
        valid
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <div className={rootClassName}>
            <div
                ref={containerRef}
                className={classes.container + ' ' + 'container'}
            >
                <div className={classes.search_header}>
                    <h3 className={classes.heading}>
                        <FormattedMessage
                            id="SearchBar.heading"
                            defaultMessage="What are you looking for ?"
                        />
                    </h3>
                    <button
                        id="close-button"
                        className={classes.close}
                        onClick={handleSearchTriggerClick}
                    >
                        {clearIcon}
                    </button>
                </div>

                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.autocomplete}>
                        <Autocomplete
                            setTriggerSearch={setTriggerSearch}
                            handleSearchTriggerClick={handleSearchTriggerClick}
                            setVisible={setExpanded}
                            valid={valid}
                            visible={expanded}
                        />
                    </div>
                    <div className={classes.search}>
                        <SearchField
                            closeSearch={e =>
                                handleSubmit({ search_query: e.target.value })
                            }
                            triggerSearch={triggerSearch}
                            handleSearchTriggerClick={handleSearchTriggerClick}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            setTriggerSearch={setTriggerSearch}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
