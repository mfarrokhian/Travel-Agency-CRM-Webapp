import { Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
const router = Router();
    // Services = require("./servicesModel.json");
/**Debag service routes */
router.get("/air-ticketing-and-reservation/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/air_ticketing_and_reservation");
});
router.get("/visa-assist/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/visa_assist");
});
router.get("/travel-insurance/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/travel_insurance");
});
router.get("/consular-services/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/consular_services");
});
router.get("/hotel-booking/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/world_wide_hotel_booking");
});
router.get("/group-travel/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/incentive_group_travel");
});
router.get("/honeymoon-packages/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/honeymoon_packages");
});
router.get("/family-packages/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/family_packages");
});
router.get("/holiday-packages/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/holiday_packages");
});
router.get("/pilgrimage-travel/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.render("services/pilgrimage_travel");
});
/**end */
router.get("/services/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.setHeader("content-type", "application/json");
    fs.createReadStream( path.resolve(__dirname, "servicesModel.json") ).pipe(res);
});
router.post("/order/", (req: Request, res: Response) => {
    console.log(req.body);
    if (req && req.body && req.body.ACTION === "REGISTER") {
        res.json({ info: "Your data has been sent, our agent will contact you.", reqId: "f4ydhsg53igfhfgs==" });
    }
});
router.delete("/order/", (req: Request, res: Response) => {
    console.log(req.body);
    if (req && req.body && req.body.ACTION === "CANCEL") {
        res.send("Your request successfully canceled.");
    }
});


/**Debag admin panel */
router.get(["/login", "/dashboard"], (...args: Array<any>) => {
    // const pathToExperimentalFile = path.resolve("../../../../WebstormProjects/WFW_admin/dist/index.html");
    const pathToExperimentalFile = path.resolve(__dirname, "../../admin/dist/index.html");
    const res: Response = args[1];
    res.setHeader("content-type", "text/html");
    fs.createReadStream(pathToExperimentalFile).pipe(res);
});

router.get(["/*\.js", "/*\.map"], (req: Request, res: Response) => {
    // const PATH_TO_DIR = "../../../../WebstormProjects/WFW_admin/dist/";
    // const PATH_TO_FILES = path.resolve(PATH_TO_DIR, req.path.slice(1));
    const PATH_TO_FILES = path.resolve(__dirname, "../../admin/dist/", req.path.slice(1));
    fs.createReadStream(PATH_TO_FILES).pipe(res);
});
router.get("/api/register/", (...args: Array<any>) => {
    const res: Response = args[1];
    res.json({
        name: "Dmitry"
    });
});
/**end */
export default router;