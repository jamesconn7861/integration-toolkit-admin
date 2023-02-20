import { defineStore } from 'pinia';
import axios, { type AxiosInstance } from 'axios';
import MessageBox from '@/utils/messagebox';

const _url: string =
  import.meta.env.MODE == 'development'
    ? 'https://integration-toolkit.pomeroy.com/dev/api'
    : 'https://integration-toolkit.pomeroy.com/dev/api';

export const useUtilStore = defineStore('utils', {
  state: () => ({
    _instance: axios.create({
      baseURL: _url,
      timeout: 5000,
      headers: { Accept: 'application/json,text/html' },
    }) as AxiosInstance,
    _user: undefined as iUser | undefined,
    _token: undefined as string | undefined,
    _msgBox: new MessageBox(),
  }),
  actions: {
    setUser(user: iUser | undefined) {
      this._user = user;
    },
    setToken(token: string | undefined) {
      this._token = token;
    },
    async showTempMsg(
      msg: string,
      closeTime: number,
      closeLabel?: string,
      callback?: Function,
    ) {
      this._msgBox.show({ msg, closeTime, closeLabel, callback });
    },

    async showPermMsg(msg: string, closeLabel?: string, callback?: Function) {
      this._msgBox.show({ msg, closeLabel, callback });
    },
  },
  getters: {
    axiosInst(): AxiosInstance {
      return this._instance;
    },
    user(): iUser | undefined {
      return this._user;
    },
    isLoggedIn(): boolean {
      return !!this._token;
    },
  },
});

interface iUser {
  id: number;
  username: string;
  email: string;
  level: number;
}
// const _url: string =
// import.meta.env.MODE == 'development'
//   ? 'https://integration-toolkit.pomeroy.com/dev/api'
//   : 'https://integration-toolkit.pomeroy.com/api';

// const _instance = axios.create({
// baseURL: _url,
// timeout: 5000,
// headers: { Accept: 'application/json,text/html' },
// });

// return {
// get axiosInst() {
//   return _instance;
// },
// };
