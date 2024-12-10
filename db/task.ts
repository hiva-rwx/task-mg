import { SQLiteDatabase } from "react-native-sqlite-storage";

interface Task {
  title: string;
  description?: string;
}

export const addContact = async (db: SQLiteDatabase, task: Task) => {
  const insertQuery = `
     INSERT INTO Task (title, description)
     VALUES (?, ?)
   `;
  const values = [task.title, task.description];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error("Failed to add contact");
  }
};
