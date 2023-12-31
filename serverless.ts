import type { AWS } from '@serverless/typescript';
import { createTodo, getTodo, getAllTodos, updateTodo, deleteTodo } from 'src/functions/todo';
const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb',
    'serverless-better-credentials'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region: "ap-northeast-1",
    profile: "sls",
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:ap-northeast-1:*:table/TodosTable",
        }],
      },
    },
  },
  functions: { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    "serverless-dynamodb": {
      start: {
        port: 8000,
        docker: false,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "TodosTable",
          AttributeDefinitions: [{
            AttributeName: "todosId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "todosId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  }
};
module.exports = serverlessConfiguration;