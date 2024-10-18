import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputUI } from './input';
import { TInputUIProps } from './types';

describe('InputUI component', () => {
  let defaultProps: TInputUIProps;
  let inputRefMock: React.RefObject<HTMLInputElement>;

  beforeEach(() => {
    defaultProps = {
      placeholder: 'плейсхолдер',
      error: '',
      inputType: 'text',
      value: 'значение',
      onChange: jest.fn(),
      onKeyPress: jest.fn(),
      disabled: false,
      id: 'input-id',
      label: 'лейбл',
      hintMesage: 'подсказка',
    };

    inputRefMock = {
      current: {
        focus: jest.fn(),
        value: '',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      } as unknown as HTMLInputElement,
    };
  });

  it('should correctly render with default props', () => {
    render(<InputUI {...defaultProps} ref={inputRefMock} />);

    expect(screen.getByLabelText('лейбл')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('плейсхолдер')).toBeInTheDocument();
  });

  it('should not render hint when value exists', () => {
    render(<InputUI {...defaultProps} ref={inputRefMock} />);

    expect(screen.queryByText('подсказка')).not.toBeInTheDocument();
  });

  it('should render hint when no value', () => {
    render(<InputUI {...defaultProps} value="" ref={inputRefMock} />);

    expect(screen.getByText('подсказка')).toBeInTheDocument();
  });

  it('should call onChange when value changes', () => {
    render(<InputUI {...defaultProps} ref={inputRefMock} />);
    const input = screen.getByLabelText('лейбл');

    fireEvent.change(input, { target: { value: 'новое значение' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyPress when a key is pressed', () => {
    render(<InputUI {...defaultProps} ref={inputRefMock} />);
    const input = screen.getByLabelText('лейбл');
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

    expect(defaultProps.onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('should render error message when error prop exists', () => {
    render(<InputUI {...defaultProps} error="ошибка" ref={inputRefMock} />);

    expect(screen.getByText('ошибка')).toBeVisible();
    expect(screen.queryByText('подсказка')).not.toBeInTheDocument();
  });

  it('should not render hint when error prop exists', () => {
    render(<InputUI {...defaultProps} error="ошибка" ref={inputRefMock} />);

    expect(screen.queryByText('подсказка')).not.toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<InputUI {...defaultProps} ref={inputRefMock} disabled />);
    const input = screen.getByPlaceholderText('плейсхолдер');
    expect(input).toBeDisabled();
  });
});
