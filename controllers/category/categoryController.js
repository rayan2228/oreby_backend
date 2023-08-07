const categoryModal = require("../../modal/categoryModal");
const subCategoryModal = require("../../modal/subCategoryModal");

const createCategory = async (req, res) => {
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
        const categoryData = new categoryModal({
          name,
          description,
          slug: genarateSlug,
        });
        await categoryData.save();
        const createdCategory = await categoryModal.find({ name });
        data.data = createdCategory;
        res.send(data);
      } else {
        const categoryData = new categoryModal({
          name,
          description,
          slug,
        });
        await categoryData.save();
        const createdCategory = await categoryModal.find({ name });
        data.data = createdCategory;
        res.send(data);
      }
    }
  }
};

const getAllCategory = async (req, res) => {
  let data = {
    iserror: false,
    message: "all categories",
    data: {},
  };
  const allCategory = await categoryModal
    .find({ deletedAt: { $eq: null } })
    .populate("subCategoryId");
  if (allCategory.length > 0) {
    data.data.allCategory = allCategory;
    res.send(data);
  } else {
    Date.message = "no categories in database";
    data.data.allCategory = allCategory;
    res.send(data);
  }
};
const getCategoryByName = async (req, res) => {
  let { name } = req.params;
  let data = {
    iserror: false,
    message: `get ${name} category`,
    data: {},
  };
  const category = await categoryModal.find({ name }).populate("subCategoryId");
  if (category.length > 0) {
    data.data.category = category;
    res.send(data);
  } else {
    data.message = "category not found";
    data.data.category = category;
    res.send(data);
  }
};

const categorySoftDelete = async (req, res) => {
  let { name } = req.params;
  let data = {
    iserror: false,
    message: ` ${name} category is in trash`,
    data: {},
  };
  const category = await categoryModal
    .findOneAndUpdate({ name }, { $set: { deletedAt: new Date() } })
    .populate("subCategoryId");
  await subCategoryModal.findOneAndUpdate(
    { categoryId: category._id },
    { $set: { deletedAt: new Date() } }
  );
  if (category) {
    data.data.category = category;
    res.send(data);
  } else {
    data.message = "category not found";
    data.data.category = category;
    res.send(data);
  }
};
const categoryAllSoftDelete = async (req, res) => {
  let { name } = req.body;
  let data = {
    iserror: false,
    message: ` selected category is in trash`,
    data: {},
  };
  if (name) {
    const getCategories = await categoryModal.find({ name });
    getCategories.map(async (category) => {
      await subCategoryModal.findOneAndUpdate(
        { categoryId: category._id },
        { $set: { deletedAt: new Date() } }
      );
    });
    const category = await categoryModal.updateMany(
      { name },
      { $set: { deletedAt: new Date() } }
    );
    data.data.category = category;
    res.send(data);
  }
};
const getAllCategoryWithTrash = async (req, res) => {
  let data = {
    iserror: false,
    message: "all categories with trash",
    data: {},
  };
  const allCategory = await categoryModal.find({}).populate("subCategoryId");
  if (allCategory.length > 0) {
    data.data.allCategory = allCategory;
    res.send(data);
  } else {
    Date.message = "no categories in database";
    data.data.allCategory = allCategory;
    res.send(data);
  }
};
const getAllCategoryOnlyTrash = async (req, res) => {
  let data = {
    iserror: false,
    message: "all categories with trash",
    data: {},
  };
  const allCategory = await categoryModal
    .find({ deletedAt: { $ne: null } })
    .populate("subCategoryId");
  if (allCategory.length > 0) {
    data.data.allCategory = allCategory;
    res.send(data);
  } else {
    Date.message = "no categories in database";
    data.data.allCategory = allCategory;
    res.send(data);
  }
};

const updateCategoryStatus = async (req, res) => {
  let { name, status } = req.body;
  const errors = {
    iserror: true,
    errorType: "validation error",
    errors: {},
  };
  let data = {
    iserror: false,
    message: "category status updated successfully",
    data: {},
  };
  if (name) {
    if (status) {
      if (status == "approved") {
        const category = await categoryModal
          .findOneAndUpdate(
            { name },
            {
              $set: {
                status,
                isActive: true,
              },
            },
            {
              new: true,
            }
          )
          .populate("subCategoryId");
        data.data.category = category;
        res.send(data);
      } else if (status == "rejected" || status == "processing") {
        const category = await categoryModal
          .findOneAndUpdate(
            { name },
            {
              $set: {
                status,
                isActive: false,
              },
            },
            {
              new: true,
            }
          )
          .populate("subCategoryId");
        data.data.category = category;
        res.send(data);
      } else {
        errors.errors.status =
          "status value should be approved,processing or rejected";
        res.send(errors);
      }
    } else {
      errors.errors.status = "status is required";
      res.send(errors);
    }
  } else {
    errors.errors.status = "name is required";
    res.send(errors);
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getCategoryByName,
  categorySoftDelete,
  categoryAllSoftDelete,
  getAllCategoryWithTrash,
  getAllCategoryOnlyTrash,
  updateCategoryStatus,
};
