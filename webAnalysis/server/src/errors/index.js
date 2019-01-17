import language from "./lang_en.json";

const handleErrors = function(err, req, res, next) {
  if (err && err.code && err.value) {
    if (language.errors[err.code]) {
      res
        .status(500)
        .json({ err: language.errors[err.code], info: err.value || "" });
    } else {
      res.status(500).json({ err });
    }
  } else {
    console.log("Unknown Error: ", err);
    res.status(500).json({ err: "UnknownErrorOccurred" });
  }
};

export default handleErrors;
