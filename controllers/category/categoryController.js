const categoryModal = require("../../modal/categoryModal");

const categoryController = async (req, res) => {
  const { name, description, slug } = req.body;
  const errors = {
    iserror: true,
    errorType: "validation error",
    errors: {},
  };
  let data = {
    iserror: false,
    message: "category created successfully",
    data: {},
  };
  if (!name) {
    errors.errors.name = "category name is required";
    res.send(errors);
  } else {
    let duplicateCategory = await categoryModal.find({ name });
    if (duplicateCategory.length > 0) {
      errors.errors.name = "category name is already used";
      res.send(errors);
    } else {
      if (!slug) {
        let genarateSlug = name.toLowerCase().replaceAll(" ", "-");
        slug = genarateSlug;
      } else {
        const categoryData = new categoryModal({
          name,
          description,
          slug,
        });
        await categoryData.save();
        data.data.name = name;
        data.data.slug = slug;
        data.data.description = description;
        res.send(data);
      }
    }
  }
};

module.exports = categoryController;
