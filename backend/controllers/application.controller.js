// ================================================
// IMPORTS
// ================================================
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// ================================================
// 1. APPLY JOB
// ================================================
// This function lets a logged-in user apply for a specific job.
export const applyJob = async (req, res) => {
  try {
    // --- Step 1: Extract user and job ID ---
    const userId = req.id; // userId set by authentication middleware
    const jobId = req.params.id; // jobId comes from URL params

    // --- Step 2: Validate job ID ---
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job id is required",
      });
    }

    // --- Step 3: Prevent duplicate applications ---
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId, // check if this user already applied
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // --- Step 4: Verify job existence ---
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // --- Step 5: Create a new application document ---
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId, // corrected field name
    });

    // --- Step 6: Add this application to the job's application list ---
    job.application.push(newApplication._id);
    await job.save();

    // --- Step 7: Send success response ---
    return res.status(200).json({
      success: true,
      message: "Job applied successfully",
    });
  } catch (error) {
    // --- Step 8: Handle unexpected errors ---
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ================================================
// 2. GET APPLIED JOBS
// ================================================
// This function returns all jobs the current user has applied to.
export const getAppliedJobs = async (req, res) => {
  try {
    // --- Step 1: Extract user ID ---
    const userId = req.id;

    // --- Step 2: Find all applications by this user ---
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // newest first
      .populate({
        path: "job", // populate job details
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company", // populate company details inside job
          options: { sort: { createdAt: -1 } },
        },
      });

    // --- Step 3: Handle case when no applications exist ---
    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applied jobs found",
      });
    }

    // --- Step 4: Return all populated applications ---
    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    // --- Step 5: Handle error ---
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ================================================
// 3. GET APPLICANTS
// ================================================
// This function returns all applicants for a specific job (used by employer).
export const getApplicants = async (req, res) => {
  try {
    // --- Step 1: Get job ID from URL ---
    const jobId = req.params.id;

    // --- Step 2: Find job and populate its applications ---
    const job = await Job.findById(jobId).populate({
      path: "application", // populate all applications for this job
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant", // populate applicant (user) details inside each application
      },
    });

    // --- Step 3: Handle missing job ---
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // --- Step 4: Send job and its applicants ---
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    // --- Step 5: Handle error ---
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ================================================
// 4. UPDATE APPLICATION STATUS
// ================================================
// This function lets the recruiter update an applicant’s status.
export const updateStatus = async (req, res) => {
  try {
    // --- Step 1: Extract status and application ID ---
    const { status } = req.body;
    const applicationId = req.params.id;

    // --- Step 2: Validate input ---
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // --- Step 3: Find the application ---
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // --- Step 4: Update the status and save ---
    application.status = status.toLowerCase();
    await application.save();

    // --- Step 5: Respond success ---
    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    // --- Step 6: Handle error ---
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
