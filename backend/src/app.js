require("dotenv").config();
const {Resend} =require("resend");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const connectDB = require("./config/db");

const Users=require("./models/User");
const Leave=require("./models/Leave");

global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;

const express = require("express");
connectDB();
const cors = require("cors");
const resend = new Resend(process.env.RESEND_API_KEY);

const authMiddleware = require("./middleware/auth.middleware");

const roleMiddleware = require("./middleware/role.middleware");

const generateToken = require("./utils/generateToken");
const { log } = require("console");

const app = express();

app.use(cors());
app.use(express.json());



const publicUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;

  const { password, __v, ...safeUser } = userObj;

  return {
    ...safeUser,
    username: safeUser.username || safeUser.email,
    mobile: safeUser.mobile || safeUser.mobileNumber,
  };
};

const staffWithUiFields = (staff) => ({
  ...publicUser(staff),
  department: staff.department || "General",
});

const leaveWithStaffName = (leave, users) => {
  const staff = users.find(
    (user) => Number(user.id) === Number(leave.staffId)
  );

  return {
    ...leave,
    staffName: staff ? staff.fullName : "Unknown Staff",
  };
};

app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, mobileNumber, role, email, department, password } = req.body;

  console.log(req.body);
    const existingUser = await Users.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await Users.create({
      fullName,
      mobileNumber,
      role,
      email,
      department,
      password,
    });
  
    const token = generateToken(newUser);

    res.status(201).json({
      message: "Signup Success",
      ...token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/api/login", async (req, res) => {
try{
  const {
    email,
    password
  } = req.body;


  const user = await Users.findOne({
      email, password
});

  if (!user) {
    return res.status(401).json({
      message: "Invalid Username or Password"
    });

  }

  const token =generateToken(user);
  

  res.json({
    ...token,
    role: user.role
  })
}catch(error){
console.log(error);

res.status(500).json({
  message:"Something Went Wrong"
})
}
});


app.post("/api/auth/refresh",(req,res)=>{
const {refreshToken} = req.body;

if(!refreshToken){
  return res.status(401).json({
    message: "Refresh Token Missing"
})
}

try{
  const decoded= jwt.verify(
    refreshToken,
    process.env.JWT_SECRET
  );

  
  const newAccessToken=jwt.sign({
   id : decoded.id, email:decoded.email, role:decoded.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  })


  res.json({
    accessToken: newAccessToken
  })
}
catch(err){

  return res.status(401).json({
    message: err.message
  });
}

})


