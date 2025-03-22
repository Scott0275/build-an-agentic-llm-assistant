import { createServerRunner } from '@aws-amplify/adapter-nextjs';

export const middleware = createServerRunner({
  config: {
    amplifyConfig: {
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
          userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
          identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
          region: process.env.NEXT_PUBLIC_AWS_REGION,
        },
      },
    },
  },
});

export const config = {
  matcher: ['/api/:path*'], // Apply middleware only to API routes
};
