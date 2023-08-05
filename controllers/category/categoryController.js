const categoryModal = require("../../modal/categoryModal");

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
  const category = await categoryModal.findOneAndUpdate(
    { name },
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

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryByName,
  categorySoftDelete,
};
