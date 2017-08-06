import { provideSingleton  } from "../lib/IocContainer";
import { User } from "../entities/user";

@provideSingleton(UserService)
export class UserService {
    private users: Map<number, User> = <Map<number, User>><any>{
        1: <User>{ id: 1, email: 'a@b.com', status: 'Happy' }
    };

    constructor() {
    }

    /**
     * getUser
     */
    public async getUser(id: number): Promise<User> {
        console.log("user-getting");
        return Promise.resolve(this.users[id]);
    }
}