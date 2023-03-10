import React, { Component, Fragment } from 'react';
import { node, number, oneOfType, shape, string } from 'prop-types';
import { BasicText, asField } from 'informed';
import { compose } from 'redux';

import classify from '../../classify';
import { FieldIcons, Message } from '../Field';
import defaultClasses from './textInput.css';

export class TextInput extends Component {
    static propTypes = {
        after: node,
        before: node,
        classes: shape({
            input: string
        }),
        fieldState: shape({
            value: oneOfType([string, number])
        }),
        message: node
    };

    render() {
        const {
            after,
            before,
            classes,
            fieldState,
            message,
            id,
            field,
            ...rest
        } = this.props;

        const inputClass = fieldState.error
            ? classes.input_error
            : classes.input;
        return (
            <Fragment>
                <FieldIcons after={after} before={before}>
                    <BasicText
                        {...rest}
                        fieldState={fieldState}
                        className={inputClass}
                        id={id}
                        field={field}
                    />
                </FieldIcons>
                <Message fieldState={fieldState}>{message}</Message>
            </Fragment>
        );
    }
}

export default compose(
    classify(defaultClasses),
    asField
)(TextInput);
