import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { connect } from 'react-redux';
import {
  changeAddressModalStatus,
  changeCurrAddressModalData,
} from '../../redux/actions';
import SelectAddress from '../add-update-address/select-address/select-address';
import { getUpdateAddress } from '../../api';
import { phoneFun } from '../../tools/tools';
import './addressModal.less';
import emitter from '../../tools/events';
import { getAddAddress, getAddressList } from '../../api/index';

function AddressModal(props) {
  const [nameValidateStatus, setNameValidateStatus] = useState(); // name的自定义校验状态
  const [telValidateStatus, setTelValidateStatus] = useState(); // tel 的自定义校验状态
  const [nameHelp, setNameHelp] = useState(''); // name 自定义校验不通过的提示
  const [telHelp, setTelHelp] = useState(''); // tel 自定义校验不通过的提示
  const [isDefaultAddress, setIsDefaultAddress] = useState(0); // 当前的收货地址是否设置为默认的收货地址 0 代表不是， 1代表是
  const [zipCode, setZipcode] = useState('邮政编号'); // 邮政编号
  const [address, setAddress] = useState({}); // 城市数据 省 市区 街道
  const [isAdd, setIsAdd] = useState(false); //是否为添加状体
  const [addressList, setAddressList] = useState(); //地址列表

  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    // console.log(props.currAddressModalData)
    // 没有数据 则为添加
    if (!props.currAddressModalData.province) {
      setIsAdd(true);
      return;
    } else {
      setIsAdd(false);
      setAddress({
        province: props.currAddressModalData.province,
        city: props.currAddressModalData.city,
        area: props.currAddressModalData.area,
        street: props.currAddressModalData.street,
      });
      form.setFieldsValue(props.currAddressModalData);
      setNameValidateStatus('success');
      setTelValidateStatus('success');
      setZipcode(props.currAddressModalData.zipcode);
      setIsDefaultAddress(props.currAddressModalData.isDefault);
    }
  }, [props]);

  useEffect(() => {}, [zipCode]);

  const showModal = () => {
    props.changeAddressModalStatus(true);
  };
  // 模拟框点击取消的时候
  const handleCancel = () => {
    // console.log("213");
    // 清除 redux 中的 currAddressModalData
    props.changeCurrAddressModalData({});
    props.changeAddressModalStatus(false);
    // 把数据给初始化
    form.resetFields();
    // 状态清除
    setNameValidateStatus('');
    setTelValidateStatus('');
    setTelHelp('');
    setNameHelp('');
  };

  //模态框 自定义footer
  const modalFooter = (
    <div className="submit-box">
      <Button type="primary" htmlType="submit" onClick={form.submit}>
        保存
      </Button>
      <Button type="primary" onClick={handleCancel}>
        取消
      </Button>
    </div>
  );

  // 模拟框点击ok的时候
  const handleOk = () => {
    props.changeAddressModalStatus(false);
  };

  // 表单成功提交
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    // console.log(address)
    // const { name, tel, detailAddressChange } = values;
    // console.log(isDefaultAddress);
    // console.log(nameValidateStatus, telValidateStatus)
    if (
      nameValidateStatus === 'success' &&
      telValidateStatus === 'success' &&
      address.street
    ) {
      // console.log("发送ajax请求");

      if (isAdd) {
        // console.log("添加")
        // 添加 调用添加api
        reqAddAddress(values);
      } else {
        // 修改
        //1.调用修改api
        reqUpdateAddress(values);
      }
    } else {
      message.error('请填写地址信息！');
    }
  };
  // 获取收货列表
  const reqAddressList = async () => {
    setAddressList([]);
    const res = await getAddressList();
    // console.log(r(es)
    setAddressList(res.data);
  };

  // 收货列表发生变化的时候回传到checkout.jsx
  useEffect(() => {
    emitter.emit('pushAddressList', addressList);
  }, [addressList]);

  // ajax 更新地址信息
  const reqUpdateAddress = async (values) => {
    // console.log(values)
    const res = await getUpdateAddress(
      props.currAddressModalData.id,
      props.currAddressModalData.uid,
      values.consigne,
      values.tel,
      address.province,
      address.city,
      address.area,
      address.street,
      values.detailAddress,
      zipCode,
      isDefaultAddress
    );
    if (res.status) {
      message.success('修改成功！');
      // 2. 获取最新的地址列表
      // 获取收货地址列表
      reqAddressList();
      // 3. 关闭模拟框
      props.changeAddressModalStatus(false);
    }
  };

  // 添加新的地址信息
  const reqAddAddress = async (values) => {
    const res = await getAddAddress(
      values.consigne,
      values.tel,
      address.province,
      address.city,
      address.area,
      address.street,
      values.detailAddress,
      zipCode,
      isDefaultAddress
    );
    // console.log(res)
    if (res.status) {
      message.success(res.message);
      // 获取收货地址列表
      reqAddressList();
      // 3. 关闭模拟框
      props.changeAddressModalStatus(false);
    }
  };

  // name 输入框
  const nameChange = (e) => {
    // console.log(e.target.value);
    const isNumber = containsNumber(e.target.value);
    // 是否有数值类型
    if (isNumber) {
      setNameValidateStatus('error');
      setNameHelp('收件人名称不能包含数字');
    } else if (e.target.value.trim().length < 2) {
      // console.log(e.target.value.trim().length < 2);
      setNameValidateStatus('error');
      setNameHelp('收货人姓名不能小于2个字符');
    } else {
      setNameValidateStatus('success');
      setNameHelp('');
    }
  };

  // tel 输入框
  const telChange = (e) => {
    const telStatus = phoneFun(e.target.value);
    if (telStatus) {
      // 手机号正确
      setTelValidateStatus('success');
      setTelHelp('');
    } else if (!e.target.value.trim()) {
      setTelValidateStatus('error');
      setTelHelp('收件人手机号不能为空');
    } else {
      // 手机号不正确
      setTelValidateStatus('error');
      setTelHelp('手机号格式不正确');
    }
  };

  // 判断是否有数值
  const containsNumber = (str) => {
    for (let i = 0; i < 10; i++) {
      if (str.indexOf(i) != -1) {
        return true;
      }
    }
    return false;
  };

  /* 详细地址输入框发生改变时候触发 */
  const detailAddressChange = (e) => {
    // console.log(e.target.value);
  };

  /* 改变状态 是否设置为默认选中的收货地址 */
  const changeDefaultAddress = () => {
    isDefaultAddress === 0 ? setIsDefaultAddress(1) : setIsDefaultAddress(0);
  };

  // 获取选择的城市数据
  const cityChange = (data) => {
    // console.log(data[2]?.district?.zipcode);
    // console.log(data)

    // 把城市数据保存起来
    setAddress(data);
  };

  // 获取邮政编号
  const zipCodeChange = (zipcode) => {
    setZipcode(zipcode);
    if (zipcode) {
      // console.log(zipcode)

      form.setFieldsValue({ zipcode });
    }
  };

  return (
    <Fragment>
      <Modal
        keyboard={false}
        footer={modalFooter}
        destroyOnClose={true}
        maskClosable={false}
        visible={props.addressModalStatus}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon
        forceRender={true}
        width={660}
      >
        {/* 模拟框部分 */}
        <div className="modal-data">
          {/* 头部 */}
          <div className="title">
            <div className="mark">添加收货地址</div>
            <div className="closeIcon">
              <i className="iconfont iconsearchclose" onClick={handleCancel}>
                {' '}
              </i>
            </div>
          </div>
          {/* 线 */}
          <div className="lines"></div>
          {/* 中间内容数据收集部分 */}
          <div className="add-address-container">
            <Form
              form={form}
              name="advanced_search"
              className="ant-advanced-search-form"
              onFinish={onFinish}
            >
              {/* 输入框 收件人，收件人电话号码 */}
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    hasFeedback
                    validateStatus={nameValidateStatus}
                    help={nameHelp}
                    name="consigne"
                    rules={[
                      { required: true, message: '收货人姓名不能小于2个字符' },
                      {
                        type: 'string',
                      },
                      {
                        min: 2,
                        message: '收货人姓名不能小于2个字符',
                      },
                    ]}
                  >
                    <Input placeholder="姓名" onChange={nameChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    hasFeedback
                    name="tel"
                    validateStatus={telValidateStatus}
                    help={telHelp}
                    rules={[
                      {
                        required: true,
                        message: '请填写手机号码',
                      },
                    ]}
                  >
                    <Input placeholder="手机号" onChange={telChange} />
                  </Form.Item>
                </Col>
              </Row>
              {/* 省，市地址选择 */}
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item>
                    {/* 自个封装的组件 */}
                    <SelectAddress
                      onChange={cityChange}
                      zipCodeChange={zipCodeChange}
                      address={
                        props.currAddressModalData.province
                          ? `${props.currAddressModalData.province}/${props.currAddressModalData.city}/${props.currAddressModalData.area}/${props.currAddressModalData.street}`
                          : ''
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* 详细地址输入文本框 */}
              <Row gutter={24} className="detailAddress">
                <Col span={24}>
                  <Form.Item
                    hasFeedback
                    name="detailAddress"
                    rules={[
                      {
                        required: true,
                        message: '街道地址不能为空',
                      },
                      {
                        type: 'string',
                      },
                      {
                        min: 5,
                        message: '街道地址不能小于5个字符',
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="详细地址"
                      allowClear
                      onChange={detailAddressChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* 邮编地址 */}
              <Row gutter={24}>
                {/* 邮编 */}
                <Col span={12}>
                  <Form.Item name="zipcode">
                    <Input
                      readOnly={true}
                      placeholder="邮政编号"
                      className="zipcode"
                      initialvalues={zipCode || ''}
                      onChange={(e) => {
                        setZipcode(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
                {/* 是否设置为默认的地址 */}
                <Col gutter={12}>
                  <div className="is-default-address">
                    <span
                      className="isdefault-icon"
                      onClick={changeDefaultAddress}
                    >
                      <i
                        className={
                          isDefaultAddress == 1
                            ? 'iconfont iconquanquan'
                            : 'iconfont iconwanchenggouzi'
                        }
                      ></i>
                    </span>
                    <span className="isdefault-text">设为默认</span>
                  </div>
                </Col>
              </Row>

              {/* 提交按钮 */}
              <Row gutter={24}>
                <Col span={24}></Col>
              </Row>
            </Form>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default connect(
  (state) => ({
    addressModalStatus: state.addressModalStatus,
    currAddressModalData: state.currAddressModalData,
  }),
  { changeAddressModalStatus, changeCurrAddressModalData }
)(AddressModal);
