import colors from '../colors';

const statusColor = {
  pending: colors.orangeA,
  scheduled: colors.purple,
  delivered: colors.green,
  canceled: colors.blueD,
  noShow: colors.red,
};

const getColorByStatus = (status) => {
  switch (status) {
    case 1:
      return statusColor.pending;
    case 2:
      return statusColor.scheduled;
    case 3:
      return statusColor.delivered;
    case 4:
      return statusColor.canceled;
    case 5:
      return statusColor.noShow;
    default:
      return colors.white;
  }
};

const statusText = {
  pending: 'Com pendências',
  scheduled: 'Agendada',
  delivered: 'Entregue',
  canceled: 'Cancelada',
  noShow: 'No show',
};

const statusName = {
  1: 'pending',
  2: 'scheduled',
  3: 'delivered',
  4: 'canceled',
  5: 'noShow',
};

const statusNumbers = {
  open: [1, 2],
  pending: 1,
  scheduled: 2,
  delivered: 3,
  canceled: 4,
  noShow: 5,
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
