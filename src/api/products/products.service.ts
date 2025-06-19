import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { createProductDto } from './dtos/product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilters } from './models/filters';

@Injectable()
export class ProductsService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  public async getProductsByUser(email: string) {
    const user = await this.authService.getUser(email);

    const products = await this.productRepository.find({
      where: { user: { id: user.id } },
    });

    return products;
  }

  public async create(payload: createProductDto, userEmail: string) {
    const user = await this.authService.getUser(userEmail);
    const product = this.productRepository.create({
      ...payload,
      user
    });

    return await this.productRepository.save(product);
  }

  public async getFilteredProducts(filter: ProductFilters) {
    const query = this.productRepository.createQueryBuilder('product');

    if (filter.search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.sku ILIKE :search)',
        {search: `%${filter.search}%`});
    }

    if (!isNaN(filter.min)) {
      query.andWhere('product.price >= :min', {min: filter.min});
    }

    if (!isNaN(filter.max)) {
      query.andWhere('product.price <= :max', {max: filter.max});
    }

    return await query.getMany();
  }

  
}
