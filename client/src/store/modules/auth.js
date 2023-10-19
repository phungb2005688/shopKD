import api from "@/helpers/api";
import Cookies from "js-cookie";

const authModule = {
    namespaced: true,
    state: {
        account: Cookies.get("account") ? Cookies.get("account") : {},
        token: Cookies.get("token") ? Cookies.get("token") : "",
    },
    getters: {

    },
    mutations: {
        setAccount(state, payload) {
            state.account = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
    },
    actions: {
        async register({ commit }, payload) {
            commit('setLoading', true, { root: true })
            try {
                const res = await api.post("/auth/register", payload)
                

                Cookies.set("account", JSON.stringify(res.data.user));
                Cookies.set("token", res.data.token);
                console.log(res.data);                
                commit("setLoading", false, { root: true });

            } catch (error) {
                commit("setLoading", false, { root: true });
                console.log(error.message);
            }
        },
        async login({ commit }, payload) {
            commit('setLoading', true, { root: true })
            try {
                const res = await api.post("/auth/login", payload)
               
                // commit("setAccount", res.data.user);
                // commit("setToken", res.data.token);

                Cookies.set("account", JSON.stringify(res.data.user));
                Cookies.set("token", res.data.token);
                console.log(res.data);
                commit("setLoading", false, { root: true });

            } catch (error) {
                commit("setLoading", false, { root: true });
                console.log(error.message);
            }
        },
    },
};
export default authModule;