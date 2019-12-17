import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '../../../common/card/Card';
import { Title } from '../../../common/card/styles';
import Table from '../../../common/table/Table';
import TableContent from '../../../common/table/tableContent/TableContent';
import {
  Container,
  Header,
  Text,
  Wrapper,
  Sidebar,
  Interval,
  Calendar,
  Content,
  SubTitle,
  OrdersList,
} from './styles';

@inject('AppStore')
@observer
class Summary extends Component {

  _buildTables = (orders) => orders.map((order) => ({
    id: order.id,
    header: {
      columns: [
        {
          id: order.id,
          maxWidth: '60%',
          content: <TableContent
            big
            bold
            title={order.externalId}
            pushTo="left"
          />,
        },
        {
          id: 'Volumes',
          maxWidth: '20%',
          content: <TableContent title="Volumes" bold />,
        },
        {
          id: 'Unidades',
          maxWidth: '20%',
          content: <TableContent title="Unidades" bold />,
        },
      ],
    },
    rows: order.lines.map((line) => ({
      id: `${order.id}/${line.productId}`,
      columns: [
        {
          maxWidth: '60%',
          content: <TableContent
            title={line.productDescription}
            secondaryContent={[`Cód. ${line.productExternalId}`, `EAN ${line.productEan}`]}
            pushTo="left"
            bold
            big
          />,
        },
        {
          id: 'Volumes',
          maxWidth: '20%',
          content: <TableContent title={line.volumes} big />,
        },
        {
          id: 'Unidades',
          maxWidth: '20%',
          content: <TableContent title={line.quantity} big />,
        },
      ],
    })),
  }))

  render() {
    const {
      AppStore: {
        SchedulerStore: {
          selectedDate: date,
          selectedInterval: interval,
          selectedOrders,
          data: {
            warehouse,
            supplier,
          },
        },
      },
    } = this.props;

    const tables = this._buildTables(selectedOrders);

    return (
      <Container>
        <Header>
          <Text>Confirme as informações do agendamento</Text>
        </Header>
        <Wrapper>
          <Sidebar>
            <Card>
              <Interval>
                <div>
                  <Title>Agendado</Title>
                  {`${date.getDate()}/${date.getMonth() + 1}, ${interval.begin.slice(0, 5)} - ${interval.end.slice(0, 5)}`}
                </div>
                <Calendar />
              </Interval>
            </Card>
            <Card title="Informações">
              <div>{warehouse.description}</div>
              <div>{warehouse.address.streetAddress}</div>
              <div>{`${warehouse.address.city} - ${warehouse.address.state}`}</div>
              <div>{warehouse.address.zipCode}</div>
              <SubTitle>Fornecedor</SubTitle>
              <div>{supplier.name}</div>
            </Card>
            <Card title={`Pedidos (${selectedOrders.length})`}>
              <OrdersList>
                {selectedOrders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/pedidos/detalhes?id=${encodeURIComponent(order.id)}`}
                  >
                    {order.externalId}
                  </Link>
                ))}
              </OrdersList>
            </Card>
          </Sidebar>
          <Content>
            {tables.map((table) => (
              <Table
                key={table.id}
                collapsable
                header={table.header}
                rows={table.rows}
                lastColumnToRight={false}
              />
            ))}
          </Content>
        </Wrapper>
      </Container>
    );
  }
}

Summary.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default Summary;
