import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class localStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authS: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string) {
    const authVerify = await this.authS.validateAuth(username, password);
    if (!authVerify)
      throw new UnauthorizedException(
        'Your username or password are not valid',
      );

    return authVerify;
  }
}