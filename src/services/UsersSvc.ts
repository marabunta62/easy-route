import { axios, AxiosResponse } from "@/config/axios";
import { UserAPiNest, UserModel } from "@/models/User";
import UserMd from "@/store/modules/UserMd";

export class UsersSvc {
    getAuthToken = async (user?: UserModel): Promise<AxiosResponse<any, any>> => {
        const response: AxiosResponse = await axios.post("/auth/login", user);
        return response;
    }

    getUserProfile = async (token: {access_token: string}): Promise<AxiosResponse<any, any>> => {
        const response: AxiosResponse = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${token.access_token}` }
        });
        return response;
    }

    async getAuthenticatedUser(user: UserModel): Promise<AxiosResponse<any, any>> {
        return this.getAuthToken(user).then((response: AxiosResponse) => {
            if (response.status === 201) {
                return this.getUserProfile(response.data)
                    .then((response: AxiosResponse) => {
                        if (response.status === 200) {
                            return response.data;
                        }
                }).catch((err) => { return err })
            }
        }).catch((err) => {
            return err
        });
    }
}
