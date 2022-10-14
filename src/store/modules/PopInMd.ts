import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
    namespaced: true,
})
export default class PopInMd extends VuexModule {
    private openPopIn = false;

    get popInState(): boolean {
        return this.openPopIn;
    }

    @Mutation
    setPopIn(popIn: boolean): void {
        this.openPopIn = popIn;
    }

    @Action({ rawError: true })
    popInChangeState(value: boolean): void {
         this.context.commit("setPopIn", value);
    }
}
