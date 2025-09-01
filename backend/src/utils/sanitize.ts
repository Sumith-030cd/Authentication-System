// Basic input sanitization
export function sanitizeInput(input: any) {
  if (typeof input === 'string') {
    return input.replace(/[<>"'%;()&+]/g, '');
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key]);
    }
    return sanitized;
  }
  return input;
}
