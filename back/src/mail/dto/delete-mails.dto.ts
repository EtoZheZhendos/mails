import {IsArray, IsNumber} from 'class-validator'

export class DelteMailsDto {
  @IsArray({message:'Поле id должно быть масивом'})
  @IsNumber({}, {each: true, message: 'Каждый элемеент масива должен быть числом'})
  id: number [];
}