app.get(
  "/api/staff",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {
      const staff = await Users.find({
        role: "STAFF",
      });

      res.json(staff.map(staffWithUiFields));
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/api/staff/count",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {
      const count = await Users.countDocuments({
        role: "STAFF",
      });

      res.json({ count });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/api/staff/:id",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {
      const staff = await Users.findOne({
        _id: req.params.id,
        role: "STAFF",
      });

      if (!staff) {
        return res.status(404).json({
          message: "Staff not found",
        });
      }

      res.json(staffWithUiFields(staff));
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.post(
  "/api/staff",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        mobileNumber,
        department,
        password,
      } = req.body;

      console.log(req.body)

      const existingUser = await Users.findOne({
        email,
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const newStaff = await Users.create({
        fullName,
        email,
        mobileNumber,
        department,
        role: "STAFF",
        password: password || "123456@a",
      });

      res.status(201).json(
        staffWithUiFields(newStaff)
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/api/staff/:id",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {
      const staff = await Users.findOne({
        _id: req.params.id,
        role: "STAFF",
      });

      if (!staff) {
        return res.status(404).json({
          message: "Staff not found",
        });
      }

      await Users.findByIdAndDelete(
        req.params.id
      );

      await Leave.deleteMany({
        staffId: req.params.id,
      });

      res.json({
        message: "Staff deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get("/api/leaves", authMiddleware, async (req, res) => {
  try {

    let leaves;

    if (req.user.role === "HOD") {
      leaves = await Leave.find()
        .populate("staffId", "fullName email");
    } else {
      leaves = await Leave.find({
        staffId: req.user.id,
      }).populate("staffId", "fullName email");
    }

    return res.status(200).json(leaves);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/leaves/stats", authMiddleware, async (req, res) => {
  try {
    const total = await Leave.countDocuments({
      staffId: req.user.id,
    });

    const approved = await Leave.countDocuments({
      staffId: req.user.id,
      status: "Approved",
    });

    const rejected = await Leave.countDocuments({
      staffId: req.user.id,
      status: "Rejected",
    });

    res.json({
      total,
      approved,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/leaves/:id", authMiddleware, async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate("staffId", "fullName email");

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found",
      });
    }

    if (
      req.user.role !== "HOD" &&
      leave.staffId._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post(
  "/api/leaves",
  authMiddleware,
  roleMiddleware("STAFF"),
  async (req, res) => {
    try {
      const {
        leaveDate: { fromDate, toDate },
        reason,
      } = req.body;

      const newLeave = await Leave.create({
        staffId: req.user.id,
        fromDate,
        toDate,
        reason,
        status: "Pending",
      });

      const leave = await Leave.findById(
        newLeave._id
      ).populate("staffId", "fullName email");

      res.status(201).json(leave);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/api/leaves/:id",
  authMiddleware,
  roleMiddleware("STAFF"),
  async (req, res) => {
    try {
      const leave = await Leave.findById(
        req.params.id
      );

      if (!leave) {
        return res.status(404).json({
          message: "Leave request not found",
        });
      }

      if (
        leave.staffId.toString() !== req.user.id
      ) {
        return res.status(403).json({
          message:
            "You are not authorized to delete this leave",
        });
      }

      if (leave.status !== "Pending") {
        return res.status(400).json({
          message:
            "Only pending leave requests can be deleted",
        });
      }

      await Leave.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Leave request deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);


app.patch(
  "/api/leaves/:id/status",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "Approved",
        "Rejected",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid leave status",
        });
      }

      const leave = await Leave.findById(
        req.params.id
      );

      if (!leave) {
        return res.status(404).json({
          message: "Leave not found",
        });
      }

      leave.status = status;

      await leave.save();

      const employee = await Users.findById(
        leave.staffId
      );

      if (employee?.email) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: employee.email,
          subject: `Leave ${status}`,
          html: `
            <h2>Leave Request ${status}</h2>

            <p>Hello ${employee.fullName},</p>

            <p>Your leave request has been <strong>${status}</strong>.</p>

            <p>
              <strong>From:</strong> ${leave.fromDate}<br/>
              <strong>To:</strong> ${leave.toDate}
            </p>

            <p>Thank you.</p>
          `,
        });
      }

      const updatedLeave =
        await Leave.findById(leave._id)
          .populate("staffId", "fullName email");

      res.json(updatedLeave);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to update leave status",
      });
    }
  }
);




//  charts Api


app.get(
  "/api/dashboard/staff-by-department",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {

      const data = await Users.aggregate([
        {
          $match: {
            role: "STAFF"
          }
        },
        {
          $group: {
            _id: "$department",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]);

      res.status(200).json(data);

    } catch (error) {
    console.log(error);
      res.status(500).json({
        message: "Something went wrong"
      });
    }
  }
);



app.get(
  "/api/dashboard/leave-status",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {

      const data = await Leave.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1
            }
          }
        }
      ]);

      res.status(200).json(data);

    } catch (error) {
      res.status(500).json({
        message: "Something went wrong"
      });
    }
  }
);

app.get(
  "/api/dashboard/monthly-leaves",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {
    try {

      const data = await Leave.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt"
              }
            },
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            "_id.month": 1
          }
        }
      ]);

      res.status(200).json(data);

    } catch (error) {
      res.status(500).json({
        message: "Something went wrong"
      });
    }
  }
);


// Api to fetch the users Location to show on Admin side

app.get(
  "/api/users/locations",
  authMiddleware,
  roleMiddleware("HOD"),
  async (req, res) => {

    try {

      const users = await Users.find(
        {},
        {
          fullName: 1,
          areaName: 1,
          lastSeenAt: 1
        }
      );

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: "Failed to fetch locations"
      });

    }

  }
);


app.post(
  "/api/location/update",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        latitude,
        longitude,
        areaName
      } = req.body;

      await Users.findByIdAndUpdate(
        req.user.id,
        {
          currentLatitude: latitude,
          currentLongitude: longitude,
          areaName,
          lastSeenAt: new Date()
        }
      );

      res.json({
        success: true
      });

    } catch (error) {

      res.status(500).json({
        message: "Failed to update location"
      });

    }

  }
);

module.exports = app;
