- [Tutorial to follow](https://blog.logrocket.com/building-serverless-app-typescript/)

- ```
  serverless create --template aws-nodejs-typescript && yarn
  ```
- ```
  yarn add serverless-offline serverless-dynamodb serverless-better-credentials
  ```
- ```
  serverless dynamodb install
  ```
- At this point error may occur, we follow [this thread](https://github.com/99x/serverless-dynamodb-local/issues/294) to make changes for two files in `node_modules/dynamodb-localhost/dynamodb/`

- ```
  yarn add serverless-plugin-typescript
  ```
- ```
  serverless offline start
  ```
- `export AWS_SDK_LOAD_CONFIG=1 && sls deploy`.
