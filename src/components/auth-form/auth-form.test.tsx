import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AuthForm } from './auth-form';
import { TAuthFormProps } from './types';

describe('AuthForm component', () => {
  let defaultProps: Omit<TAuthFormProps, 'children'>;

  beforeEach(() => {
    defaultProps = {
      onSubmit: jest.fn(),
      title: 'название формы',
      description: 'описание',
      buttonText: 'кнопка',
      valid: true,
    };

    render(
      <AuthForm {...defaultProps}>
        <input type="text" placeholder="инпут" />
      </AuthForm>
    );
  });

  it('should correctly render component', () => {
    expect(screen.getByText('название формы')).toBeInTheDocument();
    expect(screen.getByText('описание')).toBeInTheDocument();
    expect(screen.getByText('кнопка')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('инпут')).toBeInTheDocument();
  });

  it('should call onSubmit when the form is submitted', () => {
    fireEvent.submit(screen.getByTestId('auth-form'));
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not call onSubmit when form is not valid', () => {
    cleanup();

    render(
      <AuthForm {...defaultProps} valid={false}>
        <input type="text" placeholder="инпут" />
      </AuthForm>
    );

    fireEvent.submit(screen.getByTestId('auth-form'));
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit by enter press when form is valid', () => {
    fireEvent.keyDown(screen.getByPlaceholderText('инпут'), {
      key: 'Enter',
    });
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not call onSubmit by enter press when form is not valid', () => {
    cleanup();

    render(
      <AuthForm {...defaultProps} valid={false}>
        <input type="text" placeholder="инпут" />
      </AuthForm>
    );

    fireEvent.keyDown(screen.getByPlaceholderText('инпут'), {
      key: 'Enter',
    });
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('should disable the submit button when form is not valid', () => {
    cleanup();

    render(
      <AuthForm {...defaultProps} valid={false}>
        <input type="text" placeholder="инпут" />
      </AuthForm>
    );

    const button = screen.getByText('кнопка');
    expect(button).toBeDisabled();
  });
});
