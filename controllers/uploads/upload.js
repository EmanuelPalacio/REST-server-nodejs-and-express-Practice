import { response, request } from "express";

const upload = async (req = request, res = response) => {
  res.send({
    ok: true,
    mgs: "upload",
    file: req.file,
  });
};
export default upload;
