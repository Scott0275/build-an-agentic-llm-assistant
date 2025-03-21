"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmplifyChatuiStack = void 0;
const amplify = require("@aws-cdk/aws-amplify-alpha");
const cdk = require("aws-cdk-lib");
const ssm = require("aws-cdk-lib/aws-ssm");
class AmplifyChatuiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // -------------------------------------------------------------------------
        // Load SSM parameters
        const cognito_user_pool_id_parameter = ssm.StringParameter.valueForStringParameter(this, "/AgenticLLMAssistantWorkshop/cognito_user_pool_id");
        const cognito_user_pool_client_id_parameter = ssm.StringParameter.valueForStringParameter(this, "/AgenticLLMAssistantWorkshop/cognito_user_pool_client_id");
        const agent_api_parameter = ssm.StringParameter.valueForStringParameter(this, "/AgenticLLMAssistantWorkshop/agent_api");
        // -------------------------------------------------------------------------
        // Define GitHub source code provider
        const amplifyChatUI = new amplify.App(this, 'AmplifyChatUI', {
            autoBranchDeletion: true,
            sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
                owner: 'scott0275',
                repository: 'build-an-agentic-llm-assistant',
                oauthToken: cdk.SecretValue.secretsManager('github-access-token-for-amplify-cicd')
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
        // -------------------------------------------------------------------------
        // Stack outputs
        new cdk.CfnOutput(this, "AmplifyAppURL", {
            value: amplifyChatUI.defaultDomain,
        });
    }
}
exports.AmplifyChatuiStack = AmplifyChatuiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1wbGlmeS1jaGF0dWktc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbXBsaWZ5LWNoYXR1aS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBc0Q7QUFDdEQsbUNBQW1DO0FBRW5DLDJDQUEyQztBQVEzQyxNQUFhLGtCQUFtQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQy9DLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNEVBQTRFO1FBQzVFLHNCQUFzQjtRQUN0QixNQUFNLDhCQUE4QixHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQ2hGLElBQUksRUFBRSxtREFBbUQsQ0FDMUQsQ0FBQztRQUVGLE1BQU0scUNBQXFDLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDdkYsSUFBSSxFQUFFLDBEQUEwRCxDQUNqRSxDQUFDO1FBRUYsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUNyRSxJQUFJLEVBQUUsd0NBQXdDLENBQy9DLENBQUM7UUFFRiw0RUFBNEU7UUFDNUUscUNBQXFDO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQzNELGtCQUFrQixFQUFFLElBQUk7WUFDeEIsa0JBQWtCLEVBQUUsSUFBSSxPQUFPLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3ZELEtBQUssRUFBRSxXQUFXO2dCQUNsQixVQUFVLEVBQUUsZ0NBQWdDO2dCQUM1QyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsc0NBQXNDLENBQUM7YUFDbkYsQ0FBQztZQUNGLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVc7WUFDdEMsb0JBQW9CLEVBQUU7Z0JBQ3BCLGVBQWUsRUFBRSxnQkFBZ0I7Z0JBQ2pDLHFCQUFxQixFQUFFLDhCQUE4QjtnQkFDckQsNEJBQTRCLEVBQUUscUNBQXFDO2dCQUNuRSxjQUFjLEVBQUUsbUJBQW1CO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUV2RCw0RUFBNEU7UUFDNUUsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3ZDLEtBQUssRUFBRSxhQUFhLENBQUMsYUFBYTtTQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE1Q0QsZ0RBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYW1wbGlmeSBmcm9tICdAYXdzLWNkay9hd3MtYW1wbGlmeS1hbHBoYSc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBzc20gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNzbSc7XG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2duaXRvJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5leHBvcnQgY2xhc3MgQW1wbGlmeUNoYXR1aVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIExvYWQgU1NNIHBhcmFtZXRlcnNcbiAgICBjb25zdCBjb2duaXRvX3VzZXJfcG9vbF9pZF9wYXJhbWV0ZXIgPSBzc20uU3RyaW5nUGFyYW1ldGVyLnZhbHVlRm9yU3RyaW5nUGFyYW1ldGVyKFxuICAgICAgdGhpcywgXCIvQWdlbnRpY0xMTUFzc2lzdGFudFdvcmtzaG9wL2NvZ25pdG9fdXNlcl9wb29sX2lkXCJcbiAgICApO1xuXG4gICAgY29uc3QgY29nbml0b191c2VyX3Bvb2xfY2xpZW50X2lkX3BhcmFtZXRlciA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIoXG4gICAgICB0aGlzLCBcIi9BZ2VudGljTExNQXNzaXN0YW50V29ya3Nob3AvY29nbml0b191c2VyX3Bvb2xfY2xpZW50X2lkXCJcbiAgICApO1xuXG4gICAgY29uc3QgYWdlbnRfYXBpX3BhcmFtZXRlciA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIoXG4gICAgICB0aGlzLCBcIi9BZ2VudGljTExNQXNzaXN0YW50V29ya3Nob3AvYWdlbnRfYXBpXCJcbiAgICApO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERlZmluZSBHaXRIdWIgc291cmNlIGNvZGUgcHJvdmlkZXJcbiAgICBjb25zdCBhbXBsaWZ5Q2hhdFVJID0gbmV3IGFtcGxpZnkuQXBwKHRoaXMsICdBbXBsaWZ5Q2hhdFVJJywge1xuICAgICAgYXV0b0JyYW5jaERlbGV0aW9uOiB0cnVlLFxuICAgICAgc291cmNlQ29kZVByb3ZpZGVyOiBuZXcgYW1wbGlmeS5HaXRIdWJTb3VyY2VDb2RlUHJvdmlkZXIoe1xuICAgICAgICBvd25lcjogJ3Njb3R0MDI3NScsXG4gICAgICAgIHJlcG9zaXRvcnk6ICdidWlsZC1hbi1hZ2VudGljLWxsbS1hc3Npc3RhbnQnLFxuICAgICAgICBvYXV0aFRva2VuOiBjZGsuU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ2dpdGh1Yi1hY2Nlc3MtdG9rZW4tZm9yLWFtcGxpZnktY2ljZCcpXG4gICAgICB9KSxcbiAgICAgIHBsYXRmb3JtOiBhbXBsaWZ5LlBsYXRmb3JtLldFQl9DT01QVVRFLFxuICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXM6IHtcbiAgICAgICAgJ19DVVNUT01fSU1BR0UnOiAnYW1wbGlmeTphbDIwMjMnLFxuICAgICAgICAnQU1QTElGWV9VU0VSUE9PTF9JRCc6IGNvZ25pdG9fdXNlcl9wb29sX2lkX3BhcmFtZXRlcixcbiAgICAgICAgJ0NPR05JVE9fVVNFUlBPT0xfQ0xJRU5UX0lEJzogY29nbml0b191c2VyX3Bvb2xfY2xpZW50X2lkX3BhcmFtZXRlcixcbiAgICAgICAgJ0FQSV9FTkRQT0lOVCc6IGFnZW50X2FwaV9wYXJhbWV0ZXJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFtcGxpZnlDaGF0VUkuYWRkQnJhbmNoKCdtYWluJywge3N0YWdlOiBcIlBST0RVQ1RJT05cIn0pO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFN0YWNrIG91dHB1dHNcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkFtcGxpZnlBcHBVUkxcIiwge1xuICAgICAgdmFsdWU6IGFtcGxpZnlDaGF0VUkuZGVmYXVsdERvbWFpbixcbiAgICB9KTtcbiAgfVxufVxuIl19