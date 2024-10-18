import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonUI } from './button';
import { TButtonStyleProps, TButtonUIProps } from './types';

describe('ButtonUI component', () => {
  let defaultProps: TButtonUIProps;
  
  beforeEach(() => {
    defaultProps = {
      children: 'я кнопка',
      htmlType: 'button',
      onClick: jest.fn(),
      style: { type: 'primary', variant: 'contained' },
      disabled: false,
    };
  });

  it('should correctly render with default props', () => {
    render(<ButtonUI {...defaultProps} />);
    const button = screen.getByText('я кнопка');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button primary contained');
    expect(button).not.toBeDisabled();
  });

  it('should handle click events', () => {
    render(<ButtonUI {...defaultProps} />);
    const button = screen.getByText('я кнопка');

    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should not handle click events when disabled', () => {
    render(<ButtonUI {...defaultProps} disabled />);
    const button = screen.getByText('я кнопка');

    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(0);
  });

  it('should render disabled when disabled prop is true', () => {
    render(<ButtonUI {...defaultProps} disabled />);
    const button = screen.getByText('я кнопка');

    expect(button).toBeDisabled();
  });

  it('should render different button types and variants', () => {
    const styles: TButtonStyleProps[] = [
      { type: 'primary', variant: 'contained' },
      { type: 'secondary', variant: 'text' },
      { type: 'tertiary', variant: 'link' },
    ];

    styles.forEach(({ type, variant }, index) => {
      render(
        <ButtonUI {...defaultProps} style={{ type, variant }}>
          {index}
        </ButtonUI>
      );
      const button = screen.getByText(index);
      expect(button).toHaveClass(`button ${type} ${variant}`);
    });
  });
});
