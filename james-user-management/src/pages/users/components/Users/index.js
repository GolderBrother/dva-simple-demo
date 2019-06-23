import React, { Component, Fragment } from "react";
import { connect } from "dva";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  message,
  Popconfirm,
  Table
} from "antd";
import { PAGE_SIZE } from "../../constants";
import { routerRedux } from "dva/router";
import styles from "./index.less";

const FormItem = Form.Item;

// dva 有一个管理 effects 执行的 hook，并基于此封装了 dva-loading 插件。通过这个插件，我们可以不必一遍遍地写 showLoading 和 hideLoading，当发起请求时，插件会自动设置数据里的 loading 状态为 true 或 false 。然后我们在渲染 components 时绑定并根据这个数据进行渲染
@connect(state => ({ ...state.users, loading: state.loading.models.users }))
export default class Users extends Component {
  // class Users extends Component {
  state = {};
  // 保存更新用户
  saveUser(payload) {
    this.props.dispatch({ type: "users/save", payload });
  }
  onAdd() {
    console.log("onAdd");
    this.saveUser({
      editVisible: true,
      record: {}
    });
    console.log(this.props);
  }
  onEdit(record) {
    this.props.save({
      editVisible: true,
      isCreate: false,
      record
    });
  }
  onEditOk() {
    this.editForm.props.form.validateFields((err, values) => {
      if (err) {
        return message.error("表单校验失败: %o", err);
      } else {
        console.log(this.props.isCreate, values);
        this.props.dispatch({
          type: this.props.isCreate ? "users/create" : "users/update",
          payload: values
        });
      }
    });
  }
  onEditCancel() {
    this.saveUser({
      editVisible: false
    });
  }
  onDel(id) {
    this.props.dispatch({
      type: "users/del",
      payload: id
    });
  }
  render() {
    const columns = [
      {
        title: "用户名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "操作",
        key: "operation",
        render: (val, record) => (
          <Fragment>
            <Button
              type="warning"
              onClick={() => {
                this.onEdit(record);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              okText="确定"
              cancelText="取消"
              title="确认删除此用户吗?"
              onConfirm={() => {
                this.onDel(record.id);
              }}
            >
              <Button type="danger">刪除</Button>
            </Popconfirm>
          </Fragment>
        )
      }
    ];
    const {
      list,
      loading,
      isCreate,
      editVisible,
      record,
      dispatch,
      page,
      total
    } = this.props;
    const pagination = {
      current: page,
      pageSize: PAGE_SIZE,
      showQuickJumper: true,
      showTotal: (total, range) => `共${total}条`,
      total,
      onChange: page => {
        dispatch(routerRedux.push(`/users?page=${page}`));
        dispatch(
          routerRedux.push({
            pathname: "users",
            query: {
              page
            }
          })
        );
      }
    };
    const rowSelection = {
      type: "checkbox",
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.saveUser({ selectedRowKeys });
      }
    };
    return (
      <div className={styles.normal}>
        <Card>
          <Button
            type="primary"
            onClick={() => {
              this.onAdd();
            }}
          >
            添加
          </Button>
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            rowKey={record => record.id}
            pagination={pagination}
            rowSelection={rowSelection}
          />
          <div className={styles.create}>
            <EditModal
              wrappedComponentRef={instance => {
                this.editForm = instance;
              }}
              isCreate={isCreate}
              visible={editVisible}
              onOk={this.onEditOk.bind(this)}
              onCancel={this.onEditCancel.bind(this)}
              record={record}
            />
          </div>
        </Card>
      </div>
    );
  }
}

@Form.create()
class EditModal extends Component {
  render() {
    const {
      isCreate,
      visible,
      onOk,
      onCancel,
      record,
      form: { getFieldDecorator },
      ...restProps
    } = this.props;
    console.log("this.props: %o", this.props);
    let { name, email, id } = record;
    return (
      <Modal
        title={isCreate ? "新增" : "编辑"}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        destroyOnClose
        {...restProps}
      >
        <Form>
          <FormItem>
            {getFieldDecorator("id", {
              initialValue: id
            })(<Input type="hidden" />)}
          </FormItem>
          <FormItem label="用户名">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "用户名不能为空"
                }
              ],
              initialValue: name
            })(<Input />)}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "邮箱不能为空"
                }
              ],
              initialValue: email
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     ...state.users,
//     loading: state.loading.models.users
//   };
// }
// export default connect(mapStateToProps)(Users);
// export default connect(state => ({...state.users, loading: state.loading.models.users}))(Users);
