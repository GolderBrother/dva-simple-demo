// export default {
//     // 支持值为 Object 和 Array
//     'GET /api/users': {users: [1, 2]},

//     // GET POST 可省略
//     '/api/users/1': {id: 1},
    
//     // 支持自定义函数，API 参考 express@4
//     'POST /api/user/create': (req, res) => {res.end('OK');},
// }

const list= [
  {id: 1,name: 'james1',email:'james1@qq.com'},
  {id: 2,name: 'james2',email:'james2@qq.com'},
  {id: 3,name: 'james3',email:'james3@qq.com'}
];

export default {
  'GET /api/users': (req, res) => {
    let { page=1, limit=3 } = req.query;
    res.end(JSON.stringify({
      code: 0,
      // 包含开始，不包含结尾
      data: {
        total: list.length, 
        list: list.slice((page - 1) * limit, page * limit)
      }
    }));
  },
  'POST /api/users': (req, res) => {
    let buffers = [];
    req.on('data', function(data){
      buffers.push(data);
    });
    req.on('end', function() {
      let body = Buffer.concat(buffers).toString();
      let newUser = JSON.parse(body);
      newUser.id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
      list.push(newUser);
      res.end({
        code: 0,
        data: '添加成功'
      });
    })
  },
  'PATCH /api/users': (req, res) => {
      let buffers = [];
      req.on('data', function(data){
        buffers.push(data);
      });
      req.on('end', function(){
        let body = Buffer.concat().toString();
        let updateUser = JSON.parse(body);
        list.map(item => {
          if(item.id == updateUser.id) return updateUser;
          else return item;
        });
        res.end(JSON.stringify({
          code: 0,
          data: '更新成功'
        }));
      })
  },
  'DELETE /api/users': (req, res) => {
    let {id} = req.params;
    list = list.filter(item => item.id != id);
    res.end({
      code: 0,
      data: '删除成功'
    });
  }
};