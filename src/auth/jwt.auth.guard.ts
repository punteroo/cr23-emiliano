import { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // Use an HTTP context to return the request as-is.
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return request;
  }
}
