import React, { useMemo, useCallback, useEffect } from 'react';
import { ChevronDown as ArrowDown } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { array, arrayOf, shape, string, oneOf } from 'prop-types';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';
import { useMobile } from '../../peregrine/lib/talons/Mobile/useMobile';
import { useStyle } from '../../classify';
import SortItem from './sortItem';
import defaultClasses from './productSort.css';
import Button from '../Button';
import Icon from '../Icon';

const ProductSort = props => {
    const { mobileView } = useMobile();
    const classes = useStyle(defaultClasses, props.classes);
    const { availableSortMethods, sortProps } = props;
    const [currentSort, setSort] = sortProps;
    const { elementRef, expanded, setExpanded } = useDropdown();

    

    useEffect(() => {
        // Update the document title using the browser API
        if(currentSort && currentSort.sortText=='Position') {
            document.getElementById('sortItem.sku').click();
            //document.getElementById('skusku').click();
            //currentSort.sortText=='Positionx';
            //preventDefault();
        }
      });

    // click event for menu items
    const handleItemClick = useCallback(
        sortAttribute => {
            setSort({
                sortText: sortAttribute.text,
                sortId: sortAttribute.id,
                sortAttribute: sortAttribute.attribute,
                sortDirection: sortAttribute.sortDirection
            });
            setExpanded(false);
        },
        [setExpanded, setSort]
    );

    const sortElements = useMemo(() => {
        // should be not render item in collapsed mode.
        if (!expanded) {
            //return null;
        }

        

        const itemElements = Array.from(availableSortMethods, sortItem => {
            const { attribute, sortDirection } = sortItem;
            const isActive =
                currentSort.sortAttribute === attribute &&
                currentSort.sortDirection === sortDirection;

            const key = `${attribute}--${sortDirection}`;

            

            return (
                <li key={key} className={classes.menuItem}>
                    <SortItem
                        sortItem={sortItem}
                        active={isActive}
                        onClick={handleItemClick}
                    />
                </li>
            );
        });

        return (
            <div className={classes.menu}>
                <ul>{itemElements}</ul>
            </div>
        );
    }, [
        availableSortMethods,
        classes.menu,
        classes.menuItem,
        currentSort.sortAttribute,
        currentSort.sortDirection,
        expanded,
        handleItemClick
    ]);

    // expand or collapse on click
    const handleSortClick = () => {
        setExpanded(!expanded);
    };

    

    return (
        <div
            ref={elementRef}
            className={classes.root}
            aria-live="polite"
            aria-busy="false"
        >
            <Button
                id="setSort"
                priority={'low'}
                classes={{
                    root_lowPriority: classes.sortButton
                }}
                onClick={handleSortClick}
            >
                {mobileView && (
                    <span>
                        <span
                            className={'mr-2' + ' ' + defaultClasses.filter_img}
                        >
                            <img
                                src="/cenia-static/images/sort.png"
                                width="15"
                                height="15"
                                alt="sort"
                            />
                        </span>
                        <span className={classes.mobileText}>
                            <FormattedMessage
                                id={'productSort.sortButton'}
                                defaultMessage={'Sort'}
                            />
                        </span>
                    </span>
                )}
                {!mobileView && (
                    <span
                        className={
                            classes.desktopText + ' ' + classes.root_inner
                        }
                    >
                        <span className={classes.sort_title}>
                            <FormattedMessage
                                id={'productSort.sortByButton'}
                                defaultMessage={'Sort by'}
                            />
                        </span>
                        {/*<span className={classes.sorted_result}>
                            {currentSort.sortText}
                        </span> */}

                        {/*<Icon
                            src={ArrowDown}
                            classes={{
                                root: classes.desktopIconWrapper,
                                icon: classes.desktopIcon
                            }}
                        /> */}
                    </span>
                )}
            </Button>
            {sortElements}
        </div>
    );
};

const sortDirections = oneOf(['ASC', 'DESC']);

ProductSort.propTypes = {
    classes: shape({
        menuItem: string,
        menu: string,
        root: string,
        sortButton: string
    }),
    availableSortMethods: arrayOf(
        shape({
            text: string,
            id: string,
            attribute: string,
            sortDirection: sortDirections
        })
    ),
    sortProps: array
};

ProductSort.defaultProps = {
    availableSortMethods: [
        {
            text: 'Part #: Ascending',
            id: 'sortItem.sku',
            attribute: 'sku',
            sortDirection: 'ASC'
        },
        {
            text: 'Part #: Descending',
            id: 'sortItem.sku2',
            attribute: 'sku',
            sortDirection: 'DESC'
        },
        {
            id: 'sortItem.priceAsc',
            text: 'Price: Low to High',
            attribute: 'price',
            sortDirection: 'ASC'
        },
        {
            id: 'sortItem.priceDesc',
            text: 'Price: High to Low',
            attribute: 'price',
            sortDirection: 'DESC'
        }
    ]
};

export default ProductSort;
