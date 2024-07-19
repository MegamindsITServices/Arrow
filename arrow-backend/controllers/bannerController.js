import slugify from "slugify";
import bannerModel from "../models/bannerModel.js";
import fs from "fs";

export const CreateBannerController = async (req, res) => {
  try {
    let { title } = req.fields || {};
    const { photo } = req.files;
    title = title || "Banner";
    const slug = slugify(title, { lower: true });

    // Validation checks
    if (!title) {
      return res.status(500).send({ error: "Title is required" });
    }
    if (photo && photo.size > 2000000) {
      return res.status(500).send({ error: "Photo should be less than 2MB" });
    }

    // Create banner object
    const banner = new bannerModel({
      title,
      slug,
    });

    // Process photo
    if (photo) {
      banner.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    // Save the banner object to the database
    await banner.save();

    res.status(201).send({
      success: true,
      message: "Banner Created Successfully",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating banner",
    });
  }
};

export const getBannerController = async (req, res) => {
  try {
    const banner = await bannerModel
      .find({})
      .select("-photo")
      .select("-secondphoto")
      .select("-thirdphoto");
    res.status(200).send({
      success: true,

      message: "All banners",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error to get product",
    });
  }
};

export const updateBannerController = async (req, res) => {
  try {
    let { title } = req.fields;
    const photo = req.files.photo; // Expecting a single photo
    title = title || "Banner";
    const slug = slugify(title, { lower: true });

    if (!title) {
      return res.status(500).send({ error: "Title is required" });
    }

    // Validate photo size
    if (photo && photo.size > 2000000) {
      return res.status(500).send({
        error: "Photo should be less than 2MB",
      });
    }

    let banner = await bannerModel.findById(req.params.id);

    if (!banner) {
      return res.status(404).send({
        success: false,
        message: "Banner not found",
      });
    }

    // Update banner fields
    banner.title = title;
    banner.slug = slug;

    // Handle photo
    if (photo) {
      banner.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    await banner.save();
    res.status(201).send({
      success: true,
      message: "Banner Updated Successfully",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating banner",
    });
  }
};

export const deleteBannerController = async (req, res) => {
  try {
    await bannerModel.findByIdAndDelete({ _id: req.params.pid });
    res.status(200).send({
      success: true,
      message: " banner Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in delete product",
    });
  }
};
export const getBannerImageController = async (req, res) => {
  try {
    const banner = await bannerModel
      .findOne({ _id: req.params.id })
      .select("photo");
    if (banner && banner.photo && banner.photo.data) {
      res.set("Content-Type", banner.photo.contentType);
      return res.status(200).send(banner.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Banner not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error to get banner photo",
    });
  }
};

export const getSingleBannerController = async (req, res) => {
  try {
    const banner = await bannerModel.findOne({ _id: req.params.id });
    if (!banner) {
      return res.status(404).send({
        success: false,
        message: "Banner not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single banner fetched",
      banner,
    });
  } catch (error) {
    console.error("Error fetching single banner:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error to get single banner",
    });
  }
};
