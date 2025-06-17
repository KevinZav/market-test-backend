import { Routes } from "@nestjs/core";
import { ApiModule } from "./api/api.module";

export const appRoutes: Routes = [{path: 'api', module: ApiModule}]