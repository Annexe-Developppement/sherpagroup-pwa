import React, { useEffect, useState } from 'react';
import { bool, shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Header from '../Header';
import defaultClasses from './main.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import Iframe from 'react-iframe'
import JotformEmbed from 'react-jotform-embed';
import $ from 'jquery';

const MobileLinks = React.lazy(() => import('./mobileLinks'));
const Footer = React.lazy(() => import('../Footer'));
const PushNotification = React.lazy(() => import('./pushNotification'));

const Main = props => {
    const [scrollFlag, setScrollFlag] = useState(false);

    const handleClick = () => {
        if (!scrollFlag) setScrollFlag(true);
    };

    useEffect(() => {
        document.addEventListener('scroll', handleClick);
        return () => {
            document.removeEventListener('scroll', handleClick);
        };
    });
    const { children, isMasked, mobileView } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;
    const token = localStorage.getItem('notification-token');

    if (window.location.href.indexOf("/events") != -1) {
        window.eventCalId=13099;
        var integrationScript = document.createElement("script");
        integrationScript.async = 1;
        integrationScript.setAttribute("src", "https://api.eventcalendarapp.com/integration-script.js");
        document.head.appendChild(integrationScript);
    }

    var displayLogin = false;
    var displayRegister = false;
    var displayTeam = false;

    if(window.location.href.indexOf("/myprojects") != -1) {
        window.location.replace("/wishlist");
    }

    if(window.location.href.indexOf("/education-landing") != -1) {
        displayLogin = true;
    }

    if(window.location.href.indexOf("/events") != -1) {
        displayLogin = true;
    }

    if(window.location.href.indexOf("/sherpa-webinar-archive") != -1) {
        displayLogin = true;
    }

    if(window.location.href.indexOf("/brand-youtube-links") != -1) {
        displayLogin = true;
    }

    if(window.location.href.indexOf("/new-user-account") != -1) {
        displayRegister = true;
    }

    if(window.location.href.indexOf("/sherpa-our-team") != -1) {
        displayTeam = true;
    }

    function openLoginBox() {
        document.getElementById('user_account').click();
    }  

    const [{ isSignedIn }] = useUserContext();

    return (
        <main className={rootClass}>
            <Header />
            <p>All</p>
            <div className={pageClass}>
            {(() => {

              if(displayTeam){
                $("button").click(function(){
                    alert("Henlo");
                });
                
    
        jQuery(document).ready(
            setTimeout(function () {
                var options = {
                    type: "slide",
                    buttons: [
                        {
                            text: "",
                            class: "",
                            click: function () {
                                this.closeModal();
                            },
                        },
                    ],
                };
                /*if ($("#modal-team-member-1").length) {
                    var slide_1 = modal(options, $("#modal-team-member-1"));
                }
                if ($("#modal-team-member-2").length) {
                    var slide_2 = modal(options, $("#modal-team-member-2"));
                }
                if ($("#modal-team-member-3").length) {
                    var slide_3 = modal(options, $("#modal-team-member-3"));
                }
                if ($("#modal-team-member-4").length) {
                    var slide_4 = modal(options, $("#modal-team-member-4"));
                }
                if ($("#modal-team-member-5").length) {
                    var slide_5 = modal(options, $("#modal-team-member-5"));
                }
                if ($("#modal-team-member-6").length) {
                    var slide_6 = modal(options, $("#modal-team-member-6"));
                }
                if ($("#modal-team-member-7").length) {
                    var slide_7 = modal(options, $("#modal-team-member-7"));
                }
                if ($("#modal-team-member-8").length) {
                    var slide_8 = modal(options, $("#modal-team-member-8"));
                }
                if ($("#modal-team-member-9").length) {
                    var slide_9 = modal(options, $("#modal-team-member-9"));
                }
                if ($("#modal-team-member-10").length) {
                    var slide_10 = modal(options, $("#modal-team-member-10"));
                }
                if ($("#modal-team-member-11").length) {
                    var slide_11 = modal(options, $("#modal-team-member-11"));
                }
                if ($("#modal-team-member-12").length) {
                    var slide_12 = modal(options, $("#modal-team-member-12"));
                }
                if ($("#modal-team-member-13").length) {
                    var slide_13 = modal(options, $("#modal-team-member-13"));
                }
                if ($("#modal-team-member-14").length) {
                    var slide_14 = modal(options, $("#modal-team-member-14"));
                }
                if ($("#modal-team-member-15").length) {
                    var slide_15 = modal(options, $("#modal-team-member-15"));
                }
                if ($("#modal-team-member-16").length) {
                    var slide_16 = modal(options, $("#modal-team-member-16"));
                }
                if ($("#modal-team-member-17").length) {
                    var slide_17 = modal(options, $("#modal-team-member-17"));
                }
                if ($("#modal-team-member-18").length) {
                    var slide_18 = modal(options, $("#modal-team-member-18"));
                }
                if ($("#modal-team-member-19").length) {
                    var slide_19 = modal(options, $("#modal-team-member-19"));
                }
                if ($("#modal-team-member-20").length) {
                    var slide_20 = modal(options, $("#modal-team-member-20"));
                }
                if ($("#modal-team-member-21").length) {
                    var slide_21 = modal(options, $("#modal-team-member-21"));
                }
                if ($("#modal-team-member-22").length) {
                    var slide_22 = modal(options, $("#modal-team-member-22"));
                }
                if ($("#modal-team-member-23").length) {
                    var slide_23 = modal(options, $("#modal-team-member-23"));
                }
                if ($("#modal-team-member-24").length) {
                    var slide_24 = modal(options, $("#modal-team-member-24"));
                }
                if ($("#modal-team-member-25").length) {
                    var slide_25 = modal(options, $("#modal-team-member-25"));
                } */
                $("#team-member-1").click(function () {
                    //$("#modal-team-member-1").modal("openModal");
                    $("#modal-team-member-1").show();
                });
                $("#team-member-2").click(function () {
                    $("#modal-team-member-2").modal("openModal");
                });
                $("#team-member-3").click(function () {
                    $("#modal-team-member-3").modal("openModal");
                });
                $("#team-member-4").click(function () {
                    $("#modal-team-member-4").modal("openModal");
                });
                $("#team-member-5").click(function () {
                    $("#modal-team-member-5").modal("openModal");
                });
                $("#team-member-6").click(function () {
                    $("#modal-team-member-6").modal("openModal");
                });
                $("#team-member-7").click(function () {
                    $("#modal-team-member-7").modal("openModal");
                });
                $("#team-member-8").click(function () {
                    $("#modal-team-member-8").modal("openModal");
                });
                $("#team-member-9").click(function () {
                    $("#modal-team-member-9").modal("openModal");
                });
                $("#team-member-10").click(function () {
                    $("#modal-team-member-10").modal("openModal");
                });
                $("#team-member-11").click(function () {
                    $("#modal-team-member-11").modal("openModal");
                });
                $("#team-member-12").click(function () {
                    $("#modal-team-member-12").modal("openModal");
                });
                $("#team-member-13").click(function () {
                    $("#modal-team-member-13").modal("openModal");
                });
                $("#team-member-14").click(function () {
                    $("#modal-team-member-14").modal("openModal");
                });
                $("#team-member-15").click(function () {
                    $("#modal-team-member-15").modal("openModal");
                });
                $("#team-member-16").click(function () {
                    $("#modal-team-member-16").modal("openModal");
                });
                $("#team-member-17").click(function () {
                    $("#modal-team-member-17").modal("openModal");
                });
                $("#team-member-18").click(function () {
                    $("#modal-team-member-17").modal("openModal");
                });
                $("#team-member-19").click(function () {
                    $("#modal-team-member-18").modal("openModal");
                });
                $("#team-member-20").click(function () {
                    $("#modal-team-member-20").modal("openModal");
                });
                $("#team-member-21").click(function () {
                    $("#modal-team-member-21").modal("openModal");
                });
                $("#team-member-22").click(function () {
                    $("#modal-team-member-22").modal("openModal");
                });
                $("#team-member-23").click(function () {
                    $("#modal-team-member-23").modal("openModal");
                });
                $("#team-member-24").click(function () {
                    $("#modal-team-member-24").modal("openModal");
                });
                $("#team-member-25").click(function () {
                    $("#modal-team-member-25").modal("openModal");
                });
            }, 5)
        );
   


              }

              if (!isSignedIn && displayLogin){
                  return (
                    <div>
                    <br/><br/><br/>
                    <a style={{cursor:'pointer'}} onClick={openLoginBox}>Login or Register for an Account to view this page</a>
                    </div>
                  )
              } else if (!isSignedIn && displayRegister) {
                return(
                    <JotformEmbed src="https://form.jotform.com/230886199517066" />
                )

              } else {
                return(children)
              }
              
              return null;
            })()}    
            
            {window.location.href.indexOf("/events") != -1 ?
                 <div class="eca-app-container" data-widgetuuid="cbe1fe53-0fc4-4ece-9b1b-2f04e8372406"></div>
            : ''}
            
                
                {/* bottom_toolbar */}
                {mobileView && (
                    <React.Suspense fallback={null}>
                        <MobileLinks />
                    </React.Suspense>
                )}
            </div>
            {scrollFlag && (
                <React.Suspense fallback={null}>
                    <Footer />
                </React.Suspense>
            )}
            {!token && scrollFlag && (
                <React.Suspense fallback={null}>
                    <PushNotification />
                </React.Suspense>
            )}
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
