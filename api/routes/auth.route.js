import express from "express";
const router = express.Router();

router.get('/signup',(req,res)=>{
   res.json('signup route')
})
router.get("/sigin", (req, res) => {
  res.json("signin route");
});
router.get("/signout", (req, res) => {
  res.json("signout route");
});

export default router;
