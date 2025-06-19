import { Body, Controller, Get, ParseFloatPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { createProductDto } from './dtos/product.dto';
import { ProductFilters } from './models/filters';
import { Roles } from '../auth/guards/roles/roles.decorator';
import { RoleEnum } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  async getProducts(@Request() req) {
    const user = req.user;
    const products = await this.productsService.getProductsByUser(user.email);
    
    return {
      products
    }
  }

  @Post()
  async createProduct(@Body() payload: createProductDto, @Request() req) {
    const { email } = req.user;

    return await this.productsService.create(payload, email);
  }

  @UseGuards(new RolesGuard(RoleEnum.client))
  @Get('all')
  async getProductsToClient(
    @Query('search') search: string,
    @Query('min') min: string,
    @Query('max') max: string
  ) {
    const parsedMin = parseFloat(min);
    const parsedMax = parseFloat(max);
    const filter: ProductFilters = {search, min: parsedMin, max: parsedMax};

    return await this.productsService.getFilteredProducts(filter);
  }

  @UseGuards(new RolesGuard(RoleEnum.admin))
  @Get('by-seller')
  async getProductsForSeller(
    @Query('email') email: string
  ) {
    return await this.productsService.getProductsByUser(email);
  }

}
