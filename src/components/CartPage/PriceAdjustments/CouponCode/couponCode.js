import React, { Fragment, useEffect } from 'react';
import { gql } from '@apollo/client';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { useToasts } from '@magento/peregrine';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import { useCouponCode } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/useCouponCode';
import { useIntl } from 'react-intl';

import { mergeClasses } from '../../../../classify';

import Button from '../../../Button';
import { Form } from 'informed';
import Field from '../../../Field';
import Icon from '../../../Icon';
import LinkButton from '../../../LinkButton';
import TextInput from '../../../TextInput';

import { CartPageFragment } from '../../cartPageFragments.gql';
import { AppliedCouponsFragment } from './couponCodeFragments';

import defaultClasses from './couponCode.css';

const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const GET_APPLIED_COUPONS = gql`
    query getAppliedCoupons($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...AppliedCouponsFragment
        }
    }
    ${AppliedCouponsFragment}
`;

const APPLY_COUPON_MUTATION = gql`
    mutation applyCouponToCart($cartId: String!, $couponCode: String!) {
        applyCouponToCart(
            input: { cart_id: $cartId, coupon_code: $couponCode }
        ) @connection(key: "applyCouponToCart") {
            cart {
                id
                ...CartPageFragment
                # If this mutation causes "free" to become available we need to know.
                available_payment_methods {
                    code
                    title
                }
            }
        }
    }
    ${CartPageFragment}
`;

const REMOVE_COUPON_MUTATION = gql`
    mutation removeCouponFromCart($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId })
            @connection(key: "removeCouponFromCart") {
            cart {
                id
                ...CartPageFragment
                # If this mutation causes "free" to become available we need to know.
                available_payment_methods {
                    code
                    title
                }
            }
        }
    }
    ${CartPageFragment}
`;

/**
 * A child component of the PriceAdjustments component.
 * This component renders a form for addingg a coupon code to the cart.
 *
 * @param {Object} props
 * @param {Function} props.setIsCartUpdating Function for setting the updating state for the cart.
 * @param {Object} props.classes CSS className overrides.
 * See [couponCode.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCode.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CouponCode from "@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode";
 */
const CouponCode = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { formatMessage } = useIntl();

    const talonProps = useCouponCode({
        setIsCartUpdating: props.setIsCartUpdating,
        mutations: {
            applyCouponMutation: APPLY_COUPON_MUTATION,
            removeCouponMutation: REMOVE_COUPON_MUTATION
        },
        queries: {
            getAppliedCouponsQuery: GET_APPLIED_COUPONS
        }
    });
    const [, { addToast }] = useToasts();
    const {
        applyingCoupon,
        data,
        errors,
        handleApplyCoupon,
        handleRemoveCoupon,
        removingCoupon
    } = talonProps;

    const removeCouponError = deriveErrorMessage([
        errors.get('removeCouponMutation')
    ]);

    useEffect(() => {
        if (removeCouponError) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: removeCouponError,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, removeCouponError]);

    if (!data) {
        return null;
    }

    if (errors.get('getAppliedCouponsQuery')) {
        return (
            <div className={classes.errorContainer}>
                {'Something went wrong. Please refresh and try again.'}
            </div>
        );
    }

    if (data.cart.applied_coupons) {
        const codes = data.cart.applied_coupons.map(({ code }) => {
            return (
                <Fragment key={code}>
                    <span>{code}</span>
                    <LinkButton
                        className={classes.removeButton}
                        disabled={removingCoupon}
                        onClick={() => {
                            handleRemoveCoupon(code);
                        }}
                    >
                        Remove
                    </LinkButton>
                </Fragment>
            );
        });

        return <div className={classes.appliedCoupon}>{codes}</div>;
    } else {
        const errorMessage = deriveErrorMessage([
            errors.get('applyCouponMutation')
        ]);

        const formClass = errorMessage
            ? classes.entryFormError
            : classes.entryForm;

        return (
            <Form className={formClass} onSubmit={handleApplyCoupon}>
                <Field
                    id="couponCode"
                    label={formatMessage({
                        id: 'couponCode.couponCode',
                        defaultMessage: 'Coupon Code'
                    })}
                >
                    <TextInput
                        field="couponCode"
                        id={'couponCode'}
                        placeholder={formatMessage({
                            id: 'couponCode.enterCode',
                            defaultMessage: 'Enter code'
                        })}
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        message={errorMessage}
                    />
                </Field>
                <Field>
                    <Button
                        disabled={applyingCoupon}
                        priority={'normal'}
                        type={'submit'}
                    >
                        {formatMessage({
                            id: 'couponCode.Apply',
                            defaultMessage: 'Apply'
                        })}
                    </Button>
                </Field>
            </Form>
        );
    }
};

export default CouponCode;
