import { Routes } from "@nestjs/core";
import { ApiModule } from "./api.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";

export const apiRouter: Routes = [
  {
    path: 'api',
    module: ApiModule,
    children: [
      {path: '/auth', module: AuthModule},
      {path: '/products', module: ProductsModule}
    ]
  }
];