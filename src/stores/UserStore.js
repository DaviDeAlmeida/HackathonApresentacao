import { action, observable } from 'mobx';

import { API_ROOT } from '../settings';
import { getJson, postJson } from '../modules/httpsClient';
import history from '../history';

class UsersStore {

  @observable user = {};

  @observable users = [];

  @observable registerErros = [];

  @observable isLoading = false;

  //graficos
  @observable lista = '';

  @action setLista = (lista) => {
    this.lista = lista;
  }



  @action loadAll = () => {
    this.isLoading = true;
    getJson(`${API_ROOT}/users`)
      .then(({ data }) => {
        this.users = data;
        this.isLoading = false;
      });
  }

  @action load = (id) => {
    this.isLoading = true;
    getJson(`${API_ROOT}/users/${encodeURIComponent(id)}`)
      .then(({ data }) => {
        this.user = data;
        this.isLoading = false;
      });
  }

  @action setPropValue = (name, value) => this.user[name] = value;
}

export default UsersStore;
