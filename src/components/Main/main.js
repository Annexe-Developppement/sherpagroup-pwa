import React, { useEffect, useState, Suspense } from 'react';
import { bool, shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Header from '../Header';
import defaultClasses from './main.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import Iframe from 'react-iframe'
import JotformEmbed from 'react-jotform-embed';
import $ from 'jquery';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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

    const Banner = React.lazy(() => import('/src/components/CedHome/banner'));
    const categoryBannerIdentifierHome = 'education_landing';
    let showCategoryBanners = true;

    var displayLogin = false;
    var displayRegister = false;
    var displayTeam = false;
    var displayEducation = false;

    if(window.location.href.indexOf("/myprojects") != -1) {
        window.location.replace("/wishlist");
    }

    if(window.location.href.indexOf("/education-landing") != -1) {
        
        displayEducation = true;
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
            <div className={pageClass}>
            
            {(() => {

              if(displayTeam){
                return (
                    <Popup
                        trigger={<button className="button"> Open Modal </button>}
                        modal
                        nested
                    >
                        {close => (
                        <div className="modal1">
                            
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                            <div className="content">
                            {' '}
                            <div id="modal-content-1" class="modal-content" data-role="content">
                                <div id="modal-team-member-1" class="modal-team-member">
                                    <div class="modal-body-content">
                                        <img class="member-pic" src="/media/teamphotos/phil2021-cropBW.jpg"/>
                                        <div class="member-info-block">
                                            <div class="member-name">Philippe Rayes</div>
                                            <div class="member-designation">President &amp; CEO</div>
                                            <div class="member-email">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14.083" height="9.75" viewBox="0 0 14.083 9.75">
                                                <g id="Icon_ionic-ios-mail" data-name="Icon ionic-ios-mail" transform="translate(0)">
                                                    <path id="Tracé_52" data-name="Tracé 52" d="M17.343,10.335,13.7,14.045a.065.065,0,0,0,0,.095l2.549,2.715a.439.439,0,0,1,0,.623.441.441,0,0,1-.623,0l-2.539-2.7a.069.069,0,0,0-.1,0l-.62.63a2.726,2.726,0,0,1-1.943.819,2.78,2.78,0,0,1-1.984-.843l-.6-.606a.069.069,0,0,0-.1,0l-2.539,2.7a.441.441,0,0,1-.623,0,.439.439,0,0,1,0-.623L7.136,14.14a.072.072,0,0,0,0-.095L3.49,10.335a.067.067,0,0,0-.115.047v7.424a1.086,1.086,0,0,0,1.083,1.083H16.375a1.086,1.086,0,0,0,1.083-1.083V10.382A.068.068,0,0,0,17.343,10.335Z" transform="translate(-3.375 -9.14)" fill="#7ab13d"></path>
                                                    <path id="Tracé_53" data-name="Tracé 53" d="M10.858,14.074a1.84,1.84,0,0,0,1.324-.555l5.312-5.406a1.064,1.064,0,0,0-.67-.237H4.9a1.057,1.057,0,0,0-.67.237l5.312,5.406A1.841,1.841,0,0,0,10.858,14.074Z" transform="translate(-3.816 -7.875)" fill="#7ab13d"></path>
                                                </g>
                                            </svg>
                                            <a class="fill" href="mailto:prayes@sherpagroupav.com">prayes@sherpagroupav.com</a>
                                            </div>
                                            <div class="member-phone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10.818" height="10.817" viewBox="0 0 10.818 10.817">
                                                <path id="Icon_awesome-phone-alt" data-name="Icon awesome-phone-alt" d="M10.509,7.644,8.143,6.63a.507.507,0,0,0-.592.146L6.5,8.056A7.831,7.831,0,0,1,2.759,4.313L4.04,3.265a.506.506,0,0,0,.146-.592L3.171.307A.51.51,0,0,0,2.59.013L.393.52A.507.507,0,0,0,0,1.014a9.8,9.8,0,0,0,9.8,9.8.507.507,0,0,0,.494-.393l.507-2.2a.513.513,0,0,0-.3-.583Z" transform="translate(0 0)" fill="#7ab13d"></path>
                                            </svg>
                                            <a class="fill" href="tel:514-366-9822">514-366-9822 Ext: 1102</a>
                                            </div>
                                            <div class="member-phone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10.818" height="10.817" viewBox="0 0 10.818 10.817">
                                                <path id="Icon_awesome-phone-alt" data-name="Icon awesome-phone-alt" d="M10.509,7.644,8.143,6.63a.507.507,0,0,0-.592.146L6.5,8.056A7.831,7.831,0,0,1,2.759,4.313L4.04,3.265a.506.506,0,0,0,.146-.592L3.171.307A.51.51,0,0,0,2.59.013L.393.52A.507.507,0,0,0,0,1.014a9.8,9.8,0,0,0,9.8,9.8.507.507,0,0,0,.494-.393l.507-2.2a.513.513,0,0,0-.3-.583Z" transform="translate(0 0)" fill="#7ab13d"></path>
                                            </svg>
                                            <a class="fill" href="tel:438-833-9739">438-833-9739</a>
                                            </div>
                                            <div class="member-about">With more than 20 years in the industry, building Sherpa Technology Group from the ground-up has been the fulfilment of a childhood dream of running a successful business. His first savings as a men’s clothing salesperson was spent on a sound system that was nothing short of foreshadowing at its finest. When not hard at work on Sherpa’s next win, you can find Phil enjoying the tranquility and productivity of the early morning hours with a hot coffee. Eventually you’ll find him driving through the European countryside, looking back at the great relationships made, accomplishments realized, and milestones achieved.</div>
                                            <a class="close-button" data-role="closeBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29.073" height="9.962" viewBox="0 0 29.073 9.962">
                                                <path id="Icon_ionic-ios-arrow-round-back" data-name="Icon ionic-ios-arrow-round-back" d="M13.293,11.442a.678.678,0,0,1,.005.955l-3.149,3.16H36.286a.674.674,0,0,1,0,1.349H10.149l3.154,3.16a.683.683,0,0,1-.005.955.672.672,0,0,1-.949-.005L8.074,16.708h0a.757.757,0,0,1-.14-.213.644.644,0,0,1-.052-.259.676.676,0,0,1,.192-.472l4.275-4.306A.661.661,0,0,1,13.293,11.442Z" transform="translate(-7.882 -11.252)"></path>
                                            </svg>
                                            <span class="back">Back</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                        )}
                    </Popup>
                )
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

              } else if (!isSignedIn && displayEducation) {
                return(
                    <Suspense fallback={''}>
                        <Banner
                            identifier={categoryBannerIdentifierHome}
                            showBanner={showCategoryBanners}
                        />
                    </Suspense>
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
