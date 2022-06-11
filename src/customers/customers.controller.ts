import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CustomersPipe } from './customers.pipe';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customersService.remove(+id);
  }

  @Delete()
  @UsePipes(new CustomersPipe())
  removeMany(@Query('ids') ids: Array<number>) {
    return this.customersService.removeMany(ids);
  }
}
