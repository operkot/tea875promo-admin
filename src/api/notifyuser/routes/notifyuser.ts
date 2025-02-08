export default {
  routes: [
    {
     method: 'POST',
     path: '/notifyuser',
     handler: 'notifyuser.sendmessage',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
