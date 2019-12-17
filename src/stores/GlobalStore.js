import { action } from 'mobx';

import { API_ROOT } from '../settings';
import dictionary from '../dictionary';
import { getJson } from '../modules/httpsClient';

class GlobalStore {
  @action
  search = (term) => getJson(`${API_ROOT}/search?term=${encodeURI(term)}`)
    .then(({ data }) => {
      const result = {};

      data.forEach((collection) => {
        result[collection.collection] = {
          name: dictionary.t(`collections.${collection.collection}`),
          results: collection.results.map((item) => ({
            key: item.id,
            title: item.displayName,
          })),
        };
      });

      return result;
    });
}

export default GlobalStore;
