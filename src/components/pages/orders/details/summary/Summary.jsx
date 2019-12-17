import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../../../../history';
import Card from '../../../../common/card/Card';
import Button from '../../../../common/button/Button';
import { Title } from '../../../../common/card/styles';
import TableContent from '../../../../common/table/tableContent/TableContent';
import { getDateFormated, getFullDateFormated } from '../../../../../modules/calendar';
import Table from '../../../../common/table/Table';
import Sidebar from '../../../../common/sidebar/Sidebar';
import Doughnut from '../../../../common/charts/doughnut/Doughnut';
import Label from '../../../../common/label/Label';
import Checkbox from '../../../../common/checkbox/Checkbox';

import {
  Wrapper,
  Interval,
  Calendar,
  Content,
  SubTitle,
  Owner,
  Buttons,
  DeliveriesList,
  Status,
  Info,
} from './styles';

@inject('AppStore')
@observer
class OrderSummary extends Component {

  _buildTable = (order) => ({
    id: order.id,
    header: {
      columns: [
        {
          id: 'Produto',
          maxWidth: '30%',
          content: '',
        },
        {
          id: 'Volumes',
          maxWidth: '20%',
          content: 'Volumes',
        },
        {
          id: 'Unidades',
          maxWidth: '15%',
          content: 'Unidades',
        },
        {
          id: 'pendentes',
          maxWidth: '15%',
          content: 'pendentes',
        },
        {
          id: 'Entregue',
          maxWidth: '20%',
          content: 'Entregue',
        },
      ],
    },
    rows: order.lines.map((line) => ({
      id: `${order.id}/${line.productId}`,
      columns: [
        {
          maxWidth: '30%',
          alignTo: 'start',
          content: <TableContent
            title={line.productDescription}
            secondaryContent={[`Cód. ${line.productExternalId}`, `EAN ${line.productEan}`]}
          />,
        },
        {
          id: 'Volumes',
          maxWidth: '20%',
          content: Math.ceil(line.quantity / line.packSize),
        },
        {
          id: 'Unidades',
          maxWidth: '15%',
          content: line.quantity,
        },
        {
          id: 'pendentes',
          maxWidth: '15%',
          content: line.pendingQuantity,
        },
        {
          id: 'Entregue',
          maxWidth: '20%',
          content: line.deliveredQuantity,
        },
      ],
    })),
  })

  render() {

    const {
      AppStore: {
        OrderDetailsStore: {
          order,
          order: {
            status,
            leadTime,
            responsible,
            deliveries,
            schedulingUrl,
          },
          lines,
          owner,
          warehouse,
          supplier,
          quantityPerStatus,
          pendingItens,
          togglePendingItems,
        },
      },
    } = this.props;

    const table = this._buildTable({
      id: order.id,
      lines,
    });

    const data = {
      labels: quantityPerStatus.map((item) => item.status),
      datasets: [
        {
          data: quantityPerStatus.map((item) => item.count),
          backgroundColor: quantityPerStatus.map((item) => item.color),
        },
      ],
    };

    return (
      <Wrapper>
        <Sidebar
          column
          collapsable={false}
          minWidth={250}
        >
          {status === 1 ? (
            <Card>
              <Interval>
                <Title>Lead time</Title>
                <Calendar />
              </Interval>
              <div>{getDateFormated(new Date(leadTime))}</div>
              <Buttons>
                <Button
                  text="Agendar"
                  primary
                  onClick={() => history.push(schedulingUrl)}
                />
              </Buttons>
            </Card>
          ) : (
            <Card>
              <Interval>
                <Title>Agendado para</Title>
                <Calendar />
              </Interval>
              {deliveries && (
                deliveries.map((delivery) => (
                  <DeliveriesList key={delivery.id}>
                    <Link
                      to={delivery.url}
                    >
                      {delivery.label}
                    </Link>
                    {`${getFullDateFormated(new Date(delivery.deliveryDate))}, ${delivery.deliveryInterval.begin.slice(0, 5)} - ${delivery.deliveryInterval.end.slice(0, 5)} `}
                  </DeliveriesList>
                ))
              )}
            </Card>
          )}

          {warehouse && supplier && owner && (
            <Card title="Informações">
              {/* <Owner><Link to="/">{owner.name}</Link></Owner> */}
              <div>{warehouse.description}</div>
              <div>{warehouse.address.streetAddress}</div>
              <div>{`${warehouse.address.city} - ${warehouse.address.state}`}</div>
              <div>{warehouse.address.zipCode}</div>

              <SubTitle>Fornecedor</SubTitle>
              <div>{supplier.name}</div>

              <SubTitle>Responsável</SubTitle>
              {/* <Link to="/">{responsible}</Link> */}
            </Card>
          )}
        </Sidebar>
        <Content>
          <Checkbox
            label="Itens pendentes"
            checked={pendingItens}
            onChange={togglePendingItems}
          />
          <Table header={table.header} rows={table.rows} />
        </Content>

        <Sidebar
          right
          column
          minWidth={250}
        >
          <Card title="Este pedido">
            <Doughnut data={data} />
            {quantityPerStatus.map((item) => (
              <Status key={item.status}>
                <Label
                  text={item.status}
                  status={item.color}
                />
                <Info>{`${item.count} unidade(s)`}</Info>
              </Status>
            ))}
          </Card>
        </Sidebar>
      </Wrapper>
    );
  }
}

OrderSummary.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default OrderSummary;
