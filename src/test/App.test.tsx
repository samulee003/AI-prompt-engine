import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

// Mock the Gemini service to avoid API calls in tests
vi.mock('../services/geminiService', () => ({
  refineUserPrompt: vi.fn().mockResolvedValue('Mocked refined prompt'),
}));

describe('App Component', () => {
  it('renders main heading', () => {
    render(<App />);
    
    const heading = screen.getByRole('heading', { name: /AI Prompt Enhancer/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders language switch button', () => {
    render(<App />);
    
    const switchButton = screen.getByLabelText(/切換到繁體中文|Switch to English/i);
    expect(switchButton).toBeInTheDocument();
  });

  it('renders prompt input form', () => {
    render(<App />);
    
    const inputField = screen.getByPlaceholderText(/write a story about a dragon|寫一個關於龍的故事/i);
    expect(inputField).toBeInTheDocument();
  });

  it('renders enhance button', () => {
    render(<App />);
    
    const enhanceButton = screen.getByText(/Enhance My Prompt|強化我的提示詞/i);
    expect(enhanceButton).toBeInTheDocument();
  });

  it('renders tips section', () => {
    render(<App />);
    
    const tipsSection = screen.getByText(/Tips for Crafting Power Prompts|打造強效提示詞的技巧/i);
    expect(tipsSection).toBeInTheDocument();
  });
}); 