import setVisitor from './setVisitor';
import handleError from '../error';

async function handleVisitor(context) {
  if (typeof window === 'undefined') {
    const { apolloClient, req } = context;
    const ip = 
      `${req.headers['x-forwarded-for']
      || req.headers['x-real-ip']}`;
    if (ip) {
      const { _, error } = await setVisitor(apolloClient, ip);
      if (error) {
        return handleError(apolloClient, error);
      } else {
        return;
      }
    } else {
      return handleError(apolloClient, "No IP Address Found");
    }
  }
};

export default handleVisitor;