import i18next from 'i18next';
import { DEFAULT_LANGUAGE } from './settings';

i18next
  .init({
    interpolation: {
      escapeValue: false,
    },
    lng: DEFAULT_LANGUAGE,
    resources: {
      ptBr: {
        translation: {
          header: {
            orders: 'Pedidos',
            deliveries: 'Entregas',
            searchFor: 'Buscar por...',
            summary: 'Resumo',
            history: 'Histórico',
          },
          collections: {
            orders: 'Pedidos',
            products: 'Produtos',
            productCategories: 'Categorias de produto',
            deliveries: 'Entregas',
            warehouses: 'Depósitos',
            suppliers: 'Fornecedores',
          },
        },
      },
      english: {
        translation: {
          header: {
            orders: 'Orders',
            deliveries: 'Deliveries',
            searchFor: 'Search',
            summary: 'Summary',
            history: 'History',
          },
        },
      },
    },
  });

export default i18next;
