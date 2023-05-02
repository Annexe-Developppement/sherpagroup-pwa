import React, { useState, createElement, Fragment, useEffect, useRef } from 'react';
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
import '@algolia/autocomplete-theme-classic';
import 'instantsearch.css/themes/satellite.css';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

//import algoliasearch from 'algoliasearch/lite';
//import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

/*const searchClient = algoliasearch(
  'EQYYQ1VIVL',
  'f5171cf0ca4526d103a14ad056e5cef1'
); */

import { autocomplete } from '@algolia/autocomplete-js';
import { render } from 'react-dom';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Breadcrumb, RefinementList } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('EQYYQ1VIVL', 'f5171cf0ca4526d103a14ad056e5cef1');

const autocompleteSearch = autocomplete({
    container: '#autocomplete',
    getSources() {
      return [
        {
          sourceId: 'querySuggestions',
          getItemInputValue: ({ item }) => item.query,
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'instant_search_demo_query_suggestions',
                  query,
                  params: {
                    hitsPerPage: 4,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components }) {
              return components.ReverseHighlight({ hit: item, attribute: 'query' });
            },
          },
        },
      ];
    },
  });

function Hit({ hit }) {
    console.log(hit);
    return (
      <article>
        <img src={hit.image_url} alt={hit.name} />
        <p>{hit.categories[0]}</p>
        <h1>{hit.name}</h1>
      </article>
    );
  }


const clearIcon = <Icon src={ClearIcon} size={24} />;

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
                <div id="autocomplete"></div>
                <InstantSearch searchClient={searchClient} indexName="magento2_prod_default_products">
                
                    <SearchBox />
                    <RefinementList attribute="categories" />
                    <Breadcrumb
                        attributes={[
                        'categories.lvl0',
                        'categories.lvl1',
                        'categories.lvl2'
                        ]}
                    />
                    <Hits hitComponent={Hit} />
                </InstantSearch>
                
                {/*<InstantSearch searchClient={searchClient} indexName="magento2_prod_default_products">
                    <SearchBox />
                    <Hits hitComponent={Hit} />
                </InstantSearch> */}
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
