import {
    Get,
    Query,
    Post,
    Body,
    Controller,
    UseGuards,
    Put,
    Param,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ID } from 'src/types/id';
import { CreateHotelRoomDto } from '../hotel-rooms/types/create-hotel-room.dto';
import { CreateHotelDto } from '../hotels/types/create-hotel.dto';
import { SearchBaseParams } from '../../types/search-base-params';
import { UpdateHotelDto } from '../hotels/types/update-hotel.dto';
import { CreateUserDto } from '../users/types/create-user.dto';
import { SearchUserParams } from '../users/types/search-user-params';
import { AdminService } from './admin.service';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('users')
    @Roles('admin')
    async creatUser(@Body() dto: CreateUserDto) {
        return await this.adminService.createUser(dto);
    }

    @Get('users')
    @Roles('admin')
    async getUsers(@Query() query: SearchUserParams) {
        return await this.adminService.getUsers(query);
    }

    @Post('hotels')
    @Roles('admin')
    async creatHotel(@Body() dto: CreateHotelDto) {
        return await this.adminService.createHotel(dto);
    }

    @Get('hotels')
    @Roles('admin')
    async getHotels(@Query() query: SearchBaseParams) {
        return await this.adminService.getHotels(query);
    }

    @Put('hotels/:id')
    @Roles('admin')
    async updateHotel(
        @Param('id', IdValidationPipe) id: ID,
        @Body() dto: UpdateHotelDto,
    ) {
        return await this.adminService.updateHotel(id, dto);
    }

    @Post('hotel-rooms')
    @Roles('admin')
    @UseInterceptors(FilesInterceptor('images'))
    async creatHotelRoom(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() dto: CreateHotelRoomDto,
    ) {
        return await this.adminService.createHotelRoom(files, dto);
    }

    @Put('hotel-rooms/:id')
    @Roles('admin')
    @UseInterceptors(FilesInterceptor('images'))
    async updateHotelRoom(
        @UploadedFiles() files: Express.Multer.File[],
        @Param('id', IdValidationPipe) id: ID,
        @Body() dto: CreateHotelRoomDto,
    ) {
        return await this.adminService.updateHotelRoom(id, files, dto);
    }
}
