import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';
import { LoginDto } from '../src/auth/dto/login-user.dto';
import { LocalStrategy } from '../src/auth/local_strategy';
// import { JwtStrategy } from '../src/auth/jwt.strategy';


describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authToken: LocalStrategy;

  beforeEach(async () => {
    process.env = {
      DATABASE_URL: 'postgres://localhost:5432/test',
      JWT_SECRET: "mycustomuselongsecret",
      EXPIRESIN: "1h"
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get an unauthorized response', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should return user not found', async () => {
    const loginInfo: LoginDto = {
      username: 'user123',
      password: 'abcdefg',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginInfo);
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  //it('should return a new token', async () => {
  //const loginInfo: LoginDto = {
  //  username: "discussion_believed_pleasant",
  //  password_hash: "044498e8-6478-4184-b26f-d7b9be6a00d1"
  //}; // TO BE CHANGED
  //const response = await request(app.getHttpServer())
  //.post('/auth/login')
  //.send(loginInfo);
  //expect(response.status).toBe(HttpStatus.CREATED);
  //expect(response.body.user.username).toBe('discussion_believed_pleasant');
  //expect(response.body.user.user_id).toBe(1);
  //expect(response.body.user.roles).toStrictEqual(["ADMIN"]);
  //authToken = response.body.token;
  //});

  it('should throw invalid token exception', async () => {
    return request(app.getHttpServer())
    .get('/user/1')
    .set('Authorization', `Bearer ${null}`)
    .expect(HttpStatus.UNAUTHORIZED);
  });

});
