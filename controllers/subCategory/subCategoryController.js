const subCategoryModal = require("../../modal/subCategoryModal");
const categoryModal = require("../../modal/categoryModal");
const createSubCategory = async (req, res) => {
  const { name, description, slug, categoryId } = req.body;
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
  } else if (!categoryId) {
    errors.errors.parentCategory = "parent category is required";
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
          categoryId,
        });
        await subCategoryData.save();
        const createdSubCategory = await subCategoryModal.find({
          _id: subCategoryData._id,
        });
        await categoryModal.findOneAndUpdate(
          { _id: subCategoryData.categoryId },
          { $push: { subCategoryId: subCategoryData._id } },
          {
            new: true,
          }
        );
        data.data = createdSubCategory;
        res.send(data);
      } else {
        const subCategoryData = new subCategoryModal({
          name,
          description,
          slug,
          categoryId,
        });
        const createdSubCategory = await subCategoryModal.find({
          _id: subCategoryData._id,
        });
        await subCategoryData.save();
        await categoryModal.findOneAndUpdate(
          { _id: subCategoryData.categoryId },
          { $push: { subCategoryId: subCategoryData._id } },
          {
            new: true,
          }
        );
        data.data = createdSubCategory;
        res.send(data);
      }
    }
  }
};

module.exports = { createSubCategory };
