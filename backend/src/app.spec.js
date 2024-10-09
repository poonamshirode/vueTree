import { expect } from 'chai';
import request from 'supertest';
import app from './app.js';

describe('App', () => {
  describe('Middleware', () => {
    it('should use CORS middleware', () => {
      const hasCorsMiddleware = app._router.stack.some(layer => layer.name === 'corsMiddleware');
      expect(hasCorsMiddleware).to.be.true;
    });

    it('should parse URL-encoded requests', () => {
      const hasUrlencodedParser = app._router.stack.some(layer => layer.name === 'urlencodedParser');
      expect(hasUrlencodedParser).to.be.true;
    });

    it('should parse JSON requests', () => {
      const hasJsonParser = app._router.stack.some(layer => layer.name === 'jsonParser');
      expect(hasJsonParser).to.be.true;
    });
  });

  describe('API Routes', () => {
    it('should handle GET /api/data route', (done) => {
      request(app)
        .get('/api/data')
        .expect(200, done);
    });
  });
});
