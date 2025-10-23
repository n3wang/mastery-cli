# NestJS Concepts Flashcards - Docmost Project

## Dependency Injection and Injectable Services
NestJS uses dependency injection to manage service instances and their dependencies. Services are marked with @Injectable() and injected into constructors:

```typescript
@Injectable()
export class AuthService {
  constructor(
    private signupService: SignupService,
    private tokenService: TokenService,
    private userRepo: UserRepo,
    private mailService: MailService,
    @InjectKysely() private readonly db: KyselyDB,
  ) {}

  async login(loginDto: LoginDto, workspaceId: string) {
    const user = await this.userRepo.findByEmail(loginDto.email, workspaceId);
    // authentication logic
  }
}
```

Dependencies are automatically injected by the NestJS container based on types.
:p How does dependency injection work in NestJS and what are its benefits?
??x
NestJS uses constructor injection where dependencies are automatically provided by the IoC container.
Services marked with @Injectable() can be injected into other classes.
Benefits: Loose coupling, easier testing with mocks, automatic lifecycle management.
Example:
```typescript
@Injectable()
class UserService {
  constructor(private userRepo: UserRepo) {}
}
```
x??

---

#### Controllers and Route Handlers
Controllers handle HTTP requests and define API endpoints using decorators. Docmost uses them to expose authentication endpoints:

```typescript
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @AuthWorkspace() workspace: Workspace,
    @Res({ passthrough: true }) res: FastifyReply,
    @Body() loginInput: LoginDto,
  ) {
    const authToken = await this.authService.login(loginInput, workspace.id);
    this.setAuthCookie(res, authToken);
  }
}
```

Route decorators (@Get, @Post) define HTTP methods and paths.
:p How do NestJS controllers handle HTTP requests and define API routes?
??x
Controllers use decorators to define routes: @Controller() for base path, @Get/@Post for HTTP methods.
Method parameters use decorators like @Body(), @Param(), @Query() to extract request data.
Controllers delegate business logic to services and return responses.
Example:
```typescript
@Controller('users')
class UserController {
  @Get(':id')
  findOne(@Param('id') id: string) {}
}
```
x??

---

#### Data Transfer Objects (DTOs) and Validation
DTOs define the shape of data for API requests and responses, with built-in validation using class-validator:

```typescript
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

// In controller:
async login(@Body() loginInput: LoginDto) {
  // loginInput is automatically validated
}
```

DTOs provide type safety and automatic validation of incoming requests.
:p What are DTOs in NestJS and how do they provide validation?
??x
DTOs (Data Transfer Objects) define the structure of data for API requests/responses.
They use class-validator decorators for automatic validation (IsEmail, MinLength, etc.).
NestJS automatically validates request bodies against DTO schemas before reaching controllers.
Example:
```typescript
class CreateUserDto {
  @IsEmail()
  email: string;
  
  @MinLength(8)
  password: string;
}
```
x??

---

#### Guards and Authentication
Guards control access to routes based on authentication and authorization logic:

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    return super.canActivate(context);
  }
}

// Usage in controller:
@UseGuards(JwtAuthGuard)
@Post('protected-endpoint')
async protectedRoute(@AuthUser() user: User) {
  // Only authenticated users can access this
}
```

Guards implement CanActivate interface and return true/false for access control.
:p How do NestJS guards provide authentication and authorization?
??x
Guards implement the CanActivate interface to control route access.
They return true/false or throw exceptions to allow/deny access.
Can be applied globally, to controllers, or specific routes using @UseGuards().
Common types: AuthGuard for authentication, RoleGuard for authorization.
Example:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get('admin-only')
```
x??

---

#### Custom Decorators for Parameter Extraction
NestJS allows creating custom decorators to extract specific data from requests:

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage:
@Get('profile')
async getProfile(@AuthUser() user: User) {
  return user;
}
```

Custom decorators encapsulate common parameter extraction logic.
:p How do custom decorators work in NestJS and when should you use them?
??x
Custom decorators extract specific data from the request context using createParamDecorator.
They encapsulate common logic like getting the current user, workspace, or request metadata.
Benefits: Cleaner controller methods, reusable logic, better type safety.
Example:
```typescript
const AuthUser = createParamDecorator(
  (data, ctx) => ctx.switchToHttp().getRequest().user
);
```
x??

---

#### Exception Handling and HTTP Status Codes
NestJS provides built-in exceptions that map to HTTP status codes:

```typescript
@Injectable()
export class AuthService {
  async login(loginDto: LoginDto, workspaceId: string) {
    const user = await this.userRepo.findByEmail(loginDto.email, workspaceId);
    
    if (!user) {
      throw new UnauthorizedException('Email or password does not match');
    }
    
    if (!user.isActive) {
      throw new BadRequestException('Account is deactivated');
    }
    
    return this.tokenService.generateToken(user);
  }
}
```

Built-in exceptions automatically set appropriate HTTP status codes and error messages.
:p How does NestJS handle exceptions and HTTP status codes?
??x
NestJS provides built-in exception classes that automatically set HTTP status codes.
Common exceptions: BadRequestException (400), UnauthorizedException (401), NotFoundException (404).
Exceptions can include custom error messages and additional context.
Example:
```typescript
throw new UnauthorizedException('Invalid credentials');
throw new NotFoundException('User not found');
```
x??

---

#### Database Integration with Repository Pattern
Docmost uses the repository pattern with Kysely for database operations:

```typescript
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async findById(userId: string, workspaceId: string) {
    return this.userRepo.findById(userId, workspaceId);
  }

  async update(updateUserDto: UpdateUserDto, userId: string, workspace: Workspace) {
    const user = await this.userRepo.findById(userId, workspace.id, {
      includePassword: true,
    });
    
    return this.userRepo.update(userId, updateUserDto);
  }
}
```

Repository pattern abstracts database operations and provides a clean service interface.
:p What is the repository pattern and how does it work with databases in NestJS?
??x
Repository pattern abstracts database operations behind a consistent interface.
Services depend on repository interfaces, not concrete database implementations.
Benefits: Easier testing with mocks, database-agnostic code, separation of concerns.
Example:
```typescript
class UserService {
  constructor(private userRepo: UserRepo) {}
  
