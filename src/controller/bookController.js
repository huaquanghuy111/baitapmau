import books from '../data';

const bookController = {
  detail(req, res) {
    res.json(books);
  },
  addBook(req, res) {
    const currentbook = req.body;
    res.json({
      id: currentbook.id,
      name: currentbook.name,

    });
  },
};
export default bookController;
