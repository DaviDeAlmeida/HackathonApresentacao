import colors from '../colors';

const statusColor = {
  pending: colors.orangeA,
  scheduled: colors.purple,
  delivered: colors.green,
  canceled: colors.blueD,
};

const getColorByStatus = (status) => {
  switch (status) {
    case 1:
    case '1':
      return statusColor.pending;
    case 2:
    case '2':
      return statusColor.scheduled;
    case 3:
    case '3':
      return statusColor.delivered;
    case 4:
    case '4':
      return statusColor.canceled;
    default:
      return colors.white;
  }
};

const statusText = {
  pending: 'Com pendências',
  scheduled: 'Agendado',
  delivered: 'Entregue',
  canceled: 'Cancelado',
};

const statusName = {
  1: 'pending',
  2: 'scheduled',
  3: 'delivered',
  4: 'canceled',
};

const statusNumbers = {
  open: [1, 2],
  pending: 1,
  scheduled: 2,
  delivered: 3,
  canceled: 4,
};

const getStatus = (status) => (typeof (status) === 'number' ? statusName[status] : status);
const getTextByStatus = (status) => statusText[statusName[status]];

export {
  statusColor,
  getColorByStatus,
  statusText,
  getStatus,
  getTextByStatus,
  statusNumbers,
};
