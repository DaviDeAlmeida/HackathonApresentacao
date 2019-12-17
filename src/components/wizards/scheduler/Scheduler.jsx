/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import history from '../../../history';
import { loadFromFile } from '../../../modules/xlsx';
import File from '../../common/input/file/File';
import Wizard from '../../common/wizard/Wizard';
import Items from './items/Items';
import DateSelection from './dateSelection/DateSelection';
import Summary from './summary/Summary';

@inject('AppStore')
@observer
class Scheduler extends Component {
  componentWillUnmount() {
    const {
      AppStore: {
        SchedulerStore: {
          reset,
        },
      },
    } = this.props;

    reset();
  }

  render() {
    const {
      AppStore: {
        SchedulerStore: {
          loadItemsFromFile,
          selectedInterval,
          finish,
          selectedDate,
          selected: {
            quantity,
          },
          data: {
            supplier,
            warehouse,
          },
        },
      },
      onFinish,
    } = this.props;

    return (
      <Wizard
        title={`Solicitar agendamento (${supplier.name || ''} / ${warehouse.description || ''})`}
        steps={[
          {
            title: 'Seleção de itens',
            content: <Items />,
            options: <File
              text="Importar"
              accept=".xlsx"
              onChange={(e) => {
                loadFromFile(e.target.files[0], (data) => loadItemsFromFile(data));
              }}
            />,
            condition: quantity > 0,
          },
          {
            title: 'Data de entrega',
            content: <DateSelection />,
            condition: selectedDate != null && selectedInterval != null,
          },
          {
            title: 'Resumo',
            content: <Summary />,
          },
        ]}
        onFinish={() => finish(onFinish)}
        onCancel={() => history.push('/pedidos')}
      />
    );
  }
}

Scheduler.propTypes = {
  onFinish: PropTypes.func.isRequired,
  AppStore: PropTypes.shape(), // eslint-disable-line react/require-default-props
};

export default Scheduler;
