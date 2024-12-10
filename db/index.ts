import * as SQLite from "expo-sqlite";
import {openDatabase} from 'react-native-sqlite-storage';

export const createDatabase = async () => {
  // try {
  //   const db = await SQLite.openDatabaseAsync("taskMG");

  //   const taskTable = `
  //   PRAGMA journal_mode = WAL;
    // CREATE TABLE IF NOT EXISTS Task (
    // id INTEGER PRIMARY KEY AUTOINCREMENT,
    // title TEXT NOT NULL,
    // description TEXT,
    // created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    // is_done BOOLEAN DEFAULT 0
  //   )
  // `;
  //   await db.execAsync(taskTable);
  // } catch (error) {
  //   console.log(error);
  // }

var db = openDatabase({
 name: 'Task',
 location: 'default'
});
};

export const getData: () => any = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("taskMG");
    const data = await db.getAllAsync("SELECT * FROM Task");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const insertData = async (title: string, description: string) => {
  try {
    const db = await SQLite.openDatabaseAsync("taskMG");

    const result = await db.runAsync(
      "INSERT INTO Task (title, description) VALUES (?, ?)",
      title,
      description
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