  async findUser(id: string) {
    return this.userRepo.findById(id);
  }
}
```
x??

---

#### Middleware and Request Processing
NestJS middleware processes requests before they reach route handlers:

```typescript
@Injectable()
export class DomainMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract workspace from domain/subdomain
    const workspace = this.extractWorkspaceFromDomain(req.headers.host);
    req.workspace = workspace;
    next();
  }
}

// Apply globally or to specific routes
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DomainMiddleware).forRoutes('*');
  }
}
```

Middleware can modify requests, add context, or perform authentication checks.
:p How does middleware work in NestJS and what is it used for?
??x
Middleware functions execute before route handlers and can modify request/response objects.
Implement NestMiddleware interface with use() method.
Common uses: logging, authentication, CORS, request transformation.
Applied using MiddlewareConsumer in module configuration.
Example:
```typescript
@Injectable()
class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log('Request...', req.url);
    next();
  }
}
```
x??

---

#### Module System and Organization
NestJS organizes code into modules that group related functionality:

```typescript
@Module({
  imports: [TokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, SignupService],
  exports: [AuthService],
})
export class AuthModule {}

// Core module that imports feature modules
@Module({
  imports: [
    AuthModule,
    UserModule,
    PageModule,
    SpaceModule,
  ],
})
export class CoreModule {}
```

Modules encapsulate features and control dependency visibility through imports/exports.
:p How do NestJS modules organize code and manage dependencies?
??x
Modules group related controllers, services, and providers together.
@Module decorator defines imports (dependencies), providers (services), controllers, and exports.
Modules control scope and visibility of dependencies across the application.
Example:
```typescript
@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
class UserModule {}
```
x??

---

#### Response Handling and HTTP Codes
NestJS controllers can control response status codes and headers:

```typescript
@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res({ passthrough: true }) res: FastifyReply) {
    const authToken = await this.authService.login();
    
    // Set HTTP-only cookie
    res.setCookie('authToken', token, {
      httpOnly: true,
      secure: true,
      path: '/',
    });
    
    return { success: true };
  }
}
```

@HttpCode() sets custom status codes, @Res() provides access to response object.
:p How do you handle HTTP responses and status codes in NestJS?
??x
Use @HttpCode() decorator to set custom HTTP status codes for endpoints.
@Res() decorator provides access to the response object for headers, cookies, etc.
Controllers can return objects (auto-serialized to JSON) or use response object directly.
Example:
```typescript
@HttpCode(HttpStatus.CREATED)
@Post()
create() { return { id: 1 }; }
```
x??

---

#### Type Safety with TypeScript Integration
NestJS leverages TypeScript for compile-time type checking and better developer experience:

```typescript
interface UserFindOptions {
  includePassword?: boolean;
  includeDeleted?: boolean;
}

@Injectable()
export class UserService {
  async findById(
    userId: string, 
    workspaceId: string, 
    options?: UserFindOptions
  ): Promise<User | null> {
    return this.userRepo.findById(userId, workspaceId, options);
  }
}
```

TypeScript interfaces and types provide compile-time safety and IDE autocomplete.
:p How does NestJS leverage TypeScript for better development experience?
??x
NestJS is built with TypeScript and provides full type safety throughout the framework.
Decorators, dependency injection, and parameter types are all type-checked at compile time.
Benefits: Better IDE support, catch errors early, self-documenting code.
Example:
```typescript
@Injectable()
class UserService {
  async findUser(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }
}
```
x??

---

#### Environment Configuration and Validation
NestJS applications use configuration services for environment-specific settings:

```typescript
@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  isHttps(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  getCookieExpiresIn(): Date {
    const days = this.configService.get<number>('COOKIE_EXPIRES_DAYS', 30);
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
```

ConfigService provides type-safe access to environment variables with defaults.
:p How do you handle configuration and environment variables in NestJS?
??x
Use ConfigService to access environment variables in a type-safe way.
Can provide default values and validate configuration on startup.
Environment variables are typically loaded from .env files.
Example:
```typescript
@Injectable()
class AppService {
  constructor(private config: ConfigService) {}
  
  getPort() {
    return this.config.get<number>('PORT', 3000);
  }
}
```
x??