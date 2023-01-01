import { axios, AxiosResponse } from "@/config/axios";
import { UpdateUserData, UserModel } from "@/models/User";
import { Driver } from "@/models/Driver";

export class UsersSvc {

    getAuthToken = async (user?: UserModel): Promise<AxiosResponse<any, any>> => {
        const response: AxiosResponse = await axios.post('/auth/login', user);
        return response;
    }

    getUserProfile = async (token: {access_token: string}): Promise<AxiosResponse<any, any>> => {
        const response: AxiosResponse = await axios.get('/profile', {
            headers: { Authorization: `Bearer ${token.access_token}` }
        });
        return response;
    }

    getUserPrivateProfile = async (id: number): Promise<AxiosResponse<any, any>> => {
        const response: AxiosResponse = await axios.get(`users/private-profile/${id}`);
        //console.log('svc profile', response);
        return response.data;
    }

    async patchUserPrivateProfile(userData: any): Promise<AxiosResponse> {
        console.log('svc', userData);
        return await axios.patch(`users/private-profile`, userData).then((response: AxiosResponse) => {
            if(response.status === 200) {
                return response.data;
            }
        }).catch((err) => {
            return err;
        });
    };

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
            return err;
        });
    };

    async deleteUserAccount(userId: number): Promise<{ account: "string"}> {
        //console.log("driver response return ", driverInfo);
        const response: AxiosResponse = await axios.delete(`/users/private-profile/${userId}`);
        console.log("delete user account ", response.data);
        return response.data;
    }
}
