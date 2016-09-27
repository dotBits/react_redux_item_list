import request from 'superagent'

const gotUserLang = document.getElementsByTagName('html')[0].getAttribute('lang') || 'en',
      HEADERS = Object.freeze({
        "Accept":"application/json",
        "Accept-Language":gotUserLang
      });

const buildRequest = (httpMethod, apiMethodUrl, prmXhrParams) => {
  return new Promise((resolve, reject) => {

    if(prmXhrParams.hasOwnProperty('file_list_to_upload')) {
      let req = request[ httpMethod ](apiMethodUrl),
          i;

      for (let key in prmXhrParams.file_list_to_upload) {
        if (prmXhrParams.file_list_to_upload.hasOwnProperty(key)) {
          let obj = prmXhrParams.file_list_to_upload[key];
          req.attach(key, obj, obj.name);
        }
      }
      if(prmXhrParams.field_list) {
        for (i=0; i<prmXhrParams.field_list.length; i++) {
          req.field(prmXhrParams.field_list[i].key, prmXhrParams.field_list[i].value);
        }
      }

      req.set(HEADERS)
      .on("error", (error) => {
        reject(error);

      }).on("progress", (e) => {
        // FIXME: SendProgressEvent function removed for demo purporses

      }).end((error, result) => {
        if(error)
          reject(result.body, result);
        else
          resolve(result.body, result);
      });

    } else {
      request[httpMethod](apiMethodUrl)
      .set(HEADERS)
      .send(prmXhrParams)
      .on("error", (error) => {
        reject(error);

      }).on("progress", (e) => {
        // FIXME: SendProgressEvent function removed for demo purporses

      }).end((error, result) => {
        if(error)
          reject(result.body, result);
        else
          resolve(result.body, result);
      });
    }
  });
};

module.exports.buildRequest = exports.buildRequest = buildRequest
