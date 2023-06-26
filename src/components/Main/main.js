import React, { useEffect, useState } from 'react';
import { bool, shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Header from '../Header';
import defaultClasses from './main.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import Iframe from 'react-iframe'
import JotformEmbed from 'react-jotform-embed';

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

    function openLoginBox() {
        document.getElementById('user_account').click();
    }  

    const [{ isSignedIn }] = useUserContext();

    return (
        <main className={rootClass}>
            <Header />
            
            <div className={pageClass}>
            {(() => {
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
