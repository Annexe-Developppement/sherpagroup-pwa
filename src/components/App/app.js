import React, { useCallback, Suspense } from 'react';
import { array, func, shape, string } from 'prop-types';

import { useToasts } from '@magento/peregrine';
import { useApp } from '@magento/peregrine/lib/talons/App/useApp';

import globalCSS from '@magento/venia-ui/lib/index.css';
import { HeadProvider, Title } from '../Head';
import Main from '../Main';
import Mask from '../Mask';
import Routes from '@magento/venia-ui/lib/components/Routes';
import ToastContainer from '../ToastContainer';
import Icon from '../Icon';
import { useMobile } from '../../peregrine/lib/talons/Mobile/useMobile';
import { useCedContext } from 'src/peregrine/lib/context/ced';

import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';

const Navigation = React.lazy(() => import('../Navigation'));
const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const ERROR_MESSAGE = 'Sorry! An unexpected error occurred.';

const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;

    const [, { addToast }] = useToasts();

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: 'You are offline. Some features may be unavailable.',
            timeout: 3000
        });
    }, [addToast]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: 'You are online.',
            timeout: 3000
        });
    }, [addToast]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorToastProps = {
                icon: ErrorIcon,
                message: `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);
        },
        [addToast]
    );

    const talonProps = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });

    const { hasOverlay, handleCloseDrawer } = talonProps;
    const { mobileView } = useMobile();

    const [{ overlay: backgroundOverlay }] = useCedContext();

    let showOverlay = false;
    if (backgroundOverlay || hasOverlay) {
        showOverlay = true;
    }

    if (renderError) {
        return (
            <HeadProvider>
                <Title>{`Home Page - ${STORE_NAME}`}</Title>
                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }

    return (
        <HeadProvider>
            <Title>{`Home Page - ${STORE_NAME}`}</Title>
            <Main
                mobileView={mobileView}
                isMasked={mobileView ? hasOverlay : showOverlay}
            >
                <Routes />
            </Main>
            <Suspense fallback={null}>
                <Navigation isMobile={mobileView} />
            </Suspense>
            <Mask
                isActive={mobileView ? hasOverlay : showOverlay}
                dismiss={handleCloseDrawer}
            />
            <ToastContainer />
        </HeadProvider>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
