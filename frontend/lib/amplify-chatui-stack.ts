import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import path = require('path');

export class AmplifyChatuiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // -------------------------------------------------------------------------
    // Load SSM parameter that stores the Lambda function name

    const cognito_user_pool_id_parameter = ssm.StringParameter.valueForStringParameter(
      this, "/AgenticLLMAssistantWorkshop/cognito_user_pool_id"
    );

    const cognito_user_pool_client_id_parameter = ssm.StringParameter.valueForStringParameter(
      this, "/AgenticLLMAssistantWorkshop/cognito_user_pool_client_id"
    );

    // SSM parameter holding Rest API URL
    const agent_api_parameter = ssm.StringParameter.valueForStringParameter(
      this, "/AgenticLLMAssistantWorkshop/agent_api"
    );

    // -------------------------------------------------------------------------

    // Use GitHub as the source code provider
    const amplifyChatUI = new amplify.App(this, 'AmplifyChatUI', {
      autoBranchDeletion: true,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'Scott0275', // Replace with your GitHub username or organization
        repository: 'build-an-agentic-llm-assistant', // Replace with your repository name
        oauthToken: cdk.SecretValue.secretsManager('github-access-token-for-amplify-cicd1') // Replace with your Secrets Manager secret name
      }),
      platform: amplify.Platform.WEB_COMPUTE,
      environmentVariables: {
        '_CUSTOM_IMAGE': 'amplify:al2023',
        'AMPLIFY_USERPOOL_ID': cognito_user_pool_id_parameter,
        'COGNITO_USERPOOL_CLIENT_ID': cognito_user_pool_client_id_parameter,
        'API_ENDPOINT': agent_api_parameter
      }
    });

    amplifyChatUI.addBranch('main', { stage: "PRODUCTION" });

    // -----------------------------------------------------------------------
    // stack outputs

    new cdk.CfnOutput(this, "AmplifyAppURL", {
      value: amplifyChatUI.defaultDomain,
    });
  }
}
