import { describe,it,expect } from 'vitest';

// Intentionally bad formatting to test pre-commit hooks
describe('Simple Test',()=>{
  it('should pass',()=>{
    const result=1+1;
    expect(result).toBe(2)
  })
}) 