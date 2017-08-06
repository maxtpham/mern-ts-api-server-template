import { injectable, inject } from 'inversify';
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';
import {User, UserCreationRequest} from '../entities/user';

@injectable()
@Route('v1/users')
export class UsersController {
    static users: Map<number, User> = <Map<number, User>><any>{
        1: <User>{ id: 1, email: 'a@b.com', status: 'Happy' }
    };

    @Get('{id}')
    public async getUser(id: number, @Query() name: string): Promise<User> {
        console.log("user-getting");
        return Promise.resolve(UsersController.users[id]);
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