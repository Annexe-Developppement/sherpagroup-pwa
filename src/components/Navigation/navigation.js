import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';
import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';
import { FormattedMessage } from 'react-intl';
import { mergeClasses } from '../../classify';
import AuthBar from '../AuthBar';
import CategoryTree from '../CategoryTree';
import LoadingIndicator from '../LoadingIndicator';
import CurrencySwitcher from '../Header/currencySwitcher';
import StoreSwitcher from '../Header/storeSwitcher';
import NavHeader from './navHeader';
import defaultClasses from './navigation.css';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';
import AccountMenuItems from '../AccountMenu/accountMenuItems';
import { useAccountMenu } from '../../peregrine/lib/talons/Header/useAccountMenu';
import SIGN_OUT_MUTATION from '../../queries/signOut.graphql';

const AuthModal = React.lazy(() => import('../AuthModal'));

const Navigation = props => {
    const {
        catalogActions,
        categories,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        showCreateAccount,
        showForgotPassword,
        showMainMenu,
        showMyAccount,
        showSignIn,
        view
    } = useNavigation({ customerQuery: GET_CUSTOMER_QUERY });
    const talonProps = useAccountMenu({
        mutations: { signOut: SIGN_OUT_MUTATION },
        accountMenuIsOpen: isOpen,
        setAccountMenuIsOpen: showMainMenu
    });
    const { handleSignOut } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const modalClassName = hasModal ? classes.modal_open : classes.modal;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;

    // Lazy load the auth modal because it may not be needed.
    const authModal = hasModal ? (
        <Suspense fallback={<LoadingIndicator />}>
            <AuthModal
                closeDrawer={handleClose}
                showCreateAccount={showCreateAccount}
                showForgotPassword={showForgotPassword}
                showMainMenu={showMainMenu}
                showMyAccount={showMyAccount}
                showSignIn={showSignIn}
                view={view}
            />
        </Suspense>
    ) : null;

    const { isMobile } = props;

    if (!isMobile) {
        return (
            <aside className={rootClassName}>
                <CategoryTree
                    categoryId={categoryId}
                    categories={categories}
                    onNavigate={handleClose}
                    setCategoryId={setCategoryId}
                    updateCategories={catalogActions.updateCategories}
                />
            </aside>
        );
    }
    return (
        <aside className={rootClassName}>
            <header className={classes.header}>
                <NavHeader
                    isTopLevel={isTopLevel}
                    onBack={handleBack}
                    view={view}
                />
            </header>
            <div className={bodyClassName}>
                <AuthBar
                    disabled={hasModal}
                    showMyAccount={showMyAccount}
                    showCreateAccount={showCreateAccount}
                    showSignIn={showSignIn}
                />
                <div className={defaultClasses.switchers}>
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
                <CategoryTree
                    categoryId={categoryId}
                    categories={categories}
                    onNavigate={handleClose}
                    setCategoryId={setCategoryId}
                    updateCategories={catalogActions.updateCategories}
                />
                <AccountMenuItems onSignOut={handleSignOut} />
            </div>

            <div className={classes.footer}>
                <FormattedMessage
                    id={'navigation.footer'}
                    defaultMessage={'no footer will exist'}
                />

                {/* <AuthBar disabled={hasModal} showMyAccount={showMyAccount} showSignIn={showSignIn} /> */}
            </div>
            <div className={modalClassName}>{authModal}</div>
        </aside>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string
    })
};
