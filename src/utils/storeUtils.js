import store from 'store';
const ACCESS_TOKEN="access_token";
export default {
    saveToken(token){
        store.set(ACCESS_TOKEN,token);
    },

    getToken(){
        return store.get(ACCESS_TOKEN)||"";
    },

    removeToken(){
        store.remove(ACCESS_TOKEN);
    }
}