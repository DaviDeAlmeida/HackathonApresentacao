import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Card from '../../card/Card';
import Input from '../../input/text/index';
import Modal from '../Modal';
import Toolbar from '../../toolbar/Toolbar';
import ToolbarButton from '../../toolbar/button/ToolbarButton';
import { getDateFormated } from '../../../../modules/calendar';

import {
  ModalContent,
  ReceiveButton,
  SubTitle,
  VoucherDetails,
} from './styles';

@inject('AppStore')
@observer
class ConfirmReceiptModal extends Component {

  constructor() {
    super();
    this.state = {
      isReceiptModalOpen: false,
      qrCode: '',
    };
  }

  _toggleReceiptModal = () => {
    console.log(this.state);
    this.setState((prev) => ({ isReceiptModalOpen: !prev.isReceiptModalOpen }));
  }

  _handleCancel = () => {
    this.setState((prev) => ({ isReceiptModalOpen: !prev.isReceiptModalOpen, qrCode: '' }));
    document.querySelector(".bADmFA").value = '';
  }

  keyPressed = (event) => {

    const {
      AppStore: {
        DeliveryDetailsStore: {
          loadVoucherDetails,
        },
      },
    } = this.props;
    if (event.key === 'Enter' || event.key === 9) {
      loadVoucherDetails(this.state.qrCode);
    }
  }

  render() {
    console.log(this.state);
    const {
      AppStore: {
        DeliveryDetailsStore: {
          confirmReceipt,
          voucherDetails,
        },
      },
    } = this.props;

    const {
      isReceiptModalOpen,
      qrCode,
    } = this.state;

    return (
      <div>
        <ReceiveButton>
          <ToolbarButton
            primary
            text="Receber"
            onClick={() => this._toggleReceiptModal()}
          />
        </ReceiveButton>
        <Modal
          title={voucherDetails && (
            voucherDetails.delivery.label
          )}
          closed={!isReceiptModalOpen}
          onClose={() => this._handleCancel()}
          toolbar={(
            <Toolbar>
              <ToolbarButton
                text="Cancelar"
                onClick={() => this._handleCancel()}
              />
              <ToolbarButton
                text="Ok"
                onClick={() => confirmReceipt(qrCode)}
                primary
                disabled={!voucherDetails}
              />
            </Toolbar>
                )}
        >
          <Card
            title="Passe o voucher no leitor ou digite o código"
          >
            <ModalContent>
              <Input
                width="70%"
                autoFocus
                value={this.state.qrCode}
                onChange={(event) => this.setState({ qrCode: event.target.value })}
                onKeyPress={(e) => this.keyPressed(e)}
              />
              {voucherDetails && (
                <VoucherDetails>
                  <SubTitle>
                    <div>
                      {`${getDateFormated(new Date(voucherDetails.delivery.deliveryDate))}, ${voucherDetails.delivery.deliveryInterval.begin.slice(0, 5)} - ${voucherDetails.delivery.deliveryInterval.end.slice(0, 5)}`}
                    </div>
                  </SubTitle>
                  <div>
                    <div>{voucherDetails.warehouse.description}</div>
                    <div>{voucherDetails.warehouse.address.streetAddress}</div>
                    <div>{`${voucherDetails.warehouse.address.city} - ${voucherDetails.warehouse.address.state}`}</div>
                    <div>{voucherDetails.warehouse.address.zipCode}</div>
                  </div>
                </VoucherDetails>
              )}
            </ModalContent>
          </Card>
        </Modal>
      </div>
    );
  }
}

ConfirmReceiptModal.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default ConfirmReceiptModal;
