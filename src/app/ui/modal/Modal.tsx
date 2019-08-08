import classNames from 'classnames';
import { noop } from 'lodash';
import React, { FunctionComponent, ReactNode } from 'react';
import ReactModal from 'react-modal';
import { Omit } from 'utility-types';

import { IconClose } from '../icon';

export type ModalProps = Omit<
    ReactModal.Props,
    'bodyOpenClassName' | 'className' | 'closeTimeoutMS' | 'overlayClassName'
> & {
    children: ReactNode;
    closeButtonLabel?: string | ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    additionalHeaderClassName?: string;
    additionalBodyClassName?: string;
    additionalModalClassName?: string;
    shouldShowCloseButton?: boolean;
};

const Modal: FunctionComponent<ModalProps> = ({
    children,
    closeButtonLabel = 'Close',
    footer,
    header,
    additionalHeaderClassName,
    additionalBodyClassName,
    additionalModalClassName,
    onRequestClose = noop,
    shouldShowCloseButton = false,
    ...rest
}) => (
    <ReactModal
        { ...rest }
        ariaHideApp={ process.env.NODE_ENV !== 'test' }
        bodyOpenClassName="has-activeModal"
        className={ {
            base: classNames(
                'modal optimizedCheckout-contentPrimary',
                additionalModalClassName
            ),
            afterOpen: 'modal--afterOpen',
            beforeClose: 'modal--beforeClose',
        } }
        closeTimeoutMS={ 200 }
        onRequestClose={ onRequestClose }
        overlayClassName={ {
            base: 'modalOverlay',
            afterOpen: 'modalOverlay--afterOpen',
            beforeClose: 'modalOverlay--beforeClose',
        } }
        shouldCloseOnOverlayClick={ false }
    >
        <div className={ classNames(
            'modal-header',
            additionalHeaderClassName
        ) }>
            { header }

            { shouldShowCloseButton && <a
                className="modal-close"
                data-test="modal-close-button"
                onClick={ event => {
                    onRequestClose(event.nativeEvent);
                } }
                href="javascript:void(0);"
            >
                { closeButtonLabel && <span className="is-srOnly">
                    { closeButtonLabel }
                </span> }

                <IconClose />
            </a> }
        </div>

        <div
            className={ classNames(
                'modal-body',
                additionalBodyClassName
            ) }
            data-test="modal-body"
        >
            { children }
        </div>

        { footer && <div
            className="modal-footer"
            data-test="modal-footer"
        >
            { footer }
        </div> }
    </ReactModal>
);

export default Modal;
