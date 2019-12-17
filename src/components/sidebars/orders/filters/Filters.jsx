import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { sendEvent } from '../../../../analytics';
import FilterDropdown from '../../../common/filters/dropdown/FilterDropdown';
import Checkbox from '../../../common/checkbox/Checkbox';


import {
  Container,
  StyledLink,
  Options,
} from './styles';

const initialState = {
  showMore: false,
};

@inject('AppStore')
@observer
class Filters extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const {
      AppStore: {
        OrdersStore: {
          loadFilterData,
        },
      },
    } = this.props;

    loadFilterData();
  }

  _toggleShowMore = () => {
    const { showMore } = this.state;
    this.setState({ showMore: !showMore });
    sendEvent('UI - Pedidos - Filtros', 'Click - Filtros', showMore ? 'Mostrar menos' : 'Mostrar mais');
  }

  render() {
    const { showMore } = this.state;
    const {
      AppStore: {
        OrdersStore: {
          filter: {
            period,
            supplierId,
            warehouseId,
            productId,
            productCategoryId,
            waitingConfirmation,
            firstDelivery,
            noAnswer,
            partiallyScheduled,
            recived,
            partiallyDelivered,
            partiallyNoAnswer,
          },
          setPeriod,
          suppliers,
          setSupplier,
          warehouses,
          setWarehouseId,
          products,
          setProductId,
          productCategories,
          setProductCategoryId,
          toggleWaitingConfirmation,
          toggleFirstDelivery,
          toggleNoAnswer,
          togglePartiallyScheduled,
          toggleRecived,
          togglePartiallyDelivered,
          togglePartiallyNoAnswer,
        },
      },
    } = this.props;

    return (
      <Container>
        <FilterDropdown
          label="Período"
          value={period}
          onChange={(e, { value }) => setPeriod(value)}
          options={[
            {
              value: 15,
              text: '15 dias',
            },
            {
              value: 30,
              text: '30 dias',
            },
            {
              value: 90,
              text: '90 dias',
            },
          ]}
        />
        <FilterDropdown
          search
          clearable
          label="Centro de distribuição"
          value={warehouseId}
          options={warehouses.slice()}
          onChange={(e, { value }) => setWarehouseId(value)}
        />
        <FilterDropdown
          search
          clearable
          label="Fornecedor"
          value={supplierId}
          options={suppliers.slice()}
          onChange={(e, { value }) => setSupplier(value)}
        />
        {showMore && (
          <Fragment>
            <FilterDropdown
              search
              clearable
              label="Produto"
              value={productId}
              options={products.slice()}
              onChange={(e, { value }) => setProductId(value)}
            />
            <FilterDropdown
              search
              clearable
              label="Categoria de produto"
              value={productCategoryId}
              options={productCategories.slice()}
              onChange={(e, { value }) => setProductCategoryId(value)}
            />
          </Fragment>
        )}
        <StyledLink
          type="button"
          onClick={this._toggleShowMore}
        >
          {showMore ? 'Mostrar menos' : 'Mostrar mais'}

        </StyledLink>
        <Options>
          <Checkbox
            label="Aguardando confirmação"
            checked={waitingConfirmation}
            onChange={toggleWaitingConfirmation}
          />
          <Checkbox
            label="Parcialmente agendado"
            checked={partiallyScheduled}
            onChange={togglePartiallyScheduled}
          />
          <Checkbox
            label="Parcialmente entregue"
            checked={partiallyDelivered}
            onChange={togglePartiallyDelivered}
          />
          <Checkbox
            label="Parcialmente sem resposta"
            checked={partiallyNoAnswer}
            onChange={togglePartiallyNoAnswer}
          />
          <Checkbox
            label="Primeira entrega"
            checked={firstDelivery}
            onChange={toggleFirstDelivery}
          />
          <Checkbox
            label="Recebido"
            checked={recived}
            onChange={toggleRecived}
          />
          <Checkbox
            label="Sem resposta"
            checked={noAnswer}
            onChange={toggleNoAnswer}
          />
        </Options>
      </Container>
    );
  }
}

Filters.propTypes = {
  AppStore: PropTypes.shape({ // eslint-disable-line react/require-default-props
    OrdersStore: PropTypes.shape(),
  }),
};

export default Filters;
