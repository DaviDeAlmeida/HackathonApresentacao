
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line
import querystring from 'querystring';

import { sendEvent } from '../analytics';

const formatErrorResponse = (err, apiUrl, verb) => {
  const out = {
    error: {
      axiosMessage: err.toString(),
    },
  };

  if (err.response) {
    const { status, data } = err.response;

    if (status) out.error.status = status;
    if (data) out.error.data = data; // corpo da resposta

    let errorMessage = data;
    if (typeof data === 'object') errorMessage = JSON.stringify(data);

    let errorType = 'Error';

    if (status >= 300 && status < 400) {
      errorType = 'Redirect';
    } else if (status >= 400 && status < 500) {
      errorType = 'Client Error';
    } else if (status >= 500 && status < 600) {
      errorType = 'Server Error';
    }

    sendEvent(`API - Endpoint retornou ${errorType}`, `${verb} - ${apiUrl}`, `${apiUrl} - ${errorType}: [${status}] ${errorMessage}`, 1, true);

  } else {
    sendEvent('API - Endpoint não respondeu', `${verb} - ${apiUrl}`, `${apiUrl} - [n/a] ${out.error.axiosMessage}`, 1, true);
  }

  return out;
};

const getJson = async (url, queryParams, secondaryHeader, withCredentials = false) => {
  let response;

  const headers = {
    ...secondaryHeader,
  };

  const params = {
    ...queryParams,
  };

  try {
    response = await axios.get(url, {
      headers,
      withCredentials,
      params: {
        ...params,
      },
      paramsSerializer: (p) => querystring.stringify(p),
    });
  } catch (err) {
    return formatErrorResponse(err, url, 'get');
  }

  sendEvent('API - Endpoint com sucesso', `GET - ${url}`, url, 1, true);

  return response.data;
};

const postJson = async (url, body, secondaryHeader, withCredentials = true) => {
  let response;

  try {
    response = await axios.post(url, body, {
      headers: {
        ...secondaryHeader,
      },
      withCredentials,
    });

  } catch (err) {
    return formatErrorResponse(err, url, 'post');
  }

  sendEvent('API - Endpoint com sucesso', `POST - ${url}`, url, 1, true);

  return response.data;
};

const putJson = async (url, body, secondaryHeader, withCredentials = true) => {
  let response;

  try {
    response = await axios.put(url, body, {
      headers: {
        ...secondaryHeader,
      },
      withCredentials,
    });

  } catch (err) {
    return formatErrorResponse(err, url, 'put');
  }

  sendEvent('API - Endpoint com sucesso', `PUT - ${url}`, url, 1, true);
  return response;
};

const deleteJson = async (url, secondaryHeader, withCredentials = true) => {
  let response;

  try {
    response = await axios.delete(url, {
      headers: {
        ...secondaryHeader,
      },
      withCredentials,
    });
  } catch (err) {
    return formatErrorResponse(err, url, 'delete');
  }

  sendEvent('API - Endpoint com sucesso', `DELETE - ${url}`, url, 1, true);

  return response;
};

export {
  getJson,
  postJson,
  putJson,
  deleteJson,
};
