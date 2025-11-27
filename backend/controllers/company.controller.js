import Company from "../models/company.model.js";
import imagekit from "../utils/imageKit.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "You have already registered your company",
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Registering company failed",
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies || !companies.length) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Fetching company failed",
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Getting company by Id failed",
    });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    let uploadedImageUrl = "";
    if (file) {
      const uploadResponse = await imagekit.upload({
        file: file.buffer.toString("base64"),
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/companies",
        useUniqueFileName: true,
      });
      console.log("Upload success:", uploadResponse);

      uploadedImageUrl = uploadResponse.url;
    }
    const updateData = { name, description, website, location };
    if (uploadedImageUrl) {
      updateData.logo = uploadedImageUrl;
    }
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company information updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
