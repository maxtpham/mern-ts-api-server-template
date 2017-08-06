import { injectableSingleton  } from "../lib/IocContainer";
import { Test } from "../entities/test";

@injectableSingleton(TestService)
export class TestService {
    private tests: Map<number, Test> = <Map<number, Test>><any>{
        1: <Test>{ id: 1, name: 'Test execution' }
    };

    constructor() {
    }

    /**
     * getTest
     */
    public async getTest(id: number): Promise<Test> {
        console.log("test-getting");
        return Promise.resolve(this.tests[id]);
    }
}