export const logger = {
  info: (...args) => console.info('[noirthread]', ...args),
  warn: (...args) => console.warn('[noirthread]', ...args),
  error: (...args) => console.error('[noirthread]', ...args)
};
