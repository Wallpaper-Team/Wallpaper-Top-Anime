import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase(
  {
    name: 'app.db',
  },
  () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(50))',
        [],
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, full VARCHAR(200), medium VARCHAR(200), albumId INTEGER)',
        [],
      );
    });
  },
  (error) => {
    console.log(error);
  },
);

export const addNewAlbum = (title) => {
  let query = 'INSERT INTO albums (title) VALUES';
  query = query + `('${title}')`;
  db.transaction((tx) => {
    tx.executeSql(query, []);
  });
};

export const deleteAlbumByID = (albumId) => {
  let query = 'DELETE FROM albums WHERE id = ' + albumId;
  db.transaction((tx) => {
    tx.executeSql(query, []);
  });
};

export const deleteAlbumByTitle = (title) => {
  let query = 'DELETE FROM albums WHERE title = ' + title;
  db.transaction((tx) => {
    tx.executeSql(query, []);
  });
};

export const getAlbums = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * from albums order by id', [], (_tx, results) => {
        resolve(results.rows.raw());
      });
    });
  });
};

export const insertNewImage = (medium, full, albumId) => {
  let query = 'INSERT INTO images (full, medium, albumId) VALUES';
  query = query + `('${full}', '${medium}', '${albumId}')`;
  db.transaction((tx) => {
    tx.executeSql(query, []);
  });
};

export const deleteImageByID = (id) => {
  let query = 'DELETE FROM images WHERE id = ' + id;
  db.transaction((tx) => {
    tx.executeSql(query, []);
  });
};

export const deleteImageByAlbumID = (albumId) => {
  let query = 'DELETE FROM images WHERE albumId = ' + albumId;
  db.transaction((tx) => {
    tx.executeSql(query, []);
  });
};

export const getImages = async (albumId) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * from images where albumId = ' + albumId,
        [],
        (_tx, results) => {
          resolve(results.rows.raw());
        },
      );
    });
  });
};
