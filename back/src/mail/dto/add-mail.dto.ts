import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class AddMailDto {
  @IsString({ message: 'Текст должен быть типа string' })
  theme: string;

  @IsString({ message: 'Поле "Кому" должна быть типа string' })
  @IsNotEmpty({ message: 'Поле "Кому" не может быть пустым' })
  to: string;

  @IsString({ message: 'Текст должен быть типа string1' })
  @IsOptional()
  text: string;

  @IsOptional()
  @IsBoolean()
  draft?: boolean;
}
