import { Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import configEnvironment from "src/config/config-environment";
import { JwtTokenPayload } from "../models/token-jwt";

export class jwtStrategySecret extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(@Inject(configEnvironment.KEY) private configS: ConfigType<typeof configEnvironment>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configS.jwtSeed.secret || '',
    });
  }

  validate(payload: JwtTokenPayload) {
    return {
      name: payload.name,
      email: payload.email,
      role: payload.role
    };
  }
}