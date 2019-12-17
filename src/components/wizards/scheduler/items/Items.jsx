import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import Checkbox from '../../../common/checkbox/Checkbox';
import Table from '../../../common/table/Table';
import TableContent from '../../../common/table/tableContent/TableContent';
import NumberSelector from '../../../common/numberSelector/NumberSelector';
import {
  Container,
  Content,
  Header,
  Footer,
  FooterContent,
  Text,
} from './styles';

@inject('AppStore')
@observer
class Items extends Component {
  _buildTables = (orders) => orders.map((order) => {
    const {
      AppStore: {
        SchedulerStore: {
          isSelected,
          toggleSelect,
          areAllSelected,
          toggleSelectAll,
          getQuantity,
          setQuantity,
          sumQuantity,
          subQuantity,
          getVolumes,
          setVolumes,
          sumVolumes,
          subVolumes,
        },
      },
    } = this.props;

    const lineIds = order.lines.map((line) => `${order.id}/${line.productId}`);

    return {
      id: order.id,
      header: {
        columns: [
          {
            id: `${order.id}-select-all`,
            maxWidth: '24px',
            content: <Checkbox
              checked={areAllSelected(lineIds)}
              onChange={() => toggleSelectAll(lineIds)}
            />,
          },
          {
            id: `${order.id}-external-id`,
            maxWidth: '60%',
            content: <TableContent title={order.externalId} pushTo="left" big bold />,
          },
          {
            id: `${order.id}-volumes`,
            maxWidth: '20%',
            content: <TableContent title="Volumes" bold />,
          },
          {
            id: `${order.id}-quantity`,
            maxWidth: '20%',
            content: <TableContent title="Unidades" bold />,
          },
        ],
      },
      rows: order.lines.map((line) => {
        const maxVolumes = Math.ceil(line.quantity / line.packSize);
        const id = `${order.id}/${line.productId}`;

        return {
          id,
          columns: [
            {
              maxWidth: '24px',
              content: <Checkbox
                checked={isSelected(id)}
                onChange={() => toggleSelect(id)}
              />,
            },
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
              maxWidth: '20%',
              content: <NumberSelector
                value={getVolumes(id)}
                minValue={0}
                maxValue={maxVolumes}
                label={`de ${maxVolumes}`}
                onChange={(value) => setVolumes(id, value)}
                onAddClick={(value) => sumVolumes(id, value)}
                onRemoveClick={(value) => subVolumes(id, value)}
              />,
            },
            {
              maxWidth: '20%',
              content: <NumberSelector
                value={getQuantity(id)}
                minValue={0}
                maxValue={line.quantity}
                label={`de ${line.quantity}`}
                onChange={(value) => setQuantity(id, value)}
                onAddClick={(value) => sumQuantity(id, value)}
                onRemoveClick={(value) => subQuantity(id, value)}
              />,
            },
          ],
        };
      }),
    };
  });

  render() {
    const {
      AppStore: {
        SchedulerStore: {
          data: {
            orders,
          },
          selected: {
            lines,
            volumes,
            quantity,
          },
          groupByProduct,
        },
      },
    } = this.props;

    const tables = this._buildTables(orders);

    return (
      <Container>
        <Header>
          <Text>Informe a quantidade de cada item deste agendamento</Text>
        </Header>

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

          <Footer marginTop={!groupByProduct && orders.length !== 1}>
            <FooterContent width="60%" left>{lines} itens selecionados</FooterContent>
            <FooterContent width="20%">{volumes}</FooterContent>
            <FooterContent width="20%">{quantity}</FooterContent>
          </Footer>
        </Content>
      </Container>
    );
  }
}

Items.propTypes = {
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default Items;
