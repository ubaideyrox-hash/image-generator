const Template = require('../models/templateModel');

exports.createTemplate = (req, res, next) => {
    const template = new Template({
      filename: req.body.filename,
      data: req.body.data,
    });
  
    console.log(template);
  
    template.save()
      .then(result => {
        console.log(result);
  
        res.status(201).json({
          message: "Template Created Successfully",
          data: result,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Failed to create template",
          error: error,
        });
      });
  };
  

  exports.gettemplates = (req, res, next) => {
    Template.find()
      .then(records => {
        if (records.length > 0) {
          res.status(200).json({ data: records });
        } else if (records.length == 0) {
          res.status(200).json({ data: [] });
        }
        else {
          res.status(404).json({
            message: "No Templates Found!",
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching templates failed",
          error: error,
        });
      });
  };
  

exports.getTemplateById = (req, res, next) => {
    const templateId = req.params.id;
  
    Template.findById(templateId)
      .then((template) => {
        if (template) {
          res.status(200).json({ data: template });
        } else {
          res.status(404).json({
            message: "Template Not Found!",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching template failed",
          error: error,
        });
      });
  };
  

exports.deleteTemplate = (req, res, next) => {
    Template.deleteOne({ _id: req.params.id }).then((result) => {
        if (result.deletedCount > 0) {
            res.status(201).json({
                message: "Template deleted sccuessfully!",
            })
        } else {
            res.status(401).json({
                message: "Not auhtorized!",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Deleteing a template failed"
        })
    })
}

exports.updateTemplate = (req, res, next) => {
    const template = new Template({
      filename: req.body.filename,
      data: req.body.data,
      _id: req.params.id,
    });
  
    Template.updateOne({ _id: req.params.id }, template)
      .then((result) => {
        if (result.nModified > 0) {
          res.status(201).json({
            message: "Template Updated Successfully!",
            data: true,
          });
        } else {
          res.status(200).json({
            message: "No changes made to the template",
            data: false,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to update template",
          error: error,
        });
      });
  };
  