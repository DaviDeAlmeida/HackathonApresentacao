const ROLE_PREFIX = 'AccuScheduler';
const _buildRole = (role) => `${ROLE_PREFIX}_${role}`;

export const roles = {
  admin: _buildRole('Administrator'),
  analyst: _buildRole('Analyst'),
  supplier: _buildRole('Supplier'),
  warehouse: _buildRole('Warehouse'),
};

const names = {
  [roles.admin]: 'Administrador',
  [roles.analyst]: 'Analista',
  [roles.supplier]: 'Fornecedor',
  [roles.warehouse]: 'Centro de distribuição',
};

export const getRoleName = (role) => names[role];
