import logError from './logError';

const safeLogging = (message) => {
  if (typeof window === 'undefined') {
    console.error(message);
  }
};

async function handleError(apolloClient, errorMessage) {
  console.log('Error message: ', errorMessage);
  const { success } = await logError(apolloClient, errorMessage);
  if (!success) {
    safeLogging(errorMessage);
  } else {
    safeLogging(success);
  }
}

export default handleError;
