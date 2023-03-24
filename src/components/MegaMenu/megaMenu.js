import React from 'react';
import { useNavigation } from '../../peregrine/lib/talons/MegaMenu/useMegaMenu';
import { useMobile } from '../../peregrine/lib/talons/Mobile/useMobile';
import { Link, resourceUrl } from 'src/drivers';
import defaultClasses from './megaMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useUserContext } from '@magento/peregrine/lib/context/user';
    
function hideNav() {
   //document.getElementById("id-main").style.opacity = "0";
}

const MegaMenu = () => {
    const talonsProps = useNavigation();
    const { mobileView } = useMobile();
    const navItems = [];
    const [{ isSignedIn }] = useUserContext();
    const { navdetails } = talonsProps;
    if (typeof navdetails != 'undefined' && navdetails && !mobileView) {
        const elements = JSON.parse(navdetails).categories;

        if (elements) {

            console.log('Elements');
            console.log(elements);

            navItems.push(
               <>
                <li
                    
                    className={
                        defaultClasses.item +
                        ' ' +
                        defaultClasses.haschild
                    }
                >
                    <a href="/about">About us</a>
                </li>
                <li
                    
                    className={
                        defaultClasses.item +
                        ' ' +
                        defaultClasses.haschild
                    }
                >
                    <a href="/team">Our team</a>
                </li>
                </>
            );

            

            $.each(elements, function(i, v) {

                

                if (v['main_category_id']) {
                    let haschild = '';
                    if (
                        typeof v['sub_cats'] != 'undefined' &&
                        v['sub_cats'].length
                    ) {
                        haschild = defaultClasses.has_child;
                    } else {
                        haschild = '';
                    }
                    navItems.push(
                        <li
                            key={i}
                            className={
                                defaultClasses.item +
                                ' ' +
                                defaultClasses.haschild
                            }
                        > 
                            <Link
                                to={resourceUrl('/' + v['main_category_url'])}
                            >
                                {v['main_category_name']}
                                {haschild && (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </Link>
                            <ul
                                id='id-main'
                                key={i + 'mainul'}
                                className={
                                    defaultClasses.sub_menu +
                                    ' ' +
                                    defaultClasses.lavel_1
                                }
                            >
                                {typeof v['sub_cats'] != 'undefined' &&
                                    v['sub_cats'].sort(function(a, b) {
                                        if(a.sub_category_name.toLowerCase() < b.sub_category_name.toLowerCase()) return -1;
                                        if(a.sub_category_name.toLowerCase() > b.sub_category_name.toLowerCase()) return 1;
                                        return 0;
                                       }).map((v1, i1) => {
                                        let showsubchild = true;
                                        let hasSubchild =
                                            defaultClasses.has_child;
                                        if (v1['sub_cats'].length) {
                                            showsubchild = false;
                                            hasSubchild =
                                                defaultClasses.has_child;
                                        } else {
                                            hasSubchild =
                                                defaultClasses.no_child;
                                            showsubchild = false;
                                        }
                                        return (
                                            <li
                                                onClick={hideNav()}
                                                key={i1 + 'sub'}
                                                className={hasSubchild}
                                            >
                                                <Link
                                                    onClick={() => {window.location.href="/"+v1['sub_category_url']}}
                                                    to={resourceUrl(
                                                        '/' + v1['sub_category_url']
                                                    )}
                                                >
                                                    {v1['sub_category_name']}
                                                    {showsubchild && (
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                        />
                                                    )}
                                                </Link>
                                                {showsubchild && (
                                                    <ul
                                                        className={
                                                            defaultClasses.sub_menu +
                                                            ' ' +
                                                            defaultClasses.lavel_2
                                                        }
                                                    >
                                                        {v1['sub_cats'].map(
                                                            (v2, i2) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            i2 +
                                                                            'supersub'
                                                                        }
                                                                    >
                                                                        <Link
                                                                            
                                                                            to={resourceUrl(
                                                                                '/' +
                                                                                    v2[
                                                                                        'category_url'
                                                                                    ]
                                                                            )}
                                                                        >
                                                                            {
                                                                                v2[
                                                                                    'category_name'
                                                                                ]
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    })}
                            </ul>
                        </li>
                    );
                }
            });

            if(isSignedIn) {

            navItems.push(
                <li
                    
                    className={
                        defaultClasses.item +
                        ' ' +
                        defaultClasses.haschild
                    }
                >
                    <a href="/promotions">Promotions</a>
                </li>
            );

            {/*navItems.push(
                <li
                    
                    className={
                        defaultClasses.item +
                        ' ' +
                        defaultClasses.haschild
                    }
                >
                    <a href="/brands">Price lists</a>
                </li>
            ); */}

            navItems.push(
                <li
                    
                    className={
                        defaultClasses.item +
                        ' ' +
                        defaultClasses.haschild
                    }
                >
                    <a href="/brands/clearance">Clearance</a>
                </li>
            );

            navItems.push(
                <li
                    
                    className={
                        defaultClasses.item +
                        ' ' +
                        defaultClasses.haschild
                    }
                >
                    <a href="/education">Education</a>
                </li>
            );

            } else {

                navItems.push(
                    <li
                        
                        className={
                            defaultClasses.item +
                            ' ' +
                            defaultClasses.haschild
                        }
                    >
                        <a href="/promotions">Promotions</a>
                    </li>
                );

                navItems.push(
                    <li
                        
                        className={
                            defaultClasses.item +
                            ' ' +
                            defaultClasses.haschild
                        }
                    >
                        <a href="/education">Education</a>
                    </li>
                );

            }


        }
    }
    return (
        <>
            {!mobileView && (
                <div className={defaultClasses.main_navigation}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <ul className={defaultClasses.ced_megamenu}>
                                    {navItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MegaMenu;
