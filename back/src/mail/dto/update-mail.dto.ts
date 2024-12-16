import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMailDto {
  @IsString()
  @IsOptional()
  theme: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  to: string;

  @IsBoolean()
  @IsOptional()
  draft: boolean;
}
