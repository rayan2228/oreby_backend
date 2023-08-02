const subCategoryModal = require("../../modal/subCategoryModal");

const createSubCategory = async (req, res) => {
  const { name, description, slug } = req.body;
  const errors = {
    iserror: true,
    errorType: "validation error",
    errors: {},
  };
  let data = {
    iserror: false,
    message: "subCategory created successfully",
    data: {},
  };
  if (!name) {
    errors.errors.name = "subCategory name is required";
    res.send(errors);
  } else {
    let duplicateSubCategory = await subCategoryModal.find({ name });
    if (duplicateSubCategory.length > 0) {
      errors.errors.name = "subCategory name is already used";
      res.send(errors);
    } else {
      if (!slug) {
        let genarateSlug = name.toLowerCase().replaceAll(" ", "-");
        const subCategoryData = new subCategoryModal({
          name,
          description,
          slug: genarateSlug,
        });
        await subCategoryData.save();
        data.data.name = name;
        data.data.slug = slug;
        data.data.description = description;
        res.send(data);
      } else {
        const subCategoryData = new subCategoryModal({
          name,
          description,
          slug,
        });
        await subCategoryData.save();
        data.data.name = name;
        data.data.slug = slug;
        data.data.description = description;
        res.send(data);
      }
    }
  }
};

module.exports = { createSubCategory };
