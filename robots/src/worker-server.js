import config from '@ispy/config';

import pipe from './rabbit-async-pipe';

let open = null;

const conn = function() {
  if (open) {
    return open;
  } else {
    return (open = pipe.connect(config.amqp));
  }
};

const start = req => {
  return pipe.listen(conn, req);
};

const init = () => {
  return conn();
};

const send = (res, msg) => {
  return pipe.send(conn, res, msg);
};

const onRequest = (req, cb) => {
  return pipe.listen(cb)(conn, req);
};

const create = options => {
  const { requestQueue, responseQueue } = options;
  init();
  return {
    send: send.bind(null, responseQueue),
    onRequest: onRequest.bind(null, requestQueue)
  };
};

export default create;
