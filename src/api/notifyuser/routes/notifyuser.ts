export default {
  routes: [
    {
     method: 'POST',
     path: '/notifyuser',
     handler: 'notifyuser.create',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
