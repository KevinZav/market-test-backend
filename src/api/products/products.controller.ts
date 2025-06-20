import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { createProductDto } from './dtos/product.dto';
import { ProductFilters } from './models/filters';
import { RoleEnum } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller()
@ApiTags('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status:200, schema: { example: { products: [] } } })
  async getProducts(@Request() req) {
    const user = req.user;
    const products = await this.productsService.getProductsByUser(user.email);
    
    return {
      products
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiResponse({ status:200, schema: { example: { id: 1, name: 'string' } } })
  async createProduct(@Body() payload: createProductDto, @Request() req) {
    const { email } = req.user;

    return await this.productsService.create(payload, email);
  }

  @Get('all')
  @ApiResponse({ status:200, schema: { example: { products: [] } } })
  async getProductsToClient(
    @Query('search') search: string,
    @Query('min') min: string,
    @Query('max') max: string
  ) {
    const parsedMin = parseFloat(min);
    const parsedMax = parseFloat(max);
    const filter: ProductFilters = {search, min: parsedMin, max: parsedMax};

    const products = await this.productsService.getFilteredProducts(filter);

    return {
      products
    };
  }

  @UseGuards(new RolesGuard(RoleEnum.admin))
  @UseGuards(AuthGuard('jwt'))
  @Get('by-seller')
  @ApiResponse({ status:200, schema: { example: { products: [] } } })
  async getProductsForSeller(
    @Query('email') email: string
  ) {
    const products = await this.productsService.getProductsByUser(email);
    
    return {
      products
    };
  }

}
