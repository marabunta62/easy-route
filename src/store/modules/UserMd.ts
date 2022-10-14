import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { UserAPiNest, UserModel } from "@/models/User";
import { UserService } from "@/services/z-index";

@Module({
    namespaced: true,
})
export default class UserMd extends VuexModule {
    private openConnexionPopIn = false;
    private isAuthenticated = false;
    private userAuth: UserModel | null = null;
    private userApiNest: UserAPiNest | null = null;
    private token: string | null = null;
    private message: UserAPiNest | null = null;

    get connexionPopIn(): boolean {
        return this.openConnexionPopIn;
    }

    get userAuthData(): UserModel | null {
        return this.userAuth;
    }

    get isUserAuthenticated(): boolean | null {
        return this.isAuthenticated;
    }

    get localStorageToken(): string | null {
        return this.token;
    }

    get messageApi(): UserAPiNest | null {
        return this.message;
    }

    @Mutation
    setConnexionPopIn(connexionPopIn: boolean): void {
        this.openConnexionPopIn = connexionPopIn;
    }

    @Mutation
    setUserAuthData(user: UserModel): void {
        this.userAuth = user;
    }

    @Mutation
    isAuthenticatedUser(isAuth: boolean): void {
        this.isAuthenticated = isAuth;
    }

    @Mutation
    setLocalStorageToken(token: string | null): void {
        this.token = token;
    }

    @Mutation
    setMessage(message: UserAPiNest | null): void {
        this.message = message;
    }

    @Action({ rawError: true })
    connexionPopInAction(value: boolean): void {
        //this.openConnexionPopIn = true;
        this.context.commit("setConnexionPopIn", value);
    }

    @Action({ rawError: true })
    async disConnexionAction(value: boolean): Promise<void> {
        await this.context.commit("isAuthenticatedUser", false);
        await this.context.commit("setUserAuthData", null);
    }

    @Action({ rawError: true })
    async fetchAuthenticatedUser(user: UserModel): Promise<void> {
        try {
            const userApi = await UserService.getAuthenticatedUser(user);
            //this.context.commit("setLocalStorageToken", token);
            this.context.commit("setUserAuthData", userApi);
            this.context.commit("isAuthenticatedUser", true);
            this.context.commit("setMessage", null);
            if (userApi instanceof Error) {
                console.log('md', userApi.message)
                this.context.commit("setUserAuthData", null);
                this.context.commit("isAuthenticatedUser", false);
                this.context.commit("setMessage", userApi);
            }
        } catch (err) {
            this.context.commit("setUserAuthData", null);
            this.context.commit("isAuthenticatedUser", false);
            throw err;
        }
    }
}
