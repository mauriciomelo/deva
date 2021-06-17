import axios from "axios";
import csv from "csvtojson";

async function getBooks() {
  const { data } = await axios.get("/goodreads_library_export.csv", {
    responseType: "text",
  });
  const json = await csv().fromString(data);
  const parseIsbn = (str) => str.replace(/"|=|\\/g, "") || undefined;
  const books = json.map((raw) => {
    const isbn = parseIsbn(raw.ISBN13) || parseIsbn(raw.ISBN);

    return {
      title: raw.Title,
      author: raw.Author,
      pages: parseInt(raw["Number of Pages"]),
      isbn,
      cover: `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    };
  });

  const booksWithId = books.filter(({ isbn }) => Boolean(isbn));
  console.log(booksWithId);
  return booksWithId;
}
