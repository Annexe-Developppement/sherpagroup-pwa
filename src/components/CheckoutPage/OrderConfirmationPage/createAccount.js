import React, { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string } from 'prop-types';
import { useToasts } from '@magento/peregrine';
import { useCreateAccount } from '../../../peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/useCreateAccount';

import combine from '../../../util/combineValidators';
import { mergeClasses } from '../../../classify';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '../../../util/formValidators';

import Button from '../../Button';
import Checkbox from '../../Checkbox';
import Field from '../../Field';
import FormError from '../../FormError';
import TextInput from '../../TextInput';
import Password from '../../Password';
import defaultClasses from './createAccount.css';

const CreateAccount = props => {
    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, props.classes);
    const [isChecked, setIsChecked] = useState(false);

    const [, { addToast }] = useToasts();

    const onSubmit = useCallback(() => {
        // TODO: Redirect to account/order page when implemented.
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });

        addToast({
            type: 'info',
            message: formatMessage({
                id: 'createAccount.accountSuccessfullyCreated',
                defaultMessage: 'Account successfully created.'
            }),
            timeout: 5000
        });
    }, [addToast, formatMessage]);

    const talonProps = useCreateAccount({
        initialValues: {
            email: props.email,
            firstName: props.firstname,
            lastName: props.lastname
        },
        onSubmit
    });

    const { errors, handleSubmit, isDisabled, initialValues } = talonProps;

    return (
        <div className={classes.root}>
            <h2>
                <FormattedMessage
                    id={'createAccount.quickCheckout'}
                    defaultMessage={'Quick Checkout When You Return'}
                />
            </h2>
            <p>
                <FormattedMessage
                    id={'createAccount.setAPasswordAndSave'}
                    defaultMessage={
                        'Set a password and save your information for next time in one easy step!'
                    }
                />
            </p>
            <FormError errors={Array.from(errors.values())} />
            <Form
                className={classes.form}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Field
                    label={formatMessage({
                        id: 'global.firstName',
                        defaultMessage: 'First Name'
                    })}
                >
                    <TextInput
                        field="customer.firstname"
                        autoComplete="given-name"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.lastName',
                        defaultMessage: 'Last Name'
                    })}
                >
                    <TextInput
                        field="customer.lastname"
                        autoComplete="family-name"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        field="customer.email"
                        autoComplete="email"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
                <Password
                    label={formatMessage({
                        id: 'global.password',
                        defaultMessage: 'Password'
                    })}
                    fieldName="password"
                    isToggleButtonHidden={false}
                    autoComplete="new-password"
                    validate={combine([
                        isRequired,
                        [hasLengthAtLeast, 8],
                        validatePassword
                    ])}
                    validateOnBlur
                />
                <div className={classes.subscribe}>
                    <Checkbox
                        field="subscribe"
                        label={formatMessage({
                            id: 'createAccount.subscribe',
                            defaultMessage: 'Subscribe to news and updates'
                        })}
                    />
                </div>
                <div className={classes.subscribe} validate={isRequired}>
                    <Checkbox
                        id="assistance_allowed"
                        onClick={() => {
                            setIsChecked(!isChecked);
                        }}
                        field="assistance_allowed"
                        label={formatMessage({
                            id: 'createAccount.assistance',
                            defaultMessage: 'Allow remote shopping assistance'
                        })}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        disabled={isDisabled}
                        type="submit"
                        className={classes.create_account_button}
                    >
                        <FormattedMessage
                            id={'createAccount.createAccount'}
                            defaultMessage={'Create Account'}
                        />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateAccount;

CreateAccount.propTypes = {
    classes: shape({
        actions: string,
        create_account_button: string,
        form: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string
    }),
    onSubmit: func
};
