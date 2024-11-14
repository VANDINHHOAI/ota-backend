import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'user_name không được để trống' })
    user_name: string;

    @IsNotEmpty({ message: 'password không được để trống' })
    @MinLength(6, { message: 'Mật khẩu chứa ít nhất 6 ký tự' })
    password: string;

    @IsNotEmpty({ message: 'email không được để trống' })
    @IsEmail({}, { message: 'email không hợp lệ' })
    email: string;

    @IsNotEmpty({ message: 'name_hotel không được để trống' })
    name_hotel: string;

    @IsNotEmpty({ message: 'hotel_id không được để trống' })
    hotel_id: number;

    @IsNotEmpty({ message: 'role_id không được để trống' })
    role_id: number;

    @IsOptional()
    @MinLength(10, { message: 'Số điện thoại chứa ít nhất 10 ký tự' })
    @MaxLength(15, { message: 'Số điện thoại chứa nhiều nhất 15 ký tự' })
    phone: string;
}
