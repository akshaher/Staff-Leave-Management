require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const authMiddleware = require("./middleware/auth.middleware");

const roleMiddleware = require("./middleware/role.middleware");

const generateToken = require("./utils/generateToken");

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "./db/db.json");

const readDb = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));

const writeDb = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const publicUser = (user) => {
  const { password, ...safeUser } = user;

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
  const staff = users.find((user) => Number(user.id) === Number(leave.staffId));

  return {
    ...leave,
    staffName: staff ? staff.fullName : "Unknown Staff",
  };
};

app.post("/api/signup", (req, res) => {
  const { fullName, mobileNumber, role, email, password } = req.body;

  const db = readDb();

  const existingUser = db.users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const newUser = {
    id: Date.now(),
    fullName,
    mobileNumber,
    role,
    email,
    password,
  };

  db.users.push(newUser);

  writeDb(db);

  const token = generateToken(newUser);

  res.status(201).json({
    message: "Signup Success",
    token,
    role: newUser.role,
    user: newUser,
  });
});

app.post("/api/login", (req, res) => {

  const {
    email,
    password
  } = req.body;

  const db = readDb();

  const user =
    db.users.find(
      u =>
        u.email === email &&
        u.password === password
    );

  if (!user) {

    return res.status(401).json({
      message: "Invalid Username or Password"
    });

  }

  const token =generateToken(user);

  res.json({
    token,
    role: user.role,
    user
  });

});

app.get(
  "/api/staff",
  authMiddleware,
  roleMiddleware("HOD"),
  (req, res) => {
    const db = readDb();
    const staff = db.users
      .filter((user) => user.role === "STAFF")
      .map(staffWithUiFields);

    res.json(staff);
  }
);

app.get(
  "/api/staff/count",
  authMiddleware,
  roleMiddleware("HOD"),
  (req, res) => {
    const db = readDb();
    const count = db.users.filter((user) => user.role === "STAFF").length;

    res.json({ count });
  }
);

app.get(
  "/api/staff/:id",
  authMiddleware,
  roleMiddleware("HOD"),
  (req, res) => {
    const db = readDb();
    const staff = db.users.find(
      (user) => user.role === "STAFF" && Number(user.id) === Number(req.params.id)
    );

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(staffWithUiFields(staff));
  }
);

app.post(
  "/api/staff",
  authMiddleware,
  roleMiddleware("HOD"),
  (req, res) => {
    const { fullName, username, email, mobile, mobileNumber, department, password } =
      req.body;
    const db = readDb();
    const existingUser = db.users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newStaff = {
      id: Date.now(),
      fullName,
      username,
      email,
      mobileNumber: mobileNumber || mobile,
      department,
      role: "STAFF",
      password: password || "12345678",
    };

    db.users.push(newStaff);
    writeDb(db);

    res.status(201).json(staffWithUiFields(newStaff));
  }
);

app.delete(
  "/api/staff/:id",
  authMiddleware,
  roleMiddleware("HOD"),
  (req, res) => {
    const db = readDb();
    const staffIndex = db.users.findIndex(
      (user) => user.role === "STAFF" && Number(user.id) === Number(req.params.id)
    );

    if (staffIndex === -1) {
      return res.status(404).json({ message: "Staff not found" });
    }

    db.users.splice(staffIndex, 1);
    db.leaves = db.leaves.filter(
      (leave) => Number(leave.staffId) !== Number(req.params.id)
    );
    writeDb(db);

    res.json({ message: "Staff deleted successfully" });
  }
);

app.get("/api/leaves", authMiddleware, (req, res) => {
  const db = readDb();
  const leaves =
    req.user.role === "HOD"
      ? db.leaves
      : db.leaves.filter((leave) => Number(leave.staffId) === Number(req.user.id));

  res.json(leaves.map((leave) => leaveWithStaffName(leave, db.users)));
});

app.get("/api/leaves/stats", authMiddleware, (req, res) => {
  
  const db = readDb();
  const staffLeaves = db.leaves.filter(
    (leave) => Number(leave.staffId) === Number(req.user.id)
  );

  res.json({
    total: staffLeaves.length,
    approved: staffLeaves.filter((leave) => leave.status === "Approved").length,
    rejected: staffLeaves.filter((leave) => leave.status === "Rejected").length,
  });
});

app.get("/api/leaves/:id", authMiddleware, (req, res) => {
  const db = readDb();
  const leave = db.leaves.find((item) => Number(item.id) === Number(req.params.id));

  if (
    !leave ||
    (req.user.role !== "HOD" && Number(leave.staffId) !== Number(req.user.id))
  ) {
    return res.status(404).json({ message: "Leave not found" });
  }

  res.json(leaveWithStaffName(leave, db.users));
});

app.post("/api/leaves", authMiddleware, roleMiddleware("STAFF"), (req, res) => {
  console.log(req.user.role)
  const { fromDate, toDate, reason } = req.body;
  const db = readDb();
  const newLeave = {
    id: Date.now(),
    staffId: req.user.id,
    fromDate,
    toDate,
    reason,
    status: "Pending",
  };

  db.leaves.push(newLeave);
  writeDb(db);

  res.status(201).json(leaveWithStaffName(newLeave, db.users));
});

app.patch(
  "/api/leaves/:id/status",
  authMiddleware,
  roleMiddleware("HOD"),
  (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid leave status" });
    }

    const db = readDb();
    const leave = db.leaves.find((item) => Number(item.id) === Number(req.params.id));

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    writeDb(db);

    res.json(leaveWithStaffName(leave, db.users));
  }
);

module.exports = app;
