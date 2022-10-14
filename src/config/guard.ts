import { store } from "@/store";

const isAuthenticated = store.getters['UserMd/isUserAuthenticated'];
const isInError = store.getters['UserMd/messageApi'];

export const isAllowedToAccess = (): boolean => {
    //console.log('guard getter', isAuthenticated)
    return isAuthenticated && isInError === null
}
