import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ID } from 'src/types/id';
import { SearchRoomsParams } from '../hotel-rooms/types/search-rooms-params';
import { SearchHotelParams } from '../hotels/types/search-hotel-params';
import { SupportRequestsClientService } from '../support-requests/support-requests-client.service';
import { SupportRequestsEmployeeService } from '../support-requests/support-requests-employee.service';
import { SupportRequestsService } from '../support-requests/support-requests.service';
import { MarkMessagesAsReadDto } from '../support-requests/types/mark-messages-as-read.dto';
import { IUser } from '../users/types/i-user';
import { CommonService } from './common.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from '../users/types/update-user-dto';

@UseGuards(RolesGuard)
@Controller('common')
export class CommonController {
    constructor(
        private readonly commonService: CommonService,
        private readonly supportRequestsService: SupportRequestsService,
        private readonly supportRequestsClientService: SupportRequestsClientService,
        private readonly supportRequestsEmployeeService: SupportRequestsEmployeeService,
    ) {}

    // Доделать
    @Get('hotels')
    async getHotels(@Query() params: SearchHotelParams) {
        return await this.commonService.getHotels(params);
    }

    @Get('hotels/:id')
    async getHotelById(@Param('id', IdValidationPipe) id: ID) {
        return await this.commonService.getHotelById(id);
    }

    @Get('hotel-rooms')
    async getHotelRooms(
        @Req() req: Express.Request & { user: IUser },
        @Query() query: SearchRoomsParams,
    ) {
        let queryParams = { ...query };
        if (!req.isAuthenticated() || req?.user?.role === 'client') {
            queryParams = { ...queryParams, isEnabled: true };
        }

        return await this.commonService.getHotelRooms(queryParams);
    }

    @Get('hotel-rooms/:id')
    async getHotelRoom(@Param('id', IdValidationPipe) id: ID) {
        return await this.commonService.getHotelRoom(id);
    }

    @Roles('client', 'manager')
    @Get('support-requests/:id/messages')
    async getMessages(
        @Req() req: Express.Request & { user: IUser },
        @Param('id', IdValidationPipe) id: ID,
    ) {
        const { user } = req;
        await this.supportRequestsService.hasSupportRequest(user, id);
        return this.supportRequestsService.getMessages(id);
    }

    @Roles('client', 'manager')
    @Post('support-requests/:id/messages')
    async sendMessages(
        @Req() req: Express.Request & { user: IUser },
        @Param('id', IdValidationPipe) id: ID,
        @Body('text') text: string,
    ) {
        const { user } = req;
        await this.supportRequestsService.hasSupportRequest(user, id);
        return this.supportRequestsService.sendMessage({
            author: user._id,
            supportRequest: id,
            text,
        });
    }

    @Roles('client', 'manager')
    @Post('support-requests/:id/messages/read')
    @HttpCode(200)
    async markMessagesAsRead(
        @Req() req: Express.Request & { user: IUser },
        @Param('id', IdValidationPipe) id: ID,
        @Body() dto: MarkMessagesAsReadDto,
    ) {
        const { user } = req;
        await this.supportRequestsService.hasSupportRequest(user, id);
        if (user.role === 'client') {
            return this.supportRequestsClientService.markMessagesAsRead({
                user: user._id,
                supportRequest: id,
                createdBefore: dto.createdBefore,
            });
        }
        return this.supportRequestsEmployeeService.markMessagesAsRead({
            user: user._id,
            supportRequest: id,
            createdBefore: dto.createdBefore,
        });
    }

    @Roles('client', 'manager', 'admin')
    @Get('profile')
    async getUser(@Req() req: Express.Request & { user: IUser }) {
        const user = await this.commonService.getUser(req.user._id);
        const {
            _id: id,
            email,
            emailIsConfirm,
            name,
            role,
            contactPhone,
            avatars,
        } = user;
        return {
            id,
            email,
            emailIsConfirm,
            name,
            role,
            contactPhone,
            avatars,
        };
    }

    @Roles('client', 'manager', 'admin')
    @Put('profile')
    @UseInterceptors(FilesInterceptor('avatars'))
    async updateUser(
        @UploadedFiles() files: Express.Multer.File[],
        @Req() req: Express.Request & { user: IUser },
        @Body()
        dto: UpdateUserDto,
    ) {
        const { user } = req;
        const updateUser = await this.commonService.updateUser(
            user,
            files,
            dto,
        );

        return updateUser;
    }
}
