const env: string = '';
const hostName: string = env === 'local' ? 'http://localhost:3000' : 'https://todolist-server-86ss.onrender.com';

const routesUrl = {
  user: {
    login: `${hostName}/user/login/`,
    register: `${hostName}/user/register/`,
    getAllTodos: `${hostName}/user/get-all-todos/`
  },
  todo: {
    createTodo: `${hostName}/todo/create-todo/`,
    updateTodo: (id: string) => `${hostName}/todo/update-todo/${id}/`,
    deleteTodo: (id: string) => `${hostName}/todo/delete-todo/${id}/`
  }
};

export default routesUrl;
