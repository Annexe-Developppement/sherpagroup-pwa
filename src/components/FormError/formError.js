import React, { useRef } from 'react';
import { arrayOf, bool, instanceOf, shape, string } from 'prop-types';
import { useFormError } from '@magento/peregrine/lib/talons/FormError/useFormError';

import { mergeClasses } from '../../classify';
import defaultClasses from './formError.css';
import { useScrollIntoView } from '@magento/peregrine/lib/hooks/useScrollIntoView';
import RichText from '@magento/venia-ui/lib/components/RichText';

const FormError = props => {
    const { classes: propClasses, errors, scrollOnError, rich } = props;

    const talonProps = useFormError({ errors });
    const { errorMessage } = talonProps;

    const errorRef = useRef(null);

    useScrollIntoView(errorRef, scrollOnError && errorMessage);

    const classes = mergeClasses(defaultClasses, propClasses);
    if (errorMessage && rich) {
        return (
            <div className={classes.root} ref={errorRef}>
                <span className={classes.errorMessage}>
                    <RichText content={errorMessage} />
                </span>
            </div>
        );
    }
    return errorMessage ? (
        <div className={classes.root} ref={errorRef}>
            <span className={classes.errorMessage}>{errorMessage}</span>
        </div>
    ) : null;
};

export default FormError;

FormError.propTypes = {
    classes: shape({
        root: string,
        errorMessage: string
    }),
    errors: arrayOf(instanceOf(Error)),
    scrollOnError: bool
};

FormError.defaultProps = {
    scrollOnError: true
};
