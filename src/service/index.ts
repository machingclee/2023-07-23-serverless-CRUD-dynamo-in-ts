import dynamoDBClient from "../model/database";
import TodoServerice from "./todosService"

export const todosService = new TodoServerice(dynamoDBClient());
