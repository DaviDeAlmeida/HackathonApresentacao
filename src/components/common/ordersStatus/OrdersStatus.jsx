import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowRight } from 'react-icons/md';

import colors from '../../../colors';
import { statusColor, statusNumbers } from '../../../helpers/OrdersStatus';
import StatusBox from '../statusBox/StatusBox';
import {
  Container,
  ExpandButton,
} from './styles';

import './styles.scss';

const getTotalByStatus = (arr, status) => arr
  .filter((item) => item.status === status)
  .reduce((total, item) => total + item.count, 0);

const OrdersStatus = ({
  selectedStatus,
  setStatus,
  totalOrdersByStatus,
}) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const isSelected = (status) => status.length === selectedStatus.length
    && status.sort().every((v, i) => v === selectedStatus.sort()[i]);

  const handleClick = (status) => {
    if (!isSelected(status)) setStatus(status);
  };

  const open = totalOrdersByStatus
    .filter((item) => item.open)
    .reduce((total, item) => total + item.count, 0);

  const pending = getTotalByStatus(totalOrdersByStatus, statusNumbers.pending);
  const scheduled = getTotalByStatus(totalOrdersByStatus, statusNumbers.scheduled);
  const delivered = getTotalByStatus(totalOrdersByStatus, statusNumbers.delivered);
  const canceled = getTotalByStatus(totalOrdersByStatus, statusNumbers.canceled);

  return (
    <Container className="orders-status">
      <StatusBox
        onClick={() => handleClick(statusNumbers.open)}
        color={colors.white}
        label="Todos em aberto"
        quantity={open}
        selected={isSelected(statusNumbers.open)}
      />
      <Fragment>
        <StatusBox
          onClick={() => handleClick([statusNumbers.pending])}
          color={statusColor.pending}
          label="Com pendências"
          quantity={pending}
          selected={isSelected([statusNumbers.pending])}
        />
        <StatusBox
          color={statusColor.scheduled}
          onClick={() => handleClick([statusNumbers.scheduled])}
          label="Agendados"
          quantity={scheduled}
          selected={isSelected([statusNumbers.scheduled])}
        />
        {isExpanded && (
          <Fragment>
            <StatusBox
              color={statusColor.delivered}
              onClick={() => handleClick([statusNumbers.delivered])}
              label="Entregues"
              quantity={delivered}
              selected={isSelected([statusNumbers.delivered])}
            />
            <StatusBox
              color={statusColor.canceled}
              onClick={() => handleClick([statusNumbers.canceled])}
              label="Cancelados"
              quantity={canceled}
              selected={isSelected([statusNumbers.canceled])}
            />
          </Fragment>
        )}
      </Fragment>
      <ExpandButton
        isMobile={false}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MdKeyboardArrowRight
          className={`expanded-button-icon ${isExpanded && 'flipped-icon'}`}
        />
      </ExpandButton>
    </Container>
  );
};

OrdersStatus.propTypes = {
  selectedStatus: PropTypes.instanceOf(Array).isRequired,
  setStatus: PropTypes.func.isRequired,
  totalOrdersByStatus: PropTypes.instanceOf(Array).isRequired,
};

export default OrdersStatus;
