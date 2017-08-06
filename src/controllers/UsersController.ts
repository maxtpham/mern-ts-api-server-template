import { injectable, inject } from 'inversify';
import { injectableSingleton } from "../lib/IocContainer";
import { Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';
import { User, UserCreationRequest } from '../entities/user';
import { UserService } from "../services/UserService";

//@injectable()
@injectableSingleton(UsersController)
@Route('v1/users')
export class UsersController {
    @inject(UserService) private userService: UserService;

    @Get('{id}')
    public async getUser(id: number, @Query() name: string): Promise<User> {
        return this.userService.getUser(id);
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createUser(@Body() requestBody: UserCreationRequest): Promise<void> {
        console.log("user-created", requestBody);
        //UsersController.users
        //this.setStatus(201); // set return status 201
        return Promise.resolve();
    }

    // @Get('{id}')
    // public async getPrivateUser(@Path('id') ID: number, @Header('Authorization') authorization: string): Promise<User> {
    //     console.log("user-gettingPrivate");
    //     return Promise.resolve(UsersController.users[ID]);
    // }
}