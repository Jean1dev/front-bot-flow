import { httpApiGerenciamentoDados } from '../api-defaults';

export const anomaliasAcessoApi = {
  listar() {
    return httpApiGerenciamentoDados.get('/anomalias-acesso');
  },
  listarPorPeriodo(inicio, fim) {
    return httpApiGerenciamentoDados.get('/anomalias-acesso/periodo', {
      params: { inicio, fim },
    });
  },
};
