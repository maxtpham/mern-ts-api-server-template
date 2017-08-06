import { inject } from 'inversify';
import { injectableSingleton } from "../lib/IocContainer";
import { Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';
import { Test, TestCreationRequest } from '../entities/test';
import { TestService } from "../services/TestService";

@injectableSingleton(TestController)
@Route('v1/test')
export class TestController {
    @inject(TestService) private userService: TestService;

    @Get('{id}')
    public async getTest(id: number, @Query() name: string): Promise<Test> {
        return this.userService.getTest(id);
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createTest(@Body() requestBody: TestCreationRequest): Promise<void> {
        console.log("user-created", requestBody);
        //TestController.users
        //this.setStatus(201); // set return status 201
        return Promise.resolve();
    }

    // @Get('{id}')
    // public async getPrivateTest(@Path('id') ID: number, @Header('Authorization') authorization: string): Promise<Test> {
    //     console.log("user-gettingPrivate");
    //     return Promise.resolve(TestController.users[ID]);
    // }
}