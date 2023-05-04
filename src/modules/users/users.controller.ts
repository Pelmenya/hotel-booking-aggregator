import {
    Body,
    Controller,
    Put,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './types/update-user-dto';
import { IUser } from './types/i-user';
import { RolesGuard } from 'src/guards/roles.guard';
import { populateUserParam } from './users.constants';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles('client', 'manager', 'admin')
    @Put('avatars')
    @UseInterceptors(FilesInterceptor('avatars'))
    async updateUserAvatar(
        @UploadedFiles() files: Express.Multer.File[],
        @Req() req: Express.Request & { user: IUser },
        @Body()
        dto: UpdateUserDto,
    ) {
        const { user } = req;
        const updateUser = (
            await this.usersService.updateUser(user, files, dto)
        ).populate(populateUserParam);
        return updateUser;
    }
}
