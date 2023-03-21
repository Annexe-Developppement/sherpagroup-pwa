import React from 'react';
import defaultClasses from './error.css';
import PropTypes, { shape, string } from 'prop-types';
import { Title } from '../Head';
import { Link } from 'src/drivers';

const ErrorView = () => {
    return (
        <div className={defaultClasses.page_not_find}>
            <Title>{'404 not found'}</Title>
            <div className={'container' + ' ' + defaultClasses.container}>
                <div className={'row'}>
                    <div className={'col-12 col-lg-6 col-md-6 col-sm-6'}>
                        <div className={defaultClasses.not_found_left}>
                            <img
                                src="/SherpaTech-Horz-644x_web-ed6.png"
                                className={'img-fluid'}
                                alt="noProductsFound"
                            />
                        </div>
                    </div>
                    <div className={'col-12 col-lg-6 col-md-6 col-sm-6'}>
                        <div className={defaultClasses.not_found_text}>
                            
                            <h3>Well, that doesn't look right, does it?</h3>
                            
                            <Link to="/">Back to HomePage</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

ErrorView.propTypes = {
    children: PropTypes.node.isRequired,
    classes: shape({
        root: string
    })
};

export default ErrorView;
