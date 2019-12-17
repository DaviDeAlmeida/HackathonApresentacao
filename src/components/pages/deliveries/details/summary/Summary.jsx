import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../../../../history';
import { roles } from '../../../../../modules/auth';
import { getDateFormated, getFullDateFormated, getDateAndTime } from '../../../../../modules/calendar';
import Card from '../../../../common/card/Card';
import { Title } from '../../../../common/card/styles';
import TableContent from '../../../../common/table/tableContent/TableContent';
import Table from '../../../../common/table/Table';
import Modal from '../../../../common/modal/Modal';
import Toolbar from '../../../../common/toolbar/Toolbar';
import ToolbarButton from '../../../../common/toolbar/button/ToolbarButton';
import { sendEvent } from '../../../../../analytics';
import Sidebar from '../../../../common/sidebar/Sidebar';

import {
  Wrapper,
  SidebarLeft,
  Interval,
  Calendar,
  Content,
  SubTitle,
  Buttons,
  OrdersList,
  ModalContent,
  ImgQRCode,
  OptionsQRCode,
  Pipe,
  StyledLink,
  VoucherInfo,
  TextBold,
} from './styles';

const initialState = {
  isVoucherDetailsModalOpen: false,
};

@inject('AppStore')
@observer
class DeliverySummary extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  _toggleVoucherDetailsModal = () => this.setState((prev) => ({ isVoucherDetailsModalOpen: !prev.isVoucherDetailsModalOpen }))

  _buildTable = (delivery) => ({
    id: delivery.id,
    header: {
      columns: [
        {
          id: 'Produto',
          maxWidth: '60%',
          content: '',
        },
        {
          id: 'Volumes',
          maxWidth: '20%',
          content: 'Volumes',
        },
        {
          id: 'Unidades',
          maxWidth: '20%',
          content: 'Unidades',
        },
      ],
    },
    rows: delivery.lines.map((line) => ({
      id: `${delivery.id}/${line.productId}`,
      columns: [
        {
          maxWidth: '60%',
          alignTo: 'start',
          content: <TableContent
            title={line.productDescription}
            secondaryContent={[`Cód. ${line.productExternalId}`, `EAN ${line.productEan}`]}
            bold
          />,
        },
        {
          maxWidth: '20%',
          content: Math.ceil(line.quantity / line.packSize),
        },
        {
          maxWidth: '20%',
          content: line.quantity,
        },
      ],
    })),
  })

  render() {

    const {
      AppStore: {
        AuthStore: {
          user: {
            profile: {
              role,
            },
          },
        },
        DeliveryDetailsStore: {
          delivery,
          confirm,
          refuse,
          confirmReceipt,
          delivery: {
            deliveryInterval,
            deliveryDate,
            status,
            orders,
          },
          warehouse,
          supplier,
          recivedBy,
        },
      },
    } = this.props;

    const {
      isVoucherDetailsModalOpen,
    } = this.state;

    const onSidebarToggle = () => sendEvent('UI - Entregas - RightBar', 'Click - right Bar', 'Detalhes do evento');

    const table = this._buildTable(delivery);

    return (
      <Wrapper>
        <SidebarLeft>
          {deliveryInterval && deliveryDate && (
            <Card>
              <Interval>
                <div>
                  <Title>{status !== 1 ? 'Agendado' : 'Pré-reservado'} para</Title>
                  {`${getFullDateFormated(new Date(deliveryDate))},
                  ${deliveryInterval.begin.slice(0, 5)} - ${deliveryInterval.end.slice(0, 5)}`}
                </div>
                <Calendar />
              </Interval>

              {status === 1 && role !== roles.supplier && (
                <Buttons>
                  <ToolbarButton
                    text="Aceitar"
                    onClick={() => confirm(delivery.id)}
                    primary
                  />
                  <ToolbarButton
                    text="Recusar"
                    onClick={() => refuse(delivery.id)}
                  />
                </Buttons>
              )}

              {(status === 1 || status === 2) && role !== roles.supplier && !delivery.received && (
                <Buttons>
                  <ToolbarButton
                    primary
                    text="Receber"
                    onClick={() => confirmReceipt(delivery.id)}
                  />

                  <ToolbarButton
                    primary
                    text="Reagendar"
                    onClick={() => history.push(`/reagendamento?id=${delivery.id}`)}
                  />
                </Buttons>
              )}
            </Card>
          )}

          {warehouse && supplier && (
            <Card title="Informações">
              <div>{warehouse.description}</div>
              <div>{warehouse.address.streetAddress}</div>
              <div>{`${warehouse.address.city} - ${warehouse.address.state}`}</div>
              <div>{warehouse.address.zipCode}</div>
              <SubTitle>Fornecedor</SubTitle>
              <div>{supplier.name}</div>
              {delivery.received && recivedBy && (
                <div>
                  <SubTitle>Recebido em</SubTitle>
                  <div>{getDateAndTime(new Date(delivery.recivedDate))}</div>
                  <SubTitle>Responsável</SubTitle>
                  <div>{recivedBy.email}</div>
                </div>
              )}
            </Card>
          )}

          <Card title={`Pedidos (${orders.length})`}>
            <OrdersList>
              {orders.map((order) => (
                <Link
                  key={order.id}
                  to={`/pedidos/detalhes?id=${encodeURIComponent(order.id)}`}
                >
                  {order.externalId}
                </Link>
              ))}
            </OrdersList>
          </Card>
        </SidebarLeft>
        <Content>
          <Table header={table.header} rows={table.rows} />
          <Modal
            title={delivery.label}
            closed={!isVoucherDetailsModalOpen}
            onClose={this._toggleVoucherDetailsModal}
            toolbar={(
              <Toolbar>
                <ToolbarButton
                  text="Fechar"
                  onClick={this._toggleVoucherDetailsModal}
                  primary
                />
                <ToolbarButton
                  text="Salvar como PDF"
                />
                <ToolbarButton
                  text="Imprimir"
                />
              </Toolbar>
              )}
          >
            <Card>
              <ModalContent>
                <div>
                  <VoucherInfo>
                    <ImgQRCode alt="" src={`data:image/png;base64,${delivery.qrCode}`} />
                    {delivery && (
                      <TextBold>
                        {delivery.id}
                      </TextBold>
                    )}
                  </VoucherInfo>
                </div>
                <div>
                  {deliveryDate && deliveryInterval && (
                    <div>
                      <SubTitle>
                        {`${getDateFormated(new Date(deliveryDate))}, ${deliveryInterval.begin.slice(0, 5)} - ${deliveryInterval.end.slice(0, 5)}`}
                      </SubTitle>
                    </div>
                  )}
                  {warehouse && (
                    <div>
                      <div>{warehouse.description}</div>
                      <div>{warehouse.address.streetAddress}</div>
                      <div>{`${warehouse.address.city} - ${warehouse.address.state}`}</div>
                      <div>{warehouse.address.zipCode}</div>
                    </div>
                  )}
                  <SubTitle>
                    Apresente esse voucher no centro de distribuição
                  </SubTitle>
                </div>
              </ModalContent>
            </Card>
          </Modal>
        </Content>
        <Sidebar onSidebarToggle={onSidebarToggle} right column>
          <Card>
            <ImgQRCode alt="" src={`data:image/png;base64,${delivery.qrCode}`} />
            <OptionsQRCode>
              <StyledLink type="button" onClick={this._toggleVoucherDetailsModal}>Visualisar</StyledLink>
              <Pipe />
              <StyledLink type="button" onClick={this._toggleVoucherDetailsModal}>Salvar</StyledLink>
            </OptionsQRCode>
          </Card>
        </Sidebar>
      </Wrapper>
    );
  }
}

DeliverySummary.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default DeliverySummary;
