
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  
  const findModulesByCourseId = async (req, res) => {
    const modules = await dao.findModulesByCourseId(req.params.cid);
    res.json(modules);
  };
   
  app.get("/api/courses/:cid/modules", findModulesByCourseId);

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  };

  app.delete("/api/modules/:mid", deleteModule);

  const updateModule = async (req, res) => {
    const status = await dao.updateModule(req.params.mid, req.body);
    res.json(status);
  };

  app.put("/api/modules/:mid", updateModule);

  const createModule = async (req, res) => {
    const { cid } = req.params;
    const module = await dao.createModule({...req.body, courseId: cid});
    res.json(module);
  };

  app.post("/api/courses/:cid/modules", createModule);


}