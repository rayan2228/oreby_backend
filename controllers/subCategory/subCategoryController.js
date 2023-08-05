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
      }
    }
  }
};
const getAllSubCategory = async (req, res) => {
  let data = {
    iserror: false,
    message: "all subCategories",
    data: {},
  };
  const allSubCategory = await subCategoryModal
    .find({ deletedAt: { $eq: null } })
    .populate("categoryId");
  if (allSubCategory.length > 0) {
    data.data.allSubCategory = allSubCategory;
    res.send(data);
  } else {
    Date.message = "no categories in database";
    data.data.allSubCategory = allSubCategory;
    res.send(data);
  }
};
const getSubCategoryByName = async (req, res) => {
  let { name } = req.params;
  let data = {
    iserror: false,
    message: `get ${name} subCategory`,
    data: {},
  };
  const subCategory = await subCategoryModal
    .find({ name })
    .populate("subCategoryId");
  if (subCategory.length > 0) {
    data.data.subCategory = subCategory;
    res.send(data);
  } else {
    data.message = "subCategory not found";
    data.data.category = category;
    res.send(data);
  }
};
const subCategorySoftDelete = async (req, res) => {
  let { name } = req.params;
  let data = {
    iserror: false,
    message: ` ${name} subCategory is in trash`,
    data: {},
  };
  const subCategory = await subCategoryModal
    .findOneAndUpdate({ name }, { $set: { deletedAt: new Date() } })
    .populate("categoryId");
  if (subCategory) {
    data.data.subCategory = subCategory;
    res.send(data);
  } else {
    data.message = "subCategory not found";
    data.data.subCategory = subCategory;
    res.send(data);
  }
};
const subCategoryAllSoftDelete = async (req, res) => {
  let { name } = req.body;
  const errors = {
    iserror: true,
    errorType: "validation error",
    errors: {},
  };
  let data = {
    iserror: false,
    message: ` selected SubCategory is in trash`,
    data: {},
  };
  if (name) {
    if (Array.isArray(name)) {
      const subCategory = await subCategoryModal.updateMany(
        { name },
        { $set: { deletedAt: new Date() } }
      );
      data.data.subCategory = subCategory;
      res.send(data);
    } else {
      errors.errors.name = "name must be in array format";
      res.send(errors);
    }
  } else {
    errors.errors.name = "must have at least one subCategory";
    res.send(errors);
  }
};
module.exports = {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryByName,
  subCategorySoftDelete,
  subCategoryAllSoftDelete,
};
